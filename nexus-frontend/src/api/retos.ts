import api from "./axios";

export interface Reto {
    id: number;
    tema_id: number;
    titulo: string;
    descripcion: string | null;
    imagen_reto: string | null;
    solucion: string | null;
    imagen_solucion: string | null;
    mostrar_solucion: boolean;
    activo: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface CrearRetoData {
    tema_id: number;
    titulo: string;
    descripcion: string;
    solucion?: string;
    mostrar_solucion?: boolean;
    activo?: boolean;
    imagen_reto?: File | null;
    imagen_solucion?: File | null;
}

export interface ActualizarRetoData {
    titulo?: string;
    descripcion?: string;
    solucion?: string;
    mostrar_solucion?: boolean;
    activo?: boolean;
    imagen_reto?: File | null;
    imagen_solucion?: File | null;
    eliminar_imagen_reto?: boolean;
    eliminar_imagen_solucion?: boolean;
}

interface RetoResponse {
    data: Reto;
    message?: string;
}


export const obtenerRetosRequest = async (temaId: number): Promise<Reto[]> => {
    const response = await api.get<unknown>(`/temas/${temaId}/retos`);

    // Laravel puede devolver directamente el arreglo o envolverlo en { data: [] }.
    // Normalizamos ambas respuestas para que el frontend siempre reciba Reto[].
    const payload = response.data;

    if (Array.isArray(payload)) {
        return payload as Reto[];
    }

    if (
        payload !== null &&
        typeof payload === "object" &&
        "data" in payload &&
        Array.isArray(payload.data)
    ) {
        return payload.data as Reto[];
    }

    return [];
};

export const obtenerRetoRequest = async (id: number): Promise<Reto> => {
    const response = await api.get<RetoResponse>(`/retos/${id}`);
    return response.data.data;
};

export const crearRetoRequest = async (datos: CrearRetoData): Promise<Reto> => {
    const formData = new FormData();

    formData.append("tema_id", String(datos.tema_id));
    formData.append("titulo", datos.titulo);
    formData.append("descripcion", datos.descripcion);

    if (datos.solucion !== undefined) {
        formData.append("solucion", datos.solucion);
    }

    formData.append(
        "mostrar_solucion",
        datos.mostrar_solucion ? "1" : "0"
    );

    formData.append(
        "activo",
        datos.activo === false ? "0" : "1"
    );

    if (datos.imagen_reto) {
        formData.append("imagen_reto", datos.imagen_reto);
    }

    if (datos.imagen_solucion) {
        formData.append("imagen_solucion", datos.imagen_solucion);
    }

    const response = await api.post<RetoResponse>(
        "/retos",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.data;
};

export const actualizarRetoRequest = async (
    id: number,
    datos: ActualizarRetoData
): Promise<Reto> => {
    const formData = new FormData();

    if (datos.titulo !== undefined) {
        formData.append("titulo", datos.titulo);
    }

    if (datos.descripcion !== undefined) {
        formData.append("descripcion", datos.descripcion);
    }

    if (datos.solucion !== undefined) {
        formData.append("solucion", datos.solucion);
    }

    if (datos.mostrar_solucion !== undefined) {
        formData.append(
            "mostrar_solucion",
            datos.mostrar_solucion ? "1" : "0"
        );
    }

    if (datos.activo !== undefined) {
        formData.append(
            "activo",
            datos.activo ? "1" : "0"
        );
    }

    if (datos.imagen_reto) {
        formData.append("imagen_reto", datos.imagen_reto);
    }

    if (datos.imagen_solucion) {
        formData.append("imagen_solucion", datos.imagen_solucion);
    }

    if (datos.eliminar_imagen_reto) {
        formData.append("eliminar_imagen_reto", "1");
    }

    if (datos.eliminar_imagen_solucion) {
        formData.append("eliminar_imagen_solucion", "1");
    }

    formData.append("_method", "PUT");

    const response = await api.post<RetoResponse>(
        `/retos/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.data;
};

export const cambiarSolucionRequest = async (
    id: number,
    mostrar: boolean
): Promise<Reto> => {
    const response = await api.patch<RetoResponse>(
        `/retos/${id}/solucion`,
        {
            mostrar_solucion: mostrar,
        }
    );

    return response.data.data;
};

export const cambiarEstadoRetoRequest = async (
    id: number,
    activo: boolean
): Promise<Reto> => {
    const formData = new FormData();

    formData.append(
        "activo",
        activo ? "1" : "0"
    );

    formData.append("_method", "PUT");

    const response = await api.post<RetoResponse>(
        `/retos/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.data;
};

export const eliminarRetoRequest = async (id: number): Promise<void> => {
    await api.delete(`/retos/${id}`);
};
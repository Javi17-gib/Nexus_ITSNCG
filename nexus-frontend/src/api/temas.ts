import api from "./axios";


/*
|--------------------------------------------------------------------------
| TIPO TEMA
|--------------------------------------------------------------------------
*/

export interface Tema {
    id: number;
    unidad_id: number;
    nombre: string;
    descripcion: string | null;
    orden: number;
    created_at?: string;
    updated_at?: string;
}


/*
|--------------------------------------------------------------------------
| CREAR TEMA
|--------------------------------------------------------------------------
*/

export interface CrearTemaData {
    unidad_id: number;
    nombre: string;
    descripcion?: string;
    orden?: number;
}


export async function crearTemaRequest(
    data: CrearTemaData
) {

    const response =
        await api.post(
            "/temas",
            data
        );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| OBTENER TEMAS DE UNA UNIDAD
|--------------------------------------------------------------------------
*/

export async function getTemasUnidadRequest(
    unidadId: number
): Promise<Tema[]> {

    const response =
        await api.get(
            `/unidades/${unidadId}/temas`
        );

    console.log(
        "📖 Temas de la unidad:",
        response.data
    );

    return Array.isArray(response.data)
        ? response.data
        : [];
}


/*
|--------------------------------------------------------------------------
| OBTENER UN TEMA
|--------------------------------------------------------------------------
*/

export async function getTemaRequest(
    id: number
): Promise<Tema> {

    const response =
        await api.get(
            `/temas/${id}`
        );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| ACTUALIZAR TEMA
|--------------------------------------------------------------------------
*/

export interface ActualizarTemaData {
    nombre: string;
    descripcion?: string;
    orden?: number;
}


export async function actualizarTemaRequest(
    id: number,
    data: ActualizarTemaData
) {

    const response =
        await api.put(
            `/temas/${id}`,
            data
        );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| ELIMINAR TEMA
|--------------------------------------------------------------------------
*/

export async function eliminarTemaRequest(
    id: number
) {

    const response =
        await api.delete(
            `/temas/${id}`
        );

    return response.data;
}
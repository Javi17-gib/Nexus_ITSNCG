import api from "./axios";

/*
|--------------------------------------------------------------------------
| TIPO MATERIA
|--------------------------------------------------------------------------
*/

export interface Materia {
    id: number;
    nombre: string;
    descripcion?: string | null;
    color?: string | null;
    icono?: string | null;
    portada?: string | null;
    activa?: boolean;
    created_at?: string;
    updated_at?: string;
}


/*
|--------------------------------------------------------------------------
| OBTENER TODAS LAS MATERIAS
|--------------------------------------------------------------------------
*/

export const getMateriasRequest = async (): Promise<Materia[]> => {

    const response = await api.get(
        "/materias"
    );

    console.log(
        "📚 Respuesta de /materias:",
        response.data
    );


    /*
    |--------------------------------------------------------------------------
    | Laravel devuelve directamente:
    |
    | [
    |   {
    |      id: 1,
    |      nombre: "..."
    |   }
    | ]
    |
    |--------------------------------------------------------------------------
    */

    if (Array.isArray(response.data)) {

        return response.data;

    }


    /*
    |--------------------------------------------------------------------------
    | Por seguridad, también aceptamos:
    |
    | {
    |     materias: [...]
    | }
    |--------------------------------------------------------------------------
    */

    if (
        response.data &&
        Array.isArray(
            response.data.materias
        )
    ) {

        return response.data.materias;

    }


    /*
    |--------------------------------------------------------------------------
    | Si Laravel devuelve algo inesperado
    |--------------------------------------------------------------------------
    */

    console.error(
        "❌ Formato inesperado de /materias:",
        response.data
    );


    return [];

};


/*
|--------------------------------------------------------------------------
| OBTENER UNA MATERIA
|--------------------------------------------------------------------------
*/

export const getMateriaRequest = async (
    id: number
): Promise<Materia> => {

    const response =
        await api.get<Materia>(
            `/materias/${id}`
        );

    return response.data;

};


/*
|--------------------------------------------------------------------------
| CREAR MATERIA
|--------------------------------------------------------------------------
*/

export const createMateriaRequest = async (
    data: Partial<Materia>
) => {

    const response =
        await api.post(
            "/materias",
            data
        );

    return response.data;

};


/*
|--------------------------------------------------------------------------
| ACTUALIZAR MATERIA
|--------------------------------------------------------------------------
*/

export const updateMateriaRequest = async (
    id: number,
    data: Partial<Materia>
) => {

    const response =
        await api.put(
            `/materias/${id}`,
            data
        );

    return response.data;

};


/*
|--------------------------------------------------------------------------
| ELIMINAR MATERIA
|--------------------------------------------------------------------------
*/

export const deleteMateriaRequest = async (
    id: number
) => {

    const response =
        await api.delete(
            `/materias/${id}`
        );

    return response.data;

};

export interface Materia {
    id: number;
    nombre: string;
    descripcion?: string | null;
    color?: string | null;
    icono?: string | null;
    portada?: string | null;
    activa?: boolean;

    unidades_count?: number;

    created_at?: string;
    updated_at?: string;
}
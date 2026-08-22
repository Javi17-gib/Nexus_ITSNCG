import api from "./axios";


/*
|--------------------------------------------------------------------------
| TIPO UNIDAD
|--------------------------------------------------------------------------
*/

export interface Unidad {
    id: number;
    materia_id: number;
    nombre: string;
    descripcion: string | null;
    orden: number;
    created_at?: string;
    updated_at?: string;
}


/*
|--------------------------------------------------------------------------
| CREAR UNIDAD
|--------------------------------------------------------------------------
*/

export interface CrearUnidadData {
    materia_id: number;
    nombre: string;
    descripcion?: string;
    orden?: number;
}


export async function crearUnidadRequest(
    data: CrearUnidadData
) {

    const response =
        await api.post(
            "/unidades",
            data
        );

    return response.data;

}


/*
|--------------------------------------------------------------------------
| OBTENER UNIDADES DE UNA MATERIA
|--------------------------------------------------------------------------
*/

export async function getUnidadesMateriaRequest(
    materiaId: number
): Promise<Unidad[]> {

    const response =
        await api.get(
            `/materias/${materiaId}/unidades`
        );

    console.log(
        "📦 Unidades de la materia:",
        response.data
    );

    return Array.isArray(response.data)
        ? response.data
        : [];

}


/*
|--------------------------------------------------------------------------
| OBTENER UNA UNIDAD
|--------------------------------------------------------------------------
*/

export async function getUnidadRequest(
    id: number
): Promise<Unidad> {

    const response =
        await api.get(
            `/unidades/${id}`
        );

    return response.data;

}


/*
|--------------------------------------------------------------------------
| ACTUALIZAR UNIDAD
|--------------------------------------------------------------------------
*/

export interface ActualizarUnidadData {
    nombre: string;
    descripcion?: string;
    orden?: number;
}


export async function actualizarUnidadRequest(
    id: number,
    data: ActualizarUnidadData
) {

    const response =
        await api.put(
            `/unidades/${id}`,
            data
        );

    return response.data;

}


/*
|--------------------------------------------------------------------------
| ELIMINAR UNIDAD
|--------------------------------------------------------------------------
*/

export async function eliminarUnidadRequest(
    id: number
) {

    const response =
        await api.delete(
            `/unidades/${id}`
        );

    return response.data;

}
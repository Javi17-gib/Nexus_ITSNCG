import api from "./axios";

import type {
    Materia,
    CrearMateriaData,
    ActualizarMateriaData,
} from "../types/materia";


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


    if (Array.isArray(response.data)) {

        return response.data;

    }


    if (
        response.data &&
        Array.isArray(
            response.data.materias
        )
    ) {

        return response.data.materias;

    }


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
    data: CrearMateriaData
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
    data: ActualizarMateriaData
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
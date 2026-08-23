import api from "./axios";


/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
*/

export type TipoContenido =
    | "texto"
    | "pdf"
    | "imagen"
    | "youtube"
    | "video"
    | "archivo";


export interface ArchivoContenido {
    id: number;
    contenido_id: number;
    nombre: string;
    ruta: string;

    /*
    |--------------------------------------------------------------------------
    | URL PÚBLICA DEL ARCHIVO
    |--------------------------------------------------------------------------
    */

    url?: string;

    tipo:
        | "pdf"
        | "imagen"
        | "video"
        | "audio";

    tamano?: number | null;

    created_at?: string;

    updated_at?: string;
}


export interface Contenido {
    id: number;

    tema_id: number;

    titulo: string;

    contenido: string | null;

    tipo: TipoContenido;

    archivos?: ArchivoContenido[];

    created_at?: string;

    updated_at?: string;
}


/*
|--------------------------------------------------------------------------
| CREAR CONTENIDO
|--------------------------------------------------------------------------
*/

export interface CrearContenidoData {
    tema_id: number;

    titulo: string;

    contenido?: string;

    tipo?: TipoContenido;
}


export async function crearContenidoRequest(
    data: CrearContenidoData
) {

    const response =
        await api.post(
            "/contenidos",
            data
        );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| OBTENER CONTENIDOS DE UN TEMA
|--------------------------------------------------------------------------
*/

export async function getContenidosTemaRequest(
    temaId: number
): Promise<Contenido[]> {

    const response =
        await api.get(
            `/temas/${temaId}/contenidos`
        );

    console.log(
        "📝 Contenidos del tema:",
        response.data
    );

    return Array.isArray(response.data)
        ? response.data
        : [];
}


/*
|--------------------------------------------------------------------------
| OBTENER UN CONTENIDO
|--------------------------------------------------------------------------
*/

export async function getContenidoRequest(
    id: number
): Promise<Contenido> {

    const response =
        await api.get(
            `/contenidos/${id}`
        );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| ACTUALIZAR CONTENIDO
|--------------------------------------------------------------------------
*/

export interface ActualizarContenidoData {
    titulo?: string;

    contenido?: string;

    tipo?: TipoContenido;
}


export async function actualizarContenidoRequest(
    id: number,
    data: ActualizarContenidoData
) {

    const response =
        await api.put(
            `/contenidos/${id}`,
            data
        );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| ELIMINAR CONTENIDO
|--------------------------------------------------------------------------
*/

export async function eliminarContenidoRequest(
    id: number
) {

    const response =
        await api.delete(
            `/contenidos/${id}`
        );

    return response.data;
}
import api from "./axios";


/*
|--------------------------------------------------------------------------
| TIPO ARCHIVO
|--------------------------------------------------------------------------
*/

export type TipoArchivo =
    | "pdf"
    | "imagen"
    | "video"
    | "audio";


/*
|--------------------------------------------------------------------------
| INTERFAZ ARCHIVO
|--------------------------------------------------------------------------
*/

export interface ArchivoContenido {

    id: number;

    contenido_id: number;

    nombre: string;

    ruta: string;

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


/*
|--------------------------------------------------------------------------
| SUBIR ARCHIVO
|--------------------------------------------------------------------------
|
| Se utiliza cuando el contenido es NUEVO y todavía no tiene
| un archivo asociado.
|
*/

export async function subirArchivoRequest(

    contenidoId: number,

    archivo: File,

    tipo: TipoArchivo

) {

    const formData =
        new FormData();


    formData.append(

        "contenido_id",

        String(
            contenidoId
        )

    );


    formData.append(

        "archivo",

        archivo

    );


    formData.append(

        "tipo",

        tipo

    );


    const response =
        await api.post(

            "/archivos",

            formData,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data",

                },

            }

        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| OBTENER ARCHIVOS DE UN CONTENIDO
|--------------------------------------------------------------------------
*/

export async function getArchivosContenidoRequest(

    contenidoId: number

): Promise<ArchivoContenido[]> {


    const response =
        await api.get(

            `/contenidos/${contenidoId}/archivos`

        );


    return Array.isArray(
        response.data
    )

        ? response.data

        : [];

}


/*
|--------------------------------------------------------------------------
| OBTENER UN ARCHIVO
|--------------------------------------------------------------------------
*/

export async function getArchivoRequest(

    id: number

): Promise<ArchivoContenido> {


    const response =
        await api.get(

            `/archivos/${id}`

        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| ACTUALIZAR / REEMPLAZAR ARCHIVO
|--------------------------------------------------------------------------
|
| IMPORTANTE:
|
| Aquí NO creamos otro archivo.
|
| Mandamos el nuevo archivo al ID del archivo existente.
|
| Laravel:
|
| 1. Guarda el archivo nuevo.
| 2. Actualiza el registro existente.
| 3. Elimina físicamente el archivo anterior.
|
*/

export async function actualizarArchivoRequest(

    id: number,

    archivo: File,

    tipo: TipoArchivo

) {


    const formData =
        new FormData();


    /*
    |--------------------------------------------------------------------------
    | NUEVO ARCHIVO
    |--------------------------------------------------------------------------
    */

    formData.append(

        "archivo",

        archivo

    );


    /*
    |--------------------------------------------------------------------------
    | TIPO
    |--------------------------------------------------------------------------
    */

    formData.append(

        "tipo",

        tipo

    );


    /*
    |--------------------------------------------------------------------------
    | METHOD SPOOFING PARA LARAVEL
    |--------------------------------------------------------------------------
    |
    | En lugar de mandar PUT directamente con multipart/form-data,
    | mandamos POST y Laravel lo interpreta como PUT.
    |
    */

    formData.append(

        "_method",

        "PUT"

    );


    /*
    |--------------------------------------------------------------------------
    | PETICIÓN
    |--------------------------------------------------------------------------
    */

    const response =
        await api.post(

            `/archivos/${id}`,

            formData,

            {

                headers: {

                    "Content-Type":
                        "multipart/form-data",

                },

            }

        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| ACTUALIZAR SOLO NOMBRE Y TIPO
|--------------------------------------------------------------------------
|
| Esta función se conserva por si en algún momento quieres
| editar únicamente los datos del archivo sin reemplazarlo.
|
*/

export async function actualizarDatosArchivoRequest(

    id: number,

    data: {

        nombre?: string;

        tipo?: TipoArchivo;

    }

) {


    const response =
        await api.put(

            `/archivos/${id}`,

            data

        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| ELIMINAR ARCHIVO
|--------------------------------------------------------------------------
*/

export async function eliminarArchivoRequest(

    id: number

) {


    const response =
        await api.delete(

            `/archivos/${id}`

        );


    return response.data;

}
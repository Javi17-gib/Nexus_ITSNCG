import api from "./axios";


/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
*/

export interface MateriaGrupo {
    id: number;
    nombre: string;
    color?: string;
    icono?: string;
}


export interface Grupo {
    id: number;
    materia_id: number;
    docente_id: number;
    nombre: string;
    codigo_acceso: string;
    semestre: string;
    periodo: string;
    activo: boolean;
    materia?: MateriaGrupo;
}


/*
|--------------------------------------------------------------------------
| OBTENER GRUPOS DEL DOCENTE
|--------------------------------------------------------------------------
*/

export async function getGruposRequest(): Promise<Grupo[]> {

    const response =
        await api.get(
            "/grupos"
        );


    console.log(
        "👥 Respuesta de /grupos:",
        response.data
    );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| CREAR GRUPO
|--------------------------------------------------------------------------
*/

export interface CrearGrupoData {

    nombre: string;

    materia_id: number;

    semestre: string;

    periodo: string;

    activo?: boolean;

}


export async function crearGrupoRequest(
    data: CrearGrupoData
) {

    const response =
        await api.post(
            "/grupos",
            data
        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| OBTENER UN GRUPO
|--------------------------------------------------------------------------
*/

export async function getGrupoRequest(
    id: number
) {

    const response =
        await api.get(
            `/grupos/${id}`
        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| ACTUALIZAR GRUPO
|--------------------------------------------------------------------------
*/

export async function actualizarGrupoRequest(
    id: number,
    data: Partial<CrearGrupoData>
) {

    const response =
        await api.put(
            `/grupos/${id}`,
            data
        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| ELIMINAR GRUPO
|--------------------------------------------------------------------------
*/

export async function eliminarGrupoRequest(
    id: number
) {

    const response =
        await api.delete(
            `/grupos/${id}`
        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| OBTENER SOLICITUDES PENDIENTES
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| OBTENER ALUMNOS DEL GRUPO
|--------------------------------------------------------------------------
*/

export async function getAlumnosGrupoRequest(
    id: number
) {

    const response =
        await api.get(
            `/grupos/${id}/alumnos`
        );

    console.log(
        "👥 Alumnos del grupo:",
        response.data
    );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| ACEPTAR ALUMNO
|--------------------------------------------------------------------------
*/



/*
|--------------------------------------------------------------------------
| RECHAZAR ALUMNO
|--------------------------------------------------------------------------
*/




/*
|--------------------------------------------------------------------------
| ALUMNO: UNIRSE POR CÓDIGO
|--------------------------------------------------------------------------
*/

export async function unirseGrupoRequest(
    codigo_acceso: string
) {

    const response =
        await api.post(
            "/grupos/unirse",
            {
                codigo_acceso,
            }
        );


    return response.data;

}


/*
|--------------------------------------------------------------------------
| ALUMNO: MIS GRUPOS
|--------------------------------------------------------------------------
*/

export async function getMisGruposRequest() {

    const response =
        await api.get(
            "/mis-grupos"
        );


    return response.data;

}

/*
|--------------------------------------------------------------------------
| SOLICITUDES PENDIENTES
|--------------------------------------------------------------------------
*/

export async function getSolicitudesGrupoRequest(
    id: number
) {

    const response =
        await api.get(
            `/grupos/${id}/pendientes`
        );

    console.log(
        "📩 Solicitudes:",
        response.data
    );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| ACEPTAR ALUMNO
|--------------------------------------------------------------------------
*/

export async function aceptarAlumnoRequest(
    grupoId: number,
    userId: number
) {

    const response =
        await api.post(
            `/grupos/${grupoId}/aceptar/${userId}`
        );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| RECHAZAR ALUMNO
|--------------------------------------------------------------------------
*/

export async function rechazarAlumnoRequest(
    grupoId: number,
    userId: number
) {

    const response =
        await api.post(
            `/grupos/${grupoId}/rechazar/${userId}`
        );

    return response.data;
}
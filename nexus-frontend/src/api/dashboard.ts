import api from "./axios";

/*
|--------------------------------------------------------------------------
| TIPOS DEL DASHBOARD DOCENTE
|--------------------------------------------------------------------------
*/

export interface ActividadDashboard {
    fecha: string;
    dia: string;
    visitas: number;
}

export interface DashboardDocenteData {
    materias: number;
    grupos: number;
    contenidos: number;
    retos: number;

    visitas: number;
    alumnos_activos: number;
    promedio_visitas: number;

    actividad: ActividadDashboard[];
}


/*
|--------------------------------------------------------------------------
| OBTENER DATOS DEL DASHBOARD DOCENTE
|--------------------------------------------------------------------------
*/

export async function obtenerDashboardDocenteRequest(): Promise<DashboardDocenteData> {

    const response = await api.get<DashboardDocenteData>(
        "/dashboard/docente"
    );

    return response.data;
}
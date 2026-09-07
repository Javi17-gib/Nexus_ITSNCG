// src/api/reportes.ts

import api from "./axios";


/* =========================================================
   TIPOS
========================================================= */

export interface AlumnoReporte {
    id: number;

    nombre: string;
    apellido_paterno?: string;
    apellido_materno?: string;

    correo?: string;

    total_visitas: number;

    ultima_visita: string | null;
}


export interface ReporteGrupo {
    grupo: {
        id: number;
        nombre: string;

        materia?: {
            id: number;
            nombre: string;
        };
    };

    resumen: {
        total_alumnos: number;
        alumnos_activos: number;
        total_visitas: number;
    };

    alumnos: AlumnoReporte[];
}


/* =========================================================
   OBTENER ACTIVIDAD DEL GRUPO
========================================================= */

export const obtenerActividadGrupoRequest = async (
    grupoId: number
): Promise<ReporteGrupo> => {

    const response = await api.get(
        `/reportes/grupo/${grupoId}/actividad`
    );

    return response.data;
};


/* =========================================================
   GENERAR / DESCARGAR PDF
========================================================= */

export const descargarReportePdfRequest = async (
    grupoId: number,
    nombreGrupo: string
): Promise<void> => {

    const response = await api.get(
        `/reportes/grupo/${grupoId}/pdf`,
        {
            responseType: "blob",
        }
    );


    /* Crear archivo PDF */

    const blob = new Blob(
        [response.data],
        {
            type: "application/pdf",
        }
    );


    /* Crear URL temporal */

    const url = window.URL.createObjectURL(
        blob
    );


    /* Limpiar nombre del grupo */

    const nombreArchivo = nombreGrupo
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^\w\-áéíóúÁÉÍÓÚñÑ]/g, "");


    /* Crear enlace */

    const link = document.createElement(
        "a"
    );


    link.href = url;


    link.setAttribute(
        "download",
        `Reporte_${nombreArchivo}.pdf`
    );


    document.body.appendChild(
        link
    );


    link.click();


    /* Limpiar */

    link.remove();


    window.URL.revokeObjectURL(
        url
    );

};
export interface Materia {
    id: number;
    docente_id: number;
    nombre: string;
    descripcion: string | null;
    color: string | null;
    icono: string | null;
    portada: string | null;
    activa: boolean;

    // Estadísticas calculadas por Laravel
    unidades?: number;
    temas?: number;
    grupos?: number;

    // Conteos calculados con withCount()
    unidades_count?: number;
    temas_count?: number;
    grupos_count?: number;

    created_at?: string;
    updated_at?: string;
}


export interface CrearMateriaData {
    nombre: string;
    descripcion?: string;
    color?: string;
    icono?: string;
    portada?: string;
    activa?: boolean;
}


export interface ActualizarMateriaData {
    nombre: string;
    descripcion?: string;
    color?: string;
    icono?: string;
    portada?: string;
    activa?: boolean;
}


export interface MateriaResponse {
    message: string;
    materia: Materia;
}
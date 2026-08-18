export interface Materia {
    id: number;
    docente_id: number;
    nombre: string;
    descripcion: string | null;
    color: string | null;
    icono: string | null;
    portada: string | null;
    activa: boolean;
    created_at?: string;
    updated_at?: string;

    // Información calculada que utilizaremos
    unidades?: number;
    temas?: number;
    grupos?: number;
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
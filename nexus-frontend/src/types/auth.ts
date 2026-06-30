export interface LoginData {
    correo: string;
    password: string;
}

export interface RegisterData {
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
    password: string;
    password_confirmation: string;
    rol: "alumno" | "docente";
    pin?: string;
}

export interface User {
    id: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    correo: string;
    rol: "alumno" | "docente";
    foto_perfil?: string;
}

export interface AuthResponse {
    token: string;
    user: User;
    message: string;
}
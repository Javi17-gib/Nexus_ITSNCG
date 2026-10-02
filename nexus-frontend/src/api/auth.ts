import api from "./axios";

import type {
    LoginData,
    RegisterData,
    AuthResponse,
    User,
} from "../types/auth";


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

export async function loginRequest(
    data: LoginData
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        "/login",
        data
    );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| REGISTRO
|--------------------------------------------------------------------------
*/

export async function registerRequest(
    data: RegisterData
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        "/register",
        data
    );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| CERRAR SESIÓN
|--------------------------------------------------------------------------
*/

export async function logoutRequest() {

    return await api.post("/logout");
}


/*
|--------------------------------------------------------------------------
| OBTENER USUARIO
|--------------------------------------------------------------------------
*/

export async function getUserRequest(): Promise<User> {

    const response = await api.get<User>("/user");

    return response.data;
}


/*
|--------------------------------------------------------------------------
| ACTUALIZAR PERFIL
|--------------------------------------------------------------------------
*/

export async function updateProfileRequest(
    data: FormData
): Promise<AuthResponse> {

    data.append("_method", "PUT");

    const response = await api.post<AuthResponse>(
        "/user/profile",
        data,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| RECUPERAR CONTRASEÑA
|--------------------------------------------------------------------------
| Solicita el envío del PIN al correo.
|--------------------------------------------------------------------------
*/

export async function forgotPasswordRequest(
    correo: string
) {

    const response = await api.post(
        "/forgot-password",
        {
            correo,
        }
    );

    return response.data;
}


/*
|--------------------------------------------------------------------------
| RESTABLECER CONTRASEÑA
|--------------------------------------------------------------------------
| Envía correo + PIN + nueva contraseña.
|--------------------------------------------------------------------------
*/

export async function resetPasswordRequest(
    correo: string,
    pin: string,
    password: string,
    password_confirmation: string
) {

    const response = await api.post(
        "/reset-password",
        {
            correo,
            pin,
            password,
            password_confirmation,
        }
    );

    return response.data;
}
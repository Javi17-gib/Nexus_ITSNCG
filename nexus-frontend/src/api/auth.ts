import api from "./axios";

import type {
    LoginData,
    RegisterData,
    AuthResponse,
    User,
} from "../types/auth";

export async function loginRequest(
    data: LoginData
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        "/login",
        data
    );

    return response.data;
}

export async function registerRequest(
    data: RegisterData
): Promise<AuthResponse> {

    const response = await api.post<AuthResponse>(
        "/register",
        data
    );

    return response.data;
}

export async function logoutRequest() {

    return await api.post("/logout");
}

export async function getUserRequest(): Promise<User> {

    const response = await api.get<User>("/user");

    return response.data;
}

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
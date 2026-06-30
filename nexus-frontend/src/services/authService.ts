import {
    loginRequest,
    registerRequest,
    logoutRequest,
    getUserRequest,
} from "../api/auth";

import type {
    LoginData,
    RegisterData,
    AuthResponse,
    User,
} from "../types/auth";

class AuthService {

    async login(data: LoginData): Promise<AuthResponse> {

        const response = await loginRequest(data);

        localStorage.setItem("token", response.token);

        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );

        return response;
    }

    async register(data: RegisterData): Promise<AuthResponse> {

        const response = await registerRequest(data);

        localStorage.setItem("token", response.token);

        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );

        return response;
    }

    async logout() {

        try {
            await logoutRequest();
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }

    async getUser(): Promise<User> {

        return await getUserRequest();

    }

    getStoredUser(): User | null {

        const user = localStorage.getItem("user");

        if (!user) return null;

        return JSON.parse(user);
    }

    getToken(): string | null {

        return localStorage.getItem("token");

    }

    isAuthenticated(): boolean {

        return !!localStorage.getItem("token");

    }

}

export default new AuthService();
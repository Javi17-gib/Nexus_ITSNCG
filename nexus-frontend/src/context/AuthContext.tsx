import {
    createContext,
    useEffect,
    useState,
    useContext,
} from "react";

import type { ReactNode } from "react";

import authService from "../services/authService";

import type {
    LoginData,
    RegisterData,
    User,
} from "../types/auth";

interface AuthContextType {

    user: User | null;

    loading: boolean;

    login: (data: LoginData) => Promise<any>;

    register: (data: RegisterData) => Promise<any>;

    logout: () => Promise<void>;

}

export const AuthContext =
    createContext<AuthContextType>(
        {} as AuthContextType
    );

// 🔥 HOOK CORRECTO
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }

    return context;
};

interface Props {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: Props) {

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const storedUser =
            authService.getStoredUser();

        if (storedUser) {
            setUser(storedUser);
        }

        setLoading(false);

    }, []);

    // 🔥 LOGIN CORREGIDO
    const login = async (data: LoginData) => {

        const response =
            await authService.login(data);

        setUser(response.user);

        return response; // 🔥 IMPORTANTE
    };

    // 🔥 REGISTER CORREGIDO
    const register = async (data: RegisterData) => {

        const response =
            await authService.register(data);

        setUser(response.user);

        return response; // 🔥 IMPORTANTE
    };

    const logout = async () => {

        await authService.logout();

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}

        >

            {children}

        </AuthContext.Provider>

    );

}
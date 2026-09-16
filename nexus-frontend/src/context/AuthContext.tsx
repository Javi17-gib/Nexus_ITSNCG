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

    updateProfile: (data: FormData) => Promise<User>;

    logout: () => Promise<void>;

}

export const AuthContext =
    createContext<AuthContextType>(
        {} as AuthContextType
    );

export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe usarse dentro de AuthProvider"
        );
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

    // LOGIN
    const login = async (
        data: LoginData
    ) => {

        const response =
            await authService.login(data);

        setUser(response.user);

        return response;
    };

    // REGISTER
    const register = async (
        data: RegisterData
    ) => {

        const response =
            await authService.register(data);

        setUser(response.user);

        return response;
    };

    // ACTUALIZAR PERFIL
    const updateProfile = async (
        data: FormData
    ): Promise<User> => {

        const response =
            await authService.updateProfile(data);

        setUser(response.user);

        return response.user;
    };

    // LOGOUT
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
                updateProfile,
                logout,
            }}

        >

            {children}

        </AuthContext.Provider>

    );

}
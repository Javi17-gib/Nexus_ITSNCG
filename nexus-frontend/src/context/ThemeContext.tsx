import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext =
    createContext<ThemeContextType | undefined>(
        undefined
    );

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({
    children,
}: ThemeProviderProps) {

    const [theme, setThemeState] =
        useState<Theme>(() => {

            const savedTheme =
                localStorage.getItem(
                    "nexus-theme"
                );

            if (
                savedTheme === "light" ||
                savedTheme === "dark"
            ) {
                return savedTheme;
            }

            return "dark";
        });


    useEffect(() => {

        localStorage.setItem(
            "nexus-theme",
            theme
        );

        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

    }, [theme]);


    const toggleTheme = () => {

        setThemeState(
            (actual) =>
                actual === "dark"
                    ? "light"
                    : "dark"
        );

    };


    const setTheme = (
        nuevoTema: Theme
    ) => {

        setThemeState(
            nuevoTema
        );

    };


    return (

        <ThemeContext.Provider
            value={{
                theme,
                toggleTheme,
                setTheme,
            }}
        >

            {children}

        </ThemeContext.Provider>

    );

}


export function useTheme() {

    const context =
        useContext(
            ThemeContext
        );

    if (!context) {

        throw new Error(
            "useTheme debe utilizarse dentro de ThemeProvider"
        );

    }

    return context;

}
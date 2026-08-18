import {
    Moon,
    Sun,
} from "lucide-react";

import {
    useTheme,
} from "../../context/ThemeContext";


export default function ThemeToggle() {

    const {
        theme,
        toggleTheme,
    } = useTheme();


    const modoOscuro =
        theme === "dark";


    return (

        <button
            type="button"
            onClick={toggleTheme}
            aria-label={
                modoOscuro
                    ? "Cambiar a modo claro"
                    : "Cambiar a modo oscuro"
            }
            title={
                modoOscuro
                    ? "Modo claro"
                    : "Modo oscuro"
            }
            className="
                relative
                w-[72px]
                h-10
                rounded-full
                border
                transition-all
                duration-300
                flex
                items-center
                p-1
                shrink-0
            "
            style={{
                backgroundColor:
                    modoOscuro
                        ? "#111118"
                        : "#e2e8f0",

                borderColor:
                    modoOscuro
                        ? "rgba(255,255,255,0.08)"
                        : "#cbd5e1",
            }}
        >

            {/* =====================================================
                ICONO SOL
            ===================================================== */}

            <div
                className="
                    absolute
                    left-2
                    flex
                    items-center
                    justify-center
                "
            >

                <Sun
                    size={16}
                    className={
                        modoOscuro
                            ? "text-slate-600"
                            : "text-amber-500"
                    }
                />

            </div>


            {/* =====================================================
                ICONO LUNA
            ===================================================== */}

            <div
                className="
                    absolute
                    right-2
                    flex
                    items-center
                    justify-center
                "
            >

                <Moon
                    size={16}
                    className={
                        modoOscuro
                            ? "text-violet-400"
                            : "text-slate-500"
                    }
                />

            </div>


            {/* =====================================================
                INDICADOR
            ===================================================== */}

            <span
                className="
                    relative
                    z-10
                    w-8
                    h-8
                    rounded-full
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    transition-transform
                    duration-300
                "
                style={{
                    backgroundColor:
                        modoOscuro
                            ? "#7c3aed"
                            : "#ffffff",

                    transform:
                        modoOscuro
                            ? "translateX(30px)"
                            : "translateX(0px)",
                }}
            >

                {modoOscuro ? (

                    <Moon
                        size={16}
                        className="text-white"
                    />

                ) : (

                    <Sun
                        size={16}
                        className="text-amber-500"
                    />

                )}

            </span>

        </button>

    );

}
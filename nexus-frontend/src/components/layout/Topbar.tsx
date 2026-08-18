import {
    Bell,
    Search,
    ChevronDown,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";


export default function Topbar() {

    const { user } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | NOMBRE COMPLETO
    |--------------------------------------------------------------------------
    */

    const nombreCompleto = [
        user?.nombre,
        user?.apellido_paterno,
    ]
        .filter(Boolean)
        .join(" ");


    /*
    |--------------------------------------------------------------------------
    | INICIALES DEL USUARIO
    |--------------------------------------------------------------------------
    */

    const inicial =
        user?.nombre
            ?.charAt(0)
            ?.toUpperCase() || "D";


    return (

        <header
            className="
                h-20
                shrink-0
                px-6
                lg:px-8
                flex
                items-center
                justify-between
                bg-[var(--nexus-bg)]
                border-b
                border-[var(--nexus-border)]
                transition-colors
                duration-300
            "
        >

            {/* =========================================================
                BUSCADOR
            ========================================================= */}

            <div className="relative">

                <Search
                    size={18}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[var(--nexus-text-muted)]
                        pointer-events-none
                    "
                />

                <input
                    type="text"
                    placeholder="Buscar en NEXUS..."
                    className="
                        w-[260px]
                        lg:w-[360px]
                        h-11
                        rounded-xl
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        pl-11
                        pr-4
                        text-sm
                        text-[var(--nexus-text)]
                        placeholder:text-[var(--nexus-text-muted)]
                        outline-none
                        transition-all
                        duration-200
                        focus:border-violet-500/40
                        focus:ring-2
                        focus:ring-violet-500/10
                    "
                />

            </div>


            {/* =========================================================
                PARTE DERECHA
            ========================================================= */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    lg:gap-5
                "
            >

                {/* =====================================================
                    CAMBIO DE TEMA
                ===================================================== */}

                <ThemeToggle />


                {/* =====================================================
                    NOTIFICACIONES
                ===================================================== */}

                <button
                    type="button"
                    aria-label="Notificaciones"
                    className="
                        relative
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-[var(--nexus-text-secondary)]
                        hover:text-[var(--nexus-text)]
                        hover:bg-black/5
                        dark:hover:bg-white/5
                        transition-all
                        duration-200
                    "
                >

                    <Bell size={20} />


                    {/* INDICADOR DE NOTIFICACIONES */}

                    <span
                        className="
                            absolute
                            top-2
                            right-2
                            w-2
                            h-2
                            rounded-full
                            bg-violet-500
                            shadow-[0_0_10px_rgba(139,92,246,0.8)]
                        "
                    />

                </button>


                {/* =====================================================
                    SEPARADOR
                ===================================================== */}

                <div
                    className="
                        h-8
                        w-px
                        bg-[var(--nexus-border)]
                    "
                />


                {/* =====================================================
                    USUARIO
                ===================================================== */}

                <button
                    type="button"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-2
                        py-1.5
                        hover:bg-black/5
                        dark:hover:bg-white/5
                        transition-all
                        duration-200
                    "
                >

                    {/* =================================================
                        AVATAR
                    ================================================= */}

                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-gradient-to-br
                            from-violet-600
                            to-blue-600
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                            shadow-[0_0_20px_rgba(124,58,237,0.2)]
                            shrink-0
                        "
                    >

                        {inicial}

                    </div>


                    {/* =================================================
                        INFORMACIÓN DEL USUARIO
                    ================================================= */}

                    <div
                        className="
                            text-left
                            hidden
                            sm:block
                            max-w-[180px]
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-[var(--nexus-text)]
                                truncate
                            "
                        >

                            {nombreCompleto || "Docente"}

                        </p>


                        <p
                            className="
                                text-xs
                                text-[var(--nexus-text-muted)]
                                mt-0.5
                            "
                        >

                            Docente

                        </p>

                    </div>


                    {/* =================================================
                        FLECHA
                    ================================================= */}

                    <ChevronDown
                        size={16}
                        className="
                            text-[var(--nexus-text-muted)]
                            shrink-0
                        "
                    />

                </button>

            </div>

        </header>

    );

}
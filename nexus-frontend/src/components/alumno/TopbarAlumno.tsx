import {
    Bell,
    Search,
    ChevronDown,
    Sun,
    Moon,
    User,
    Settings,
    LogOut,
} from "lucide-react";

import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useAuth,
} from "../../context/AuthContext";

import {
    useTheme,
} from "../../context/ThemeContext";


export default function TopbarAlumno() {

    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
    */

    const {
        user,
        logout,
    } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | TEMA
    |--------------------------------------------------------------------------
    */

    const {
        theme,
        toggleTheme,
    } = useTheme();


    /*
    |--------------------------------------------------------------------------
    | NAVEGACIÓN
    |--------------------------------------------------------------------------
    */

    const navigate =
        useNavigate();


    /*
    |--------------------------------------------------------------------------
    | ESTADO MENÚ USUARIO
    |--------------------------------------------------------------------------
    */

    const [
        menuAbierto,
        setMenuAbierto,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | ESTADO NOTIFICACIONES
    |--------------------------------------------------------------------------
    */

    const [
        notificaciones,
        setNotificaciones,
    ] = useState(false);


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
    | INICIAL DEL USUARIO
    |--------------------------------------------------------------------------
    */

    const inicial =

        user?.nombre
            ?.charAt(0)
            ?.toUpperCase() ||

        "A";


    /*
    |--------------------------------------------------------------------------
    | CERRAR SESIÓN
    |--------------------------------------------------------------------------
    */

    const cerrarSesion =
        async () => {

            try {

                /*
                |--------------------------------------------------------------------------
                | CERRAR SESIÓN
                |--------------------------------------------------------------------------
                */

                await logout();


                /*
                |--------------------------------------------------------------------------
                | CERRAR MENÚ
                |--------------------------------------------------------------------------
                */

                setMenuAbierto(false);


                /*
                |--------------------------------------------------------------------------
                | REGRESAR AL LOGIN
                |--------------------------------------------------------------------------
                */

                navigate(
                    "/",
                    {
                        replace: true,
                    }
                );


            } catch (error) {

                console.error(
                    "❌ Error al cerrar sesión:",
                    error
                );


                /*
                |--------------------------------------------------------------------------
                | CERRAR MENÚ
                |--------------------------------------------------------------------------
                */

                setMenuAbierto(false);


                /*
                |--------------------------------------------------------------------------
                | REGRESAR AL LOGIN
                |--------------------------------------------------------------------------
                */

                navigate(
                    "/",
                    {
                        replace: true,
                    }
                );

            }

        };


    return (

        <header
            className="
                relative
                z-[100]
                h-20
                shrink-0
                w-full
                flex
                items-center
                justify-between
                px-5
                sm:px-7
                lg:px-9
                bg-[#02030A]/75
                backdrop-blur-xl
                border-b
                border-white/[0.06]
            "
        >

            {/* =====================================================
                IZQUIERDA
            ===================================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-4
                    min-w-0
                "
            >

                {/* =================================================
                    LOGO
                ================================================= */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >

                    <div
                        className="
                            relative
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            bg-gradient-to-br
                            from-violet-600
                            via-purple-600
                            to-indigo-600
                            border
                            border-white/10
                            shadow-[0_0_25px_rgba(139,92,246,0.3)]
                            overflow-hidden
                        "
                    >

                        <div
                            className="
                                absolute
                                inset-0
                                bg-white/10
                                blur-md
                            "
                        />

                        <span
                            className="
                                relative
                                z-10
                                text-lg
                                font-black
                                text-white
                            "
                        >

                            N

                        </span>

                    </div>


                    <div
                        className="
                            hidden
                            sm:block
                        "
                    >

                        <p
                            className="
                                text-base
                                font-black
                                tracking-[0.18em]
                                text-white
                            "
                        >

                            NEXUS

                        </p>


                        <p
                            className="
                                text-[9px]
                                uppercase
                                tracking-[0.18em]
                                text-violet-300/60
                            "
                        >

                            Tu universo académico

                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                BUSCADOR
            ===================================================== */}

            <div
                className="
                    hidden
                    md:block
                    absolute
                    left-1/2
                    -translate-x-1/2
                    w-[280px]
                    lg:w-[360px]
                "
            >

                <div
                    className="
                        relative
                    "
                >

                    <Search
                        size={17}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-slate-500
                        "
                    />


                    <input
                        type="text"
                        placeholder="Explorar conocimiento..."
                        className="
                            w-full
                            h-11
                            rounded-xl
                            bg-white/[0.035]
                            border
                            border-white/[0.07]
                            pl-11
                            pr-4
                            text-sm
                            text-white
                            placeholder:text-slate-600
                            outline-none
                            transition-all
                            duration-200
                            focus:border-violet-500/40
                            focus:bg-white/[0.05]
                            focus:ring-2
                            focus:ring-violet-500/10
                        "
                    />

                </div>

            </div>


            {/* =====================================================
                DERECHA
            ===================================================== */}

            <div
                className="
                    flex
                    items-center
                    gap-1
                    sm:gap-3
                "
            >

                {/* =================================================
                    CAMBIO DE TEMA
                ================================================= */}

                <button
                    type="button"
                    onClick={
                        toggleTheme
                    }
                    title={
                        theme === "dark"
                            ? "Cambiar a modo claro"
                            : "Cambiar a modo oscuro"
                    }
                    className="
                        w-10
                        h-10
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-slate-400
                        hover:text-white
                        hover:bg-white/[0.06]
                        transition-all
                        duration-200
                    "
                >

                    {theme === "dark" ? (

                        <Sun
                            size={19}
                        />

                    ) : (

                        <Moon
                            size={19}
                        />

                    )}

                </button>


                {/* =================================================
                    NOTIFICACIONES
                ================================================= */}

                <div
                    className="
                        relative
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            setNotificaciones(
                                !notificaciones
                            )
                        }
                        className="
                            relative
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-slate-400
                            hover:text-white
                            hover:bg-white/[0.06]
                            transition-all
                            duration-200
                        "
                    >

                        <Bell
                            size={19}
                        />


                        <span
                            className="
                                absolute
                                top-2
                                right-2
                                w-2
                                h-2
                                rounded-full
                                bg-violet-500
                                shadow-[0_0_10px_rgba(139,92,246,0.9)]
                            "
                        />

                    </button>


                    {/* =================================================
                        PANEL NOTIFICACIONES
                    ================================================= */}

                    {notificaciones && (

                        <div
                            className="
                                absolute
                                right-0
                                top-14
                                w-80
                                rounded-2xl
                                bg-[#0B0C16]/95
                                border
                                border-white/[0.08]
                                shadow-[0_20px_70px_rgba(0,0,0,0.5)]
                                backdrop-blur-2xl
                                overflow-hidden
                            "
                        >

                            <div
                                className="
                                    px-5
                                    py-4
                                    border-b
                                    border-white/[0.06]
                                    flex
                                    items-center
                                    justify-between
                                "
                            >

                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-white
                                        "
                                    >

                                        Notificaciones

                                    </p>


                                    <p
                                        className="
                                            text-[11px]
                                            text-slate-500
                                            mt-0.5
                                        "
                                    >

                                        Mantente al día

                                    </p>

                                </div>


                                <span
                                    className="
                                        px-2
                                        py-1
                                        rounded-full
                                        bg-violet-500/10
                                        text-[10px]
                                        font-medium
                                        text-violet-300
                                    "
                                >

                                    Próximamente

                                </span>

                            </div>


                            <div
                                className="
                                    px-5
                                    py-8
                                    text-center
                                "
                            >

                                <div
                                    className="
                                        mx-auto
                                        w-11
                                        h-11
                                        rounded-full
                                        bg-violet-500/10
                                        border
                                        border-violet-500/10
                                        flex
                                        items-center
                                        justify-center
                                        text-violet-400
                                    "
                                >

                                    <Bell
                                        size={18}
                                    />

                                </div>


                                <p
                                    className="
                                        mt-3
                                        text-sm
                                        font-medium
                                        text-slate-300
                                    "
                                >

                                    Todo tranquilo

                                </p>


                                <p
                                    className="
                                        mt-1
                                        text-xs
                                        text-slate-600
                                    "
                                >

                                    Aquí aparecerán tus
                                    avisos académicos.

                                </p>

                            </div>

                        </div>

                    )}

                </div>


                {/* =================================================
                    SEPARADOR
                ================================================= */}

                <div
                    className="
                        hidden
                        sm:block
                        h-8
                        w-px
                        bg-white/[0.06]
                        mx-1
                    "
                />


                {/* =================================================
                    USUARIO
                ================================================= */}

                <div
                    className="
                        relative
                    "
                >

                    <button
                        type="button"
                        onClick={() =>
                            setMenuAbierto(
                                !menuAbierto
                            )
                        }
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            px-2
                            py-1.5
                            hover:bg-white/[0.05]
                            transition-all
                            duration-200
                        "
                    >

                        {/* =================================================
                            AVATAR
                        ================================================= */}

                        <div
                            className="
                                relative
                                w-10
                                h-10
                                rounded-full
                                flex
                                items-center
                                justify-center
                                bg-gradient-to-br
                                from-violet-600
                                to-indigo-600
                                border
                                border-white/10
                                shadow-[0_0_20px_rgba(124,58,237,0.25)]
                            "
                        >

                            <span
                                className="
                                    text-sm
                                    font-bold
                                    text-white
                                "
                            >

                                {inicial}

                            </span>

                        </div>


                        {/* =================================================
                            DATOS USUARIO
                        ================================================= */}

                        <div
                            className="
                                hidden
                                lg:block
                                text-left
                                max-w-[150px]
                            "
                        >

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                    text-white
                                    truncate
                                "
                            >

                                {nombreCompleto ||
                                    "Alumno"}

                            </p>


                            <p
                                className="
                                    text-[11px]
                                    text-slate-500
                                "
                            >

                                Alumno

                            </p>

                        </div>


                        <ChevronDown
                            size={15}
                            className="
                                hidden
                                sm:block
                                text-slate-500
                            "
                        />

                    </button>


                    {/* =================================================
                        MENÚ DEL USUARIO
                    ================================================= */}

                    {menuAbierto && (

                        <div
                            className="
                                absolute
                                right-0
                                top-14
                                w-64
                                rounded-2xl
                                bg-[#0B0C16]/95
                                border
                                border-white/[0.08]
                                shadow-[0_20px_70px_rgba(0,0,0,0.5)]
                                backdrop-blur-2xl
                                overflow-hidden
                            "
                        >

                            {/* =================================================
                                CABECERA
                            ================================================= */}

                            <div
                                className="
                                    px-4
                                    py-4
                                    border-b
                                    border-white/[0.06]
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-white
                                    "
                                >

                                    {nombreCompleto ||
                                        "Alumno"}

                                </p>


                                <p
                                    className="
                                        mt-0.5
                                        text-xs
                                        text-slate-500
                                    "
                                >

                                    {user?.correo ||
                                        "Cuenta NEXUS"}

                                </p>

                            </div>


                            {/* =================================================
                                OPCIONES
                            ================================================= */}

                            <div
                                className="
                                    p-2
                                "
                            >

                                {/* =================================================
                                    PERFIL
                                ================================================= */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMenuAbierto(
                                            false
                                        )
                                    }
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        text-slate-300
                                        hover:text-white
                                        hover:bg-white/[0.05]
                                        transition-all
                                    "
                                >

                                    <User
                                        size={17}
                                    />

                                    Mi perfil

                                </button>


                                {/* =================================================
                                    CONFIGURACIÓN
                                ================================================= */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        setMenuAbierto(
                                            false
                                        )
                                    }
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        text-slate-300
                                        hover:text-white
                                        hover:bg-white/[0.05]
                                        transition-all
                                    "
                                >

                                    <Settings
                                        size={17}
                                    />

                                    Configuración

                                </button>


                                <div
                                    className="
                                        my-1
                                        h-px
                                        bg-white/[0.06]
                                    "
                                />


                                {/* =================================================
                                    LOGOUT
                                ================================================= */}

                                <button
                                    type="button"
                                    onClick={
                                        cerrarSesion
                                    }
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2.5
                                        rounded-xl
                                        text-sm
                                        text-red-400
                                        hover:text-red-300
                                        hover:bg-red-500/[0.06]
                                        transition-all
                                    "
                                >

                                    <LogOut
                                        size={17}
                                    />

                                    Cerrar sesión

                                </button>

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </header>

    );

}
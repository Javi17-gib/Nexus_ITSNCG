import {
    Home,
    BookOpen,
    Users,
    Trophy,
    BarChart3,
    Settings,
    LogOut,
    ChevronLeft,
    GraduationCap,
} from "lucide-react";

import {
    NavLink,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


interface MenuItem {
    name: string;
    icon: React.ElementType;
    path: string;
}


export default function Sidebar() {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | DETECTAR SI ESTAMOS DENTRO DE UNA MATERIA
    |--------------------------------------------------------------------------
    */

    const materiaMatch =
        location.pathname.match(
            /^\/dashboard\/docente\/materias\/([^/]+)/
        );

    const dentroDeMateria =
        Boolean(materiaMatch);

    const materiaId =
        materiaMatch?.[1];


    /*
    |--------------------------------------------------------------------------
    | MENÚ GENERAL DEL DOCENTE
    |--------------------------------------------------------------------------
    */

    const menuGeneral: MenuItem[] = [

        {
            name: "Inicio",
            icon: Home,
            path: "/dashboard/docente",
        },

        {
            name: "Mis materias",
            icon: BookOpen,
            path: "/dashboard/docente/materias",
        },

        {
            name: "Grupos",
            icon: Users,
            path: "/dashboard/docente/grupos",
        },

        {
            name: "Retos",
            icon: Trophy,
            path: "/dashboard/docente/retos",
        },

        {
            name: "Reportes",
            icon: BarChart3,
            path: "/dashboard/docente/reportes",
        },

    ];


    /*
    |--------------------------------------------------------------------------
    | MENÚ DENTRO DE UNA MATERIA
    |--------------------------------------------------------------------------
    */

    const menuMateria: MenuItem[] =
        materiaId
            ? [

                {
                    name: "Resumen",
                    icon: Home,
                    path: `/dashboard/docente/materias/${materiaId}`,
                },

                {
                    name: "Unidades",
                    icon: BookOpen,
                    path: `/dashboard/docente/materias/${materiaId}/unidades`,
                },

                {
                    name: "Grupos",
                    icon: Users,
                    path: `/dashboard/docente/materias/${materiaId}/grupos`,
                },

                {
                    name: "Retos",
                    icon: Trophy,
                    path: `/dashboard/docente/materias/${materiaId}/retos`,
                },

                {
                    name: "Estadísticas",
                    icon: BarChart3,
                    path: `/dashboard/docente/materias/${materiaId}/estadisticas`,
                },

            ]
            : [];


    /*
    |--------------------------------------------------------------------------
    | CERRAR SESIÓN
    |--------------------------------------------------------------------------
    */

    const handleLogout = async () => {

        await logout();

        navigate("/");

    };


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <aside
            className="
                w-72
                min-h-screen
                flex
                flex-col
                bg-[var(--nexus-surface)]
                border-r
                border-[var(--nexus-border)]
                sticky
                top-0
                h-screen
                transition-colors
                duration-300
                shrink-0
            "
        >

            {/* =========================================================
                LOGO
            ========================================================= */}

            <div
                className="
                    h-20
                    px-6
                    flex
                    items-center
                    border-b
                    border-[var(--nexus-border)]
                "
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            relative
                            w-10
                            h-10
                            rounded-xl
                            bg-gradient-to-br
                            from-violet-600
                            via-purple-600
                            to-blue-600
                            flex
                            items-center
                            justify-center
                            shadow-[0_0_30px_rgba(124,58,237,0.35)]
                        "
                    >

                        <span
                            className="
                                text-white
                                text-xl
                                font-black
                            "
                        >
                            N
                        </span>

                    </div>


                    <div>

                        <h1
                            className="
                                text-xl
                                font-black
                                tracking-[4px]
                                text-[var(--nexus-text)]
                            "
                        >
                            NEXUS
                        </h1>

                        <p
                            className="
                                text-[10px]
                                text-[var(--nexus-text-muted)]
                                uppercase
                                tracking-[2px]
                            "
                        >
                            Docente
                        </p>

                    </div>

                </div>

            </div>


            {/* =========================================================
                CONTENIDO DEL SIDEBAR
            ========================================================= */}

            <div
                className="
                    flex-1
                    px-4
                    overflow-y-auto
                "
            >

                {/* =====================================================
                    DENTRO DE UNA MATERIA
                ===================================================== */}

                {dentroDeMateria ? (

                    <>

                        {/* VOLVER A MATERIAS */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/dashboard/docente/materias"
                                )
                            }
                            className="
                                w-full
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                mb-6
                                rounded-xl
                                text-[var(--nexus-text-secondary)]
                                hover:text-[var(--nexus-text)]
                                hover:bg-black/5
                                dark:hover:bg-white/5
                                transition-all
                                duration-200
                            "
                        >

                            <ChevronLeft size={18} />

                            <span className="text-sm">
                                Mis materias
                            </span>

                        </button>


                        {/* NOMBRE DE LA MATERIA */}

                        <div
                            className="
                                px-4
                                mb-4
                            "
                        >

                            <p
                                className="
                                    text-[10px]
                                    uppercase
                                    tracking-[2px]
                                    text-[var(--nexus-text-muted)]
                                    mb-2
                                "
                            >
                                Materia actual
                            </p>


                            <div className="flex items-center gap-3">

                                <div
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        bg-violet-500/10
                                        border
                                        border-violet-500/20
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <GraduationCap
                                        size={18}
                                        className="text-violet-400"
                                    />

                                </div>


                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-sm
                                            font-semibold
                                            text-[var(--nexus-text)]
                                            truncate
                                        "
                                    >
                                        Materia
                                    </p>

                                    <p
                                        className="
                                            text-xs
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        ID #{materiaId}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* MENÚ DE MATERIA */}

                        <nav className="space-y-1">

                            {menuMateria.map((item) => {

                                const Icon =
                                    item.icon;

                                return (

                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={
                                            item.name ===
                                            "Resumen"
                                        }
                                        className={({ isActive }) => `
                                            group
                                            relative
                                            flex
                                            items-center
                                            gap-3
                                            px-4
                                            py-3
                                            rounded-xl
                                            text-sm
                                            transition-all
                                            duration-200

                                            ${
                                                isActive
                                                    ? `
                                                        bg-violet-600/15
                                                        text-[var(--nexus-text)]
                                                        border
                                                        border-violet-500/20
                                                      `
                                                    : `
                                                        text-[var(--nexus-text-secondary)]
                                                        hover:text-[var(--nexus-text)]
                                                        hover:bg-black/5
                                                        dark:hover:bg-white/5
                                                      `
                                            }
                                        `}
                                    >

                                        <Icon size={19} />

                                        <span>
                                            {item.name}
                                        </span>

                                    </NavLink>

                                );

                            })}

                        </nav>

                    </>

                ) : (

                    /* =================================================
                       MENÚ GENERAL
                    ================================================= */

                    <>

                        <p
                            className="
                                px-4
                                mb-3
                                text-[10px]
                                uppercase
                                tracking-[2px]
                                text-[var(--nexus-text-muted)]
                                font-semibold
                            "
                        >
                            Principal
                        </p>


                        <nav className="space-y-1">

                            {menuGeneral.map((item) => {

                                const Icon =
                                    item.icon;

                                return (

                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        end={
                                            item.path ===
                                            "/dashboard/docente"
                                        }
                                        className={({ isActive }) => `
                                            group
                                            relative
                                            flex
                                            items-center
                                            gap-3
                                            px-4
                                            py-3
                                            rounded-xl
                                            text-sm
                                            transition-all
                                            duration-200

                                            ${
                                                isActive
                                                    ? `
                                                        bg-violet-600/15
                                                        text-[var(--nexus-text)]
                                                        border
                                                        border-violet-500/20
                                                      `
                                                    : `
                                                        text-[var(--nexus-text-secondary)]
                                                        hover:text-[var(--nexus-text)]
                                                        hover:bg-black/5
                                                        dark:hover:bg-white/5
                                                      `
                                            }
                                        `}
                                    >

                                        <Icon size={19} />

                                        <span>
                                            {item.name}
                                        </span>

                                    </NavLink>

                                );

                            })}

                        </nav>


                        {/* SEPARADOR */}

                        <div
                            className="
                                my-6
                                h-px
                                bg-[var(--nexus-border)]
                            "
                        />


                        {/* CUENTA */}

                        <p
                            className="
                                px-4
                                mb-3
                                text-[10px]
                                uppercase
                                tracking-[2px]
                                text-[var(--nexus-text-muted)]
                                font-semibold
                            "
                        >
                            Cuenta
                        </p>


                        <NavLink
                            to="/dashboard/docente/configuracion"
                            className={({ isActive }) => `
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                rounded-xl
                                text-sm
                                transition-all
                                duration-200

                                ${
                                    isActive
                                        ? `
                                            bg-violet-600/15
                                            text-[var(--nexus-text)]
                                            border
                                            border-violet-500/20
                                          `
                                        : `
                                            text-[var(--nexus-text-secondary)]
                                            hover:text-[var(--nexus-text)]
                                            hover:bg-black/5
                                            dark:hover:bg-white/5
                                          `
                                }
                            `}
                        >

                            <Settings size={19} />

                            <span>
                                Configuración
                            </span>

                        </NavLink>

                    </>

                )}

            </div>


            {/* =========================================================
                USUARIO / LOGOUT
            ========================================================= */}

            <div
                className="
                    p-4
                    border-t
                    border-[var(--nexus-border)]
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        p-3
                        rounded-xl
                        bg-black/[0.02]
                        dark:bg-white/[0.02]
                        border
                        border-[var(--nexus-border)]
                        mb-2
                        transition-colors
                        duration-300
                    "
                >

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
                            shrink-0
                        "
                    >

                        {user?.nombre
                            ?.charAt(0)
                            ?.toUpperCase() || "D"}

                    </div>


                    <div className="flex-1 min-w-0">

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-[var(--nexus-text)]
                                truncate
                            "
                        >
                            {user?.nombre || "Docente"}
                        </p>


                        <p
                            className="
                                text-xs
                                text-[var(--nexus-text-muted)]
                                truncate
                            "
                        >
                            {user?.correo ||
                                "Cuenta docente"}
                        </p>

                    </div>

                </div>


                {/* CERRAR SESIÓN */}

                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        text-sm
                        text-red-400
                        hover:text-red-300
                        hover:bg-red-500/10
                        transition-all
                        duration-200
                    "
                >

                    <LogOut size={19} />

                    <span>
                        Cerrar sesión
                    </span>

                </button>

            </div>

        </aside>

    );

}
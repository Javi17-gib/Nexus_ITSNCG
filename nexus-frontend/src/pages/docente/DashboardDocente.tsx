import {
    BookOpen,
    Users,
    FileText,
    Trophy,
    ArrowRight,
    Plus,
    Sparkles,
} from "lucide-react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useEffect,
    useState,
} from "react";

import {
    useAuth,
} from "../../context/AuthContext";

import {
    obtenerDashboardDocenteRequest,
    type DashboardDocenteData,
} from "../../api/dashboard";


export default function DashboardDocente() {

    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
    */

    const {
        user,
    } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | NAVEGACIÓN
    |--------------------------------------------------------------------------
    */

    const navigate =
        useNavigate();


    /*
    |--------------------------------------------------------------------------
    | NOMBRE DEL DOCENTE
    |--------------------------------------------------------------------------
    */

    const nombre =
        user?.nombre ||
        "Docente";


    /*
    |--------------------------------------------------------------------------
    | MATERIAS
    |--------------------------------------------------------------------------
    */

    const [
        cantidadMaterias,
        setCantidadMaterias,
    ] = useState(0);


    const [
        cargandoMaterias,
        setCargandoMaterias,
    ] = useState(true);


    /*
    |--------------------------------------------------------------------------
    | DATOS DEL DASHBOARD
    |--------------------------------------------------------------------------
    */

    const [
        dashboard,
        setDashboard,
    ] = useState<DashboardDocenteData | null>(null);


    const [
        cargandoDashboard,
        setCargandoDashboard,
    ] = useState(true);


    /*
    |--------------------------------------------------------------------------
    | CARGAR DASHBOARD DOCENTE
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const cargarDashboard =
            async () => {

                try {

                    setCargandoDashboard(true);


                    const data =
                        await obtenerDashboardDocenteRequest();


                    console.log(
                        "📊 Dashboard docente:",
                        data
                    );


                    setDashboard(data);


                    setCantidadMaterias(
                        data.materias
                    );


                } catch (error) {

                    console.error(
                        "❌ Error al cargar dashboard docente:",
                        error
                    );


                    setDashboard(null);

                    setCantidadMaterias(0);


                } finally {

                    setCargandoDashboard(false);
                    setCargandoMaterias(false);

                }

            };


        cargarDashboard();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | DEBUG
    |--------------------------------------------------------------------------
    */

    console.log(
        "Dashboard Docente cargado"
    );


    return (

        <div
            className="
                w-full
                min-h-full
                p-0
                text-[var(--nexus-text)]
                transition-colors
                duration-300
            "
        >

            {/* =====================================================
                ENCABEZADO
            ===================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    p-7
                    lg:p-9
                    mb-7
                    border
                    border-[var(--nexus-border)]
                    bg-[var(--nexus-surface)]
                    transition-colors
                    duration-300
                "
            >

                {/* =================================================
                    DECORACIÓN VIOLETA
                ================================================= */}

                <div
                    className="
                        absolute
                        -top-24
                        -right-24
                        w-72
                        h-72
                        rounded-full
                        bg-violet-600/10
                        blur-3xl
                        pointer-events-none
                    "
                />


                <div
                    className="
                        absolute
                        -bottom-28
                        right-1/4
                        w-64
                        h-64
                        rounded-full
                        bg-indigo-600/[0.07]
                        blur-3xl
                        pointer-events-none
                    "
                />


                {/* =================================================
                    CONTENIDO
                ================================================= */}

                <div
                    className="
                        relative
                        z-10
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-6
                    "
                >

                    <div>

                        {/* =================================================
                            ETIQUETA
                        ================================================= */}

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-violet-500/10
                                border
                                border-violet-500/15
                                text-violet-400
                                text-[11px]
                                font-medium
                                mb-4
                            "
                        >

                            <Sparkles
                                size={13}
                            />

                            Panel docente ITSNCG

                        </div>


                        {/* =================================================
                            SALUDO
                        ================================================= */}

                        <h1
                            className="
                                text-3xl
                                sm:text-4xl
                                font-black
                                tracking-tight
                                text-[var(--nexus-text)]
                            "
                        >

                            Hola,{" "}

                            <span
                                className="
                                    text-transparent
                                    bg-clip-text
                                    bg-gradient-to-r
                                    from-violet-500
                                    to-indigo-500
                                "
                            >

                                {nombre}

                            </span>

                            {" "}👋

                        </h1>


                        <p
                            className="
                                mt-3
                                max-w-2xl
                                text-sm
                                sm:text-base
                                leading-relaxed
                                text-[var(--nexus-text-secondary)]
                            "
                        >

                            Administra tus materias y prepara
                            el contenido que ayudará a tus
                            alumnos a reforzar su aprendizaje.

                        </p>

                    </div>


                    {/* =================================================
                        BOTÓN ADMINISTRAR MATERIAS
                    ================================================= */}

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard/docente/materias"
                            )
                        }
                        className="
                            shrink-0
                            inline-flex
                            items-center
                            justify-center
                            gap-2.5
                            px-5
                            py-3
                            rounded-xl
                            bg-violet-600
                            hover:bg-violet-500
                            text-sm
                            font-semibold
                            text-white
                            shadow-[0_10px_30px_rgba(139,92,246,0.22)]
                            hover:shadow-[0_12px_35px_rgba(139,92,246,0.32)]
                            transition-all
                            duration-200
                        "
                    >

                        <Plus
                            size={18}
                        />

                        Administrar materias

                    </button>

                </div>

            </section>


            {/* =====================================================
                RESUMEN
            ===================================================== */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-4
                "
            >

                <div>

                    <h2
                        className="
                            text-lg
                            font-bold
                            text-[var(--nexus-text)]
                        "
                    >

                        Resumen

                    </h2>


                    <p
                        className="
                            mt-1
                            text-xs
                            text-[var(--nexus-text-secondary)]
                        "
                    >

                        Vista general de tu espacio docente

                    </p>

                </div>

            </div>


            {/* =====================================================
                TARJETAS
            ===================================================== */}

            <section
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-4
                    mb-7
                "
            >

                {/* =================================================
                    MATERIAS
                ================================================= */}

                <div
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        p-5
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        hover:border-violet-500/25
                        transition-all
                        duration-200
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    text-[var(--nexus-text-secondary)]
                                "
                            >

                                Materias

                            </p>


                            <p
                                className="
                                    mt-2
                                    text-3xl
                                    font-black
                                    text-[var(--nexus-text)]
                                "
                            >

                                {cargandoMaterias
                                    ? "..."
                                    : cantidadMaterias}

                            </p>

                        </div>


                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-violet-500/10
                                text-violet-500
                            "
                        >

                            <BookOpen
                                size={21}
                            />

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard/docente/materias"
                            )
                        }
                        className="
                            mt-5
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            text-violet-500
                            hover:text-violet-400
                            transition-colors
                        "
                    >

                        Administrar

                        <ArrowRight
                            size={13}
                        />

                    </button>

                </div>


                {/* =================================================
                    GRUPOS
                ================================================= */}

                <div
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        p-5
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        hover:border-blue-500/25
                        transition-all
                        duration-200
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    text-[var(--nexus-text-secondary)]
                                "
                            >

                                Grupos

                            </p>


                            <p
                                className="
                                    mt-2
                                    text-3xl
                                    font-black
                                    text-[var(--nexus-text)]
                                "
                            >

                                {cargandoDashboard
                                    ? "..."
                                    : dashboard?.grupos ?? 0}

                            </p>

                        </div>


                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-blue-500/10
                                text-blue-500
                            "
                        >

                            <Users
                                size={21}
                            />

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard/docente/grupos"
                            )
                        }
                        className="
                            mt-5
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            text-blue-500
                            hover:text-blue-400
                            transition-colors
                        "
                    >

                        Administrar

                        <ArrowRight
                            size={13}
                        />

                    </button>

                </div>


                {/* =================================================
                    CONTENIDO
                ================================================= */}

                <div
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        p-5
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        hover:border-emerald-500/25
                        transition-all
                        duration-200
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    text-[var(--nexus-text-secondary)]
                                "
                            >

                                Contenido

                            </p>


                            <p
                                className="
                                    mt-2
                                    text-3xl
                                    font-black
                                    text-[var(--nexus-text)]
                                "
                            >

                                {cargandoDashboard
                                    ? "..."
                                    : dashboard?.contenidos ?? 0}

                            </p>

                        </div>


                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-emerald-500/10
                                text-emerald-500
                            "
                        >

                            <FileText
                                size={21}
                            />

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard/docente/contenido"
                            )
                        }
                        className="
                            mt-5
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            text-emerald-500
                            hover:text-emerald-400
                            transition-colors
                        "
                    >

                        Administrar

                        <ArrowRight
                            size={13}
                        />

                    </button>

                </div>


                {/* =================================================
                    RETOS
                ================================================= */}

                <div
                    className="
                        group
                        relative
                        overflow-hidden
                        rounded-2xl
                        p-5
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        hover:border-amber-500/25
                        transition-all
                        duration-200
                    "
                >

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                        "
                    >

                        <div>

                            <p
                                className="
                                    text-xs
                                    font-medium
                                    text-[var(--nexus-text-secondary)]
                                "
                            >

                                Retos

                            </p>


                            <p
                                className="
                                    mt-2
                                    text-3xl
                                    font-black
                                    text-[var(--nexus-text)]
                                "
                            >

                                {cargandoDashboard
                                    ? "..."
                                    : dashboard?.retos ?? 0}

                            </p>

                        </div>


                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-amber-500/10
                                text-amber-500
                            "
                        >

                            <Trophy
                                size={21}
                            />

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/dashboard/docente/retos"
                            )
                        }
                        className="
                            mt-5
                            flex
                            items-center
                            gap-1.5
                            text-xs
                            text-amber-500
                            hover:text-amber-400
                            transition-colors
                        "
                    >

                        Administrar

                        <ArrowRight
                            size={13}
                        />

                    </button>

                </div>

            </section>


            {/* =====================================================
                PARTE INFERIOR
            ===================================================== */}

            <section
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-3
                    gap-5
                    pb-8
                "
            >

                {/* =================================================
                    ACTIVIDAD DE ALUMNOS
                ================================================= */}

                <div
                    className="
                        xl:col-span-2
                        rounded-2xl
                        p-6
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        transition-colors
                        duration-300
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            mb-6
                        "
                    >

                        <div>

                            <h3
                                className="
                                    text-base
                                    font-bold
                                    text-[var(--nexus-text)]
                                "
                            >

                                Actividad de alumnos

                            </h3>


                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-[var(--nexus-text-secondary)]
                                "
                            >

                                Aquí aparecerán las estadísticas
                                cuando conectemos el módulo.

                            </p>

                        </div>


                        <div
                            className="
                                w-10
                                h-10
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                bg-violet-500/10
                                text-violet-500
                            "
                        >

                            <Users
                                size={18}
                            />

                        </div>

                    </div>


                    {/* =================================================
                        GRÁFICA DE ACTIVIDAD
                    ================================================= */}

                    <div
                        className="
                            h-64
                            rounded-xl
                            border
                            border-[var(--nexus-border)]
                            bg-[var(--nexus-surface-2)]
                            p-5
                            transition-colors
                            duration-300
                        "
                    >

                        {cargandoDashboard ? (

                            <div
                                className="
                                    h-full
                                    flex
                                    items-center
                                    justify-center
                                    text-sm
                                    text-[var(--nexus-text-muted)]
                                "
                            >

                                Cargando estadísticas...

                            </div>

                        ) : (

                            <div
                                className="
                                    h-full
                                    flex
                                    flex-col
                                "
                            >

                                {/* =================================================
                                    BARRAS
                                ================================================= */}

                                <div
                                    className="
                                        flex-1
                                        flex
                                        items-end
                                        gap-3
                                        sm:gap-5
                                        px-2
                                        pb-2
                                        border-b
                                        border-[var(--nexus-border)]
                                    "
                                >

                                    {(dashboard?.actividad ?? []).map(
                                        (item, index) => {

                                            const maxVisitas =
                                                Math.max(
                                                    ...(dashboard?.actividad ?? [])
                                                        .map(
                                                            (dia) => dia.visitas
                                                        ),
                                                    1
                                                );


                                            const altura =
                                                item.visitas > 0
                                                    ? Math.max(
                                                        (
                                                            item.visitas /
                                                            maxVisitas
                                                        ) * 100,
                                                        8
                                                    )
                                                    : 3;


                                            return (

                                                <div
                                                    key={`${item.fecha}-${index}`}
                                                    className="
                                                        flex-1
                                                        h-full
                                                        flex
                                                        flex-col
                                                        justify-end
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <span
                                                        className="
                                                            text-[10px]
                                                            font-semibold
                                                            text-[var(--nexus-text-secondary)]
                                                        "
                                                    >

                                                        {item.visitas}

                                                    </span>


                                                    <div
                                                        className="
                                                            w-full
                                                            max-w-10
                                                            rounded-t-lg
                                                            bg-gradient-to-t
                                                            from-violet-600
                                                            to-indigo-500
                                                            transition-all
                                                            duration-500
                                                            min-h-[3px]
                                                        "
                                                        style={{
                                                            height: `${altura}%`,
                                                        }}
                                                    />

                                                </div>

                                            );

                                        }
                                    )}

                                </div>


                                {/* =================================================
                                    DÍAS
                                ================================================= */}

                                <div
                                    className="
                                        flex
                                        gap-3
                                        sm:gap-5
                                        px-2
                                        pt-3
                                    "
                                >

                                    {(dashboard?.actividad ?? []).map(
                                        (item, index) => (

                                            <div
                                                key={`label-${item.fecha}-${index}`}
                                                className="
                                                    flex-1
                                                    text-center
                                                "
                                            >

                                                <span
                                                    className="
                                                        text-[10px]
                                                        font-medium
                                                        text-[var(--nexus-text-muted)]
                                                        capitalize
                                                    "
                                                >

                                                    {item.dia}

                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            </div>

                        )}

                    </div>
                </div>


                {/* =================================================
                    ACCIONES RÁPIDAS
                ================================================= */}

                <div
                    className="
                        rounded-2xl
                        p-6
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        transition-colors
                        duration-300
                    "
                >

                    <h3
                        className="
                            text-base
                            font-bold
                            text-[var(--nexus-text)]
                        "
                    >

                        Acciones rápidas

                    </h3>


                    <p
                        className="
                            mt-1
                            text-xs
                            text-[var(--nexus-text-secondary)]
                        "
                    >

                        Accede rápidamente a tus herramientas.

                    </p>


                    <div
                        className="
                            mt-5
                            space-y-2
                        "
                    >

                        {/* =================================================
                            MATERIAS
                        ================================================= */}

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
                                justify-between
                                gap-3
                                p-3
                                rounded-xl
                                bg-[var(--nexus-surface-2)]
                                border
                                border-[var(--nexus-border)]
                                hover:bg-violet-500/[0.06]
                                hover:border-violet-500/20
                                transition-all
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        bg-violet-500/10
                                        text-violet-500
                                    "
                                >

                                    <BookOpen
                                        size={17}
                                    />

                                </div>


                                <div
                                    className="
                                        text-left
                                    "
                                >

                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                            text-[var(--nexus-text)]
                                        "
                                    >

                                        Mis materias

                                    </p>


                                    <p
                                        className="
                                            text-[10px]
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >

                                        Administrar materias

                                    </p>

                                </div>

                            </div>


                            <ArrowRight
                                size={15}
                                className="
                                    text-[var(--nexus-text-muted)]
                                "
                            />

                        </button>


                        {/* =================================================
                            GRUPOS
                        ================================================= */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/dashboard/docente/grupos"
                                )
                            }
                            className="
                                w-full
                                flex
                                items-center
                                justify-between
                                gap-3
                                p-3
                                rounded-xl
                                bg-[var(--nexus-surface-2)]
                                border
                                border-[var(--nexus-border)]
                                hover:bg-blue-500/[0.06]
                                hover:border-blue-500/20
                                transition-all
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        bg-blue-500/10
                                        text-blue-500
                                    "
                                >

                                    <Users
                                        size={17}
                                    />

                                </div>


                                <div
                                    className="
                                        text-left
                                    "
                                >

                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                            text-[var(--nexus-text)]
                                        "
                                    >

                                        Mis grupos

                                    </p>


                                    <p
                                        className="
                                            text-[10px]
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >

                                        Próximamente

                                    </p>

                                </div>

                            </div>


                            <ArrowRight
                                size={15}
                                className="
                                    text-[var(--nexus-text-muted)]
                                "
                            />

                        </button>


                        {/* =================================================
                            CONTENIDO
                        ================================================= */}

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/dashboard/docente/contenido"
                                )
                            }
                            className="
                                w-full
                                flex
                                items-center
                                justify-between
                                gap-3
                                p-3
                                rounded-xl
                                bg-[var(--nexus-surface-2)]
                                border
                                border-[var(--nexus-border)]
                                hover:bg-emerald-500/[0.06]
                                hover:border-emerald-500/20
                                transition-all
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-center
                                        bg-emerald-500/10
                                        text-emerald-500
                                    "
                                >

                                    <FileText
                                        size={17}
                                    />

                                </div>


                                <div
                                    className="
                                        text-left
                                    "
                                >

                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                            text-[var(--nexus-text)]
                                        "
                                    >

                                        Crear contenido

                                    </p>


                                    <p
                                        className="
                                            text-[10px]
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >

                                        Próximamente

                                    </p>

                                </div>

                            </div>


                            <ArrowRight
                                size={15}
                                className="
                                    text-[var(--nexus-text-muted)]
                                "
                            />

                        </button>

                    </div>

                </div>

            </section>

        </div>

    );

}
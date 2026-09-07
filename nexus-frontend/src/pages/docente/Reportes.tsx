import {
    useEffect,
    useState,
} from "react";

import {
    BarChart3,
    Users,
    Eye,
    Activity,
    FileText,
    Download,
    RefreshCw,
    AlertCircle,
    UserCheck,
    TrendingUp,
    TrendingDown,
    Award,
    Clock3,
    UserRound,
    ChartNoAxesColumnIncreasing,
    Sparkles,
    CircleDot,
    CalendarDays,
    ArrowUpRight,
    CheckCircle2,
    UserX,
    Target,
    Zap,
} from "lucide-react";

import api from "../../api/axios";

import {
    obtenerActividadGrupoRequest,
    descargarReportePdfRequest,
    type ReporteGrupo,
} from "../../api/reportes";


/* =========================================================
   TIPOS
========================================================= */

interface Grupo {

    id: number;

    nombre: string;

    materia?: {

        id: number;

        nombre: string;

    };

}


/* =========================================================
   COMPONENTE
========================================================= */

export default function Reportes() {


    /* =====================================================
       ESTADOS
    ===================================================== */

    const [grupos, setGrupos] = useState<
        Grupo[]
    >([]);


    const [grupoSeleccionado, setGrupoSeleccionado] =
        useState<number | null>(
            null
        );


    const [reporte, setReporte] =
        useState<ReporteGrupo | null>(
            null
        );


    const [cargando, setCargando] =
        useState(false);


    const [descargando, setDescargando] =
        useState(false);


    const [error, setError] =
        useState<string | null>(
            null
        );


    /* =====================================================
       CARGAR GRUPOS DEL DOCENTE
    ===================================================== */

    const cargarGrupos = async () => {

        try {

            setError(null);


            const response = await api.get(
                "/grupos"
            );


            const datos = Array.isArray(
                response.data
            )
                ? response.data
                : response.data.data ?? [];


            setGrupos(
                Array.isArray(datos)
                    ? datos
                    : []
            );


        } catch (error) {

            console.error(
                "Error cargando grupos:",
                error
            );


            setError(
                "No se pudieron cargar los grupos."
            );

        }

    };


    /* =====================================================
       CARGAR REPORTE
    ===================================================== */

    const cargarReporte = async (
        grupoId: number
    ) => {

        try {

            setCargando(true);

            setError(null);


            const data =
                await obtenerActividadGrupoRequest(
                    grupoId
                );


            setReporte(
                data
            );


        } catch (error) {

            console.error(
                "Error cargando reporte:",
                error
            );


            setError(
                "No se pudo cargar la información del reporte."
            );


            setReporte(
                null
            );


        } finally {

            setCargando(
                false
            );

        }

    };


    /* =====================================================
       SELECCIONAR GRUPO
    ===================================================== */

    const seleccionarGrupo = (
        grupoId: number
    ) => {

        setGrupoSeleccionado(
            grupoId
        );


        cargarReporte(
            grupoId
        );

    };


    /* =====================================================
       DESCARGAR PDF
    ===================================================== */

    const descargarPdf = async () => {

    if (!grupoSeleccionado) {
        return;
    }


    const grupoActual = grupos.find(
        (grupo) =>
            grupo.id === grupoSeleccionado
    );


    if (!grupoActual) {

        setError(
            "No se encontró el grupo seleccionado."
        );

        return;

    }


    try {

        setDescargando(
            true
        );


        await descargarReportePdfRequest(
            grupoSeleccionado,
            grupoActual.nombre
        );


    } catch (error) {

        console.error(
            "Error descargando PDF:",
            error
        );


        setError(
            "No se pudo generar el PDF."
        );


    } finally {

        setDescargando(
            false
        );

    }

};


    /* =====================================================
       CARGAR GRUPOS
    ===================================================== */

    useEffect(() => {

        cargarGrupos();

    }, []);


    /* =====================================================
       FORMATEAR FECHA
    ===================================================== */

    const formatearFecha = (
        fecha: string | null
    ) => {

        if (!fecha) {

            return "Sin actividad";

        }


        try {

            return new Date(
                fecha
            ).toLocaleString(
                "es-MX",
                {
                    dateStyle: "medium",
                    timeStyle: "short",
                }
            );


        } catch {

            return fecha;

        }

    };


    /* =====================================================
       NOMBRE COMPLETO
    ===================================================== */

    const nombreCompleto = (
        alumno: ReporteGrupo["alumnos"][number]
    ) => {

        return [

            alumno.nombre,

            alumno.apellido_paterno,

            alumno.apellido_materno,

        ]
            .filter(
                Boolean
            )
            .join(
                " "
            );

    };


    /* =====================================================
       OBTENER INICIALES
    ===================================================== */

    const obtenerIniciales = (
        alumno: ReporteGrupo["alumnos"][number]
    ) => {

        const nombre =
            nombreCompleto(
                alumno
            );


        return nombre
            .split(
                " "
            )
            .filter(
                Boolean
            )
            .slice(
                0,
                2
            )
            .map(
                (palabra) =>
                    palabra
                        .charAt(0)
                        .toUpperCase()
            )
            .join(
                ""
            );

    };


    /* =====================================================
       ESTADÍSTICAS CALCULADAS
    ===================================================== */

    const totalAlumnos =
        reporte?.resumen
            ?.total_alumnos ?? 0;


    const alumnosActivos =
        reporte?.resumen
            ?.alumnos_activos ?? 0;


    const totalVisitas =
        reporte?.resumen
            ?.total_visitas ?? 0;


    const alumnosSinActividad =
        Math.max(
            totalAlumnos -
            alumnosActivos,
            0
        );


    const porcentajeActividad =
        totalAlumnos > 0
            ? Math.round(
                (
                    alumnosActivos /
                    totalAlumnos
                ) * 100
            )
            : 0;


    const promedioVisitas =
        totalAlumnos > 0
            ? (
                totalVisitas /
                totalAlumnos
            ).toFixed(
                1
            )
            : "0";


    const visitasMaximas =
        reporte?.alumnos?.length
            ? Math.max(
                ...reporte.alumnos.map(
                    (
                        alumno
                    ) =>
                        alumno.total_visitas ?? 0
                )
            )
            : 0;


    const alumnoMasActivo =
        reporte?.alumnos?.length
            ? [...reporte.alumnos]
                .sort(
                    (
                        a,
                        b
                    ) =>
                        (b.total_visitas ?? 0) -
                        (a.total_visitas ?? 0)
                )[0]
            : null;


    const grupoActual =
        grupos.find(
            (
                grupo
            ) =>
                grupo.id ===
                grupoSeleccionado
        );


    /* =====================================================
       ACTUALIZAR REPORTE
    ===================================================== */

    const actualizarReporte = async () => {

        await cargarGrupos();


        if (
            grupoSeleccionado
        ) {

            await cargarReporte(
                grupoSeleccionado
            );

        }

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

        <div
            className="
                w-full
                min-h-full

                p-4
                md:p-6
                lg:p-8

                space-y-7
            "
        >


            {/* =============================================
                HEADER PRINCIPAL
            ============================================== */}

            <div
                className="
                    relative

                    overflow-hidden

                    rounded-3xl

                    border
                    border-[var(--nexus-border)]

                    bg-[var(--nexus-card)]

                    p-6
                    md:p-8
                "
            >


                {/* DECORACIÓN */}

                <div
                    className="
                        absolute

                        -top-24
                        -right-24

                        w-64
                        h-64

                        rounded-full

                        bg-purple-500/10

                        blur-3xl

                        pointer-events-none
                    "
                />


                <div
                    className="
                        absolute

                        bottom-0
                        left-1/3

                        w-40
                        h-40

                        rounded-full

                        bg-blue-500/5

                        blur-3xl

                        pointer-events-none
                    "
                />


                <div
                    className="
                        relative
                        z-10

                        flex
                        flex-col
                        xl:flex-row

                        xl:items-center
                        xl:justify-between

                        gap-6
                    "
                >


                    {/* TITULO */}

                    <div
                        className="
                            flex
                            items-center

                            gap-4
                        "
                    >


                        <div
                            className="
                                w-14
                                h-14

                                rounded-2xl

                                flex
                                items-center
                                justify-center

                                bg-gradient-to-br
                                from-purple-500
                                to-violet-700

                                text-white

                                shadow-lg
                                shadow-purple-500/20
                            "
                        >

                            <ChartNoAxesColumnIncreasing
                                size={28}
                            />

                        </div>


                        <div>


                            <div
                                className="
                                    flex
                                    items-center
                                    gap-2

                                    mb-1
                                "
                            >

                                <span
                                    className="
                                        inline-flex

                                        items-center
                                        gap-1.5

                                        px-2.5
                                        py-1

                                        rounded-full

                                        text-[10px]
                                        font-bold

                                        uppercase

                                        tracking-wider

                                        bg-purple-500/10

                                        text-purple-500
                                    "
                                >

                                    <Sparkles
                                        size={11}
                                    />

                                    Analítica académica

                                </span>

                            </div>


                            <h1
                                className="
                                    text-2xl
                                    md:text-3xl

                                    font-bold

                                    tracking-tight

                                    text-[var(--nexus-text)]
                                "
                            >

                                Centro de Reportes

                            </h1>


                            <p
                                className="
                                    text-sm

                                    text-[var(--nexus-muted)]

                                    mt-1
                                "
                            >

                                Monitorea la actividad,
                                participación y progreso
                                de tus alumnos.

                            </p>


                        </div>


                    </div>


                    {/* BOTONES */}

                    <div
                        className="
                            flex
                            flex-wrap

                            gap-3
                        "
                    >


                        <button
                            onClick={
                                actualizarReporte
                            }
                            disabled={
                                cargando
                            }
                            className="
                                flex
                                items-center
                                justify-center

                                gap-2

                                px-5
                                py-3

                                rounded-xl

                                border
                                border-[var(--nexus-border)]

                                bg-[var(--nexus-card)]

                                text-[var(--nexus-text)]

                                text-sm
                                font-semibold

                                hover:bg-black/5

                                dark:hover:bg-white/5

                                hover:-translate-y-0.5

                                disabled:opacity-50

                                transition-all

                                duration-200
                            "
                        >

                            <RefreshCw
                                size={18}
                                className={
                                    cargando
                                        ? "animate-spin"
                                        : ""
                                }
                            />

                            Actualizar


                        </button>


                        <button
                            onClick={
                                descargarPdf
                            }
                            disabled={
                                !grupoSeleccionado ||
                                descargando
                            }
                            className="
                                flex
                                items-center
                                justify-center

                                gap-2

                                px-5
                                py-3

                                rounded-xl

                                bg-gradient-to-r
                                from-purple-600
                                via-violet-600
                                to-purple-700

                                text-white

                                text-sm
                                font-semibold

                                shadow-lg
                                shadow-purple-500/25

                                hover:shadow-purple-500/40

                                hover:-translate-y-0.5

                                disabled:opacity-50

                                disabled:cursor-not-allowed

                                transition-all

                                duration-200
                            "
                        >

                            {

                                descargando

                                    ? (

                                        <RefreshCw
                                            size={18}
                                            className="
                                                animate-spin
                                            "
                                        />

                                    )

                                    : (

                                        <Download
                                            size={18}
                                        />

                                    )

                            }


                            {

                                descargando

                                    ? "Generando..."

                                    : "Generar PDF"

                            }


                        </button>


                    </div>


                </div>


            </div>


            {/* =============================================
                ERROR
            ============================================== */}

            {

                error && (

                    <div
                        className="
                            flex
                            items-center

                            gap-4

                            p-5

                            rounded-2xl

                            bg-red-500/10

                            border
                            border-red-500/20
                        "
                    >


                        <div
                            className="
                                w-11
                                h-11

                                rounded-xl

                                flex
                                items-center
                                justify-center

                                bg-red-500/10

                                text-red-500
                            "
                        >

                            <AlertCircle
                                size={22}
                            />

                        </div>


                        <div>


                            <h3
                                className="
                                    font-semibold

                                    text-red-500
                                "
                            >

                                Ocurrió un problema

                            </h3>


                            <p
                                className="
                                    text-sm

                                    text-[var(--nexus-muted)]

                                    mt-1
                                "
                            >

                                {error}

                            </p>


                        </div>


                    </div>

                )

            }


            {/* =============================================
                SELECTOR DE GRUPO
            ============================================== */}

            <div
                className="
                    rounded-3xl

                    border
                    border-[var(--nexus-border)]

                    bg-[var(--nexus-card)]

                    p-5
                    md:p-6
                "
            >


                <div
                    className="
                        flex
                        flex-col

                        lg:flex-row

                        lg:items-center
                        lg:justify-between

                        gap-5
                    "
                >


                    {/* TEXTO */}

                    <div
                        className="
                            flex
                            items-center

                            gap-4
                        "
                    >


                        <div
                            className="
                                hidden
                                sm:flex

                                w-12
                                h-12

                                rounded-2xl

                                items-center
                                justify-center

                                bg-purple-500/10

                                text-purple-500
                            "
                        >

                            <Users
                                size={23}
                            />

                        </div>


                        <div>


                            <h2
                                className="
                                    text-lg

                                    font-bold

                                    text-[var(--nexus-text)]
                                "
                            >

                                Selecciona un grupo

                            </h2>


                            <p
                                className="
                                    text-sm

                                    text-[var(--nexus-muted)]

                                    mt-1
                                "
                            >

                                Consulta estadísticas,
                                visitas y participación
                                de tus alumnos.

                            </p>


                        </div>


                    </div>


                    {/* SELECT */}

                    <div
                        className="
                            w-full
                            lg:w-[390px]
                        "
                    >


                        <select
                            value={
                                grupoSeleccionado ?? ""
                            }
                            onChange={
                                (event) => {

                                    const value =
                                        event.target.value;


                                    if (
                                        !value
                                    ) {

                                        setGrupoSeleccionado(
                                            null
                                        );


                                        setReporte(
                                            null
                                        );


                                        return;

                                    }


                                    seleccionarGrupo(
                                        Number(
                                            value
                                        )
                                    );

                                }
                            }
                            className="
                                w-full

                                px-5
                                py-3.5

                                rounded-2xl

                                border
                                border-[var(--nexus-border)]

                                bg-[var(--nexus-card)]

                                text-[var(--nexus-text)]

                                font-medium

                                outline-none

                                focus:ring-2
                                focus:ring-purple-500/30

                                focus:border-purple-500/50

                                transition
                            "
                        >

                            <option
                                value=""
                                className="
                                    bg-white
                                    text-slate-900

                                    dark:bg-[#0d0f17]
                                    dark:text-white
                                "
                            >

                                Selecciona un grupo

                            </option>


                            {

                                grupos.map(
                                    (
                                        grupo
                                    ) => (

                                        <option
                                            key={
                                                grupo.id
                                            }
                                            value={
                                                grupo.id
                                            }
                                            className="
                                                bg-white
                                                text-slate-900

                                                dark:bg-[#0d0f17]
                                                dark:text-white
                                            "
                                        >

                                            {
                                                grupo.nombre
                                            }

                                            {

                                                grupo.materia?.nombre

                                                    ? ` — ${grupo.materia.nombre}`

                                                    : ""

                                            }

                                        </option>

                                    )
                                )

                            }

                        </select>


                    </div>


                </div>


                {

                    grupoActual && (

                        <div
                            className="
                                mt-5

                                pt-5

                                border-t
                                border-[var(--nexus-border)]

                                flex
                                flex-wrap

                                items-center

                                gap-3
                            "
                        >


                            <span
                                className="
                                    text-xs

                                    text-[var(--nexus-muted)]
                                "
                            >

                                Reporte seleccionado:

                            </span>


                            <span
                                className="
                                    inline-flex

                                    items-center

                                    gap-2

                                    px-3
                                    py-1.5

                                    rounded-full

                                    bg-purple-500/10

                                    text-purple-500

                                    text-xs

                                    font-semibold
                                "
                            >

                                <CircleDot
                                    size={13}
                                />

                                {grupoActual.nombre}


                            </span>


                            {

                                grupoActual.materia?.nombre && (

                                    <span
                                        className="
                                            inline-flex

                                            items-center

                                            gap-2

                                            px-3
                                            py-1.5

                                            rounded-full

                                            bg-blue-500/10

                                            text-blue-500

                                            text-xs

                                            font-semibold
                                        "
                                    >

                                        <FileText
                                            size={13}
                                        />

                                        {
                                            grupoActual
                                                .materia
                                                .nombre
                                        }

                                    </span>

                                )

                            }


                        </div>

                    )

                }


                {

                    grupos.length === 0 && (

                        <div
                            className="
                                mt-5

                                p-4

                                rounded-xl

                                bg-black/[0.03]

                                dark:bg-white/[0.03]

                                text-sm

                                text-[var(--nexus-muted)]
                            "
                        >

                            No tienes grupos disponibles.

                        </div>

                    )

                }


            </div>


            {/* =============================================
                LOADING
            ============================================== */}

            {

                cargando && (

                    <div
                        className="
                            min-h-[420px]

                            flex
                            flex-col

                            items-center
                            justify-center

                            gap-5

                            rounded-3xl

                            border
                            border-[var(--nexus-border)]

                            bg-[var(--nexus-card)]
                        "
                    >


                        <div
                            className="
                                w-16
                                h-16

                                rounded-2xl

                                flex
                                items-center
                                justify-center

                                bg-purple-500/10

                                text-purple-500
                            "
                        >

                            <RefreshCw
                                size={30}
                                className="
                                    animate-spin
                                "
                            />

                        </div>


                        <div
                            className="
                                text-center
                            "
                        >

                            <h3
                                className="
                                    font-semibold

                                    text-[var(--nexus-text)]
                                "
                            >

                                Preparando estadísticas

                            </h3>


                            <p
                                className="
                                    text-sm

                                    text-[var(--nexus-muted)]

                                    mt-1
                                "
                            >

                                Estamos analizando la
                                actividad del grupo.

                            </p>


                        </div>


                    </div>

                )

            }


            {/* =============================================
                SIN SELECCIONAR
            ============================================== */}

            {

                !cargando &&
                !grupoSeleccionado && (

                    <div
                        className="
                            min-h-[420px]

                            flex
                            flex-col

                            items-center
                            justify-center

                            text-center

                            rounded-3xl

                            border
                            border-dashed

                            border-[var(--nexus-border)]

                            bg-[var(--nexus-card)]

                            p-8
                        "
                    >


                        <div
                            className="
                                w-20
                                h-20

                                rounded-3xl

                                flex
                                items-center
                                justify-center

                                bg-purple-500/10

                                text-purple-500

                                mb-6
                            "
                        >

                            <BarChart3
                                size={36}
                            />

                        </div>


                        <h3
                            className="
                                text-xl

                                font-bold

                                text-[var(--nexus-text)]
                            "
                        >

                            Tu panel de analítica está listo

                        </h3>


                        <p
                            className="
                                max-w-md

                                text-sm

                                text-[var(--nexus-muted)]

                                mt-3
                            "
                        >

                            Selecciona uno de tus grupos
                            para visualizar las visitas,
                            actividad y participación de
                            cada alumno.

                        </p>


                    </div>

                )

            }


            {/* =============================================
                REPORTE
            ============================================== */}

            {

                !cargando &&
                reporte && (

                    <>


                        {/* =========================================
                            CARDS PRINCIPALES
                        ========================================== */}

                        <div
                            className="
                                grid

                                grid-cols-1
                                sm:grid-cols-2
                                xl:grid-cols-4

                                gap-5
                            "
                        >


                            {/* TOTAL */}

                            <div
                                className="
                                    relative

                                    overflow-hidden

                                    p-5

                                    rounded-3xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    hover:-translate-y-1

                                    hover:shadow-lg

                                    transition-all

                                    duration-300
                                "
                            >


                                <div
                                    className="
                                        absolute

                                        top-0
                                        right-0

                                        w-24
                                        h-24

                                        bg-blue-500/5

                                        rounded-full

                                        blur-2xl
                                    "
                                />


                                <div
                                    className="
                                        relative
                                        z-10

                                        flex

                                        items-start
                                        justify-between
                                    "
                                >


                                    <div>


                                        <p
                                            className="
                                                text-sm

                                                font-medium

                                                text-[var(--nexus-muted)]
                                            "
                                        >

                                            Total alumnos

                                        </p>


                                        <h3
                                            className="
                                                text-4xl

                                                font-bold

                                                tracking-tight

                                                text-[var(--nexus-text)]

                                                mt-3
                                            "
                                        >

                                            {totalAlumnos}

                                        </h3>


                                        <p
                                            className="
                                                text-xs

                                                text-[var(--nexus-muted)]

                                                mt-2
                                            "
                                        >

                                            Registrados en el grupo

                                        </p>


                                    </div>


                                    <div
                                        className="
                                            w-14
                                            h-14

                                            rounded-2xl

                                            flex
                                            items-center
                                            justify-center

                                            bg-blue-500/10

                                            text-blue-500
                                        "
                                    >

                                        <Users
                                            size={25}
                                        />

                                    </div>


                                </div>


                            </div>


                            {/* ACTIVOS */}

                            <div
                                className="
                                    relative

                                    overflow-hidden

                                    p-5

                                    rounded-3xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    hover:-translate-y-1

                                    hover:shadow-lg

                                    transition-all

                                    duration-300
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
                                                text-sm

                                                font-medium

                                                text-[var(--nexus-muted)]
                                            "
                                        >

                                            Alumnos activos

                                        </p>


                                        <h3
                                            className="
                                                text-4xl

                                                font-bold

                                                tracking-tight

                                                text-[var(--nexus-text)]

                                                mt-3
                                            "
                                        >

                                            {alumnosActivos}

                                        </h3>


                                        <div
                                            className="
                                                flex

                                                items-center

                                                gap-1.5

                                                text-xs

                                                text-emerald-500

                                                mt-2
                                            "
                                        >

                                            <TrendingUp
                                                size={14}
                                            />

                                            {porcentajeActividad}% participación

                                        </div>


                                    </div>


                                    <div
                                        className="
                                            w-14
                                            h-14

                                            rounded-2xl

                                            flex
                                            items-center
                                            justify-center

                                            bg-emerald-500/10

                                            text-emerald-500
                                        "
                                    >

                                        <UserCheck
                                            size={25}
                                        />

                                    </div>


                                </div>


                            </div>


                            {/* VISITAS */}

                            <div
                                className="
                                    relative

                                    overflow-hidden

                                    p-5

                                    rounded-3xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    hover:-translate-y-1

                                    hover:shadow-lg

                                    transition-all

                                    duration-300
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
                                                text-sm

                                                font-medium

                                                text-[var(--nexus-muted)]
                                            "
                                        >

                                            Total visitas

                                        </p>


                                        <h3
                                            className="
                                                text-4xl

                                                font-bold

                                                tracking-tight

                                                text-[var(--nexus-text)]

                                                mt-3
                                            "
                                        >

                                            {totalVisitas}

                                        </h3>


                                        <p
                                            className="
                                                text-xs

                                                text-[var(--nexus-muted)]

                                                mt-2
                                            "
                                        >

                                            Promedio: {promedioVisitas}

                                        </p>


                                    </div>


                                    <div
                                        className="
                                            w-14
                                            h-14

                                            rounded-2xl

                                            flex
                                            items-center
                                            justify-center

                                            bg-purple-500/10

                                            text-purple-500
                                        "
                                    >

                                        <Eye
                                            size={25}
                                        />

                                    </div>


                                </div>


                            </div>


                            {/* SIN ACTIVIDAD */}

                            <div
                                className="
                                    relative

                                    overflow-hidden

                                    p-5

                                    rounded-3xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    hover:-translate-y-1

                                    hover:shadow-lg

                                    transition-all

                                    duration-300
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
                                                text-sm

                                                font-medium

                                                text-[var(--nexus-muted)]
                                            "
                                        >

                                            Sin actividad

                                        </p>


                                        <h3
                                            className="
                                                text-4xl

                                                font-bold

                                                tracking-tight

                                                text-[var(--nexus-text)]

                                                mt-3
                                            "
                                        >

                                            {alumnosSinActividad}

                                        </h3>


                                        <p
                                            className="
                                                text-xs

                                                text-[var(--nexus-muted)]

                                                mt-2
                                            "
                                        >

                                            Sin visitas registradas

                                        </p>


                                    </div>


                                    <div
                                        className="
                                            w-14
                                            h-14

                                            rounded-2xl

                                            flex
                                            items-center
                                            justify-center

                                            bg-orange-500/10

                                            text-orange-500
                                        "
                                    >

                                        <UserX
                                            size={25}
                                        />

                                    </div>


                                </div>


                            </div>


                        </div>


                        {/* =========================================
                            ANALÍTICA GENERAL
                        ========================================== */}

                        <div
                            className="
                                grid

                                grid-cols-1
                                xl:grid-cols-3

                                gap-6
                            "
                        >


                            {/* PARTICIPACION */}

                            <div
                                className="
                                    xl:col-span-1

                                    rounded-3xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    p-6
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


                                        <p
                                            className="
                                                text-xs

                                                font-bold

                                                uppercase

                                                tracking-wider

                                                text-purple-500
                                            "
                                        >

                                            Participación

                                        </p>


                                        <h2
                                            className="
                                                text-lg

                                                font-bold

                                                text-[var(--nexus-text)]

                                                mt-1
                                            "
                                        >

                                            Actividad del grupo

                                        </h2>


                                    </div>


                                    <Target
                                        size={22}
                                        className="
                                            text-purple-500
                                        "
                                    />


                                </div>


                                <div
                                    className="
                                        flex

                                        flex-col

                                        items-center
                                    "
                                >


                                    <div
                                        className="
                                            relative

                                            w-44
                                            h-44

                                            rounded-full

                                            flex

                                            items-center
                                            justify-center
                                        "
                                        style={{
                                            background:
                                                `conic-gradient(
                                                    #8b5cf6 0% ${porcentajeActividad}%,
                                                    rgba(139,92,246,0.12) ${porcentajeActividad}% 100%
                                                )`
                                        }}
                                    >


                                        <div
                                            className="
                                                w-32
                                                h-32

                                                rounded-full

                                                bg-[var(--nexus-card)]

                                                flex

                                                flex-col

                                                items-center
                                                justify-center
                                            "
                                        >


                                            <span
                                                className="
                                                    text-3xl

                                                    font-bold

                                                    text-[var(--nexus-text)]
                                                "
                                            >

                                                {porcentajeActividad}%

                                            </span>


                                            <span
                                                className="
                                                    text-xs

                                                    text-[var(--nexus-muted)]

                                                    mt-1
                                                "
                                            >

                                                participación

                                            </span>


                                        </div>


                                    </div>


                                    <div
                                        className="
                                            grid

                                            grid-cols-2

                                            gap-3

                                            w-full

                                            mt-6
                                        "
                                    >


                                        <div
                                            className="
                                                p-4

                                                rounded-2xl

                                                bg-emerald-500/5

                                                border
                                                border-emerald-500/10
                                            "
                                        >

                                            <p
                                                className="
                                                    text-xs

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Activos

                                            </p>


                                            <p
                                                className="
                                                    text-xl

                                                    font-bold

                                                    text-emerald-500

                                                    mt-1
                                                "
                                            >

                                                {alumnosActivos}

                                            </p>


                                        </div>


                                        <div
                                            className="
                                                p-4

                                                rounded-2xl

                                                bg-orange-500/5

                                                border
                                                border-orange-500/10
                                            "
                                        >

                                            <p
                                                className="
                                                    text-xs

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Inactivos

                                            </p>


                                            <p
                                                className="
                                                    text-xl

                                                    font-bold

                                                    text-orange-500

                                                    mt-1
                                                "
                                            >

                                                {alumnosSinActividad}

                                            </p>


                                        </div>


                                    </div>


                                </div>


                            </div>


                            {/* RANKING */}

                            <div
                                className="
                                    xl:col-span-2

                                    rounded-3xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    p-6
                                "
                            >


                                <div
                                    className="
                                        flex

                                        flex-col
                                        sm:flex-row

                                        sm:items-center
                                        sm:justify-between

                                        gap-4

                                        mb-7
                                    "
                                >


                                    <div>


                                        <p
                                            className="
                                                text-xs

                                                font-bold

                                                uppercase

                                                tracking-wider

                                                text-purple-500
                                            "
                                        >

                                            Rendimiento

                                        </p>


                                        <h2
                                            className="
                                                text-lg

                                                font-bold

                                                text-[var(--nexus-text)]

                                                mt-1
                                            "
                                        >

                                            Actividad de alumnos

                                        </h2>


                                    </div>


                                    <div
                                        className="
                                            flex

                                            items-center

                                            gap-2

                                            text-xs

                                            text-[var(--nexus-muted)]
                                        "
                                    >

                                        <Activity
                                            size={15}
                                            className="
                                                text-purple-500
                                            "
                                        />

                                        Basado en visitas registradas

                                    </div>


                                </div>


                                {

                                    alumnoMasActivo

                                        ? (

                                            <div
                                                className="
                                                    flex

                                                    flex-col
                                                    md:flex-row

                                                    md:items-center
                                                    md:justify-between

                                                    gap-5

                                                    mb-7

                                                    p-5

                                                    rounded-2xl

                                                    bg-gradient-to-r

                                                    from-purple-500/10

                                                    via-violet-500/5

                                                    to-transparent

                                                    border

                                                    border-purple-500/10
                                                "
                                            >


                                                <div
                                                    className="
                                                        flex

                                                        items-center

                                                        gap-4
                                                    "
                                                >


                                                    <div
                                                        className="
                                                            w-14
                                                            h-14

                                                            rounded-2xl

                                                            flex

                                                            items-center
                                                            justify-center

                                                            bg-purple-500

                                                            text-white

                                                            font-bold

                                                            shadow-lg

                                                            shadow-purple-500/20
                                                        "
                                                    >

                                                        {
                                                            obtenerIniciales(
                                                                alumnoMasActivo
                                                            )
                                                        }

                                                    </div>


                                                    <div>


                                                        <div
                                                            className="
                                                                flex

                                                                items-center

                                                                gap-2
                                                            "
                                                        >

                                                            <Award
                                                                size={16}
                                                                className="
                                                                    text-yellow-500
                                                                "
                                                            />

                                                            <span
                                                                className="
                                                                    text-xs

                                                                    font-semibold

                                                                    text-purple-500
                                                                "
                                                            >

                                                                Alumno destacado

                                                            </span>

                                                        </div>


                                                        <h3
                                                            className="
                                                                font-bold

                                                                text-[var(--nexus-text)]

                                                                mt-1
                                                            "
                                                        >

                                                            {
                                                                nombreCompleto(
                                                                    alumnoMasActivo
                                                                )
                                                            }

                                                        </h3>


                                                        <p
                                                            className="
                                                                text-xs

                                                                text-[var(--nexus-muted)]

                                                                mt-1
                                                            "
                                                        >

                                                            Mayor actividad
                                                            del grupo

                                                        </p>


                                                    </div>


                                                </div>


                                                <div
                                                    className="
                                                        text-left
                                                        md:text-right
                                                    "
                                                >


                                                    <p
                                                        className="
                                                            text-xs

                                                            text-[var(--nexus-muted)]
                                                        "
                                                    >

                                                        Visitas realizadas

                                                    </p>


                                                    <p
                                                        className="
                                                            text-3xl

                                                            font-bold

                                                            text-purple-500

                                                            mt-1
                                                        "
                                                    >

                                                        {
                                                            alumnoMasActivo
                                                                .total_visitas ?? 0
                                                        }

                                                    </p>


                                                </div>


                                            </div>

                                        )

                                        : (

                                            <div
                                                className="
                                                    py-10

                                                    text-center

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Aún no hay actividad
                                                registrada.

                                            </div>

                                        )

                                }


                                <div
                                    className="
                                        space-y-5

                                        max-h-[300px]

                                        overflow-y-auto

                                        pr-2

                                        scrollbar-thin
                                        scrollbar-thumb-purple-500/50
                                        scrollbar-track-transparent
                                    "
                                >


                                    {

                                        [...(reporte.alumnos ?? [])]
                                            .sort(
                                                (
                                                    a,
                                                    b
                                                ) =>
                                                    (b.total_visitas ?? 0) -
                                                    (a.total_visitas ?? 0)
                                            )
                                            .map(
                                                (
                                                    alumno,
                                                    index
                                                ) => {

                                                    const visitas =
                                                        alumno.total_visitas ?? 0;


                                                    const porcentaje =
                                                        visitasMaximas > 0
                                                            ? Math.round(
                                                                (
                                                                    visitas /
                                                                    visitasMaximas
                                                                ) * 100
                                                            )
                                                            : 0;


                                                    return (

                                                        <div
                                                            key={
                                                                alumno.id
                                                            }
                                                        >


                                                            <div
                                                                className="
                                                                    flex

                                                                    items-center

                                                                    gap-3

                                                                    mb-2
                                                                "
                                                            >


                                                                <span
                                                                    className="
                                                                        w-7

                                                                        text-xs

                                                                        font-bold

                                                                        text-[var(--nexus-muted)]
                                                                    "
                                                                >

                                                                    #
                                                                    {
                                                                        index + 1
                                                                    }

                                                                </span>


                                                                <div
                                                                    className="
                                                                        flex-1

                                                                        min-w-0
                                                                    "
                                                                >

                                                                    <p
                                                                        className="
                                                                            text-sm

                                                                            font-semibold

                                                                            truncate

                                                                            text-[var(--nexus-text)]
                                                                        "
                                                                    >

                                                                        {
                                                                            nombreCompleto(
                                                                                alumno
                                                                            )
                                                                        }

                                                                    </p>

                                                                </div>


                                                                <span
                                                                    className="
                                                                        text-xs

                                                                        font-bold

                                                                        text-purple-500
                                                                    "
                                                                >

                                                                    {
                                                                        visitas
                                                                    } visitas

                                                                </span>


                                                            </div>


                                                            <div
                                                                className="
                                                                    ml-10

                                                                    h-2.5

                                                                    rounded-full

                                                                    overflow-hidden

                                                                    bg-black/5

                                                                    dark:bg-white/5
                                                                "
                                                            >

                                                                <div
                                                                    className="
                                                                        h-full

                                                                        rounded-full

                                                                        bg-gradient-to-r

                                                                        from-purple-500

                                                                        to-violet-400

                                                                        transition-all

                                                                        duration-700
                                                                    "
                                                                    style={{
                                                                        width:
                                                                            `${porcentaje}%`
                                                                    }}
                                                                />

                                                            </div>


                                                        </div>

                                                    );

                                                }
                                            )

                                    }


                                </div>


                            </div>


                        </div>


                        {/* =========================================
                            ESTADÍSTICAS SECUNDARIAS
                        ========================================== */}

                        <div
                            className="
                                grid

                                grid-cols-1
                                md:grid-cols-3

                                gap-5
                            "
                        >


                            {/* PROMEDIO */}

                            <div
                                className="
                                    rounded-2xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    p-5

                                    flex

                                    items-center

                                    gap-4
                                "
                            >


                                <div
                                    className="
                                        w-12
                                        h-12

                                        rounded-xl

                                        flex

                                        items-center
                                        justify-center

                                        bg-purple-500/10

                                        text-purple-500
                                    "
                                >

                                    <TrendingUp
                                        size={22}
                                    />

                                </div>


                                <div>


                                    <p
                                        className="
                                            text-xs

                                            text-[var(--nexus-muted)]
                                        "
                                    >

                                        Promedio por alumno

                                    </p>


                                    <p
                                        className="
                                            text-2xl

                                            font-bold

                                            text-[var(--nexus-text)]

                                            mt-1
                                        "
                                    >

                                        {promedioVisitas}

                                    </p>


                                </div>


                            </div>


                            {/* MAXIMA */}

                            <div
                                className="
                                    rounded-2xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    p-5

                                    flex

                                    items-center

                                    gap-4
                                "
                            >


                                <div
                                    className="
                                        w-12
                                        h-12

                                        rounded-xl

                                        flex

                                        items-center
                                        justify-center

                                        bg-yellow-500/10

                                        text-yellow-500
                                    "
                                >

                                    <Award
                                        size={22}
                                    />

                                </div>


                                <div>


                                    <p
                                        className="
                                            text-xs

                                            text-[var(--nexus-muted)]
                                        "
                                    >

                                        Máxima actividad

                                    </p>


                                    <p
                                        className="
                                            text-2xl

                                            font-bold

                                            text-[var(--nexus-text)]

                                            mt-1
                                        "
                                    >

                                        {visitasMaximas}

                                    </p>


                                </div>


                            </div>


                            {/* ESTADO */}

                            <div
                                className="
                                    rounded-2xl

                                    border
                                    border-[var(--nexus-border)]

                                    bg-[var(--nexus-card)]

                                    p-5

                                    flex

                                    items-center

                                    gap-4
                                "
                            >


                                <div
                                    className="
                                        w-12
                                        h-12

                                        rounded-xl

                                        flex

                                        items-center
                                        justify-center

                                        bg-blue-500/10

                                        text-blue-500
                                    "
                                >

                                    {

                                        porcentajeActividad >= 50

                                            ? (

                                                <CheckCircle2
                                                    size={22}
                                                />

                                            )

                                            : (

                                                <TrendingDown
                                                    size={22}
                                                />

                                            )

                                    }

                                </div>


                                <div>


                                    <p
                                        className="
                                            text-xs

                                            text-[var(--nexus-muted)]
                                        "
                                    >

                                        Estado del grupo

                                    </p>


                                    <p
                                        className="
                                            text-base

                                            font-bold

                                            text-[var(--nexus-text)]

                                            mt-1
                                        "
                                    >

                                        {

                                            porcentajeActividad >= 75

                                                ? "Excelente"

                                                : porcentajeActividad >= 50

                                                    ? "Buena participación"

                                                    : porcentajeActividad > 0

                                                        ? "Participación baja"

                                                        : "Sin actividad"

                                        }

                                    </p>


                                </div>


                            </div>


                        </div>


                        {/* =========================================
                            TABLA
                        ========================================== */}

                        <div
                            className="
                                rounded-3xl

                                border
                                border-[var(--nexus-border)]

                                bg-[var(--nexus-card)]

                                overflow-hidden
                            "
                        >


                            {/* HEADER */}

                            <div
                                className="
                                    flex

                                    flex-col
                                    md:flex-row

                                    md:items-center
                                    md:justify-between

                                    gap-5

                                    p-6

                                    border-b

                                    border-[var(--nexus-border)]
                                "
                            >


                                <div>


                                    <div
                                        className="
                                            flex

                                            items-center

                                            gap-2
                                        "
                                    >

                                        <Activity
                                            size={20}
                                            className="
                                                text-purple-500
                                            "
                                        />


                                        <span
                                            className="
                                                text-xs

                                                font-bold

                                                uppercase

                                                tracking-wider

                                                text-purple-500
                                            "
                                        >

                                            Detalle

                                        </span>


                                    </div>


                                    <h2
                                        className="
                                            text-xl

                                            font-bold

                                            text-[var(--nexus-text)]

                                            mt-2
                                        "
                                    >

                                        Actividad de alumnos

                                    </h2>


                                    <p
                                        className="
                                            text-sm

                                            text-[var(--nexus-muted)]

                                            mt-1
                                        "
                                    >

                                        Consulta el historial
                                        individual de participación.

                                    </p>


                                </div>


                                <div
                                    className="
                                        flex

                                        items-center

                                        gap-3
                                    "
                                >


                                    <div
                                        className="
                                            px-4
                                            py-2

                                            rounded-xl

                                            bg-purple-500/10

                                            text-purple-500

                                            text-sm

                                            font-semibold
                                        "
                                    >

                                        {
                                            reporte.alumnos
                                                ?.length ?? 0
                                        } alumnos

                                    </div>


                                </div>


                            </div>


                            {/* TABLA */}

                            <div
                                className="
                                    overflow-x-auto
                                "
                            >


                                <table
                                    className="
                                        w-full

                                        min-w-[950px]

                                        text-sm
                                    "
                                >


                                    <thead>


                                        <tr
                                            className="
                                                bg-black/[0.02]

                                                dark:bg-white/[0.02]

                                                border-b

                                                border-[var(--nexus-border)]

                                                text-left
                                            "
                                        >


                                            <th
                                                className="
                                                    px-6
                                                    py-4

                                                    w-[80px]

                                                    text-xs

                                                    uppercase

                                                    tracking-wider

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                #

                                            </th>


                                            <th
                                                className="
                                                    px-6
                                                    py-4

                                                    text-xs

                                                    uppercase

                                                    tracking-wider

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Alumno

                                            </th>


                                            <th
                                                className="
                                                    px-6
                                                    py-4

                                                    text-xs

                                                    uppercase

                                                    tracking-wider

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Correo

                                            </th>


                                            <th
                                                className="
                                                    px-6
                                                    py-4

                                                    text-xs

                                                    uppercase

                                                    tracking-wider

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Visitas

                                            </th>


                                            <th
                                                className="
                                                    px-6
                                                    py-4

                                                    text-xs

                                                    uppercase

                                                    tracking-wider

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Última actividad

                                            </th>


                                            <th
                                                className="
                                                    px-6
                                                    py-4

                                                    text-xs

                                                    uppercase

                                                    tracking-wider

                                                    text-[var(--nexus-muted)]
                                                "
                                            >

                                                Estado

                                            </th>


                                        </tr>


                                    </thead>


                                    <tbody>


                                        {

                                            reporte.alumnos
                                                ?.length > 0

                                                ? (

                                                    reporte.alumnos.map(
                                                        (
                                                            alumno,
                                                            index
                                                        ) => {

                                                            const activo =
                                                                (alumno.total_visitas ?? 0) > 0;


                                                            return (

                                                                <tr
                                                                    key={
                                                                        alumno.id
                                                                    }
                                                                    className="
                                                                        border-b

                                                                        border-[var(--nexus-border)]

                                                                        last:border-0

                                                                        hover:bg-purple-500/[0.03]

                                                                        transition-colors
                                                                    "
                                                                >


                                                                    {/* NUMERO */}

                                                                    <td
                                                                        className="
                                                                            px-6
                                                                            py-5

                                                                            font-semibold

                                                                            text-[var(--nexus-muted)]
                                                                        "
                                                                    >

                                                                        {
                                                                            String(
                                                                                index + 1
                                                                            ).padStart(
                                                                                2,
                                                                                "0"
                                                                            )
                                                                        }

                                                                    </td>


                                                                    {/* ALUMNO */}

                                                                    <td
                                                                        className="
                                                                            px-6
                                                                            py-5
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
                                                                                    w-11
                                                                                    h-11

                                                                                    rounded-xl

                                                                                    flex

                                                                                    items-center
                                                                                    justify-center

                                                                                    bg-gradient-to-br

                                                                                    from-purple-500/20

                                                                                    to-violet-500/10

                                                                                    text-purple-500

                                                                                    font-bold
                                                                                "
                                                                            >

                                                                                {
                                                                                    obtenerIniciales(
                                                                                        alumno
                                                                                    )
                                                                                }

                                                                            </div>


                                                                            <div>


                                                                                <p
                                                                                    className="
                                                                                        font-semibold

                                                                                        text-[var(--nexus-text)]
                                                                                    "
                                                                                >

                                                                                    {
                                                                                        nombreCompleto(
                                                                                            alumno
                                                                                        )
                                                                                    }

                                                                                </p>


                                                                                <div
                                                                                    className="
                                                                                        flex

                                                                                        items-center

                                                                                        gap-1.5

                                                                                        text-xs

                                                                                        text-[var(--nexus-muted)]

                                                                                        mt-1
                                                                                    "
                                                                                >

                                                                                    <UserRound
                                                                                        size={12}
                                                                                    />

                                                                                    Alumno

                                                                                </div>


                                                                            </div>


                                                                        </div>


                                                                    </td>


                                                                    {/* CORREO */}

                                                                    <td
                                                                        className="
                                                                            px-6
                                                                            py-5

                                                                            text-[var(--nexus-muted)]
                                                                        "
                                                                    >

                                                                        {
                                                                            alumno.correo ||
                                                                            "—"
                                                                        }

                                                                    </td>


                                                                    {/* VISITAS */}

                                                                    <td
                                                                        className="
                                                                            px-6
                                                                            py-5
                                                                        "
                                                                    >


                                                                        <div
                                                                            className="
                                                                                inline-flex

                                                                                items-center

                                                                                gap-2
                                                                            "
                                                                        >


                                                                            <div
                                                                                className="
                                                                                    w-9
                                                                                    h-9

                                                                                    rounded-xl

                                                                                    flex

                                                                                    items-center
                                                                                    justify-center

                                                                                    bg-purple-500/10

                                                                                    text-purple-500
                                                                                "
                                                                            >

                                                                                <Eye
                                                                                    size={16}
                                                                                />

                                                                            </div>


                                                                            <span
                                                                                className="
                                                                                    text-lg

                                                                                    font-bold

                                                                                    text-[var(--nexus-text)]
                                                                                "
                                                                            >

                                                                                {
                                                                                    alumno.total_visitas ??
                                                                                    0
                                                                                }

                                                                            </span>


                                                                        </div>


                                                                    </td>


                                                                    {/* FECHA */}

                                                                    <td
                                                                        className="
                                                                            px-6
                                                                            py-5
                                                                        "
                                                                    >


                                                                        {

                                                                            alumno.ultima_visita

                                                                                ? (

                                                                                    <div
                                                                                        className="
                                                                                            flex

                                                                                            items-center

                                                                                            gap-2

                                                                                            text-[var(--nexus-muted)]
                                                                                        "
                                                                                    >

                                                                                        <Clock3
                                                                                            size={16}
                                                                                            className="
                                                                                                text-purple-500
                                                                                            "
                                                                                        />

                                                                                        {
                                                                                            formatearFecha(
                                                                                                alumno.ultima_visita
                                                                                            )
                                                                                        }

                                                                                    </div>

                                                                                )

                                                                                : (

                                                                                    <span
                                                                                        className="
                                                                                            flex

                                                                                            items-center

                                                                                            gap-2

                                                                                            text-[var(--nexus-muted)]
                                                                                        "
                                                                                    >

                                                                                        <CalendarDays
                                                                                            size={16}
                                                                                        />

                                                                                        Sin actividad

                                                                                    </span>

                                                                                )

                                                                        }


                                                                    </td>


                                                                    {/* ESTADO */}

                                                                    <td
                                                                        className="
                                                                            px-6
                                                                            py-5
                                                                        "
                                                                    >


                                                                        {

                                                                            activo

                                                                                ? (

                                                                                    <span
                                                                                        className="
                                                                                            inline-flex

                                                                                            items-center

                                                                                            gap-2

                                                                                            px-3
                                                                                            py-1.5

                                                                                            rounded-full

                                                                                            bg-emerald-500/10

                                                                                            text-emerald-500

                                                                                            text-xs

                                                                                            font-semibold
                                                                                        "
                                                                                    >

                                                                                        <span
                                                                                            className="
                                                                                                w-1.5
                                                                                                h-1.5

                                                                                                rounded-full

                                                                                                bg-emerald-500
                                                                                            "
                                                                                        />

                                                                                        Activo

                                                                                    </span>

                                                                                )

                                                                                : (

                                                                                    <span
                                                                                        className="
                                                                                            inline-flex

                                                                                            items-center

                                                                                            gap-2

                                                                                            px-3
                                                                                            py-1.5

                                                                                            rounded-full

                                                                                            bg-orange-500/10

                                                                                            text-orange-500

                                                                                            text-xs

                                                                                            font-semibold
                                                                                        "
                                                                                    >

                                                                                        <span
                                                                                            className="
                                                                                                w-1.5
                                                                                                h-1.5

                                                                                                rounded-full

                                                                                                bg-orange-500
                                                                                            "
                                                                                        />

                                                                                        Sin actividad

                                                                                    </span>

                                                                                )

                                                                        }


                                                                    </td>


                                                                </tr>

                                                            );

                                                        }
                                                    )

                                                )

                                                : (

                                                    <tr>


                                                        <td
                                                            colSpan={6}
                                                            className="
                                                                px-6
                                                                py-16

                                                                text-center
                                                            "
                                                        >


                                                            <div
                                                                className="
                                                                    flex

                                                                    flex-col

                                                                    items-center

                                                                    text-[var(--nexus-muted)]
                                                                "
                                                            >


                                                                <div
                                                                    className="
                                                                        w-16
                                                                        h-16

                                                                        rounded-2xl

                                                                        flex

                                                                        items-center
                                                                        justify-center

                                                                        bg-purple-500/10

                                                                        text-purple-500

                                                                        mb-4
                                                                    "
                                                                >

                                                                    <Users
                                                                        size={28}
                                                                    />

                                                                </div>


                                                                <p
                                                                    className="
                                                                        font-semibold

                                                                        text-[var(--nexus-text)]
                                                                    "
                                                                >

                                                                    No hay alumnos
                                                                    registrados

                                                                </p>


                                                                <p
                                                                    className="
                                                                        text-sm

                                                                        mt-1
                                                                    "
                                                                >

                                                                    Los alumnos del
                                                                    grupo aparecerán
                                                                    aquí.

                                                                </p>


                                                            </div>


                                                        </td>


                                                    </tr>

                                                )

                                        }


                                    </tbody>


                                </table>


                            </div>


                            {/* FOOTER TABLA */}

                            <div
                                className="
                                    flex

                                    flex-col
                                    sm:flex-row

                                    sm:items-center
                                    sm:justify-between

                                    gap-3

                                    px-6
                                    py-4

                                    border-t

                                    border-[var(--nexus-border)]

                                    bg-black/[0.015]

                                    dark:bg-white/[0.015]
                                "
                            >


                                <p
                                    className="
                                        text-xs

                                        text-[var(--nexus-muted)]
                                    "
                                >

                                    Información actualizada
                                    según la actividad
                                    registrada en ITS.

                                </p>


                                <div
                                    className="
                                        flex

                                        items-center

                                        gap-2

                                        text-xs

                                        font-semibold

                                        text-purple-500
                                    "
                                >

                                    <Zap
                                        size={14}
                                    />

                                    Panel de analítica ITS

                                    <ArrowUpRight
                                        size={14}
                                    />

                                </div>


                            </div>


                        </div>


                    </>

                )

            }


        </div>

    );

}
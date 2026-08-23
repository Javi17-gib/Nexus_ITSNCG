import {
    ArrowLeft,
    BookOpen,
    Layers,
    Sparkles,
    Loader2,
    AlertCircle,
    ChevronRight,
    Orbit,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getMateriaRequest,
} from "../../api/materias";

import {
    getUnidadesMateriaRequest,
} from "../../api/unidades";

import type {
    Materia,
} from "../../types/materia";

import type {
    Unidad,
} from "../../api/unidades";


export default function UnidadesAlumno() {

    const navigate = useNavigate();

    const { materiaId } = useParams();


    // =====================================================
    // ESTADOS
    // =====================================================

    const [materia, setMateria] =
        useState<Materia | null>(null);

    const [unidades, setUnidades] =
        useState<Unidad[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [unidadHover, setUnidadHover] =
        useState<number | null>(null);


    // =====================================================
    // CARGAR MATERIA Y UNIDADES
    // =====================================================

    useEffect(() => {

        if (!materiaId) {

            setError(
                "No se encontró la materia."
            );

            setLoading(false);

            return;
        }


        let activo = true;


        const cargarDatos = async () => {

            try {

                setLoading(true);

                setError("");


                const id =
                    Number(materiaId);


                const [
                    materiaData,
                    unidadesData,
                ] = await Promise.all([

                    getMateriaRequest(id),

                    getUnidadesMateriaRequest(id),

                ]);


                if (!activo) {
                    return;
                }


                setMateria(
                    materiaData
                );


                setUnidades(
                    [...unidadesData].sort(
                        (a, b) =>
                            (a.orden ?? 0) -
                            (b.orden ?? 0)
                    )
                );


            } catch (err: any) {

                console.error(
                    "❌ Error cargando materia:",
                    err
                );


                if (activo) {

                    setError(
                        err?.response?.data?.message ||
                        "No se pudo cargar la materia."
                    );

                }

            } finally {

                if (activo) {

                    setLoading(false);

                }

            }

        };


        cargarDatos();


        return () => {

            activo = false;

        };

    }, [materiaId]);


    // =====================================================
    // VOLVER A GALAXIA
    // =====================================================

    const volver = () => {

        navigate(
            "/dashboard/alumno"
        );

    };


    // =====================================================
    // ENTRAR A UNA UNIDAD
    // Abre directamente el espacio de estudio.
    // Ya no pasamos por una pantalla independiente de temas.
    // =====================================================

    const entrarUnidad = (
        unidad: Unidad
    ) => {

        navigate(
            `/dashboard/alumno/materias/${materiaId}/unidades/${unidad.id}`
        );

    };


    // =====================================================
    // ALTURA DEL MAPA
    // =====================================================

    const columnasMapa = 5;

    const filasMapa =
        Math.max(
            1,
            Math.ceil(
                unidades.length /
                columnasMapa
            )
        );

    const alturaMapa =
        filasMapa === 1
            ? 310
            : 455;


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div
                className="
                    flex
                    h-full
                    min-h-0
                    items-center
                    justify-center
                    bg-[var(--nexus-bg)]
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        gap-4
                    "
                >

                    <div
                        className="
                            relative
                            flex
                            h-16
                            w-16
                            items-center
                            justify-center
                        "
                    >

                        <div
                            className="
                                absolute
                                inset-0
                                animate-ping
                                rounded-full
                                bg-violet-500/10
                            "
                        />

                        <div
                            className="
                                relative
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-violet-500/30
                                bg-violet-500/10
                            "
                        >

                            <Loader2
                                size={22}
                                className="
                                    animate-spin
                                    text-violet-400
                                "
                            />

                        </div>

                    </div>


                    <p
                        className="
                            text-sm
                            font-medium
                            text-[var(--nexus-text-muted)]
                        "
                    >
                        Explorando la materia...
                    </p>

                </div>

            </div>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <div
                className="
                    flex
                    h-full
                    min-h-0
                    items-center
                    justify-center
                    bg-[var(--nexus-bg)]
                    p-6
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                        rounded-3xl
                        border
                        border-red-500/20
                        bg-[var(--nexus-surface)]
                        p-7
                        text-center
                    "
                >

                    <div
                        className="
                            mx-auto
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            bg-red-500/10
                        "
                    >

                        <AlertCircle
                            size={25}
                            className="text-red-400"
                        />

                    </div>


                    <h2
                        className="
                            mt-4
                            text-lg
                            font-bold
                            text-[var(--nexus-text)]
                        "
                    >
                        No pudimos abrir la materia
                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-[var(--nexus-text-muted)]
                        "
                    >
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={volver}
                        className="
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-violet-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-violet-500
                        "
                    >

                        <ArrowLeft
                            size={16}
                        />

                        Volver a mi galaxia

                    </button>

                </div>

            </div>

        );

    }


    // =====================================================
    // VISTA
    // =====================================================

    return (

        <div
            className="
                nexus-scrollbar
                relative
                h-full
                min-h-0
                w-full
                overflow-y-auto
                overflow-x-hidden
                bg-[var(--nexus-bg)]
            "
        >

            {/* =================================================
                SCROLLBAR NEXUS
            ================================================= */}

            <style>{`

                .nexus-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color:
                        rgba(139, 92, 246, 0.65)
                        transparent;
                }

                .nexus-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }

                .nexus-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }

                .nexus-scrollbar::-webkit-scrollbar-thumb {
                    background:
                        linear-gradient(
                            180deg,
                            rgba(124, 58, 237, 0.35),
                            rgba(139, 92, 246, 0.85),
                            rgba(168, 85, 247, 0.45)
                        );

                    border-radius: 999px;

                    border: 2px solid
                        transparent;

                    background-clip:
                        padding-box;

                    min-height: 55px;
                }

                .nexus-scrollbar::-webkit-scrollbar-thumb:hover {
                    background:
                        linear-gradient(
                            180deg,
                            rgba(139, 92, 246, 0.75),
                            rgba(168, 85, 247, 1),
                            rgba(124, 58, 237, 0.75)
                        );

                    border-radius: 999px;

                    border: 1px solid
                        transparent;

                    background-clip:
                        padding-box;

                    box-shadow:
                        0 0 8px
                        rgba(139, 92, 246, 0.55),
                        0 0 18px
                        rgba(139, 92, 246, 0.25);
                }

                .nexus-scrollbar::-webkit-scrollbar-button {
                    display: none;
                    width: 0;
                    height: 0;
                }

                .nexus-scrollbar::-webkit-scrollbar-corner {
                    background: transparent;
                }

            `}</style>


            {/* =================================================
                FONDO ESPACIAL
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                    overflow-hidden
                "
            >

                <div
                    className="
                        absolute
                        -left-40
                        top-0
                        h-[420px]
                        w-[420px]
                        rounded-full
                        bg-violet-700/10
                        blur-[130px]
                    "
                />

                <div
                    className="
                        absolute
                        right-[-120px]
                        top-[35%]
                        h-[450px]
                        w-[450px]
                        rounded-full
                        bg-blue-700/10
                        blur-[140px]
                    "
                />

                <div
                    className="
                        absolute
                        bottom-[-120px]
                        left-[30%]
                        h-[400px]
                        w-[400px]
                        rounded-full
                        bg-fuchsia-700/10
                        blur-[130px]
                    "
                />

            </div>


            {/* =================================================
                ESTRELLAS
            ================================================= */}

            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                "
            >

                <span
                    className="
                        absolute
                        left-[7%]
                        top-[13%]
                        h-1
                        w-1
                        rounded-full
                        bg-white
                        opacity-70
                    "
                />

                <span
                    className="
                        absolute
                        left-[31%]
                        top-[17%]
                        h-[3px]
                        w-[3px]
                        rounded-full
                        bg-violet-300
                    "
                />

                <span
                    className="
                        absolute
                        left-[53%]
                        top-[10%]
                        h-1
                        w-1
                        rounded-full
                        bg-white
                        opacity-60
                    "
                />

                <span
                    className="
                        absolute
                        right-[18%]
                        top-[18%]
                        h-[3px]
                        w-[3px]
                        rounded-full
                        bg-blue-300
                    "
                />

                <span
                    className="
                        absolute
                        right-[7%]
                        top-[45%]
                        h-1
                        w-1
                        rounded-full
                        bg-white
                        opacity-60
                    "
                />

                <span
                    className="
                        absolute
                        bottom-[15%]
                        left-[18%]
                        h-[3px]
                        w-[3px]
                        rounded-full
                        bg-violet-300
                    "
                />

                <span
                    className="
                        absolute
                        bottom-[17%]
                        right-[27%]
                        h-1
                        w-1
                        rounded-full
                        bg-blue-300
                    "
                />

            </div>


            {/* =================================================
                CONTENIDO
            ================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-7xl
                    px-4
                    py-5
                    sm:px-6
                    lg:px-8
                    lg:py-6
                "
            >

                {/* =================================================
                    VOLVER
                ================================================= */}

                <button
                    type="button"
                    onClick={volver}
                    className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        text-sm
                        font-medium
                        text-[var(--nexus-text-muted)]
                        transition
                        hover:text-[var(--nexus-text)]
                    "
                >

                    <ArrowLeft
                        size={16}
                        className="
                            transition-transform
                            group-hover:-translate-x-1
                        "
                    />

                    Volver a mi galaxia

                </button>


                {/* =================================================
                    CABECERA
                ================================================= */}

                <section
                    className="
                        relative
                        mt-5
                        overflow-hidden
                        rounded-[1.7rem]
                        border
                        border-[var(--nexus-border)]
                        bg-[var(--nexus-surface)]
                        shadow-[0_20px_80px_rgba(0,0,0,0.25)]
                    "
                >

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-[-100px]
                            top-[-180px]
                            h-[400px]
                            w-[400px]
                            rounded-full
                            bg-violet-600/10
                            blur-[110px]
                        "
                    />


                    <div
                        className="
                            relative
                            flex
                            flex-col
                            gap-5
                            p-4
                            sm:p-5
                            lg:flex-row
                            lg:items-center
                            lg:justify-between
                        "
                    >

                        {/* INFO */}

                        <div
                            className="
                                flex
                                min-w-0
                                items-center
                                gap-4
                            "
                        >

                            <div
                                className="
                                    relative
                                    flex
                                    h-14
                                    w-14
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-violet-500/25
                                    bg-violet-500/10
                                    shadow-[0_0_35px_rgba(124,58,237,0.18)]
                                "
                            >

                                <BookOpen
                                    size={26}
                                    className="text-violet-400"
                                />

                                <Sparkles
                                    size={12}
                                    className="
                                        absolute
                                        -right-1
                                        -top-1
                                        text-fuchsia-400
                                    "
                                />

                            </div>


                            <div
                                className="
                                    min-w-0
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <Orbit
                                        size={12}
                                        className="text-violet-400"
                                    />

                                    <span
                                        className="
                                            text-[10px]
                                            font-bold
                                            uppercase
                                            tracking-[2.5px]
                                            text-violet-400
                                        "
                                    >
                                        Universo de aprendizaje
                                    </span>

                                </div>


                                <h1
                                    className="
                                        mt-1
                                        truncate
                                        text-3xl
                                        font-black
                                        tracking-tight
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    {materia?.nombre || "Materia"}
                                </h1>


                                {materia?.descripcion && (

                                    <p
                                        className="
                                            mt-1
                                            line-clamp-2
                                            max-w-xl
                                            text-sm
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        {materia.descripcion}
                                    </p>

                                )}

                            </div>

                        </div>


                        {/* RESUMEN */}

                        <div
                            className="
                                flex
                                shrink-0
                                items-center
                                gap-3
                                rounded-2xl
                                border
                                border-violet-500/15
                                bg-violet-500/[0.04]
                                px-4
                                py-3
                                lg:min-w-[220px]
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-10
                                    w-10
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-violet-500/10
                                "
                            >

                                <Layers
                                    size={20}
                                    className="text-violet-400"
                                />

                            </div>


                            <div>

                                <p
                                    className="
                                        text-[10px]
                                        font-medium
                                        text-[var(--nexus-text-muted)]
                                    "
                                >
                                    Ruta disponible
                                </p>


                                <p
                                    className="
                                        text-lg
                                        font-black
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    {unidades.length}{" "}
                                    {unidades.length === 1
                                        ? "unidad"
                                        : "unidades"}
                                </p>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    TITULO
                ================================================= */}

                <div
                    className="
                        mt-7
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Sparkles
                            size={13}
                            className="text-violet-400"
                        />

                        <span
                            className="
                                text-[10px]
                                font-bold
                                uppercase
                                tracking-[2.5px]
                                text-violet-400
                            "
                        >
                            Ruta de aprendizaje
                        </span>

                    </div>


                    <div
                        className="
                            flex
                            items-end
                            justify-between
                            gap-4
                        "
                    >

                        <div>

                            <h2
                                className="
                                    mt-1
                                    text-2xl
                                    font-black
                                    tracking-tight
                                    text-[var(--nexus-text)]
                                "
                            >
                                Explora la materia
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-[var(--nexus-text-muted)]
                                "
                            >
                                Selecciona cualquier unidad para comenzar.
                            </p>

                        </div>


                        <div
                            className="
                                hidden
                                items-center
                                gap-2
                                text-xs
                                text-[var(--nexus-text-muted)]
                                sm:flex
                            "
                        >

                            <Layers
                                size={14}
                                className="text-violet-400"
                            />

                            {unidades.length} disponibles

                        </div>

                    </div>

                </div>


                {/* =================================================
                    MAPA / RUTA HORIZONTAL
                ================================================= */}

                {unidades.length > 0 ? (

                    <section
                        className="
                            relative
                            mt-5
                            overflow-hidden
                            rounded-[1.7rem]
                            border
                            border-violet-500/10
                            bg-[#02030A]
                            shadow-[0_25px_90px_rgba(0,0,0,0.4)]
                        "
                        style={{
                            height: `${alturaMapa}px`,
                        }}
                    >

                        {/* =================================================
                            GRID ESPACIAL
                        ================================================= */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                opacity-[0.11]
                            "
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(139,92,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.15) 1px, transparent 1px)",
                                backgroundSize:
                                    "55px 55px",
                            }}
                        />

                        {/* =================================================
                            NEBULOSAS
                        ================================================= */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -left-20
                                top-0
                                h-64
                                w-64
                                rounded-full
                                bg-violet-700/10
                                blur-[100px]
                            "
                        />

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -right-20
                                bottom-[-80px]
                                h-72
                                w-72
                                rounded-full
                                bg-blue-700/10
                                blur-[110px]
                            "
                        />

                        {/* =================================================
                            ESTRELLAS
                        ================================================= */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                            "
                        >

                            <span
                                className="
                                    absolute
                                    left-[8%]
                                    top-[15%]
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-white
                                    opacity-70
                                "
                            />

                            <span
                                className="
                                    absolute
                                    left-[24%]
                                    top-[32%]
                                    h-[3px]
                                    w-[3px]
                                    rounded-full
                                    bg-violet-300
                                "
                            />

                            <span
                                className="
                                    absolute
                                    left-[48%]
                                    top-[13%]
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-blue-300
                                    opacity-80
                                "
                            />

                            <span
                                className="
                                    absolute
                                    right-[18%]
                                    top-[28%]
                                    h-[3px]
                                    w-[3px]
                                    rounded-full
                                    bg-white
                                    opacity-70
                                "
                            />

                            <span
                                className="
                                    absolute
                                    left-[12%]
                                    bottom-[18%]
                                    h-[3px]
                                    w-[3px]
                                    rounded-full
                                    bg-blue-300
                                "
                            />

                            <span
                                className="
                                    absolute
                                    right-[8%]
                                    bottom-[20%]
                                    h-1
                                    w-1
                                    rounded-full
                                    bg-violet-300
                                "
                            />

                        </div>


                        {/* =================================================
                            CONECTORES DESKTOP
                            Ruta serpenteante de izquierda a derecha.
                        ================================================= */}

                        <svg
                            className="
                                pointer-events-none
                                absolute
                                inset-0
                                z-10
                                hidden
                                h-full
                                w-full
                                lg:block
                            "
                            viewBox="0 0 1000 455"
                            preserveAspectRatio="none"
                        >

                            {unidades.slice(0, -1).map(
                                (_, index) => {

                                    const fila =
                                        Math.floor(
                                            index /
                                            columnasMapa
                                        );

                                    const siguienteFila =
                                        Math.floor(
                                            (index + 1) /
                                            columnasMapa
                                        );

                                    const posicionActual =
                                        index %
                                        columnasMapa;

                                    const posicionSiguiente =
                                        (index + 1) %
                                        columnasMapa;

                                    const colActual =
                                        fila % 2 === 0
                                            ? posicionActual
                                            : columnasMapa -
                                              1 -
                                              posicionActual;

                                    const colSiguiente =
                                        siguienteFila % 2 === 0
                                            ? posicionSiguiente
                                            : columnasMapa -
                                              1 -
                                              posicionSiguiente;

                                    const x1 =
                                        100 +
                                        colActual *
                                        200;

                                    const x2 =
                                        100 +
                                        colSiguiente *
                                        200;

                                    const yActual =
                                        fila === 0
                                            ? 105
                                            : 350;

                                    const ySiguiente =
                                        siguienteFila === 0
                                            ? 105
                                            : 350;

                                    const mismoRenglon =
                                        fila ===
                                        siguienteFila;

                                    if (mismoRenglon) {

                                        return (
                                            <line
                                                key={`line-${index}`}
                                                x1={x1}
                                                y1={yActual}
                                                x2={x2}
                                                y2={ySiguiente}
                                                stroke="rgba(139,92,246,0.65)"
                                                strokeWidth="2"
                                                vectorEffect="non-scaling-stroke"
                                            />
                                        );

                                    }

                                    return (
                                        <path
                                            key={`curve-${index}`}
                                            d={`
                                                M ${x1} ${yActual}
                                                C ${x1} ${yActual + 80},
                                                  ${x2} ${ySiguiente - 80},
                                                  ${x2} ${ySiguiente}
                                            `}
                                            fill="none"
                                            stroke="rgba(139,92,246,0.55)"
                                            strokeWidth="2"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    );

                                }
                            )}

                        </svg>


                        {/* =================================================
                            NODOS DE UNIDAD
                        ================================================= */}

                        <div
                            className="
                                relative
                                z-20
                                h-full
                                w-full
                            "
                        >

                            {unidades.map(
                                (
                                    unidad,
                                    index
                                ) => {

                                    const fila =
                                        Math.floor(
                                            index /
                                            columnasMapa
                                        );

                                    const posicion =
                                        index %
                                        columnasMapa;

                                    const columna =
                                        fila % 2 === 0
                                            ? posicion
                                            : columnasMapa -
                                              1 -
                                              posicion;

                                    const activo =
                                        unidadHover ===
                                        unidad.id;

                                    /*
                                     * En escritorio:
                                     * 5 columnas.
                                     *
                                     * En móvil:
                                     * el nodo ocupa una posición
                                     * adaptada mediante clases.
                                     */
                                    const leftDesktop =
                                        10 +
                                        columna *
                                        20;

                                    const topDesktop =
                                        fila === 0
                                            ? 23
                                            : 77;

                                    return (

                                        <div
                                            key={unidad.id}
                                            className="
                                                absolute
                                                z-30
                                                -translate-x-1/2
                                                -translate-y-1/2
                                            "
                                            style={{
                                                left:
                                                    `${leftDesktop}%`,
                                                top:
                                                    `${topDesktop}%`,
                                            }}
                                        >

                                            <button
                                                type="button"
                                                onMouseEnter={() =>
                                                    setUnidadHover(
                                                        unidad.id
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setUnidadHover(
                                                        null
                                                    )
                                                }
                                                onFocus={() =>
                                                    setUnidadHover(
                                                        unidad.id
                                                    )
                                                }
                                                onBlur={() =>
                                                    setUnidadHover(
                                                        null
                                                    )
                                                }
                                                onClick={() =>
                                                    entrarUnidad(
                                                        unidad
                                                    )
                                                }
                                                className="
                                                    group
                                                    relative
                                                    flex
                                                    flex-col
                                                    items-center
                                                    outline-none
                                                "
                                            >

                                                {/* =================================================
                                                    GLOW
                                                ================================================= */}

                                                <div
                                                    className={`
                                                        pointer-events-none
                                                        absolute
                                                        left-1/2
                                                        top-[28px]
                                                        h-24
                                                        w-24
                                                        -translate-x-1/2
                                                        -translate-y-1/2
                                                        rounded-full
                                                        bg-violet-600/20
                                                        blur-3xl
                                                        transition-all
                                                        duration-500
                                                        ${
                                                            activo
                                                                ? "scale-150 opacity-100"
                                                                : "scale-100 opacity-60"
                                                        }
                                                    `}
                                                />


                                                {/* =================================================
                                                    ÓRBITA
                                                ================================================= */}

                                                <div
                                                    className={`
                                                        pointer-events-none
                                                        absolute
                                                        left-1/2
                                                        top-7
                                                        h-20
                                                        w-20
                                                        -translate-x-1/2
                                                        -translate-y-1/2
                                                        rounded-full
                                                        border
                                                        border-violet-500/15
                                                        transition-all
                                                        duration-500
                                                        ${
                                                            activo
                                                                ? "scale-125 border-violet-400/40"
                                                                : ""
                                                        }
                                                    `}
                                                />


                                                <div
                                                    className="
                                                        pointer-events-none
                                                        absolute
                                                        left-1/2
                                                        top-7
                                                        h-16
                                                        w-24
                                                        -translate-x-1/2
                                                        -translate-y-1/2
                                                        rotate-12
                                                        rounded-full
                                                        border
                                                        border-blue-500/10
                                                    "
                                                />


                                                {/* =================================================
                                                    PLANETA
                                                ================================================= */}

                                                <div
                                                    className={`
                                                        relative
                                                        flex
                                                        h-[58px]
                                                        w-[58px]
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        bg-gradient-to-br
                                                        from-violet-500/30
                                                        via-[#12102B]
                                                        to-[#060711]
                                                        shadow-[0_0_30px_rgba(124,58,237,0.4)]
                                                        transition-all
                                                        duration-300
                                                        ${
                                                            activo
                                                                ? "scale-110 border-violet-300 shadow-[0_0_55px_rgba(124,58,237,0.75)]"
                                                                : "border-violet-500/50"
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className="
                                                            pointer-events-none
                                                            absolute
                                                            left-2
                                                            top-2
                                                            h-3
                                                            w-3
                                                            rounded-full
                                                            bg-violet-200/60
                                                            blur-md
                                                        "
                                                    />

                                                    <Layers
                                                        size={21}
                                                        className="
                                                            relative
                                                            z-10
                                                            text-violet-100
                                                        "
                                                    />

                                                </div>


                                                {/* =================================================
                                                    NÚMERO
                                                ================================================= */}

                                                <div
                                                    className="
                                                        absolute
                                                        -right-1
                                                        -top-1
                                                        flex
                                                        h-6
                                                        w-6
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        border-violet-300/30
                                                        bg-[#0B0B18]
                                                        text-[9px]
                                                        font-black
                                                        text-violet-300
                                                        shadow-lg
                                                    "
                                                >

                                                    {String(
                                                        unidad.orden ||
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}

                                                </div>


                                                {/* =================================================
                                                    INFORMACIÓN
                                                ================================================= */}

                                                <div
                                                    className="
                                                        mt-2
                                                        w-36
                                                        text-center
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-[9px]
                                                            font-black
                                                            uppercase
                                                            tracking-[2px]
                                                            text-violet-400
                                                        "
                                                    >
                                                        Unidad{" "}
                                                        {unidad.orden ||
                                                            index + 1}
                                                    </p>


                                                    <p
                                                        className="
                                                            mt-0.5
                                                            line-clamp-2
                                                            text-[11px]
                                                            font-bold
                                                            leading-4
                                                            text-white
                                                            transition
                                                            group-hover:text-violet-200
                                                        "
                                                    >
                                                        {unidad.nombre}
                                                    </p>

                                                </div>


                                                {/* =================================================
                                                    TOOLTIP
                                                ================================================= */}

                                                <div
                                                    className={`
                                                        pointer-events-none
                                                        absolute
                                                        left-1/2
                                                        z-[100]
                                                        w-52
                                                        -translate-x-1/2
                                                        rounded-2xl
                                                        border
                                                        border-violet-500/25
                                                        bg-[#090A15]/95
                                                        p-4
                                                        text-left
                                                        shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                                                        backdrop-blur-xl
                                                        transition-all
                                                        duration-200
                                                        ${
                                                            fila === 0
                                                                ? "top-full mt-4"
                                                                : "bottom-full mb-4"
                                                        }
                                                        ${
                                                            activo
                                                                ? "translate-y-0 opacity-100"
                                                                : fila === 0
                                                                    ? "translate-y-2 opacity-0"
                                                                    : "-translate-y-2 opacity-0"
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            items-center
                                                            justify-between
                                                            gap-3
                                                        "
                                                    >

                                                        <span
                                                            className="
                                                                text-[9px]
                                                                font-black
                                                                uppercase
                                                                tracking-[2px]
                                                                text-violet-400
                                                            "
                                                        >
                                                            Unidad{" "}
                                                            {unidad.orden ||
                                                                index + 1}
                                                        </span>

                                                        <Layers
                                                            size={14}
                                                            className="
                                                                text-violet-400
                                                            "
                                                        />

                                                    </div>


                                                    <p
                                                        className="
                                                            mt-2
                                                            text-sm
                                                            font-bold
                                                            text-white
                                                        "
                                                    >
                                                        {unidad.nombre}
                                                    </p>


                                                    {unidad.descripcion && (

                                                        <p
                                                            className="
                                                                mt-1
                                                                line-clamp-3
                                                                text-[11px]
                                                                leading-5
                                                                text-slate-400
                                                            "
                                                        >
                                                            {unidad.descripcion}
                                                        </p>

                                                    )}


                                                    <div
                                                        className="
                                                            mt-3
                                                            flex
                                                            items-center
                                                            gap-1
                                                            text-[10px]
                                                            font-semibold
                                                            text-violet-300
                                                        "
                                                    >

                                                        Explorar unidad

                                                        <ChevronRight
                                                            size={11}
                                                        />

                                                    </div>

                                                </div>

                                            </button>

                                        </div>

                                    );

                                }
                            )}

                        </div>


                        {/* =================================================
                            MENSAJE INFERIOR
                        ================================================= */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                bottom-4
                                left-1/2
                                z-40
                                -translate-x-1/2
                                rounded-full
                                border
                                border-white/5
                                bg-black/30
                                px-4
                                py-2
                                text-[9px]
                                font-semibold
                                uppercase
                                tracking-[1.8px]
                                text-slate-500
                                backdrop-blur-md
                            "
                        >

                            <span
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                "
                            >

                                <Sparkles
                                    size={11}
                                    className="text-violet-400/70"
                                />

                                Explora las unidades a tu ritmo

                            </span>

                        </div>

                    </section>

                ) : (

/* =================================================
                       SIN UNIDADES
                    ================================================= */

                    <section
                        className="
                            mt-5
                            flex
                            min-h-[320px]
                            items-center
                            justify-center
                            rounded-[1.7rem]
                            border
                            border-dashed
                            border-[var(--nexus-border)]
                            bg-[var(--nexus-surface)]
                            p-6
                        "
                    >

                        <div
                            className="
                                max-w-sm
                                text-center
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    flex
                                    h-16
                                    w-16
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-violet-500/20
                                    bg-violet-500/10
                                "
                            >

                                <BookOpen
                                    size={25}
                                    className="
                                        text-violet-400
                                    "
                                />

                            </div>


                            <h2
                                className="
                                    mt-4
                                    text-lg
                                    font-bold
                                    text-[var(--nexus-text)]
                                "
                            >
                                Aún no hay unidades
                            </h2>


                            <p
                                className="
                                    mt-1
                                    text-sm
                                    leading-6
                                    text-[var(--nexus-text-muted)]
                                "
                            >
                                Esta materia todavía no tiene
                                unidades disponibles.
                            </p>


                            <button
                                type="button"
                                onClick={volver}
                                className="
                                    mt-5
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    border-[var(--nexus-border)]
                                    px-4
                                    py-2.5
                                    text-sm
                                    font-semibold
                                    text-[var(--nexus-text-secondary)]
                                    transition
                                    hover:border-violet-500/30
                                    hover:text-violet-400
                                "
                            >

                                <ArrowLeft
                                    size={15}
                                />

                                Volver a mi galaxia

                            </button>

                        </div>

                    </section>

                )}


                {/* =================================================
                    AYUDA
                ================================================= */}

                {unidades.length > 0 && (

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            gap-2
                            py-5
                            text-[11px]
                            text-[var(--nexus-text-muted)]
                        "
                    >

                        <Sparkles
                            size={12}
                            className="
                                text-violet-400
                            "
                        />

                        Selecciona una unidad para comenzar tu recorrido.

                    </div>

                )}

            </div>

        </div>

    );

}
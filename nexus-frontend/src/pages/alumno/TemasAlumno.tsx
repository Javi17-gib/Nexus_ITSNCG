import {
    ArrowLeft,
    BookOpen,
    ChevronRight,
    Loader2,
    Layers,
    AlertCircle,
    Sparkles,
    Orbit,
    Rocket,
    CircleDot,
} from "lucide-react";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import api from "../../api/axios";

import {
    getUnidadRequest,
} from "../../api/unidades";

import type {
    Unidad,
} from "../../api/unidades";



/*
|--------------------------------------------------------------------------
| TIPO TEMA
|--------------------------------------------------------------------------
*/

interface Tema {

    id: number;

    unidad_id: number;

    nombre: string;

    descripcion: string | null;

    orden: number;

    created_at?: string;

    updated_at?: string;

}



/*
|--------------------------------------------------------------------------
| POSICIÓN
|--------------------------------------------------------------------------
*/

interface PosicionTema {

    x: number;

    y: number;

}



/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function TemasAlumno() {

    const navigate =
        useNavigate();


    const {
        materiaId,
        unidadId,
    } = useParams();



    /*
    |--------------------------------------------------------------------------
    | ESTADOS
    |--------------------------------------------------------------------------
    */

    const [
        unidad,
        setUnidad,
    ] = useState<Unidad | null>(
        null
    );


    const [
        temas,
        setTemas,
    ] = useState<Tema[]>([]);


    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState("");


    const [
        temaHover,
        setTemaHover,
    ] = useState<number | null>(
        null
    );



    /*
    |--------------------------------------------------------------------------
    | CARGAR UNIDAD Y TEMAS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!unidadId) {

            setError(
                "No se encontró la unidad."
            );

            setLoading(false);

            return;

        }


        let montado = true;


        const cargarDatos =
            async () => {

                try {

                    setLoading(true);

                    setError("");


                    const id =
                        Number(unidadId);



                    /*
                    |--------------------------------------------------------------------------
                    | OBTENER UNIDAD
                    |--------------------------------------------------------------------------
                    */

                    const unidadData =
                        await getUnidadRequest(
                            id
                        );



                    /*
                    |--------------------------------------------------------------------------
                    | OBTENER TEMAS
                    |--------------------------------------------------------------------------
                    */

                    const response =
                        await api.get(
                            `/unidades/${id}/temas`
                        );


                    let temasData:
                        Tema[] = [];


                    if (
                        Array.isArray(
                            response.data
                        )
                    ) {

                        temasData =
                            response.data;

                    } else if (
                        response.data &&
                        Array.isArray(
                            response.data.temas
                        )
                    ) {

                        temasData =
                            response.data.temas;

                    }


                    if (!montado) {

                        return;

                    }


                    /*
                    |--------------------------------------------------------------------------
                    | ORDENAR
                    |--------------------------------------------------------------------------
                    */

                    temasData =
                        [...temasData].sort(
                            (
                                a,
                                b
                            ) =>
                                (
                                    a.orden ?? 0
                                ) -
                                (
                                    b.orden ?? 0
                                )
                        );


                    setUnidad(
                        unidadData
                    );


                    setTemas(
                        temasData
                    );


                } catch (
                    error: any
                ) {

                    console.error(
                        "❌ Error al cargar temas:",
                        error
                    );


                    console.error(
                        "Respuesta:",
                        error?.response?.data
                    );


                    if (montado) {

                        setError(
                            error?.response?.data?.message ||
                            "No se pudieron cargar los temas."
                        );

                    }

                } finally {

                    if (montado) {

                        setLoading(false);

                    }

                }

            };


        cargarDatos();


        return () => {

            montado = false;

        };

    }, [
        unidadId,
    ]);



    /*
    |--------------------------------------------------------------------------
    | VOLVER A UNIDADES
    |--------------------------------------------------------------------------
    */

    const volverUnidades =
        () => {

            if (materiaId) {

                navigate(
                    `/dashboard/alumno/materias/${materiaId}`
                );

                return;

            }


            navigate(
                "/dashboard/alumno"
            );

        };



    /*
    |--------------------------------------------------------------------------
    | ENTRAR AL TEMA
    |--------------------------------------------------------------------------
    */

    const entrarTema =
        (
            tema: Tema
        ) => {

            navigate(
                `/dashboard/alumno/materias/${materiaId}/unidades/${unidadId}/temas/${tema.id}`
            );

        };



    /*
    |--------------------------------------------------------------------------
    | POSICIONES
    |--------------------------------------------------------------------------
    */

    const posiciones =
        useMemo<PosicionTema[]>(
            () => {

                const cantidad =
                    temas.length;


                if (
                    cantidad === 0
                ) {

                    return [];

                }


                /*
                |--------------------------------------------------------------------------
                | 1 TEMA
                |--------------------------------------------------------------------------
                */

                if (
                    cantidad === 1
                ) {

                    return [
                        {
                            x: 50,
                            y: 50,
                        },
                    ];

                }


                /*
                |--------------------------------------------------------------------------
                | 2 TEMAS
                |--------------------------------------------------------------------------
                */

                if (
                    cantidad === 2
                ) {

                    return [
                        {
                            x: 32,
                            y: 50,
                        },
                        {
                            x: 68,
                            y: 50,
                        },
                    ];

                }


                /*
                |--------------------------------------------------------------------------
                | 3 TEMAS
                |--------------------------------------------------------------------------
                */

                if (
                    cantidad === 3
                ) {

                    return [
                        {
                            x: 20,
                            y: 52,
                        },
                        {
                            x: 50,
                            y: 28,
                        },
                        {
                            x: 80,
                            y: 52,
                        },
                    ];

                }


                /*
                |--------------------------------------------------------------------------
                | 4 TEMAS
                |--------------------------------------------------------------------------
                */

                if (
                    cantidad === 4
                ) {

                    return [
                        {
                            x: 17,
                            y: 32,
                        },
                        {
                            x: 39,
                            y: 67,
                        },
                        {
                            x: 63,
                            y: 30,
                        },
                        {
                            x: 86,
                            y: 65,
                        },
                    ];

                }


                /*
                |--------------------------------------------------------------------------
                | 5 TEMAS
                |--------------------------------------------------------------------------
                */

                if (
                    cantidad === 5
                ) {

                    return [
                        {
                            x: 10,
                            y: 50,
                        },
                        {
                            x: 30,
                            y: 27,
                        },
                        {
                            x: 50,
                            y: 62,
                        },
                        {
                            x: 70,
                            y: 27,
                        },
                        {
                            x: 90,
                            y: 52,
                        },
                    ];

                }


                /*
                |--------------------------------------------------------------------------
                | 6 TEMAS
                |--------------------------------------------------------------------------
                */

                if (
                    cantidad === 6
                ) {

                    return [
                        {
                            x: 10,
                            y: 30,
                        },
                        {
                            x: 28,
                            y: 65,
                        },
                        {
                            x: 45,
                            y: 28,
                        },
                        {
                            x: 62,
                            y: 65,
                        },
                        {
                            x: 78,
                            y: 30,
                        },
                        {
                            x: 92,
                            y: 65,
                        },
                    ];

                }


                /*
                |--------------------------------------------------------------------------
                | 7+
                |--------------------------------------------------------------------------
                */

                const base:
                    PosicionTema[] = [

                        {
                            x: 8,
                            y: 32,
                        },

                        {
                            x: 21,
                            y: 68,
                        },

                        {
                            x: 35,
                            y: 28,
                        },

                        {
                            x: 49,
                            y: 64,
                        },

                        {
                            x: 63,
                            y: 28,
                        },

                        {
                            x: 77,
                            y: 68,
                        },

                        {
                            x: 91,
                            y: 34,
                        },

                        {
                            x: 84,
                            y: 82,
                        },

                        {
                            x: 65,
                            y: 82,
                        },

                        {
                            x: 47,
                            y: 84,
                        },

                        {
                            x: 28,
                            y: 82,
                        },

                        {
                            x: 10,
                            y: 82,
                        },

                    ];


                return base.slice(
                    0,
                    cantidad
                );

            },
            [
                temas.length,
            ]
        );



    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div
                className="
                    flex
                    min-h-full
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
                        gap-5
                    "
                >

                    <div
                        className="
                            relative
                            flex
                            h-20
                            w-20
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
                                h-14
                                w-14
                                items-center
                                justify-center
                                rounded-2xl
                                border
                                border-violet-500/30
                                bg-violet-500/10
                            "
                        >

                            <Loader2
                                size={26}
                                className="
                                    animate-spin
                                    text-violet-400
                                "
                            />

                        </div>

                    </div>


                    <div
                        className="
                            text-center
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-[var(--nexus-text)]
                            "
                        >

                            Explorando la unidad...

                        </p>


                        <p
                            className="
                                mt-1
                                text-xs
                                text-[var(--nexus-text-muted)]
                            "
                        >

                            Preparando tus temas

                        </p>

                    </div>

                </div>

            </div>

        );

    }



    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (

            <div
                className="
                    flex
                    min-h-full
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
                        p-8
                        text-center
                        shadow-2xl
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
                            bg-red-500/10
                        "
                    >

                        <AlertCircle
                            size={28}
                            className="
                                text-red-400
                            "
                        />

                    </div>


                    <h2
                        className="
                            mt-5
                            text-xl
                            font-bold
                            text-[var(--nexus-text)]
                        "
                    >

                        No pudimos abrir la unidad

                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            leading-6
                            text-[var(--nexus-text-muted)]
                        "
                    >

                        {error}

                    </p>


                    <button
                        type="button"
                        onClick={
                            volverUnidades
                        }
                        className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-violet-600
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition-all
                            hover:bg-violet-500
                            hover:shadow-[0_0_30px_rgba(124,58,237,0.35)]
                        "
                    >

                        <ArrowLeft
                            size={17}
                        />

                        Volver a unidades

                    </button>

                </div>

            </div>

        );

    }



    /*
    |--------------------------------------------------------------------------
    | VISTA
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                relative
                min-h-full
                overflow-auto
                bg-[var(--nexus-bg)]
            "
        >


            {/* =========================================================
                FONDO
            ========================================================= */}

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
                        -left-32
                        top-10
                        h-[450px]
                        w-[450px]
                        rounded-full
                        bg-violet-700/10
                        blur-[140px]
                    "
                />


                <div
                    className="
                        absolute
                        right-[-100px]
                        top-[35%]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-blue-700/10
                        blur-[150px]
                    "
                />


                <div
                    className="
                        absolute
                        bottom-[-180px]
                        left-[30%]
                        h-[500px]
                        w-[500px]
                        rounded-full
                        bg-fuchsia-700/8
                        blur-[150px]
                    "
                />

            </div>



            {/* =========================================================
                ESTRELLAS
            ========================================================= */}

            <div
                className="
                    pointer-events-none
                    fixed
                    inset-0
                "
            >

                <span className="
                    absolute
                    left-[8%]
                    top-[15%]
                    h-1
                    w-1
                    rounded-full
                    bg-white
                    opacity-70
                " />

                <span className="
                    absolute
                    left-[23%]
                    top-[27%]
                    h-[3px]
                    w-[3px]
                    rounded-full
                    bg-violet-300
                " />

                <span className="
                    absolute
                    left-[44%]
                    top-[10%]
                    h-1
                    w-1
                    rounded-full
                    bg-white
                    opacity-60
                " />

                <span className="
                    absolute
                    right-[20%]
                    top-[19%]
                    h-[3px]
                    w-[3px]
                    rounded-full
                    bg-blue-300
                " />

                <span className="
                    absolute
                    right-[8%]
                    top-[42%]
                    h-1
                    w-1
                    rounded-full
                    bg-white
                    opacity-60
                " />

                <span className="
                    absolute
                    left-[15%]
                    bottom-[18%]
                    h-[3px]
                    w-[3px]
                    rounded-full
                    bg-violet-300
                " />

                <span className="
                    absolute
                    left-[47%]
                    bottom-[11%]
                    h-1
                    w-1
                    rounded-full
                    bg-white
                " />

                <span className="
                    absolute
                    right-[24%]
                    bottom-[20%]
                    h-[3px]
                    w-[3px]
                    rounded-full
                    bg-blue-300
                " />

            </div>



            {/* =========================================================
                CONTENEDOR
            ========================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    max-w-7xl
                    px-4
                    py-6
                    sm:px-6
                    lg:px-10
                    lg:py-8
                "
            >


                {/* =====================================================
                    VOLVER
                ===================================================== */}

                <button
                    type="button"
                    onClick={
                        volverUnidades
                    }
                    className="
                        group
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        px-1
                        py-1
                        text-sm
                        font-medium
                        text-[var(--nexus-text-muted)]
                        transition-all
                        hover:text-[var(--nexus-text)]
                    "
                >

                    <ArrowLeft
                        size={17}
                        className="
                            transition-transform
                            duration-200
                            group-hover:-translate-x-1
                        "
                    />

                    Volver a unidades

                </button>



                {/* =====================================================
                    CABECERA DE UNIDAD
                ===================================================== */}

                <div
                    className="
                        relative
                        mt-6
                        overflow-hidden
                        rounded-[2rem]
                        border
                        border-[var(--nexus-border)]
                        bg-[var(--nexus-surface)]
                        shadow-[0_25px_100px_rgba(0,0,0,0.25)]
                    "
                >

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-[-100px]
                            top-[-180px]
                            h-[450px]
                            w-[450px]
                            rounded-full
                            bg-violet-600/10
                            blur-[120px]
                        "
                    />


                    <div
                        className="
                            pointer-events-none
                            absolute
                            bottom-[-200px]
                            left-[35%]
                            h-[400px]
                            w-[400px]
                            rounded-full
                            bg-blue-600/8
                            blur-[120px]
                        "
                    />


                    <div
                        className="
                            relative
                            p-6
                            sm:p-8
                            lg:p-10
                        "
                    >

                        <div
                            className="
                                flex
                                items-start
                                gap-4
                            "
                        >

                            <div
                                className="
                                    relative
                                    flex
                                    h-16
                                    w-16
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-violet-500/25
                                    bg-violet-500/10
                                    shadow-[0_0_40px_rgba(124,58,237,0.18)]
                                "
                            >

                                <Layers
                                    size={29}
                                    className="
                                        text-violet-400
                                    "
                                />


                                <Sparkles
                                    size={13}
                                    className="
                                        absolute
                                        -right-1
                                        -top-1
                                        text-fuchsia-400
                                    "
                                />

                            </div>


                            <div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >

                                    <Orbit
                                        size={13}
                                        className="
                                            text-violet-400
                                        "
                                    />

                                    <p
                                        className="
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-[3px]
                                            text-violet-400
                                        "
                                    >

                                        Unidad de aprendizaje

                                    </p>

                                </div>


                                <h1
                                    className="
                                        mt-2
                                        text-3xl
                                        font-black
                                        tracking-tight
                                        text-[var(--nexus-text)]
                                        sm:text-4xl
                                    "
                                >

                                    {
                                        unidad?.nombre ||
                                        "Unidad"
                                    }

                                </h1>

                            </div>

                        </div>


                        {
                            unidad?.descripcion && (

                                <p
                                    className="
                                        mt-6
                                        max-w-3xl
                                        text-sm
                                        leading-7
                                        text-[var(--nexus-text-secondary)]
                                        sm:text-base
                                    "
                                >

                                    {
                                        unidad.descripcion
                                    }

                                </p>

                            )
                        }


                        <div
                            className="
                                mt-7
                                flex
                                flex-wrap
                                items-center
                                gap-3
                            "
                        >

                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-violet-500/15
                                    bg-violet-500/5
                                    px-4
                                    py-2
                                    text-xs
                                    font-semibold
                                    text-violet-300
                                "
                            >

                                <BookOpen
                                    size={14}
                                />

                                {
                                    temas.length
                                }{" "}

                                {
                                    temas.length === 1
                                        ? "tema"
                                        : "temas"
                                }

                            </div>


                            <div
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/5
                                    bg-white/[0.02]
                                    px-4
                                    py-2
                                    text-xs
                                    text-[var(--nexus-text-muted)]
                                "
                            >

                                <Sparkles
                                    size={13}
                                    className="
                                        text-violet-400
                                    "
                                />

                                Explora la unidad a tu ritmo

                            </div>

                        </div>

                    </div>

                </div>



                {/* =====================================================
                    TÍTULO
                ===================================================== */}

                <div
                    className="
                        mt-10
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <Rocket
                            size={15}
                            className="
                                text-violet-400
                            "
                        />

                        <span
                            className="
                                text-xs
                                font-bold
                                uppercase
                                tracking-[3px]
                                text-violet-400
                            "
                        >

                            Ruta de aprendizaje

                        </span>

                    </div>


                    <h2
                        className="
                            mt-2
                            text-2xl
                            font-black
                            text-[var(--nexus-text)]
                            sm:text-3xl
                        "
                    >

                        Temas de la unidad

                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-[var(--nexus-text-muted)]
                        "
                    >

                        Explora cada tema para descubrir su contenido.

                    </p>

                </div>



                {/* =====================================================
                    MAPA
                ===================================================== */}

                {
                    temas.length > 0 ? (

                        <div
                            className="
                                relative
                                mt-6
                                min-h-[680px]
                                overflow-hidden
                                rounded-[2rem]
                                border
                                border-violet-500/10
                                bg-[#02030A]
                                shadow-[0_30px_120px_rgba(0,0,0,0.45)]
                            "
                        >

                            {/* GRID */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    opacity-[0.13]
                                    [background-image:linear-gradient(rgba(139,92,246,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.15)_1px,transparent_1px)]
                                    [background-size:65px_65px]
                                "
                            />


                            {/* NEBULOSAS */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    left-[8%]
                                    top-[12%]
                                    h-72
                                    w-72
                                    rounded-full
                                    bg-violet-700/10
                                    blur-[100px]
                                "
                            />


                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    right-[5%]
                                    top-[35%]
                                    h-80
                                    w-80
                                    rounded-full
                                    bg-blue-700/10
                                    blur-[120px]
                                "
                            />


                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    bottom-[-100px]
                                    left-[35%]
                                    h-72
                                    w-72
                                    rounded-full
                                    bg-fuchsia-700/8
                                    blur-[120px]
                                "
                            />



                            {/* =================================================
                                CONEXIONES
                            ================================================= */}

                            {
                                temas.length > 1 && (

                                    <svg
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                        "
                                        preserveAspectRatio="none"
                                    >

                                        {
                                            temas
                                                .slice(
                                                    0,
                                                    -1
                                                )
                                                .map(
                                                    (
                                                        _,
                                                        index
                                                    ) => {

                                                        const actual =
                                                            posiciones[
                                                                index
                                                            ];

                                                        const siguiente =
                                                            posiciones[
                                                                index + 1
                                                            ];


                                                        if (
                                                            !actual ||
                                                            !siguiente
                                                        ) {

                                                            return null;

                                                        }


                                                        return (

                                                            <g
                                                                key={
                                                                    `conexion-${index}`
                                                                }
                                                            >

                                                                <line
                                                                    x1={
                                                                        `${actual.x}%`
                                                                    }
                                                                    y1={
                                                                        `${actual.y}%`
                                                                    }
                                                                    x2={
                                                                        `${siguiente.x}%`
                                                                    }
                                                                    y2={
                                                                        `${siguiente.y}%`
                                                                    }
                                                                    stroke="rgba(124,58,237,0.18)"
                                                                    strokeWidth="12"
                                                                />


                                                                <line
                                                                    x1={
                                                                        `${actual.x}%`
                                                                    }
                                                                    y1={
                                                                        `${actual.y}%`
                                                                    }
                                                                    x2={
                                                                        `${siguiente.x}%`
                                                                    }
                                                                    y2={
                                                                        `${siguiente.y}%`
                                                                    }
                                                                    stroke="rgba(139,92,246,0.55)"
                                                                    strokeWidth="2"
                                                                    strokeDasharray="7 9"
                                                                />

                                                            </g>

                                                        );

                                                    }
                                                )
                                        }

                                    </svg>

                                )
                            }



                            {/* =================================================
                                TEMAS
                            ================================================= */}

                            {
                                temas.map(
                                    (
                                        tema,
                                        index
                                    ) => {

                                        const posicion =
                                            posiciones[
                                                index
                                            ];


                                        if (
                                            !posicion
                                        ) {

                                            return null;

                                        }


                                        const activo =
                                            temaHover ===
                                            tema.id;


                                        return (

                                            <button
                                                key={
                                                    tema.id
                                                }
                                                type="button"
                                                onMouseEnter={() =>
                                                    setTemaHover(
                                                        tema.id
                                                    )
                                                }
                                                onMouseLeave={() =>
                                                    setTemaHover(
                                                        null
                                                    )
                                                }
                                                onFocus={() =>
                                                    setTemaHover(
                                                        tema.id
                                                    )
                                                }
                                                onBlur={() =>
                                                    setTemaHover(
                                                        null
                                                    )
                                                }
                                                onClick={() =>
                                                    entrarTema(
                                                        tema
                                                    )
                                                }
                                                style={{
                                                    left:
                                                        `${posicion.x}%`,
                                                    top:
                                                        `${posicion.y}%`,
                                                }}
                                                className="
                                                    group
                                                    absolute
                                                    z-20
                                                    -translate-x-1/2
                                                    -translate-y-1/2
                                                    outline-none
                                                "
                                            >

                                                {/* GLOW */}

                                                <div
                                                    className={`
                                                        absolute
                                                        left-1/2
                                                        top-1/2
                                                        h-32
                                                        w-32
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


                                                {/* ÓRBITA */}

                                                <div
                                                    className={`
                                                        absolute
                                                        left-1/2
                                                        top-1/2
                                                        h-28
                                                        w-28
                                                        -translate-x-1/2
                                                        -translate-y-1/2
                                                        rounded-full
                                                        border
                                                        border-violet-500/15
                                                        transition-all
                                                        duration-500
                                                        ${
                                                            activo
                                                                ? "scale-125 rotate-12 border-violet-400/40"
                                                                : ""
                                                        }
                                                    `}
                                                />


                                                {/* PLANETA */}

                                                <div
                                                    className={`
                                                        relative
                                                        flex
                                                        h-[76px]
                                                        w-[76px]
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        bg-gradient-to-br
                                                        from-violet-500/25
                                                        via-[#12102B]
                                                        to-[#060711]
                                                        shadow-[0_0_30px_rgba(124,58,237,0.35)]
                                                        transition-all
                                                        duration-300
                                                        ${
                                                            activo
                                                                ? "scale-110 border-violet-300 shadow-[0_0_55px_rgba(124,58,237,0.75)]"
                                                                : "border-violet-500/45"
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className="
                                                            absolute
                                                            left-3
                                                            top-3
                                                            h-4
                                                            w-4
                                                            rounded-full
                                                            bg-violet-300/50
                                                            blur-md
                                                        "
                                                    />


                                                    <div
                                                        className="
                                                            absolute
                                                            bottom-4
                                                            right-5
                                                            h-2
                                                            w-3
                                                            rounded-full
                                                            bg-violet-900/70
                                                        "
                                                    />


                                                    <CircleDot
                                                        size={23}
                                                        className="
                                                            relative
                                                            z-10
                                                            text-violet-200
                                                        "
                                                    />

                                                </div>



                                                {/* NÚMERO */}

                                                <div
                                                    className="
                                                        absolute
                                                        -right-1
                                                        -top-1
                                                        flex
                                                        h-7
                                                        w-7
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        border
                                                        border-violet-300/30
                                                        bg-[#0B0B18]
                                                        text-[10px]
                                                        font-black
                                                        text-violet-300
                                                        shadow-[0_0_15px_rgba(124,58,237,0.35)]
                                                    "
                                                >

                                                    {
                                                        String(
                                                            tema.orden ||
                                                            index + 1
                                                        ).padStart(
                                                            2,
                                                            "0"
                                                        )}

                                                </div>



                                                {/* TEXTO */}

                                                <div
                                                    className="
                                                        absolute
                                                        left-1/2
                                                        top-[100px]
                                                        w-48
                                                        -translate-x-1/2
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-[10px]
                                                            font-bold
                                                            uppercase
                                                            tracking-[2.5px]
                                                            text-violet-400
                                                        "
                                                    >

                                                        Tema{" "}

                                                        {
                                                            tema.orden ||
                                                            index + 1
                                                        }

                                                    </p>


                                                    <p
                                                        className="
                                                            mt-1
                                                            line-clamp-2
                                                            text-sm
                                                            font-bold
                                                            leading-5
                                                            text-white
                                                            transition-all
                                                            duration-200
                                                            group-hover:text-violet-200
                                                        "
                                                    >

                                                        {
                                                            tema.nombre
                                                        }

                                                    </p>

                                                </div>



                                                {/* TOOLTIP */}

                                                <div
                                                    className={`
                                                        pointer-events-none
                                                        absolute
                                                        bottom-[125px]
                                                        left-1/2
                                                        z-50
                                                        w-60
                                                        -translate-x-1/2
                                                        rounded-2xl
                                                        border
                                                        border-violet-500/20
                                                        bg-[#090A15]/95
                                                        p-4
                                                        text-left
                                                        shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                                                        backdrop-blur-xl
                                                        transition-all
                                                        duration-200
                                                        ${
                                                            activo
                                                                ? "translate-y-0 opacity-100"
                                                                : "translate-y-2 opacity-0"
                                                        }
                                                    `}
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-2
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                h-7
                                                                w-7
                                                                items-center
                                                                justify-center
                                                                rounded-lg
                                                                bg-violet-500/10
                                                            "
                                                        >

                                                            <CircleDot
                                                                size={14}
                                                                className="
                                                                    text-violet-400
                                                                "
                                                            />

                                                        </div>


                                                        <span
                                                            className="
                                                                text-[10px]
                                                                font-black
                                                                uppercase
                                                                tracking-[2px]
                                                                text-violet-400
                                                            "
                                                        >

                                                            Tema{" "}

                                                            {
                                                                tema.orden ||
                                                                index + 1
                                                            }

                                                        </span>

                                                    </div>


                                                    <p
                                                        className="
                                                            mt-3
                                                            text-sm
                                                            font-bold
                                                            text-white
                                                        "
                                                    >

                                                        {
                                                            tema.nombre
                                                        }

                                                    </p>


                                                    {
                                                        tema.descripcion && (

                                                            <p
                                                                className="
                                                                    mt-2
                                                                    line-clamp-3
                                                                    text-xs
                                                                    leading-5
                                                                    text-slate-400
                                                                "
                                                            >

                                                                {
                                                                    tema.descripcion
                                                                }

                                                            </p>

                                                        )
                                                    }


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

                                                        Ver contenido

                                                        <ChevronRight
                                                            size={12}
                                                        />

                                                    </div>

                                                </div>

                                            </button>

                                        );

                                    }
                                )
                            }



                            {/* CENTRO */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    left-1/2
                                    top-1/2
                                    hidden
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    lg:block
                                "
                            >

                                <div
                                    className="
                                        relative
                                        flex
                                        h-36
                                        w-36
                                        items-center
                                        justify-center
                                    "
                                >

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            animate-pulse
                                            rounded-full
                                            bg-violet-600/10
                                            blur-3xl
                                        "
                                    />


                                    <div
                                        className="
                                            absolute
                                            inset-3
                                            rounded-full
                                            border
                                            border-violet-500/10
                                        "
                                    />


                                    <div
                                        className="
                                            absolute
                                            inset-8
                                            rounded-full
                                            border
                                            border-blue-500/10
                                        "
                                    />


                                    <Sparkles
                                        size={23}
                                        className="
                                            relative
                                            text-violet-400/30
                                        "
                                    />

                                </div>

                            </div>



                            {/* PIE */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    bottom-6
                                    left-1/2
                                    hidden
                                    -translate-x-1/2
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/5
                                    bg-black/20
                                    px-5
                                    py-2.5
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-[2px]
                                    text-slate-500
                                    backdrop-blur-md
                                    md:flex
                                "
                            >

                                <Sparkles
                                    size={12}
                                    className="
                                        text-violet-400/60
                                    "
                                />

                                Explora los temas de esta unidad

                            </div>

                        </div>

                    ) : (

                        /* =====================================================
                           SIN TEMAS
                        ===================================================== */

                        <div
                            className="
                                mt-6
                                flex
                                min-h-[420px]
                                items-center
                                justify-center
                                rounded-[2rem]
                                border
                                border-dashed
                                border-[var(--nexus-border)]
                                bg-[var(--nexus-surface)]
                                p-8
                            "
                        >

                            <div
                                className="
                                    max-w-md
                                    text-center
                                "
                            >

                                <div
                                    className="
                                        relative
                                        mx-auto
                                        flex
                                        h-24
                                        w-24
                                        items-center
                                        justify-center
                                    "
                                >

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            rounded-full
                                            bg-violet-500/10
                                            blur-2xl
                                        "
                                    />


                                    <div
                                        className="
                                            relative
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
                                            size={27}
                                            className="
                                                text-violet-400
                                            "
                                        />

                                    </div>

                                </div>


                                <h2
                                    className="
                                        mt-5
                                        text-xl
                                        font-bold
                                        text-[var(--nexus-text)]
                                    "
                                >

                                    Aún no hay temas

                                </h2>


                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-[var(--nexus-text-muted)]
                                    "
                                >

                                    Esta unidad todavía no tiene
                                    temas disponibles.

                                </p>


                                <button
                                    type="button"
                                    onClick={
                                        volverUnidades
                                    }
                                    className="
                                        mt-6
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-xl
                                        border
                                        border-[var(--nexus-border)]
                                        bg-[var(--nexus-surface)]
                                        px-5
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-[var(--nexus-text-secondary)]
                                        transition
                                        hover:border-violet-500/30
                                        hover:text-violet-400
                                    "
                                >

                                    <ArrowLeft
                                        size={16}
                                    />

                                    Volver a unidades

                                </button>

                            </div>

                        </div>

                    )
                }



                {
                    temas.length > 0 && (

                        <div
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                py-7
                                text-xs
                                text-[var(--nexus-text-muted)]
                            "
                        >

                            <Sparkles
                                size={13}
                                className="
                                    text-violet-400
                                "
                            />

                            Cada tema contiene una parte de tu aprendizaje.

                        </div>

                    )
                }

            </div>

        </div>

    );

}
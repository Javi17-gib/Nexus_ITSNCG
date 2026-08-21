import {
    useEffect,
    useState,
} from "react";

import {
    Plus,
    X,
    Users,
} from "lucide-react";


import GalaxyBackground
    from "../../components/alumno/GalaxyBackground";

import GalaxyCenter
    from "../../components/alumno/GalaxyCenter";

import GalaxyLayout
    from "../../components/alumno/GalaxyLayout";

import GalaxyLines
    from "../../components/alumno/GalaxyLines";

import MateriaNode
    from "../../components/alumno/MateriaNode";

import NexusConnections
    from "../../components/common/NexusConnections";


import {
    getMisGruposRequest,
    unirseGrupoRequest,
} from "../../api/grupos";


import type {
    Materia,
} from "../../api/materias";


/*
|--------------------------------------------------------------------------
| POSICIÓN DE LA GALAXIA
|--------------------------------------------------------------------------
*/

interface GalaxyPosition {

    x: number;

    y: number;

}


/*
|--------------------------------------------------------------------------
| GRUPO DEL ALUMNO
|--------------------------------------------------------------------------
*/

interface GrupoAlumno {

    id: number;

    nombre: string;

    materia_id: number;

    docente_id: number;

    codigo_acceso: string;

    semestre: string;

    periodo: string;

    activo: boolean;

    materia?: Materia;

}


/*
|--------------------------------------------------------------------------
| DASHBOARD ALUMNO
|--------------------------------------------------------------------------
*/

export default function DashboardAlumno() {


    /*
    |--------------------------------------------------------------------------
    | MATERIAS
    |--------------------------------------------------------------------------
    */

    const [
        materias,
        setMaterias,
    ] = useState<Materia[]>([]);


    /*
    |--------------------------------------------------------------------------
    | GRUPOS DEL ALUMNO
    |--------------------------------------------------------------------------
    */

    const [
        grupos,
        setGrupos,
    ] = useState<GrupoAlumno[]>([]);


    /*
    |--------------------------------------------------------------------------
    | POSICIONES DE LA GALAXIA
    |--------------------------------------------------------------------------
    */

    const [
        positions,
        setPositions,
    ] = useState<GalaxyPosition[]>([]);


    /*
    |--------------------------------------------------------------------------
    | ESTADOS
    |--------------------------------------------------------------------------
    */

    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState<string | null>(
        null
    );


    /*
    |--------------------------------------------------------------------------
    | MODAL UNIRSE A GRUPO
    |--------------------------------------------------------------------------
    */

    const [
        mostrarModalGrupo,
        setMostrarModalGrupo,
    ] = useState(false);


    const [
        codigoGrupo,
        setCodigoGrupo,
    ] = useState("");


    const [
        enviandoSolicitud,
        setEnviandoSolicitud,
    ] = useState(false);


    const [
        mensajeGrupo,
        setMensajeGrupo,
    ] = useState<string | null>(
        null
    );


    const [
        errorGrupo,
        setErrorGrupo,
    ] = useState<string | null>(
        null
    );


    /*
    |--------------------------------------------------------------------------
    | CARGAR GRUPOS DEL ALUMNO
    |--------------------------------------------------------------------------
    |
    | Ya NO cargamos todas las materias.
    |
    | Ahora obtenemos:
    |
    | GET /mis-grupos
    |
    | Laravel devuelve únicamente los grupos
    | donde el alumno fue aceptado.
    |
    | Cada grupo trae:
    |
    | grupo.materia
    |
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        let montado = true;


        const cargarGrupos =
            async () => {

                try {

                    console.log(
                        "🌌 Cargando grupos del alumno..."
                    );


                    setLoading(
                        true
                    );


                    setError(
                        null
                    );


                    /*
                    |--------------------------------------------------------------------------
                    | OBTENER GRUPOS ACEPTADOS
                    |--------------------------------------------------------------------------
                    */

                    const respuesta =
                        await getMisGruposRequest();


                    console.log(
                        "👥 Grupos recibidos:",
                        respuesta
                    );


                    if (!montado) {

                        return;

                    }


                    /*
                    |--------------------------------------------------------------------------
                    | ASEGURAR ARRAY
                    |--------------------------------------------------------------------------
                    */

                    const gruposAlumno:
                        GrupoAlumno[] =
                        Array.isArray(
                            respuesta
                        )
                            ? respuesta
                            : [];


                    setGrupos(
                        gruposAlumno
                    );


                    /*
                    |--------------------------------------------------------------------------
                    | OBTENER MATERIAS DE LOS GRUPOS
                    |--------------------------------------------------------------------------
                    */

                    const materiasEncontradas:
                        Materia[] =
                        gruposAlumno
                            .map(
                                (
                                    grupo
                                ) =>
                                    grupo.materia
                            )
                            .filter(
                                (
                                    materia
                                ): materia is Materia =>
                                    Boolean(
                                        materia
                                    )
                            );


                    console.log(
                        "📚 Materias encontradas:",
                        materiasEncontradas
                    );


                    /*
                    |--------------------------------------------------------------------------
                    | ELIMINAR MATERIAS DUPLICADAS
                    |--------------------------------------------------------------------------
                    |
                    | Ejemplo:
                    |
                    | 5A → Matemáticas
                    | 5B → Programación
                    | 6A → Matemáticas
                    |
                    | Resultado:
                    |
                    | Matemáticas
                    | Programación
                    |
                    |--------------------------------------------------------------------------
                    */

                    const materiasUnicas =
                        Array.from(
                            new Map(
                                materiasEncontradas.map(
                                    (
                                        materia
                                    ) => [
                                        materia.id,
                                        materia
                                    ]
                                )
                            ).values()
                        );


                    /*
                    |--------------------------------------------------------------------------
                    | SOLO MATERIAS ACTIVAS
                    |--------------------------------------------------------------------------
                    */

                    const materiasActivas =
                        materiasUnicas.filter(
                            (
                                materia
                            ) =>
                                materia.activa !== false
                        );


                    console.log(
                        "🌌 Materias disponibles:",
                        materiasActivas
                    );


                    setMaterias(
                        materiasActivas
                    );


                    /*
                    |--------------------------------------------------------------------------
                    | FINALIZAR CARGA
                    |--------------------------------------------------------------------------
                    */

                    setLoading(
                        false
                    );


                } catch (
                    error: any
                ) {

                    console.error(
                        "❌ ERROR AL CARGAR GRUPOS"
                    );


                    console.error(
                        "Error completo:",
                        error
                    );


                    console.error(
                        "Respuesta del servidor:",
                        error?.response?.data
                    );


                    console.error(
                        "Código HTTP:",
                        error?.response?.status
                    );


                    console.error(
                        "URL:",
                        error?.config?.url
                    );


                    if (montado) {

                        setError(
                            "No fue posible cargar tus grupos."
                        );


                        setLoading(
                            false
                        );

                    }

                }

            };


        cargarGrupos();


        return () => {

            montado = false;

        };

    }, []);


    /*
    |--------------------------------------------------------------------------
    | SOLICITAR UNIRSE A GRUPO
    |--------------------------------------------------------------------------
    */

    const solicitarUnirse =
        async () => {

            const codigo =
                codigoGrupo
                    .trim()
                    .toUpperCase();


            /*
            |--------------------------------------------------------------------------
            | VALIDAR CÓDIGO
            |--------------------------------------------------------------------------
            */

            if (!codigo) {

                setErrorGrupo(
                    "Escribe el código de acceso."
                );

                return;

            }


            try {

                setEnviandoSolicitud(
                    true
                );


                setMensajeGrupo(
                    null
                );


                setErrorGrupo(
                    null
                );


                console.log(
                    "📩 Enviando solicitud al grupo:",
                    codigo
                );


                /*
                |--------------------------------------------------------------------------
                | ENVIAR AL BACKEND
                |--------------------------------------------------------------------------
                */

                const respuesta =
                    await unirseGrupoRequest(
                        codigo
                    );


                console.log(
                    "✅ Solicitud enviada:",
                    respuesta
                );


                /*
                |--------------------------------------------------------------------------
                | MENSAJE DE ÉXITO
                |--------------------------------------------------------------------------
                */

                setMensajeGrupo(
                    respuesta?.message ||
                    "Solicitud enviada correctamente."
                );


                /*
                |--------------------------------------------------------------------------
                | LIMPIAR CÓDIGO
                |--------------------------------------------------------------------------
                */

                setCodigoGrupo("");


            } catch (
                error: any
            ) {

                console.error(
                    "❌ ERROR AL SOLICITAR UNIRSE"
                );


                console.error(
                    "Error completo:",
                    error
                );


                console.error(
                    "Respuesta:",
                    error?.response?.data
                );


                /*
                |--------------------------------------------------------------------------
                | MENSAJE DEL BACKEND
                |--------------------------------------------------------------------------
                */

                setErrorGrupo(
                    error?.response?.data?.message ||
                    "No fue posible enviar la solicitud."
                );


            } finally {

                setEnviandoSolicitud(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CALCULAR POSICIONES DE LA GALAXIA
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            materias.length === 0
        ) {

            setPositions([]);

            return;

        }


        const calcularPosiciones =
            () => {

                const width =
                    window.innerWidth;


                const height =
                    window.innerHeight;


                const isMobile =
                    width < 640;


                const isTablet =
                    width >= 640 &&
                    width < 1024;


                let radioX =
                    330;


                let radioY =
                    230;


                /*
                |--------------------------------------------------------------------------
                | MOBILE
                |--------------------------------------------------------------------------
                */

                if (isMobile) {

                    radioX =
                        Math.min(
                            width * 0.36,
                            170
                        );


                    radioY =
                        Math.min(
                            height * 0.30,
                            170
                        );

                }


                /*
                |--------------------------------------------------------------------------
                | TABLET
                |--------------------------------------------------------------------------
                */

                else if (isTablet) {

                    radioX =
                        Math.min(
                            width * 0.32,
                            260
                        );


                    radioY =
                        Math.min(
                            height * 0.30,
                            210
                        );

                }


                /*
                |--------------------------------------------------------------------------
                | DESKTOP
                |--------------------------------------------------------------------------
                */

                else {

                    radioX =
                        Math.min(
                            width * 0.30,
                            380
                        );


                    radioY =
                        Math.min(
                            height * 0.31,
                            270
                        );

                }


                /*
                |--------------------------------------------------------------------------
                | CREAR POSICIONES
                |--------------------------------------------------------------------------
                */

                const nuevasPosiciones:
                    GalaxyPosition[] = [];


                materias.forEach(
                    (
                        _,
                        index
                    ) => {

                        const angle =
                            (
                                Math.PI *
                                2 *
                                index
                            ) /
                                materias.length -
                            Math.PI / 2;


                        const variation =
                            index % 2 === 0
                                ? 1
                                : 0.88;


                        nuevasPosiciones.push({

                            x:
                                Math.cos(angle) *
                                radioX *
                                variation,

                            y:
                                Math.sin(angle) *
                                radioY *
                                variation,

                        });

                    }
                );


                setPositions(
                    nuevasPosiciones
                );

            };


        calcularPosiciones();


        window.addEventListener(
            "resize",
            calcularPosiciones
        );


        return () => {

            window.removeEventListener(
                "resize",
                calcularPosiciones
            );

        };

    }, [materias]);


    /*
    |--------------------------------------------------------------------------
    | COLORES PARA LAS CONEXIONES
    |--------------------------------------------------------------------------
    */

    const colores =
        materias.map(
            (
                materia
            ) =>
                materia.color ||
                "#8B5CF6"
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
                    relative
                    w-full
                    h-full
                    overflow-hidden
                    bg-[#02030A]
                    flex
                    items-center
                    justify-center
                "
            >

                <GalaxyBackground />


                <div
                    className="
                        relative
                        z-50
                        flex
                        flex-col
                        items-center
                        gap-4
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            border-2
                            border-violet-500/20
                            border-t-violet-400
                            animate-spin
                        "
                    />


                    <p
                        className="
                            text-sm
                            text-slate-400
                        "
                    >

                        Explorando el universo...

                    </p>

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
                    relative
                    w-full
                    h-full
                    overflow-hidden
                    bg-[#02030A]
                    flex
                    items-center
                    justify-center
                "
            >

                <GalaxyBackground />


                <div
                    className="
                        relative
                        z-50
                        max-w-sm
                        text-center
                        px-6
                    "
                >

                    <div
                        className="
                            w-16
                            h-16
                            mx-auto
                            rounded-full
                            bg-red-500/10
                            border
                            border-red-500/20
                            flex
                            items-center
                            justify-center
                            text-red-400
                            text-2xl
                        "
                    >

                        !

                    </div>


                    <h2
                        className="
                            mt-5
                            text-lg
                            font-bold
                            text-white
                        "
                    >

                        No pudimos cargar tu galaxia

                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >

                        {error}

                    </p>

                </div>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                relative
                w-full
                h-full
                overflow-hidden
            "
        >


            {/* =====================================================
                FONDO DE GALAXIA
            ===================================================== */}

            <GalaxyBackground />


            {/* =====================================================
                CONEXIONES
            ===================================================== */}

            {
                positions.length ===
                    materias.length &&
                materias.length > 0 && (

                    <GalaxyLines
                        positions={
                            positions
                        }
                        colors={
                            colores
                        }
                    />

                )
            }


            {/* =====================================================
                MATERIAS
            ===================================================== */}

            {
                positions.length ===
                    materias.length &&
                materias.length > 0 && (

                    <GalaxyLayout
                        total={
                            materias.length
                        }
                    >

                        {

                            (
                                _position,
                                index
                            ) => {

                                const materia =
                                    materias[index];


                                const position =
                                    positions[index];


                                return (

                                    <MateriaNode

                                        nombre={
                                            materia.nombre
                                        }

                                        color={
                                            materia.color ||
                                            "#8B5CF6"
                                        }

                                        icono={
                                            materia.icono ||
                                            undefined
                                        }

                                        unidades={
                                            materia.unidades_count ||
                                            0
                                        }

                                        x={
                                            position.x
                                        }

                                        y={
                                            position.y
                                        }

                                        onClick={() => {

                                            console.log(
                                                "📚 Materia seleccionada:",
                                                materia
                                            );

                                        }}

                                    />

                                );

                            }

                        }

                    </GalaxyLayout>

                )
            }


            {/* =====================================================
                SIN MATERIAS
            ===================================================== */}

            {
                materias.length === 0 && (

                    <div
                        className="
                            absolute
                            inset-0
                            z-40
                            flex
                            items-center
                            justify-center
                            pointer-events-none
                        "
                    >

                        <div
                            className="
                                text-center
                                max-w-sm
                                px-6
                            "
                        >

                            <div
                                className="
                                    mx-auto
                                    w-20
                                    h-20
                                    rounded-full
                                    border
                                    border-violet-500/20
                                    bg-violet-500/5
                                    flex
                                    items-center
                                    justify-center
                                    text-3xl
                                "
                            >

                                ✦

                            </div>


                            <h2
                                className="
                                    mt-5
                                    text-xl
                                    font-bold
                                    text-white
                                "
                            >

                                Tu universo está esperando

                            </h2>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    text-slate-500
                                "
                            >

                                Todavía no tienes materias
                                disponibles.

                            </p>

                        </div>

                    </div>

                )
            }


            {/* =====================================================
                NÚCLEO
            ===================================================== */}

            <GalaxyCenter />


            {/* =====================================================
                BOTÓN UNIRSE A GRUPO
            ===================================================== */}

            <button
                type="button"
                onClick={() => {

                    setMostrarModalGrupo(
                        true
                    );

                    setMensajeGrupo(
                        null
                    );

                    setErrorGrupo(
                        null
                    );

                }}
                className="
                    absolute
                    left-6
                    bottom-6
                    z-[100]
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-violet-400/20
                    bg-[#11101B]/90
                    px-5
                    py-3.5
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_0_30px_rgba(124,58,237,0.18)]
                    backdrop-blur-xl
                    transition-all
                    duration-200
                    hover:border-violet-400/40
                    hover:bg-[#171326]
                    hover:shadow-[0_0_35px_rgba(124,58,237,0.30)]
                    hover:-translate-y-0.5
                "
            >

                <span
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        bg-violet-600
                        shadow-[0_0_20px_rgba(124,58,237,0.45)]
                    "
                >

                    <Plus
                        size={19}
                    />

                </span>


                <span>
                    Unirme a un grupo
                </span>

            </button>


            {/* =====================================================
                MODAL UNIRSE A GRUPO
            ===================================================== */}

            {
                mostrarModalGrupo && (

                    <div
                        className="
                            fixed
                            inset-0
                            z-[300]
                            flex
                            items-center
                            justify-center
                            bg-black/70
                            px-4
                            backdrop-blur-sm
                        "
                        onClick={() => {

                            if (
                                !enviandoSolicitud
                            ) {

                                setMostrarModalGrupo(
                                    false
                                );

                            }

                        }}
                    >

                        <div
                            className="
                                relative
                                w-full
                                max-w-md
                                overflow-hidden
                                rounded-3xl
                                border
                                border-white/10
                                bg-[#0B0A12]
                                p-6
                                shadow-[0_0_80px_rgba(124,58,237,0.25)]
                            "
                            onClick={(
                                event
                            ) =>
                                event.stopPropagation()
                            }
                        >


                            {/* =================================================
                                DECORACIÓN
                            ================================================= */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    -right-20
                                    -top-20
                                    h-40
                                    w-40
                                    rounded-full
                                    bg-violet-600/10
                                    blur-3xl
                                "
                            />


                            {/* =================================================
                                CERRAR
                            ================================================= */}

                            <button
                                type="button"
                                disabled={
                                    enviandoSolicitud
                                }
                                onClick={() =>
                                    setMostrarModalGrupo(
                                        false
                                    )
                                }
                                className="
                                    absolute
                                    right-4
                                    top-4
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    text-slate-500
                                    transition
                                    hover:bg-white/5
                                    hover:text-white
                                "
                            >

                                <X
                                    size={19}
                                />

                            </button>


                            {/* =================================================
                                ICONO
                            ================================================= */}

                            <div
                                className="
                                    mb-5
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-violet-500/10
                                    text-violet-400
                                "
                            >

                                <Users
                                    size={23}
                                />

                            </div>


                            {/* =================================================
                                TITULO
                            ================================================= */}

                            <h2
                                className="
                                    text-xl
                                    font-bold
                                    text-white
                                "
                            >

                                Unirme a un grupo

                            </h2>


                            <p
                                className="
                                    mt-2
                                    text-sm
                                    leading-6
                                    text-slate-400
                                "
                            >

                                Introduce el código que te
                                proporcionó tu docente para
                                solicitar acceso a su grupo.

                            </p>


                            {/* =================================================
                                INPUT
                            ================================================= */}

                            <div
                                className="
                                    mt-6
                                "
                            >

                                <label
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-slate-300
                                    "
                                >

                                    Código de acceso

                                </label>


                                <input
                                    type="text"
                                    value={
                                        codigoGrupo
                                    }
                                    onChange={(
                                        event
                                    ) => {

                                        setCodigoGrupo(
                                            event.target.value
                                                .toUpperCase()
                                                .replace(
                                                    /\s/g,
                                                    ""
                                                )
                                        );


                                        setErrorGrupo(
                                            null
                                        );


                                        setMensajeGrupo(
                                            null
                                        );

                                    }}
                                    onKeyDown={(
                                        event
                                    ) => {

                                        if (
                                            event.key ===
                                            "Enter"
                                        ) {

                                            solicitarUnirse();

                                        }

                                    }}
                                    maxLength={20}
                                    placeholder="Ej. ABC123"
                                    disabled={
                                        enviandoSolicitud
                                    }
                                    autoFocus
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-white/[0.03]
                                        px-4
                                        py-3.5
                                        text-center
                                        text-lg
                                        font-bold
                                        tracking-[0.25em]
                                        text-white
                                        outline-none
                                        placeholder:text-slate-600
                                        placeholder:tracking-normal
                                        transition
                                        focus:border-violet-500/50
                                        focus:bg-violet-500/[0.03]
                                        focus:ring-2
                                        focus:ring-violet-500/10
                                        disabled:cursor-not-allowed
                                        disabled:opacity-50
                                    "
                                />

                            </div>


                            {/* =================================================
                                ERROR
                            ================================================= */}

                            {
                                errorGrupo && (

                                    <div
                                        className="
                                            mt-4
                                            rounded-xl
                                            border
                                            border-red-500/20
                                            bg-red-500/10
                                            px-4
                                            py-3
                                            text-sm
                                            text-red-300
                                        "
                                    >

                                        {errorGrupo}

                                    </div>

                                )
                            }


                            {/* =================================================
                                ÉXITO
                            ================================================= */}

                            {
                                mensajeGrupo && (

                                    <div
                                        className="
                                            mt-4
                                            rounded-xl
                                            border
                                            border-emerald-500/20
                                            bg-emerald-500/10
                                            px-4
                                            py-3
                                            text-sm
                                            text-emerald-300
                                        "
                                    >

                                        {mensajeGrupo}

                                    </div>

                                )
                            }


                            {/* =================================================
                                BOTONES
                            ================================================= */}

                            <div
                                className="
                                    mt-6
                                    flex
                                    gap-3
                                "
                            >

                                <button
                                    type="button"
                                    disabled={
                                        enviandoSolicitud
                                    }
                                    onClick={() =>
                                        setMostrarModalGrupo(
                                            false
                                        )
                                    }
                                    className="
                                        flex-1
                                        rounded-2xl
                                        border
                                        border-white/10
                                        bg-white/[0.03]
                                        px-4
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-slate-300
                                        transition
                                        hover:bg-white/[0.06]
                                        hover:text-white
                                        disabled:opacity-50
                                    "
                                >

                                    Cancelar

                                </button>


                                <button
                                    type="button"
                                    disabled={
                                        enviandoSolicitud ||
                                        !codigoGrupo.trim()
                                    }
                                    onClick={
                                        solicitarUnirse
                                    }
                                    className="
                                        flex-1
                                        rounded-2xl
                                        bg-violet-600
                                        px-4
                                        py-3
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-[0_0_25px_rgba(124,58,237,0.25)]
                                        transition
                                        hover:bg-violet-500
                                        disabled:cursor-not-allowed
                                        disabled:opacity-40
                                    "
                                >

                                    {
                                        enviandoSolicitud
                                            ? "Enviando..."
                                            : "Solicitar acceso"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }


        </div>

    );

}
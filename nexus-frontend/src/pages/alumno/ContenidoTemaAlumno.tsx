import {
    ArrowLeft,
    ArrowUpRight,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Download,
    File,
    FileArchive,
    FileImage,
    FileText,
    Film,
    FolderOpen,
    Lightbulb,
    Loader2,
    LockKeyhole,
    PlayCircle,
    Puzzle,
    StickyNote,
    Video,
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

import {
    getContenidosTemaRequest,
} from "../../api/contenidos";

import type {
    Contenido,
} from "../../api/contenidos";

import {
    obtenerRetosRequest,
} from "../../api/retos";

import type {
    Reto,
} from "../../api/retos";


/*
|--------------------------------------------------------------------------
| TIPOS
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

interface ArchivoAlumno {
    id: number;
    contenido_id: number;
    nombre: string;
    ruta: string;
    tipo: "pdf" | "imagen" | "video" | "audio";
    tamano?: number | null;
    url?: string;
    created_at?: string;
    updated_at?: string;
}

interface ContenidoAlumno extends Contenido {
    archivos?: ArchivoAlumno[];
}

interface Recurso {
    id: string;
    tipo:
        | "video"
        | "pdf"
        | "imagen"
        | "archivo"
        | "youtube";
    titulo: string;
    subtitulo: string;
    url?: string;
    contenido?: ContenidoAlumno;
    archivo?: ArchivoAlumno;
}


/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

function normalizarUrl(
    url?: string | null
) {
    if (!url) {
        return "";
    }

    if (
        url.startsWith("http://") ||
        url.startsWith("https://")
    ) {
        return url;
    }

    if (url.startsWith("/")) {
        return `${window.location.origin}${url}`;
    }

    return url;
}


function normalizarRetoImagenUrl(
    ruta?: string | null
) {

    if (!ruta) {
        return "";
    }

    const valor = ruta.trim();

    if (!valor) {
        return "";
    }

    // Si Laravel ya devuelve una URL completa, usarla tal cual.
    if (
        valor.startsWith("http://") ||
        valor.startsWith("https://")
    ) {
        return valor;
    }

    const baseUrl =
        api.defaults.baseURL ||
        window.location.origin;

    const backendOrigin =
        baseUrl
            .replace(/\/api\/?$/, "")
            .replace(/\/$/, "");

    // Normaliza rutas como:
    // retos/archivo.jpg
    // /retos/archivo.jpg
    // storage/retos/archivo.jpg
    // /storage/retos/archivo.jpg
    const limpia =
        valor
            .replace(/^\/+/, "")
            .replace(/^storage\/+/, "");

    return (
        backendOrigin +
        "/storage/" +
        limpia
    );
}


function normalizarArchivoUrl(
    archivo: ArchivoAlumno
) {

    if (archivo.url) {
        return normalizarUrl(
            archivo.url
        );
    }

    if (!archivo.ruta) {
        return "";
    }

    const baseUrl =
        api.defaults.baseURL ||
        window.location.origin;

    const backendOrigin =
        baseUrl
            .replace(/\/api\/?$/, "")
            .replace(/\/$/, "");

    return (
        backendOrigin +
        "/storage/" +
        archivo.ruta.replace(
            /^\/+/, 
            ""
        )
    );
}


function formatearTamano(
    bytes?: number | null
) {

    if (
        !bytes ||
        bytes <= 0
    ) {
        return "";
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
        return `${(
            bytes /
            (1024 * 1024)
        ).toFixed(1)} MB`;
    }

    return `${(
        bytes /
        (1024 * 1024 * 1024)
    ).toFixed(1)} GB`;
}


function etiquetaContenidoVisual(
    tipo: string
) {

    switch (tipo) {

        case "youtube":
            return "YouTube";

        case "imagen":
            return "Foto";

        case "video":
            return "Video";

        default:
            return "";

    }

}


function youtubeEmbedUrl(
    value?: string | null
) {
    if (!value) {
        return "";
    }

    try {
        const url =
            new URL(value);

        const host =
            url.hostname
                .replace("www.", "")
                .toLowerCase();

        if (
            host === "youtube.com" ||
            host === "m.youtube.com"
        ) {
            const videoId =
                url.searchParams.get("v");

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }

            if (
                url.pathname.startsWith(
                    "/embed/"
                )
            ) {
                return value;
            }
        }

        if (
            host === "youtu.be"
        ) {
            const videoId =
                url.pathname
                    .replace("/", "")
                    .split("/")[0];

            if (videoId) {
                return `https://www.youtube.com/embed/${videoId}`;
            }
        }

        return value;
    } catch {
        return value;
    }
}


function iconoTipo(
    tipo: string
) {
    switch (tipo) {
        case "pdf":
            return FileText;

        case "imagen":
            return FileImage;

        case "video":
            return Film;

        case "youtube":
            return PlayCircle;

        case "archivo":
            return FileArchive;

        default:
            return File;
    }
}


function etiquetaTipo(
    tipo: string
) {
    switch (tipo) {
        case "pdf":
            return "PDF";

        case "imagen":
            return "Imagen";

        case "video":
            return "Video";

        case "youtube":
            return "YouTube";

        case "archivo":
            return "Archivo";

        case "texto":
            return "Texto";

        default:
            return "Recurso";
    }
}


/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ContenidoTemaAlumno() {

    const navigate =
        useNavigate();

    const {
        materiaId,
        unidadId,
        temaId,
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
        temaActual,
        setTemaActual,
    ] = useState<Tema | null>(
        null
    );

    const [
        contenidos,
        setContenidos,
    ] = useState<ContenidoAlumno[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState("");

    const [
        recursoSeleccionado,
        setRecursoSeleccionado,
    ] = useState<string | null>(
        null
    );

    /*
    |--------------------------------------------------------------------------
    | RETOS DEL TEMA
    |--------------------------------------------------------------------------
    */

    const [
        retos,
        setRetos,
    ] = useState<Reto[]>([]);

    const [
        loadingRetos,
        setLoadingRetos,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | CARGAR UNIDAD, TEMAS Y CONTENIDO
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

    let montado = true;

    const cargar = async () => {

        // =====================================================
        // VALIDAR UNIDAD
        // =====================================================

        if (!unidadId) {

            setError(
                "No se encontró la unidad."
            );

            setLoading(false);

            return;
        }


        try {

            setLoading(true);

            setError("");


            // =====================================================
            // IDS
            // =====================================================

            const idUnidad =
                Number(unidadId);


            // =====================================================
            // CARGAR UNIDAD Y TEMAS
            // =====================================================

            const [
                unidadData,
                temasResponse,
            ] = await Promise.all([

                getUnidadRequest(
                    idUnidad
                ),

                api.get(
                    `/unidades/${idUnidad}/temas`
                ),

            ]);


            // =====================================================
            // OBTENER TEMAS
            // =====================================================

            let temasData: Tema[] = [];


            if (
                Array.isArray(
                    temasResponse.data
                )
            ) {

                temasData =
                    temasResponse.data;

            } else if (
                temasResponse.data &&
                Array.isArray(
                    temasResponse.data.temas
                )
            ) {

                temasData =
                    temasResponse.data.temas;

            }


            // =====================================================
            // ORDENAR TEMAS
            // =====================================================

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


            // =====================================================
            // VALIDAR QUE EXISTAN TEMAS
            // =====================================================

            if (
                temasData.length === 0
            ) {

                if (montado) {

                    setUnidad(
                        unidadData
                    );

                    setTemas([]);

                    setTemaActual(null);

                    setContenidos([]);
                    setRetos([]);

                    setError(
                        "Esta unidad todavía no tiene temas disponibles."
                    );

                }

                return;
            }


            // =====================================================
            // GUARDAR UNIDAD Y TEMAS
            // =====================================================

            if (!montado) {
                return;
            }


            setUnidad(
                unidadData
            );


            setTemas(
                temasData
            );


            // =====================================================
            // SI NO VIENE temaId
            //
            // Entramos directamente a la unidad.
            // Seleccionamos automáticamente el primer tema.
            // =====================================================

            if (!temaId) {

                const primerTema =
                    temasData[0];


                setTemaActual(
                    primerTema
                );


                // =================================================
                // REDIRIGIR AL PRIMER TEMA
                // =================================================

                navigate(
                    `/dashboard/alumno/materias/${materiaId}/unidades/${unidadId}/temas/${primerTema.id}`,
                    {
                        replace: true,
                    }
                );


                return;
            }


            // =====================================================
            // SI YA VIENE temaId
            // =====================================================

            const idTema =
                Number(
                    temaId
                );


            // =====================================================
            // BUSCAR TEMA ACTUAL
            // =====================================================

            const actual =
                temasData.find(
                    tema =>
                        tema.id ===
                        idTema
                ) ||
                null;


            // =====================================================
            // TEMA NO EXISTE
            // =====================================================

            if (!actual) {

                setError(
                    "No se encontró el tema."
                );

                return;
            }


            // =====================================================
            // CARGAR CONTENIDO DEL TEMA
            // =====================================================

            const contenidosData =
                await getContenidosTemaRequest(
                    idTema
                );


            // =====================================================
            // ACTUALIZAR ESTADO
            // =====================================================

            if (!montado) {
                return;
            }


            setTemaActual(
                actual
            );


            setContenidos(
                Array.isArray(
                    contenidosData
                )
                    ? contenidosData as ContenidoAlumno[]
                    : []
            );

            // =====================================================
            // CARGAR RETOS DEL TEMA
            // =====================================================

            setLoadingRetos(true);

            try {

                const retosData =
                    await obtenerRetosRequest(
                        idTema
                    );

                if (montado) {

                    setRetos(
                        Array.isArray(retosData)
                            ? retosData.filter(
                                (reto): reto is Reto =>
                                    Boolean(reto) &&
                                    reto.activo !== false
                            )
                            : []
                    );

                }

            } catch (retoError) {

                console.error(
                    "❌ Error al cargar los retos del tema:",
                    retoError
                );

                if (montado) {
                    setRetos([]);
                }

            } finally {

                if (montado) {
                    setLoadingRetos(false);
                }

            }


        } catch (
            err: any
        ) {

            console.error(
                "❌ Error al cargar el espacio de estudio:",
                err
            );


            if (montado) {

                setError(
                    err?.response?.data?.message ||
                    "No se pudo cargar el contenido de la unidad."
                );

            }


        } finally {

            if (montado) {

                setLoading(
                    false
                );

            }

        }

    };


    cargar();


    return () => {

        montado = false;

    };


}, [
    materiaId,
    unidadId,
    temaId,
    navigate,
]);


    /*
    |--------------------------------------------------------------------------
    | RECURSOS
    |--------------------------------------------------------------------------
    */

    const recursos =
        useMemo<Recurso[]>(() => {

            const lista:
                Recurso[] = [];


            contenidos.forEach(
                contenido => {

                    contenido.archivos?.forEach(
                        archivo => {

                            /*
                            |--------------------------------------------------------------------------
                            | SOLO RECURSOS DESCARGABLES
                            |--------------------------------------------------------------------------
                            |
                            | PDF y archivos quedan aquí.
                            | Imagen y video se muestran dentro del contenido.
                            | YouTube se muestra dentro del contenido.
                            |
                            */

                            if (
                                archivo.tipo ===
                                    "imagen" ||
                                archivo.tipo ===
                                    "video"
                            ) {
                                return;
                            }


                            const url =
                                normalizarArchivoUrl(
                                    archivo
                                );


                            lista.push({

                                id:
                                    `archivo-${archivo.id}`,

                                tipo:
                                    archivo.tipo ===
                                        "pdf"
                                        ? "pdf"
                                        : "archivo",

                                titulo:
                                    archivo.nombre,

                                subtitulo:
                                    archivo.tipo ===
                                        "pdf"
                                        ? "Documento PDF"
                                        : "Archivo descargable",

                                url,

                                contenido,

                                archivo,

                            });

                        }
                    );

                }
            );


            return lista;

        }, [
            contenidos,
        ]);


    /*
    |--------------------------------------------------------------------------
    | CONTENIDO VISUAL
    |--------------------------------------------------------------------------
    */

    const contenidosVisuales =
        useMemo(
            () =>
                contenidos.filter(
                    contenido =>
                        contenido.tipo !==
                            "pdf" &&
                        contenido.tipo !==
                            "archivo"
                ),
            [
                contenidos,
            ]
        );


    /*
    |--------------------------------------------------------------------------
    | RECURSO ACTUAL
    |--------------------------------------------------------------------------
    */

    const recursoActual =
        recursos.find(
            recurso =>
                recurso.id ===
                recursoSeleccionado
        ) ||
        null;


    /*
    |--------------------------------------------------------------------------
    | SELECCIONAR RECURSO
    |--------------------------------------------------------------------------
    */

    const seleccionarRecurso =
        (
            recurso: Recurso
        ) => {

            setRecursoSeleccionado(
                recurso.id
            );

        };


    /*
    |--------------------------------------------------------------------------
    | CAMBIAR TEMA
    |--------------------------------------------------------------------------
    */

    const cambiarTema =
        (
            direccion:
                "anterior" |
                "siguiente"
        ) => {

            if (
                temas.length === 0 ||
                !temaActual
            ) {
                return;
            }


            const indice =
                temas.findIndex(
                    tema =>
                        tema.id ===
                        temaActual.id
                );


            const nuevoIndice =
                direccion ===
                "anterior"
                    ? indice - 1
                    : indice + 1;


            if (
                nuevoIndice < 0 ||
                nuevoIndice >=
                    temas.length
            ) {
                return;
            }


            const nuevoTema =
                temas[
                    nuevoIndice
                ];


            setRecursoSeleccionado(null);
            setRetos([]);

            navigate(
                `/dashboard/alumno/materias/${materiaId}/unidades/${unidadId}/temas/${nuevoTema.id}`
            );

        };


    /*
    |--------------------------------------------------------------------------
    | VOLVER
    |--------------------------------------------------------------------------
    */

    const volverUnidad =
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
    | ÍNDICE DEL TEMA
    |--------------------------------------------------------------------------
    */

    const indiceTema =
        temaActual
            ? temas.findIndex(
                tema =>
                    tema.id ===
                    temaActual.id
            )
            : -1;


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
                    bg-[#02030A]
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
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-violet-500/25
                            bg-violet-500/10
                            shadow-[0_0_40px_rgba(124,58,237,0.25)]
                        "
                    >

                        <Loader2
                            size={24}
                            className="
                                animate-spin
                                text-violet-400
                            "
                        />

                    </div>


                    <p
                        className="
                            text-sm
                            font-semibold
                            text-slate-300
                        "
                    >
                        Preparando el tema...
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
                    flex
                    min-h-full
                    items-center
                    justify-center
                    bg-[#02030A]
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
                        bg-[#0B0C15]
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
                            text-red-400
                        "
                    >
                        !
                    </div>


                    <h2
                        className="
                            mt-4
                            text-lg
                            font-bold
                            text-white
                        "
                    >
                        No pudimos abrir el tema
                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            leading-6
                            text-slate-400
                        "
                    >
                        {error}
                    </p>


                    <button
                        type="button"
                        onClick={
                            volverUnidad
                        }
                        className="
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-violet-600
                            px-4
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

                        Volver a la materia

                    </button>

                </div>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                relative
                h-full
                min-h-0
                overflow-y-auto
                overflow-x-hidden
                bg-[#02030A]
                text-white
                [scrollbar-color:rgba(139,92,246,0.45)_transparent]
                [scrollbar-width:thin]
                [&::-webkit-scrollbar]:w-1.5
                [&::-webkit-scrollbar-track]:bg-transparent
                [&::-webkit-scrollbar-thumb]:rounded-full
                [&::-webkit-scrollbar-thumb]:bg-violet-500/30
                hover:[&::-webkit-scrollbar-thumb]:bg-violet-500/55
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
                        top-0
                        h-[420px]
                        w-[420px]
                        rounded-full
                        bg-violet-700/10
                        blur-[140px]
                    "
                />

                <div
                    className="
                        absolute
                        -right-32
                        top-[35%]
                        h-[460px]
                        w-[460px]
                        rounded-full
                        bg-blue-700/10
                        blur-[150px]
                    "
                />

                <div
                    className="
                        absolute
                        bottom-[-180px]
                        left-[35%]
                        h-[450px]
                        w-[450px]
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

                <span
                    className="
                        absolute
                        left-[7%]
                        top-[16%]
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
                        top-[12%]
                        h-[3px]
                        w-[3px]
                        rounded-full
                        bg-violet-300
                    "
                />

                <span
                    className="
                        absolute
                        right-[16%]
                        top-[24%]
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
                        bottom-[22%]
                        h-1
                        w-1
                        rounded-full
                        bg-white
                        opacity-60
                    "
                />

            </div>


            {/* =========================================================
                CONTENEDOR
            ========================================================= */}

            <div
                className="
                    relative
                    z-10
                    mx-auto
                    w-full
                    max-w-[1500px]
                    px-4
                    py-5
                    sm:px-6
                    lg:px-8
                    min-h-full
                    overflow-visible
                "
            >

                {/* =====================================================
                    TOP NAV
                ===================================================== */}

                <div
                    className="
                        mb-4
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    <button
                        type="button"
                        onClick={
                            volverUnidad
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-medium
                            text-slate-400
                            transition
                            hover:text-white
                        "
                    >

                        <ArrowLeft
                            size={15}
                        />

                        Volver a la materia

                    </button>


                    <div
                        className="
                            hidden
                            items-center
                            gap-2
                            sm:flex
                        "
                    >

                        <span
                            className="
                                rounded-full
                                border
                                border-white/5
                                bg-white/[0.025]
                                px-3
                                py-1.5
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[1.5px]
                                text-slate-500
                            "
                        >
                            {unidad?.nombre ||
                                "Unidad"}
                        </span>

                    </div>

                </div>


                {/* =====================================================
                    LAYOUT PRINCIPAL
                ===================================================== */}

                <div
                    className="
                        grid
                        gap-4
                        lg:grid-cols-[220px_minmax(0,1fr)_225px]
                    "
                >

                    {/* =================================================
                        SIDEBAR TEMAS
                    ================================================= */}

                    <aside
                        className="
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-[#080A13]/80
                            p-3
                            shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                mb-4
                                px-2
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
                                {unidad?.orden ||
                                    ""}
                            </p>


                            <h1
                                className="
                                    mt-1
                                    text-lg
                                    font-black
                                    leading-tight
                                    text-white
                                "
                            >
                                {unidad?.nombre ||
                                    "Unidad"}
                            </h1>

                        </div>


                        <div
                            className="
                                mb-3
                                px-2
                                text-[9px]
                                font-black
                                uppercase
                                tracking-[1.8px]
                                text-slate-600
                            "
                        >
                            Temas
                        </div>


                        <nav
                            className="
                                max-h-[calc(100vh-235px)]
                                space-y-1
                                overflow-y-auto
                                overflow-x-hidden
                                pr-1
                                [scrollbar-color:rgba(139,92,246,0.35)_transparent]
                                [scrollbar-width:thin]
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-violet-500/25
                                hover:[&::-webkit-scrollbar-thumb]:bg-violet-500/50
                            "
                        >

                            {temas.map(
                                (
                                    tema
                                ) => {

                                    const activo =
                                        tema.id ===
                                        temaActual?.id;

                                    return (

                                        <button
                                            key={
                                                tema.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/dashboard/alumno/materias/${materiaId}/unidades/${unidadId}/temas/${tema.id}`
                                                )
                                            }
                                            className={`
                                                group
                                                flex
                                                w-full
                                                items-center
                                                gap-2
                                                rounded-xl
                                                px-2.5
                                                py-2.5
                                                text-left
                                                transition-all
                                                ${
                                                    activo
                                                        ? "border border-violet-500/50 bg-violet-500/10 text-white shadow-[0_0_25px_rgba(124,58,237,0.12)]"
                                                        : "border border-transparent text-slate-500 hover:border-white/5 hover:bg-white/[0.03] hover:text-slate-200"
                                                }
                                            `}
                                        >

                                            <span
                                                className={`
                                                    flex
                                                    h-5
                                                    w-5
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    text-[8px]
                                                    font-black
                                                    ${
                                                        activo
                                                            ? "bg-violet-500/20 text-violet-300"
                                                            : "bg-white/[0.035] text-slate-600"
                                                    }
                                                `}
                                            >
                                                {String(
                                                    tema.orden
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>


                                            <span
                                                className="
                                                    min-w-0
                                                    flex-1
                                                "
                                            >

                                                <span
                                                    className="
                                                        block
                                                        break-words
                                                        whitespace-normal
                                                        text-[11px]
                                                        font-semibold
                                                    "
                                                >
                                                    {tema.nombre}
                                                </span>

                                            </span>

                                        </button>

                                    );

                                }
                            )}

                        </nav>

                    </aside>


                    {/* =================================================
                        CONTENIDO CENTRAL
                    ================================================= */}

                    <main
                        className="
                            min-w-0
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-[#080A13]/80
                            shadow-[0_20px_70px_rgba(0,0,0,0.35)]
                            backdrop-blur-xl
                        "
                    >

                        {/* =================================================
                            HEADER DEL TEMA
                        ================================================= */}

                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-3
                                border-b
                                border-white/[0.06]
                                px-4
                                py-3
                            "
                        >

                            <div
                                className="
                                    flex
                                    min-w-0
                                    items-center
                                    gap-2
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-9
                                        w-9
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-violet-500/20
                                        bg-violet-500/10
                                    "
                                >

                                    <BookOpen
                                        size={17}
                                        className="
                                            text-violet-400
                                        "
                                    />

                                </div>


                                <div
                                    className="
                                        min-w-0
                                    "
                                >

                                    <p
                                        className="
                                            break-words
                                            whitespace-normal
                                            text-[9px]
                                            font-black
                                            uppercase
                                            tracking-[1.8px]
                                            text-violet-400
                                        "
                                    >
                                        Tema{" "}
                                        {temaActual?.orden ||
                                            ""}
                                    </p>


                                    <h2
                                        className="
                                            break-words
                                            whitespace-normal
                                            text-sm
                                            font-black
                                            text-white
                                            sm:text-base
                                        "
                                    >
                                        {temaActual?.nombre ||
                                            "Tema"}
                                    </h2>

                                </div>

                            </div>


                            <div
                                className="
                                    flex
                                    shrink-0
                                    items-center
                                    gap-1.5
                                "
                            >

                                <button
                                    type="button"
                                    disabled={
                                        indiceTema <= 0
                                    }
                                    onClick={() =>
                                        cambiarTema(
                                            "anterior"
                                        )
                                    }
                                    className="
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-lg
                                        border
                                        border-white/5
                                        bg-white/[0.025]
                                        text-slate-400
                                        transition
                                        hover:border-violet-500/20
                                        hover:text-white
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                    "
                                    title="Tema anterior"
                                >

                                    <ChevronLeft
                                        size={16}
                                    />

                                </button>


                                <button
                                    type="button"
                                    disabled={
                                        indiceTema === -1 ||
                                        indiceTema >=
                                            temas.length - 1
                                    }
                                    onClick={() =>
                                        cambiarTema(
                                            "siguiente"
                                        )
                                    }
                                    className="
                                        flex
                                        h-8
                                        items-center
                                        gap-1
                                        rounded-lg
                                        bg-violet-600
                                        px-3
                                        text-[10px]
                                        font-bold
                                        text-white
                                        shadow-[0_0_20px_rgba(124,58,237,0.22)]
                                        transition
                                        hover:bg-violet-500
                                        disabled:cursor-not-allowed
                                        disabled:opacity-30
                                    "
                                >

                                    Siguiente tema

                                    <ChevronRight
                                        size={13}
                                    />

                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            DESCRIPCIÓN
                        ================================================= */}

                        <div
                            className="
                                border-b
                                border-white/[0.05]
                                px-5
                                py-4
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-start
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        mt-0.5
                                        flex
                                        h-8
                                        w-8
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-violet-500/10
                                        text-violet-400
                                    "
                                >

                                    <StickyNote
                                        size={15}
                                    />

                                </div>


                                <div>

                                    <p
                                        className="
                                            text-[9px]
                                            font-black
                                            uppercase
                                            tracking-[1.6px]
                                            text-slate-600
                                        "
                                    >
                                        Introducción
                                    </p>


                                    <p
                                        className="
                                            mt-1
                                            max-w-3xl
                                            text-xs
                                            leading-6
                                            text-slate-400
                                        "
                                    >
                                        {temaActual?.descripcion ||
                                            "Explora el material educativo de este tema y aprende a tu ritmo."}
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* =================================================
                            CONTENIDO
                        ================================================= */}

                        <div
                            className="
                                space-y-4
                                p-4
                                sm:p-5
                            "
                        >

                            {contenidosVisuales.length === 0 ? (

                                <div
                                    className="
                                        flex
                                        min-h-[220px]
                                        flex-col
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-dashed
                                        border-white/10
                                        bg-black/10
                                        px-6
                                        text-center
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-14
                                            w-14
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-violet-500/20
                                            bg-violet-500/10
                                            text-violet-400
                                        "
                                    >

                                        <FolderOpen
                                            size={24}
                                        />

                                    </div>


                                    <h3
                                        className="
                                            mt-4
                                            text-base
                                            font-bold
                                            text-white
                                        "
                                    >
                                        Aún no hay material
                                    </h3>


                                    <p
                                        className="
                                            mt-1
                                            max-w-sm
                                            text-xs
                                            leading-5
                                            text-slate-500
                                        "
                                    >
                                        El docente todavía no ha agregado contenido a este tema.
                                    </p>

                                </div>

                            ) : (

                                contenidosVisuales.map(
                                    (
                                        contenido
                                    ) => (

                                        <article
                                            key={
                                                contenido.id
                                            }
                                            className="
                                                overflow-hidden
                                                rounded-2xl
                                                border
                                                border-white/[0.07]
                                                bg-black/15
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                    border-b
                                                    border-white/[0.05]
                                                    px-4
                                                    py-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        h-8
                                                        w-8
                                                        shrink-0
                                                        items-center
                                                        justify-center
                                                        rounded-lg
                                                        bg-violet-500/10
                                                        text-violet-400
                                                    "
                                                >

                                                    {(() => {

                                                        const Icon =
                                                            iconoTipo(
                                                                contenido.tipo
                                                            );

                                                        return (
                                                            <Icon
                                                                size={16}
                                                            />
                                                        );

                                                    })()}

                                                </div>


                                                <div
                                                    className="
                                                        min-w-0
                                                        flex-1
                                                    "
                                                >

                                                    <h3
                                                        className="
                                                            break-words
                                                        whitespace-normal
                                                            text-sm
                                                            font-bold
                                                            text-white
                                                        "
                                                    >
                                                        {contenido.titulo}
                                                    </h3>


                                                    {etiquetaContenidoVisual(
                                                        contenido.tipo
                                                    ) && (
                                                        <p
                                                            className="
                                                                mt-0.5
                                                                text-[9px]
                                                                font-semibold
                                                                uppercase
                                                                tracking-[1.5px]
                                                                text-violet-400
                                                            "
                                                        >
                                                            {etiquetaContenidoVisual(
                                                                contenido.tipo
                                                            )}
                                                        </p>
                                                    )}

                                                </div>

                                            </div>


                                            <div
                                                className="
                                                    p-4
                                                "
                                            >

                                                {contenido.tipo === "texto" && (

    <div
        className="
            nexus-rich-content
            rounded-xl
            border
            border-white/[0.04]
            bg-white/[0.012]
            px-4
            py-4
            text-[15px]
            leading-7
            text-slate-300

            [&_p]:mb-4
            [&_p:last-child]:mb-0

            [&_h1]:mb-4
            [&_h1]:mt-6
            [&_h1]:text-2xl
            [&_h1]:font-black
            [&_h1]:text-white

            [&_h2]:mb-3
            [&_h2]:mt-5
            [&_h2]:text-xl
            [&_h2]:font-black
            [&_h2]:text-white

            [&_h3]:mb-2
            [&_h3]:mt-4
            [&_h3]:text-lg
            [&_h3]:font-bold
            [&_h3]:text-white

            [&_strong]:font-bold
            [&_em]:italic
            [&_u]:underline
            [&_s]:line-through

            [&_ul]:my-4
            [&_ul]:list-disc
            [&_ul]:pl-6

            [&_ol]:my-4
            [&_ol]:list-decimal
            [&_ol]:pl-6

            [&_li]:mb-1

            [&_blockquote]:my-4
            [&_blockquote]:border-l-2
            [&_blockquote]:border-violet-500
            [&_blockquote]:pl-4
            [&_blockquote]:italic
            [&_blockquote]:text-slate-400

            [&_a]:text-violet-400
            [&_a]:underline
            [&_a]:underline-offset-2

            [&_mark]:rounded
            [&_mark]:px-1
        "
        dangerouslySetInnerHTML={{
            __html:
                contenido.contenido ||
                "<p>Este contenido no tiene texto.</p>",
        }}
    />

)}


                                                {contenido.tipo ===
                                                    "youtube" && (

                                                    <div
                                                        className="
                                                            overflow-hidden
                                                            rounded-xl
                                                            border
                                                            border-white/[0.06]
                                                            bg-black
                                                        "
                                                    >

                                                        {youtubeEmbedUrl(
                                                            contenido.contenido
                                                        ) ? (

                                                            <div
                                                                className="
                                                                    aspect-video
                                                                    w-full
                                                                "
                                                            >

                                                                <iframe
                                                                    src={
                                                                        youtubeEmbedUrl(
                                                                            contenido.contenido
                                                                        )
                                                                    }
                                                                    title={
                                                                        contenido.titulo
                                                                    }
                                                                    className="
                                                                        h-full
                                                                        w-full
                                                                    "
                                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                                    allowFullScreen
                                                                />

                                                            </div>

                                                        ) : (

                                                            <div
                                                                className="
                                                                    p-5
                                                                    text-sm
                                                                    text-slate-400
                                                                "
                                                            >
                                                                No se encontró un enlace de YouTube válido.
                                                            </div>

                                                        )}

                                                    </div>

                                                )}


                                                {contenido.archivos &&
                                                    contenido.archivos.some(
                                                        archivo =>
                                                            archivo.tipo ===
                                                                "imagen" ||
                                                            archivo.tipo ===
                                                                "video"
                                                    ) && (

                                                        <div
                                                            className="
                                                                space-y-3
                                                            "
                                                        >

                                                            {contenido.archivos
                                                                .filter(
                                                                    archivo =>
                                                                        archivo.tipo ===
                                                                            "imagen" ||
                                                                        archivo.tipo ===
                                                                            "video"
                                                                )
                                                                .map(
                                                                archivo => {

                                                                    const url =
                                                                        normalizarArchivoUrl(
                                                                            archivo
                                                                        );

                                                                    const Icon =
                                                                        iconoTipo(
                                                                            archivo.tipo
                                                                        );


                                                                    return (

                                                                        <div
                                                                            key={
                                                                                archivo.id
                                                                            }
                                                                            className="
                                                                                rounded-xl
                                                                                border
                                                                                border-white/[0.06]
                                                                                bg-[#05060D]
                                                                                p-3
                                                                            "
                                                                        >

                                                                            {archivo.tipo ===
                                                                                "imagen" &&
                                                                                url ? (

                                                                                <div
                                                                                    className="
                                                                                        overflow-hidden
                                                                                        rounded-lg
                                                                                    "
                                                                                >

                                                                                    <img
                                                                                        src={url}
                                                                                        alt={
                                                                                            archivo.nombre
                                                                                        }
                                                                                        className="
                                                                                            max-h-[500px]
                                                                                            w-full
                                                                                            object-contain
                                                                                            bg-black/30
                                                                                        "
                                                                                    />

                                                                                </div>

                                                                            ) : archivo.tipo ===
                                                                                "video" &&
                                                                                url ? (

                                                                                <video
                                                                                    controls
                                                                                    className="
                                                                                        max-h-[500px]
                                                                                        w-full
                                                                                        rounded-lg
                                                                                        bg-black
                                                                                    "
                                                                                >
                                                                                    <source
                                                                                        src={url}
                                                                                    />
                                                                                    Tu navegador no puede reproducir este video.
                                                                                </video>

                                                                            ) : (

                                                                                <div
                                                                                    className="
                                                                                        flex
                                                                                        items-center
                                                                                        gap-3
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
                                                                                            text-violet-400
                                                                                        "
                                                                                    >

                                                                                        <Icon
                                                                                            size={19}
                                                                                        />

                                                                                    </div>


                                                                                    <div
                                                                                        className="
                                                                                            min-w-0
                                                                                            flex-1
                                                                                        "
                                                                                    >

                                                                                        <p
                                                                                            className="
                                                                                                break-words
                                                        whitespace-normal
                                                                                                text-sm
                                                                                                font-semibold
                                                                                                text-white
                                                                                            "
                                                                                        >
                                                                                            {archivo.nombre}
                                                                                        </p>


                                                                                        <p
                                                                                            className="
                                                                                                mt-0.5
                                                                                                text-[10px]
                                                                                                text-slate-500
                                                                                            "
                                                                                        >
                                                                                            {etiquetaTipo(
                                                                                                archivo.tipo
                                                                                            )}
                                                                                        </p>

                                                                                    </div>


                                                                                    {url && (

                                                                                        <a
                                                                                            href={
                                                                                                url
                                                                                            }
                                                                                            target="_blank"
                                                                                            rel="noreferrer"
                                                                                            className="
                                                                                                inline-flex
                                                                                                shrink-0
                                                                                                items-center
                                                                                                gap-1.5
                                                                                                rounded-lg
                                                                                                border
                                                                                                border-violet-500/20
                                                                                                bg-violet-500/10
                                                                                                px-3
                                                                                                py-2
                                                                                                text-[10px]
                                                                                                font-bold
                                                                                                text-violet-300
                                                                                                transition
                                                                                                hover:bg-violet-500/20
                                                                                            "
                                                                                        >

                                                                                            {archivo.tipo ===
                                                                                                "pdf"
                                                                                                ? "Ver PDF"
                                                                                                : "Abrir"}

                                                                                            <ArrowUpRight
                                                                                                size={13}
                                                                                            />

                                                                                        </a>

                                                                                    )}

                                                                                </div>

                                                                            )}

                                                                        </div>

                                                                    );

                                                                }
                                                            )}

                                                        </div>

                                                    )}

                                            </div>

                                        </article>

                                    )
                                )

                            )}

                        </div>


                        {/* =================================================
                            RETOS DEL TEMA
                        ================================================= */}

                        <section
                            className="
                                mt-2
                                border-t
                                border-white/[0.05]
                                px-4
                                py-5
                                sm:px-5
                            "
                        >

                            <div
                                className="
                                    mb-4
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        flex
                                        min-w-0
                                        items-center
                                        gap-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            shrink-0
                                            items-center
                                            justify-center
                                            rounded-xl
                                            border
                                            border-violet-500/20
                                            bg-violet-500/10
                                            text-violet-400
                                        "
                                    >
                                        <Puzzle size={17} />
                                    </div>

                                    <div className="min-w-0">

                                        <p
                                            className="
                                                text-[9px]
                                                font-black
                                                uppercase
                                                tracking-[1.8px]
                                                text-violet-400
                                            "
                                        >
                                            Práctica
                                        </p>

                                        <h3
                                            className="
                                                mt-0.5
                                                text-base
                                                font-black
                                                text-white
                                            "
                                        >
                                            Retos
                                        </h3>

                                    </div>

                                </div>

                                {!loadingRetos && retos.length > 0 && (
                                    <span
                                        className="
                                            flex
                                            h-7
                                            min-w-7
                                            items-center
                                            justify-center
                                            rounded-full
                                            border
                                            border-violet-500/20
                                            bg-violet-500/10
                                            px-2
                                            text-[9px]
                                            font-black
                                            text-violet-300
                                        "
                                    >
                                        {retos.length}
                                    </span>
                                )}

                            </div>


                            {loadingRetos ? (

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-2xl
                                        border
                                        border-white/[0.06]
                                        bg-white/[0.012]
                                        px-4
                                        py-8
                                    "
                                >

                                    <Loader2
                                        size={16}
                                        className="animate-spin text-violet-400"
                                    />

                                    <span
                                        className="
                                            text-xs
                                            font-medium
                                            text-slate-500
                                        "
                                    >
                                        Preparando los retos...
                                    </span>

                                </div>

                            ) : retos.length === 0 ? (

                                <div
                                    className="
                                        rounded-2xl
                                        border
                                        border-dashed
                                        border-white/10
                                        bg-white/[0.012]
                                        px-5
                                        py-8
                                        text-center
                                    "
                                >

                                    <div
                                        className="
                                            mx-auto
                                            flex
                                            h-12
                                            w-12
                                            items-center
                                            justify-center
                                            rounded-2xl
                                            border
                                            border-white/[0.06]
                                            bg-white/[0.02]
                                            text-slate-600
                                        "
                                    >
                                        <Puzzle size={20} />
                                    </div>

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            font-bold
                                            text-slate-400
                                        "
                                    >
                                        Aún no hay retos
                                    </p>

                                    <p
                                        className="
                                            mx-auto
                                            mt-1
                                            max-w-md
                                            text-[11px]
                                            leading-5
                                            text-slate-600
                                        "
                                    >
                                        Cuando el docente agregue un reto a este
                                        tema, aparecerá aquí para que puedas
                                        resolverlo en tu cuaderno.
                                    </p>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {retos
                                        .filter(
                                            (reto): reto is Reto =>
                                                Boolean(reto)
                                        )
                                        .map(
                                            (reto, index) => {

                                                const imagenReto =
                                                    reto.imagen_reto
                                                        ? normalizarRetoImagenUrl(
                                                            reto.imagen_reto
                                                        )
                                                        : "";

                                                const imagenSolucion =
                                                    reto.imagen_solucion
                                                        ? normalizarRetoImagenUrl(
                                                            reto.imagen_solucion
                                                        )
                                                        : "";

                                                const tieneSolucion =
                                                    Boolean(
                                                        reto.mostrar_solucion &&
                                                        (
                                                            reto.solucion ||
                                                            imagenSolucion
                                                        )
                                                    );

                                                return (

                                                    <article
                                                        key={reto.id}
                                                        className="
                                                            overflow-hidden
                                                            rounded-2xl
                                                            border
                                                            border-white/[0.07]
                                                            bg-black/15
                                                        "
                                                    >

                                                        {/* CABECERA DEL RETO */}

                                                        <div
                                                            className="
                                                                flex
                                                                items-start
                                                                gap-3
                                                                border-b
                                                                border-white/[0.05]
                                                                px-4
                                                                py-3.5
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    flex
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    items-center
                                                                    justify-center
                                                                    rounded-xl
                                                                    border
                                                                    border-violet-500/20
                                                                    bg-violet-500/10
                                                                    text-violet-400
                                                                "
                                                            >
                                                                <Puzzle size={17} />
                                                            </div>

                                                            <div className="min-w-0 flex-1">

                                                                <div
                                                                    className="
                                                                        flex
                                                                        flex-wrap
                                                                        items-center
                                                                        gap-2
                                                                    "
                                                                >

                                                                    <span
                                                                        className="
                                                                            text-[9px]
                                                                            font-black
                                                                            uppercase
                                                                            tracking-[1.6px]
                                                                            text-violet-400
                                                                        "
                                                                    >
                                                                        Reto {index + 1}
                                                                    </span>

                                                                    {reto.mostrar_solucion && (
                                                                        <span
                                                                            className="
                                                                                inline-flex
                                                                                items-center
                                                                                gap-1
                                                                                rounded-full
                                                                                border
                                                                                border-emerald-500/15
                                                                                bg-emerald-500/10
                                                                                px-2
                                                                                py-0.5
                                                                                text-[8px]
                                                                                font-bold
                                                                                text-emerald-300
                                                                            "
                                                                        >
                                                                            <Lightbulb size={10} />
                                                                            Solución disponible
                                                                        </span>
                                                                    )}

                                                                </div>

                                                                <h4
                                                                    className="
                                                                        mt-1
                                                                        break-words
                                                                        text-sm
                                                                        font-black
                                                                        leading-5
                                                                        text-white
                                                                    "
                                                                >
                                                                    {reto.titulo}
                                                                </h4>

                                                            </div>

                                                        </div>


                                                        {/* CONTENIDO DEL RETO */}

                                                        <div className="p-4 sm:p-5">

                                                            <div
                                                                className="
                                                                    rounded-xl
                                                                    border
                                                                    border-white/[0.04]
                                                                    bg-white/[0.012]
                                                                    px-4
                                                                    py-4
                                                                    text-[14px]
                                                                    leading-7
                                                                    text-slate-300

                                                                    [&_p]:mb-3
                                                                    [&_p:last-child]:mb-0

                                                                    [&_h1]:mb-3
                                                                    [&_h1]:mt-5
                                                                    [&_h1]:text-xl
                                                                    [&_h1]:font-black
                                                                    [&_h1]:text-white

                                                                    [&_h2]:mb-2
                                                                    [&_h2]:mt-4
                                                                    [&_h2]:text-lg
                                                                    [&_h2]:font-black
                                                                    [&_h2]:text-white

                                                                    [&_h3]:mb-2
                                                                    [&_h3]:mt-3
                                                                    [&_h3]:text-base
                                                                    [&_h3]:font-bold
                                                                    [&_h3]:text-white

                                                                    [&_strong]:font-bold
                                                                    [&_em]:italic
                                                                    [&_u]:underline
                                                                    [&_s]:line-through

                                                                    [&_ul]:my-3
                                                                    [&_ul]:list-disc
                                                                    [&_ul]:pl-6

                                                                    [&_ol]:my-3
                                                                    [&_ol]:list-decimal
                                                                    [&_ol]:pl-6

                                                                    [&_li]:mb-1

                                                                    [&_blockquote]:my-3
                                                                    [&_blockquote]:border-l-2
                                                                    [&_blockquote]:border-violet-500
                                                                    [&_blockquote]:pl-4
                                                                    [&_blockquote]:italic
                                                                    [&_blockquote]:text-slate-400

                                                                    [&_a]:text-violet-400
                                                                    [&_a]:underline
                                                                    [&_a]:underline-offset-2

                                                                    [&_mark]:rounded
                                                                    [&_mark]:px-1
                                                                "
                                                                dangerouslySetInnerHTML={{
                                                                    __html:
                                                                        reto.descripcion ||
                                                                        "<p>Este reto no tiene una descripción.</p>",
                                                                }}
                                                            />


                                                            {imagenReto && (

                                                                <div className="mt-4 overflow-hidden rounded-xl border border-white/[0.06] bg-black/20">

                                                                    <img
                                                                        src={imagenReto}
                                                                        alt={`Imagen del reto: ${reto.titulo}`}
                                                                        className="
                                                                            max-h-[520px]
                                                                            w-full
                                                                            object-contain
                                                                            bg-black/30
                                                                        "
                                                                    />

                                                                </div>

                                                            )}


                                                            <div
                                                                className="
                                                                    mt-4
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                    rounded-xl
                                                                    border
                                                                    border-violet-500/10
                                                                    bg-violet-500/[0.04]
                                                                    px-3.5
                                                                    py-3
                                                                "
                                                            >

                                                                <StickyNote
                                                                    size={15}
                                                                    className="shrink-0 text-violet-400"
                                                                />

                                                                <p
                                                                    className="
                                                                        text-[11px]
                                                                        font-medium
                                                                        leading-5
                                                                        text-slate-400
                                                                    "
                                                                >
                                                                    Resuelve este reto en tu cuaderno.
                                                                </p>

                                                            </div>


                                                            {/* SOLUCIÓN */}

                                                            {tieneSolucion ? (

                                                                <div
                                                                    className="
                                                                        mt-5
                                                                        overflow-hidden
                                                                        rounded-2xl
                                                                        border
                                                                        border-emerald-500/15
                                                                        bg-emerald-500/[0.025]
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-center
                                                                            gap-2.5
                                                                            border-b
                                                                            border-emerald-500/10
                                                                            px-4
                                                                            py-3
                                                                        "
                                                                    >

                                                                        <div
                                                                            className="
                                                                                flex
                                                                                h-8
                                                                                w-8
                                                                                items-center
                                                                                justify-center
                                                                                rounded-lg
                                                                                bg-emerald-500/10
                                                                                text-emerald-300
                                                                            "
                                                                        >
                                                                            <Lightbulb size={15} />
                                                                        </div>

                                                                        <div>

                                                                            <p
                                                                                className="
                                                                                    text-[9px]
                                                                                    font-black
                                                                                    uppercase
                                                                                    tracking-[1.6px]
                                                                                    text-emerald-400
                                                                                "
                                                                            >
                                                                                Solución
                                                                            </p>

                                                                            <p
                                                                                className="
                                                                                    mt-0.5
                                                                                    text-[10px]
                                                                                    text-slate-500
                                                                                "
                                                                            >
                                                                                El docente habilitó la solución de este reto.
                                                                            </p>

                                                                        </div>

                                                                    </div>


                                                                    <div className="p-4 sm:p-5">

                                                                        {reto.solucion && (
                                                                            <div
                                                                                className="
                                                                                    nexus-rich-content
                                                                                    text-[14px]
                                                                                    leading-7
                                                                                    text-slate-300

                                                                                    [&_p]:mb-3
                                                                                    [&_p:last-child]:mb-0

                                                                                    [&_h1]:mb-3
                                                                                    [&_h1]:mt-5
                                                                                    [&_h1]:text-xl
                                                                                    [&_h1]:font-black
                                                                                    [&_h1]:text-white

                                                                                    [&_h2]:mb-2
                                                                                    [&_h2]:mt-4
                                                                                    [&_h2]:text-lg
                                                                                    [&_h2]:font-black
                                                                                    [&_h2]:text-white

                                                                                    [&_h3]:mb-2
                                                                                    [&_h3]:mt-3
                                                                                    [&_h3]:text-base
                                                                                    [&_h3]:font-bold
                                                                                    [&_h3]:text-white

                                                                                    [&_strong]:font-bold
                                                                                    [&_em]:italic
                                                                                    [&_u]:underline
                                                                                    [&_s]:line-through

                                                                                    [&_ul]:my-3
                                                                                    [&_ul]:list-disc
                                                                                    [&_ul]:pl-6

                                                                                    [&_ol]:my-3
                                                                                    [&_ol]:list-decimal
                                                                                    [&_ol]:pl-6

                                                                                    [&_li]:mb-1

                                                                                    [&_blockquote]:my-3
                                                                                    [&_blockquote]:border-l-2
                                                                                    [&_blockquote]:border-emerald-500/70
                                                                                    [&_blockquote]:pl-4
                                                                                    [&_blockquote]:italic
                                                                                    [&_blockquote]:text-slate-400

                                                                                    [&_a]:text-violet-400
                                                                                    [&_a]:underline
                                                                                    [&_a]:underline-offset-2
                                                                                "
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html:
                                                                                        reto.solucion,
                                                                                }}
                                                                            />
                                                                        )}


                                                                        {imagenSolucion && (

                                                                            <div
                                                                                className={`
                                                                                    ${reto.solucion ? "mt-4" : ""}
                                                                                    overflow-hidden
                                                                                    rounded-xl
                                                                                    border
                                                                                    border-white/[0.06]
                                                                                    bg-black/20
                                                                                `}
                                                                            >

                                                                                <img
                                                                                    src={imagenSolucion}
                                                                                    alt={`Imagen de la solución: ${reto.titulo}`}
                                                                                    className="
                                                                                        max-h-[520px]
                                                                                        w-full
                                                                                        object-contain
                                                                                        bg-black/30
                                                                                    "
                                                                                />

                                                                            </div>

                                                                        )}

                                                                    </div>

                                                                </div>

                                                            ) : (

                                                                <div
                                                                    className="
                                                                        mt-5
                                                                        flex
                                                                        items-center
                                                                        gap-3
                                                                        rounded-xl
                                                                        border
                                                                        border-white/[0.06]
                                                                        bg-white/[0.015]
                                                                        px-4
                                                                        py-3.5
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            h-8
                                                                            w-8
                                                                            shrink-0
                                                                            items-center
                                                                            justify-center
                                                                            rounded-lg
                                                                            bg-white/[0.035]
                                                                            text-slate-500
                                                                        "
                                                                    >
                                                                        <LockKeyhole size={15} />
                                                                    </div>

                                                                    <div>

                                                                        <p
                                                                            className="
                                                                                text-[11px]
                                                                                font-bold
                                                                                text-slate-300
                                                                            "
                                                                        >
                                                                            Solución oculta
                                                                        </p>

                                                                        <p
                                                                            className="
                                                                                mt-0.5
                                                                                text-[10px]
                                                                                leading-4
                                                                                text-slate-600
                                                                            "
                                                                        >
                                                                            El docente todavía no ha habilitado la solución.
                                                                        </p>

                                                                    </div>

                                                                </div>

                                                            )}

                                                        </div>

                                                    </article>

                                                );

                                            }
                                        )}

                                </div>

                            )}

                        </section>


                    </main>


                    {/* =================================================
                        RECURSOS DESCARGABLES
                    ================================================= */}

                    <aside
                        className="
                            sticky
                            top-4
                            h-fit
                            max-h-[calc(100vh-120px)]
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-[#080A13]/85
                            p-3
                            shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                            backdrop-blur-xl
                        "
                    >

                        <div
                            className="
                                mb-3
                                flex
                                items-start
                                justify-between
                                gap-2
                                px-1
                            "
                        >

                            <div>

                                <p
                                    className="
                                        text-[9px]
                                        font-black
                                        uppercase
                                        tracking-[2px]
                                        text-violet-400
                                    "
                                >
                                    Recursos
                                </p>

                                <p
                                    className="
                                        mt-1
                                        text-[10px]
                                        text-slate-600
                                    "
                                >
                                    Archivos para descargar
                                </p>

                            </div>


                            <span
                                className="
                                    flex
                                    h-7
                                    min-w-7
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-violet-500/20
                                    bg-violet-500/10
                                    px-2
                                    text-[9px]
                                    font-black
                                    text-violet-300
                                "
                            >
                                {recursos.length}
                            </span>

                        </div>


                        <div
                            className="
                                max-h-[calc(100vh-205px)]
                                space-y-2
                                overflow-y-auto
                                overflow-x-hidden
                                pr-1
                                [scrollbar-color:rgba(139,92,246,0.45)_transparent]
                                [scrollbar-width:thin]
                                [&::-webkit-scrollbar]:w-1
                                [&::-webkit-scrollbar-track]:bg-transparent
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-violet-500/30
                                hover:[&::-webkit-scrollbar-thumb]:bg-violet-500/55
                            "
                        >

                            {recursos.length === 0 ? (

                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-dashed
                                        border-white/10
                                        p-4
                                        text-center
                                    "
                                >

                                    <FolderOpen
                                        size={18}
                                        className="
                                            mx-auto
                                            text-slate-600
                                        "
                                    />

                                    <p
                                        className="
                                            mt-2
                                            text-[10px]
                                            leading-4
                                            text-slate-600
                                        "
                                    >
                                        No hay archivos descargables
                                        en este tema.
                                    </p>

                                </div>

                            ) : (

                                recursos.map(
                                    recurso => {

                                        const Icon =
                                            iconoTipo(
                                                recurso.tipo
                                            );

                                        const activo =
                                            recurso.id ===
                                            recursoSeleccionado;

                                        const tamano =
                                            formatearTamano(
                                                recurso.archivo?.tamano
                                            );

                                        return (

                                            <div
                                                key={
                                                    recurso.id
                                                }
                                                className={`
                                                    rounded-xl
                                                    border
                                                    p-2.5
                                                    transition-all
                                                    ${
                                                        activo
                                                            ? "border-violet-500/35 bg-violet-500/[0.08] shadow-[0_0_25px_rgba(124,58,237,0.08)]"
                                                            : "border-white/[0.05] bg-black/10 hover:border-violet-500/20 hover:bg-white/[0.025]"
                                                    }
                                                `}
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-start
                                                        gap-2.5
                                                    "
                                                >

                                                    <div
                                                        className={`
                                                            flex
                                                            h-9
                                                            w-9
                                                            shrink-0
                                                            items-center
                                                            justify-center
                                                            rounded-lg
                                                            ${
                                                                activo
                                                                    ? "bg-violet-500/20 text-violet-300"
                                                                    : "bg-white/[0.035] text-slate-500"
                                                            }
                                                        `}
                                                    >

                                                        <Icon
                                                            size={16}
                                                        />

                                                    </div>


                                                    <div
                                                        className="
                                                            min-w-0
                                                            flex-1
                                                        "
                                                    >

                                                        <p
                                                            className="
                                                                break-words
                                                                whitespace-normal
                                                                text-[10px]
                                                                font-bold
                                                                leading-4
                                                                text-slate-200
                                                            "
                                                        >
                                                            {recurso.titulo}
                                                        </p>


                                                        <p
                                                            className="
                                                                mt-0.5
                                                                text-[9px]
                                                                text-slate-600
                                                            "
                                                        >
                                                            {recurso.tipo ===
                                                            "pdf"
                                                                ? "PDF"
                                                                : "Archivo"}
                                                            {tamano
                                                                ? ` · ${tamano}`
                                                                : ""}
                                                        </p>

                                                    </div>

                                                </div>


                                                {recurso.url && (

                                                    <div
                                                        className="
                                                            mt-2
                                                            grid
                                                            grid-cols-2
                                                            gap-1.5
                                                        "
                                                    >

                                                        <a
                                                            href={
                                                                recurso.url
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            onClick={() =>
                                                                setRecursoSeleccionado(
                                                                    recurso.id
                                                                )
                                                            }
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                justify-center
                                                                gap-1
                                                                rounded-lg
                                                                border
                                                                border-white/[0.07]
                                                                bg-white/[0.025]
                                                                px-2
                                                                py-1.5
                                                                text-[9px]
                                                                font-bold
                                                                text-slate-300
                                                                transition
                                                                hover:border-violet-500/25
                                                                hover:bg-violet-500/10
                                                                hover:text-white
                                                            "
                                                        >

                                                            <ArrowUpRight
                                                                size={12}
                                                            />

                                                            Ver

                                                        </a>


                                                        <a
                                                            href={
                                                                recurso.url
                                                            }
                                                            download={
                                                                recurso.archivo?.nombre ||
                                                                true
                                                            }
                                                            onClick={() =>
                                                                setRecursoSeleccionado(
                                                                    recurso.id
                                                                )
                                                            }
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                justify-center
                                                                gap-1
                                                                rounded-lg
                                                                bg-violet-600
                                                                px-2
                                                                py-1.5
                                                                text-[9px]
                                                                font-bold
                                                                text-white
                                                                shadow-[0_0_16px_rgba(124,58,237,0.16)]
                                                                transition
                                                                hover:bg-violet-500
                                                            "
                                                        >

                                                            <Download
                                                                size={12}
                                                            />

                                                            Descargar

                                                        </a>

                                                    </div>

                                                )}

                                            </div>

                                        );

                                    }
                                )

                            )}

                        </div>

                    </aside>


                </div>


                {/* =====================================================
                    NAVEGACIÓN INFERIOR
                ===================================================== */}

                <div
                    className="
                        mt-4
                        flex
                        items-center
                        justify-between
                        gap-3
                    "
                >

                    <button
                        type="button"
                        disabled={
                            indiceTema <= 0
                        }
                        onClick={() =>
                            cambiarTema(
                                "anterior"
                            )
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            border
                            border-white/[0.06]
                            bg-white/[0.02]
                            px-3
                            py-2
                            text-[10px]
                            font-semibold
                            text-slate-500
                            transition
                            hover:border-violet-500/20
                            hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-25
                        "
                    >

                        <ChevronLeft
                            size={14}
                        />

                        Tema anterior

                    </button>


                    <div
                        className="
                            hidden
                            items-center
                            gap-2
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[1.6px]
                            text-slate-700
                            sm:flex
                        "
                    >

                        Tema{" "}
                        {Math.max(
                            indiceTema + 1,
                            1
                        )}{" "}
                        de{" "}
                        {temas.length}

                    </div>


                    <button
                        type="button"
                        disabled={
                            indiceTema === -1 ||
                            indiceTema >=
                                temas.length - 1
                        }
                        onClick={() =>
                            cambiarTema(
                                "siguiente"
                            )
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-xl
                            bg-violet-600
                            px-3
                            py-2
                            text-[10px]
                            font-bold
                            text-white
                            shadow-[0_0_20px_rgba(124,58,237,0.18)]
                            transition
                            hover:bg-violet-500
                            disabled:cursor-not-allowed
                            disabled:opacity-25
                        "
                    >

                        Siguiente tema

                        <ChevronRight
                            size={14}
                        />

                    </button>

                </div>

            </div>

        </div>

    );

}
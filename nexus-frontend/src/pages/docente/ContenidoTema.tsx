import {
    ArrowLeft,
    Plus,
    FileText,
    Link,
    Image,
    File,
    Video,
    Pencil,
    Trash2,
    Loader2,
    AlertCircle,
    X,
    Upload,
    ExternalLink,
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
    getContenidosTemaRequest,
    crearContenidoRequest,
    actualizarContenidoRequest,
    eliminarContenidoRequest,
} from "../../api/contenidos";

import type {
    Contenido,
    TipoContenido,
} from "../../api/contenidos";

import {
    subirArchivoRequest,
    actualizarArchivoRequest,
} from "../../api/archivos";


import RichTextEditor
    from "../../components/docente/RichTextEditor";


/*
|--------------------------------------------------------------------------
| INFORMACIÓN DE TIPOS
|--------------------------------------------------------------------------
*/

const tiposContenido: {
    value: TipoContenido;
    label: string;
    icon: typeof FileText;
}[] = [

    {
        value: "texto",
        label: "Texto",
        icon: FileText,
    },

    {
        value: "youtube",
        label: "YouTube",
        icon: Link,
    },

    {
        value: "imagen",
        label: "Imagen",
        icon: Image,
    },

    {
        value: "pdf",
        label: "PDF",
        icon: File,
    },

    {
        value: "video",
        label: "Video",
        icon: Video,
    },

    {
        value: "archivo",
        label: "Archivo",
        icon: File,
    },

];


/*
|--------------------------------------------------------------------------
| OBTENER ID DE YOUTUBE
|--------------------------------------------------------------------------
*/

const obtenerYoutubeId = (
    url: string
): string | null => {

    if (!url) {
        return null;
    }

    try {

        const urlObj =
            new URL(url);


        /*
        |--------------------------------------------------------------------------
        | youtube.com/watch?v=XXXXXXXX
        |--------------------------------------------------------------------------
        */

        if (
            urlObj.hostname.includes(
                "youtube.com"
            ) &&
            urlObj.searchParams.get("v")
        ) {

            return urlObj.searchParams.get("v");

        }


        /*
        |--------------------------------------------------------------------------
        | youtu.be/XXXXXXXX
        |--------------------------------------------------------------------------
        */

        if (
            urlObj.hostname.includes(
                "youtu.be"
            )
        ) {

            return urlObj.pathname
                .replace("/", "")
                .split("?")[0];

        }


        /*
        |--------------------------------------------------------------------------
        | youtube.com/embed/XXXXXXXX
        |--------------------------------------------------------------------------
        */

        if (
            urlObj.pathname.includes(
                "/embed/"
            )
        ) {

            return urlObj.pathname
                .split("/embed/")[1]
                .split("/")[0];

        }


        return null;

    } catch {

        return null;

    }

};


/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function ContenidoTema() {

    const navigate = useNavigate();


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

    const [contenidos, setContenidos] =
        useState<Contenido[]>([]);


    const [loading, setLoading] =
        useState(true);


    const [saving, setSaving] =
        useState(false);


    const [uploading, setUploading] =
        useState(false);


    const [error, setError] =
        useState("");


    const [showModal, setShowModal] =
        useState(false);


    const [editingId, setEditingId] =
        useState<number | null>(null);


    const [archivoSeleccionado, setArchivoSeleccionado] =
        useState<File | null>(null);


    const [form, setForm] = useState({

        titulo: "",

        contenido: "",

        tipo: "texto" as TipoContenido,

    });


    /*
    |--------------------------------------------------------------------------
    | CARGAR CONTENIDOS
    |--------------------------------------------------------------------------
    */

    const cargarContenidos = async () => {

        if (!temaId) {

            setError(
                "No se encontró el tema."
            );

            setLoading(false);

            return;

        }


        try {

            setLoading(true);

            setError("");


            const data =
                await getContenidosTemaRequest(
                    Number(temaId)
                );


            setContenidos(data);

        } catch (error: any) {

            console.error(
                "Error al cargar contenidos:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudieron cargar los contenidos."
            );

        } finally {

            setLoading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | CARGAR AL INICIAR
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        cargarContenidos();

    }, [temaId]);


    /*
    |--------------------------------------------------------------------------
    | NUEVO CONTENIDO
    |--------------------------------------------------------------------------
    */

    const abrirNuevoContenido = () => {

        setEditingId(null);

        setArchivoSeleccionado(null);

        setForm({

            titulo: "",

            contenido: "",

            tipo: "texto",

        });

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | EDITAR CONTENIDO
    |--------------------------------------------------------------------------
    */

    const editarContenido = (
        contenido: Contenido
    ) => {

        setEditingId(
            contenido.id
        );

        setArchivoSeleccionado(null);

        setForm({

            titulo:
                contenido.titulo,

            contenido:
                contenido.contenido || "",

            tipo:
                contenido.tipo,

        });

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | CAMBIAR TIPO
    |--------------------------------------------------------------------------
    */

    const cambiarTipo = (
        tipo: TipoContenido
    ) => {

        setForm({

            ...form,

            tipo,

        });

        setArchivoSeleccionado(null);

    };


    /*
    |--------------------------------------------------------------------------
    | GUARDAR CONTENIDO
    |--------------------------------------------------------------------------
    */

    const guardarContenido = async () => {

        if (!form.titulo.trim()) {

            setError(
                "El título es obligatorio."
            );

            return;

        }


        if (!temaId) {

            setError(
                "No se encontró el tema."
            );

            return;

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDAR YOUTUBE
        |--------------------------------------------------------------------------
        */

        if (
            form.tipo === "youtube" &&
            !form.contenido.trim()
        ) {

            setError(
                "Debes agregar el enlace de YouTube."
            );

            return;

        }


        if (
            form.tipo === "youtube" &&
            !obtenerYoutubeId(
                form.contenido.trim()
            )
        ) {

            setError(
                "El enlace de YouTube no parece válido."
            );

            return;

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDAR ARCHIVO
        |--------------------------------------------------------------------------
        */

        if (
            [
                "pdf",
                "imagen",
                "video",
            ].includes(form.tipo) &&
            !editingId &&
            !archivoSeleccionado
        ) {

            setError(
                "Selecciona el archivo que deseas subir."
            );

            return;

        }


        try {

            setSaving(true);

            setError("");


            let contenidoId =
                editingId;


            /*
            |--------------------------------------------------------------------------
            | CREAR
            |--------------------------------------------------------------------------
            */

            if (editingId === null) {

                const response =
                    await crearContenidoRequest({

                        tema_id:
                            Number(temaId),

                        titulo:
                            form.titulo.trim(),

                        contenido:
                            form.contenido.trim(),

                        tipo:
                            form.tipo,

                    });


                contenidoId =
                    response?.contenido?.id;

            }


            /*
            |--------------------------------------------------------------------------
            | EDITAR
            |--------------------------------------------------------------------------
            */

            else {

                await actualizarContenidoRequest(

                    editingId,

                    {

                        titulo:
                            form.titulo.trim(),

                        contenido:
                            form.contenido.trim(),

                        tipo:
                            form.tipo,

                    }

                );

            }


            /*
            |--------------------------------------------------------------------------
            | SUBIR / REEMPLAZAR ARCHIVO
            |--------------------------------------------------------------------------
            |
            | Si estamos creando el contenido, se crea un archivo nuevo.
            |
            | Si estamos editando y ya existe un archivo del mismo tipo,
            | se reemplaza ese archivo en lugar de crear otro registro.
            |
            */

            if (
                archivoSeleccionado &&
                contenidoId &&
                [
                    "pdf",
                    "imagen",
                    "video",
                ].includes(form.tipo)
            ) {

                setUploading(true);


                /*
                |--------------------------------------------------------------------------
                | BUSCAR EL CONTENIDO ACTUAL
                |--------------------------------------------------------------------------
                */

                const contenidoActual =
                    contenidos.find(
                        contenido =>
                            contenido.id ===
                            Number(contenidoId)
                    );


                /*
                |--------------------------------------------------------------------------
                | BUSCAR ARCHIVO EXISTENTE DEL MISMO TIPO
                |--------------------------------------------------------------------------
                */

                const archivoActual =
                    contenidoActual?.archivos?.find(
                        archivo =>
                            archivo.tipo ===
                            form.tipo
                    );


                /*
                |--------------------------------------------------------------------------
                | EDITAR: REEMPLAZAR ARCHIVO EXISTENTE
                |--------------------------------------------------------------------------
                */

                if (
                    editingId !== null &&
                    archivoActual
                ) {

                    await actualizarArchivoRequest(

                        archivoActual.id,

                        archivoSeleccionado,

                        form.tipo as
                            "pdf" |
                            "imagen" |
                            "video" |
                            "archivo"

                    );

                }


                /*
                |--------------------------------------------------------------------------
                | CREAR: SUBIR ARCHIVO NUEVO
                |--------------------------------------------------------------------------
                */

                else {

                    await subirArchivoRequest(

                        Number(contenidoId),

                        archivoSeleccionado,

                        form.tipo as
                            "pdf" |
                            "imagen" |
                            "video" |
                            "archivo"

                    );

                }

            }


            setShowModal(false);

            setEditingId(null);

            setArchivoSeleccionado(null);


            setForm({

                titulo: "",

                contenido: "",

                tipo: "texto",

            });


            await cargarContenidos();

        } catch (error: any) {

            console.error(
                "Error al guardar contenido:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudo guardar el contenido."
            );

        } finally {

            setSaving(false);

            setUploading(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR CONTENIDO
    |--------------------------------------------------------------------------
    */

    const eliminarContenido = async (
        id: number
    ) => {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar este contenido?"
            );


        if (!confirmar) {
            return;
        }


        try {

            setError("");


            await eliminarContenidoRequest(
                id
            );


            setContenidos(
                actuales =>
                    actuales.filter(
                        contenido =>
                            contenido.id !== id
                    )
            );

        } catch (error: any) {

            console.error(
                "Error al eliminar contenido:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudo eliminar el contenido."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | CERRAR MODAL
    |--------------------------------------------------------------------------
    */

    const cerrarModal = () => {

        if (saving) {
            return;
        }


        setShowModal(false);

        setEditingId(null);

        setArchivoSeleccionado(null);

        setError("");

    };


    /*
    |--------------------------------------------------------------------------
    | ICONO DE CONTENIDO
    |--------------------------------------------------------------------------
    */

    const obtenerIcono = (
        tipo: TipoContenido
    ) => {

        const encontrado =
            tiposContenido.find(
                item =>
                    item.value === tipo
            );


        return encontrado?.icon ||
            FileText;

    };


    /*
    |--------------------------------------------------------------------------
    | COLOR / ETIQUETA
    |--------------------------------------------------------------------------
    */

    const obtenerEtiqueta = (
        tipo: TipoContenido
    ) => {

        return (
            tiposContenido.find(
                item =>
                    item.value === tipo
            )?.label ||
            "Contenido"
        );

    };


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div
                className="
                    min-h-[500px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-[var(--nexus-text-secondary)]
                "
            >

                <Loader2
                    size={35}
                    className="
                        animate-spin
                        text-violet-500
                    "
                />

                <p className="mt-4 text-sm">
                    Cargando contenido...
                </p>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <div className="space-y-8">


            {/* =========================================================
                HEADER
            ========================================================= */}

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

                <div>

                    <button
                        onClick={() =>
                            navigate(
                                `/dashboard/docente/materias/${materiaId}/unidades/${unidadId}`
                            )
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mb-4
                            text-sm
                            text-[var(--nexus-text-muted)]
                            hover:text-[var(--nexus-text)]
                            transition-colors
                        "
                    >

                        <ArrowLeft
                            size={17}
                        />

                        Volver a temas

                    </button>


                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            mb-2
                        "
                    >

                        <div
                            className="
                                w-10
                                h-10
                                rounded-xl
                                bg-violet-500/10
                                border
                                border-violet-500/20
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <FileText
                                size={20}
                                className="
                                    text-violet-400
                                "
                            />

                        </div>


                        <span
                            className="
                                text-xs
                                uppercase
                                tracking-[3px]
                                text-violet-400
                                font-semibold
                            "
                        >

                            Material educativo

                        </span>

                    </div>


                    <h1
                        className="
                            text-3xl
                            lg:text-4xl
                            font-black
                            text-[var(--nexus-text)]
                        "
                    >

                        Contenido

                    </h1>


                    <p
                        className="
                            mt-2
                            text-[var(--nexus-text-secondary)]
                        "
                    >

                        Crea y organiza el material educativo
                        de este tema.

                    </p>

                </div>


                <button
                    onClick={
                        abrirNuevoContenido
                    }
                    className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        h-12
                        px-5
                        rounded-xl
                        bg-violet-600
                        hover:bg-violet-500
                        text-white
                        font-semibold
                        shadow-[0_0_30px_rgba(124,58,237,0.25)]
                        transition-all
                    "
                >

                    <Plus
                        size={20}
                    />

                    Nuevo contenido

                </button>

            </div>


            {/* =========================================================
                ERROR
            ========================================================= */}

            {error && (

                <div
                    className="
                        flex
                        items-start
                        gap-3
                        p-4
                        rounded-xl
                        bg-red-500/10
                        border
                        border-red-500/20
                        text-red-300
                    "
                >

                    <AlertCircle
                        size={19}
                        className="mt-0.5 shrink-0"
                    />

                    <p className="flex-1 text-sm">
                        {error}
                    </p>


                    <button
                        onClick={() =>
                            setError("")
                        }
                    >

                        <X
                            size={18}
                        />

                    </button>

                </div>

            )}


            {/* =========================================================
                CONTENIDOS
            ========================================================= */}

            {contenidos.length > 0 ? (

                <div className="space-y-5">

                    {contenidos.map(
                        (item) => {

                            const Icon =
                                obtenerIcono(
                                    item.tipo
                                );


                            const youtubeId =
                                item.tipo === "youtube"
                                    ? obtenerYoutubeId(
                                        item.contenido || ""
                                    )
                                    : null;


                            return (

                                <div
                                    key={
                                        item.id
                                    }
                                    className="
                                        rounded-2xl
                                        bg-[var(--nexus-surface-secondary)]
                                        border
                                        border-[var(--nexus-border)]
                                        overflow-hidden
                                        hover:border-violet-500/25
                                        transition-all
                                    "
                                >

                                    {/* =================================================
                                        HEADER
                                    ================================================= */}

                                    <div
                                        className="
                                            px-6
                                            py-5
                                            border-b
                                            border-[var(--nexus-border)]
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-4
                                                min-w-0
                                            "
                                        >

                                            <div
                                                className="
                                                    w-11
                                                    h-11
                                                    rounded-xl
                                                    bg-violet-500/10
                                                    border
                                                    border-violet-500/20
                                                    flex
                                                    items-center
                                                    justify-center
                                                    shrink-0
                                                "
                                            >

                                                <Icon
                                                    size={20}
                                                    className="
                                                        text-violet-400
                                                    "
                                                />

                                            </div>


                                            <div
                                                className="min-w-0"
                                            >

                                                <p
                                                    className="
                                                        text-[10px]
                                                        uppercase
                                                        tracking-[2px]
                                                        text-violet-400
                                                        font-semibold
                                                    "
                                                >

                                                    {
                                                        obtenerEtiqueta(
                                                            item.tipo
                                                        )
                                                    }

                                                </p>


                                                <h2
                                                    className="
                                                        mt-1
                                                        text-lg
                                                        font-bold
                                                        text-[var(--nexus-text)]
                                                        truncate
                                                    "
                                                >

                                                    {
                                                        item.titulo
                                                    }

                                                </h2>

                                            </div>

                                        </div>


                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                                shrink-0
                                            "
                                        >

                                            <button
                                                onClick={() =>
                                                    editarContenido(
                                                        item
                                                    )
                                                }
                                                className="
                                                    w-9
                                                    h-9
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-[var(--nexus-text-muted)]
                                                    hover:text-[var(--nexus-text)]
                                                    hover:bg-black/5
                                                    dark:hover:bg-white/5
                                                "
                                                title="Editar"
                                            >

                                                <Pencil
                                                    size={17}
                                                />

                                            </button>


                                            <button
                                                onClick={() =>
                                                    eliminarContenido(
                                                        item.id
                                                    )
                                                }
                                                className="
                                                    w-9
                                                    h-9
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-red-400
                                                    hover:bg-red-500/10
                                                "
                                                title="Eliminar"
                                            >

                                                <Trash2
                                                    size={17}
                                                />

                                            </button>

                                        </div>

                                    </div>


                                    {/* =================================================
                                        CONTENIDO
                                    ================================================= */}

                                    <div className="p-6">

                                        {item.tipo ===
                                            "youtube" ? (

                                            <div className="space-y-5">

                                                {youtubeId ? (

                                                    <div
                                                        className="
                                                            relative
                                                            w-full
                                                            aspect-video
                                                            rounded-2xl
                                                            overflow-hidden
                                                            bg-black
                                                            border
                                                            border-[var(--nexus-border)]
                                                        "
                                                    >

                                                        <iframe
                                                            src={
                                                                `https://www.youtube.com/embed/${youtubeId}`
                                                            }
                                                            title={
                                                                item.titulo
                                                            }
                                                            className="
                                                                absolute
                                                                inset-0
                                                                w-full
                                                                h-full
                                                            "
                                                            allow="
                                                                accelerometer;
                                                                autoplay;
                                                                clipboard-write;
                                                                encrypted-media;
                                                                gyroscope;
                                                                picture-in-picture;
                                                                web-share
                                                            "
                                                            allowFullScreen
                                                        />

                                                    </div>

                                                ) : (

                                                    <div
                                                        className="
                                                            p-4
                                                            rounded-xl
                                                            bg-yellow-500/10
                                                            border
                                                            border-yellow-500/20
                                                            text-yellow-300
                                                            text-sm
                                                        "
                                                    >

                                                        El enlace de
                                                        YouTube no
                                                        parece válido.

                                                    </div>

                                                )}


                                                <a
                                                    href={
                                                        item.contenido ||
                                                        "#"
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        text-sm
                                                        text-violet-400
                                                        hover:text-violet-300
                                                        break-all
                                                    "
                                                >

                                                    <Link
                                                        size={16}
                                                    />

                                                    Abrir video
                                                    en YouTube

                                                    <ExternalLink
                                                        size={15}
                                                    />

                                                </a>

                                            </div>

                                        ) : item.contenido ? (

                                            <div
    className="
        nexus-rich-preview
        text-sm
        leading-7
        text-[var(--nexus-text-secondary)]

        [&_p]:mb-4
        [&_p:last-child]:mb-0

        [&_h1]:mt-5
        [&_h1]:mb-3
        [&_h1]:text-2xl
        [&_h1]:font-black
        [&_h1]:text-[var(--nexus-text)]

        [&_h2]:mt-5
        [&_h2]:mb-3
        [&_h2]:text-xl
        [&_h2]:font-black
        [&_h2]:text-[var(--nexus-text)]

        [&_h3]:mt-4
        [&_h3]:mb-2
        [&_h3]:text-lg
        [&_h3]:font-bold
        [&_h3]:text-[var(--nexus-text)]

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
        [&_blockquote]:text-[var(--nexus-text-muted)]

        [&_a]:text-violet-400
        [&_a]:underline
        [&_a]:underline-offset-2

        [&_mark]:rounded
        [&_mark]:px-1
    "
    dangerouslySetInnerHTML={{
        __html:
            item.contenido ||
            "<p>Este contenido no tiene texto.</p>",
    }}
/>

                                        ) : (

                                            <p
                                                className="
                                                    text-sm
                                                    text-[var(--nexus-text-muted)]
                                                    italic
                                                "
                                            >

                                                Este contenido
                                                no tiene texto.

                                            </p>

                                        )}


                                        {/* =================================================
                                            ARCHIVOS
                                        ================================================= */}

                                        {item.archivos &&
                                            item.archivos.length >
                                                0 && (

                                            <div
                                                className="
                                                    mt-5
                                                    pt-5
                                                    border-t
                                                    border-[var(--nexus-border)]
                                                "
                                            >

                                                <p
                                                    className="
                                                        text-xs
                                                        uppercase
                                                        tracking-wider
                                                        text-[var(--nexus-text-muted)]
                                                        font-semibold
                                                        mb-3
                                                    "
                                                >

                                                    Archivos

                                                </p>


                                                <div
                                                    className="
                                                        space-y-3
                                                    "
                                                >

                                                    {item.archivos.map(
                                                        (
                                                            archivo
                                                        ) => (

                                                            <div
                                                                key={
                                                                    archivo.id
                                                                }
                                                                className="
                                                                    flex
                                                                    flex-col
                                                                    sm:flex-row
                                                                    sm:items-center
                                                                    justify-between
                                                                    gap-4
                                                                    p-4
                                                                    rounded-xl
                                                                    bg-[var(--nexus-bg)]
                                                                    border
                                                                    border-[var(--nexus-border)]
                                                                "
                                                            >

                                                                {/* =====================================
                                                                    INFORMACIÓN DEL ARCHIVO
                                                                ===================================== */}

                                                                <div
                                                                    className="
                                                                        flex
                                                                        items-center
                                                                        gap-3
                                                                        min-w-0
                                                                    "
                                                                >

                                                                    <div
                                                                        className="
                                                                            w-10
                                                                            h-10
                                                                            rounded-lg
                                                                            bg-violet-500/10
                                                                            border
                                                                            border-violet-500/20
                                                                            flex
                                                                            items-center
                                                                            justify-center
                                                                            shrink-0
                                                                        "
                                                                    >

                                                                        {archivo.tipo ===
                                                                            "pdf" ? (

                                                                            <FileText
                                                                                size={18}
                                                                                className="
                                                                                    text-red-400
                                                                                "
                                                                            />

                                                                        ) : archivo.tipo ===
                                                                            "imagen" ? (

                                                                            <Image
                                                                                size={18}
                                                                                className="
                                                                                    text-blue-400
                                                                                "
                                                                            />

                                                                        ) : archivo.tipo ===
                                                                            "video" ? (

                                                                            <Video
                                                                                size={18}
                                                                                className="
                                                                                    text-violet-400
                                                                                "
                                                                            />

                                                                        ) : (

                                                                            <File
                                                                                size={18}
                                                                                className="
                                                                                    text-violet-400
                                                                                "
                                                                            />

                                                                        )}

                                                                    </div>


                                                                    <div
                                                                        className="
                                                                            min-w-0
                                                                        "
                                                                    >

                                                                        <p
                                                                            className="
                                                                                text-sm
                                                                                font-medium
                                                                                text-[var(--nexus-text)]
                                                                                truncate
                                                                            "
                                                                        >

                                                                            {
                                                                                archivo.nombre
                                                                            }

                                                                        </p>


                                                                        <p
                                                                            className="
                                                                                mt-0.5
                                                                                text-xs
                                                                                text-[var(--nexus-text-muted)]
                                                                                uppercase
                                                                            "
                                                                        >

                                                                            {
                                                                                archivo.tipo
                                                                            }

                                                                        </p>

                                                                    </div>

                                                                </div>


                                                                {/* =====================================
                                                                    BOTONES
                                                                ===================================== */}

                                                                {/* =====================================
    BOTÓN VER
===================================== */}

{(archivo.url || archivo.ruta) && (

    <div
        className="
            flex
            items-center
            gap-2
            shrink-0
        "
    >

        <a
            href={
                archivo.url ||
                `http://127.0.0.1:8000/storage/${archivo.ruta}`
            }
            target="_blank"
            rel="noreferrer"
            className="
                h-9
                px-4
                rounded-lg
                border
                border-[var(--nexus-border)]
                text-sm
                font-medium
                text-[var(--nexus-text-secondary)]
                hover:text-[var(--nexus-text)]
                hover:border-violet-500/30
                inline-flex
                items-center
                justify-center
                gap-2
                transition-all
            "
        >

            <ExternalLink
                size={15}
            />

            Ver

        </a>

    </div>

)}

                                                            </div>

                                                        )
                                                    )}

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            );

                        }
                    )}

                </div>

            ) : (

                <div
                    className="
                        min-h-[420px]
                        rounded-2xl
                        border
                        border-dashed
                        border-[var(--nexus-border)]
                        bg-[var(--nexus-surface-secondary)]
                        flex
                        items-center
                        justify-center
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
                                mx-auto
                                w-16
                                h-16
                                rounded-2xl
                                bg-violet-500/10
                                border
                                border-violet-500/20
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <FileText
                                size={28}
                                className="
                                    text-violet-400
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

                            Aún no hay contenido

                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--nexus-text-muted)]
                            "
                        >

                            Crea el primer material educativo
                            para este tema.

                        </p>


                        <button
                            onClick={
                                abrirNuevoContenido
                            }
                            className="
                                mt-6
                                inline-flex
                                items-center
                                gap-2
                                h-11
                                px-5
                                rounded-xl
                                bg-violet-600
                                hover:bg-violet-500
                                text-white
                                text-sm
                                font-semibold
                            "
                        >

                            <Plus
                                size={18}
                            />

                            Crear contenido

                        </button>

                    </div>

                </div>

            )}


            {/* =========================================================
                MODAL
            ========================================================= */}

            {showModal && (

                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        p-4
                        bg-black/70
                        backdrop-blur-sm
                        overflow-y-auto
                    "
                    onMouseDown={(e) => {

                        if (
                            e.target ===
                            e.currentTarget
                        ) {

                            cerrarModal();

                        }

                    }}
                >

                    <div
                        className="
                            w-full
                            max-w-2xl
                            my-8
                            rounded-2xl
                            bg-[var(--nexus-surface-secondary)]
                            border
                            border-[var(--nexus-border)]
                            shadow-[0_30px_100px_rgba(0,0,0,0.6)]
                            overflow-hidden
                        "
                    >

                        {/* =================================================
                            HEADER
                        ================================================= */}

                        <div
                            className="
                                px-6
                                py-5
                                border-b
                                border-[var(--nexus-border)]
                                flex
                                items-center
                                justify-between
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

                                    {editingId !== null
                                        ? "Editar contenido"
                                        : "Nuevo contenido"}

                                </h2>


                                <p
                                    className="
                                        text-xs
                                        text-[var(--nexus-text-muted)]
                                        mt-1
                                    "
                                >

                                    Agrega material educativo
                                    al tema.

                                </p>

                            </div>


                            <button
                                onClick={
                                    cerrarModal
                                }
                                disabled={
                                    saving
                                }
                                className="
                                    w-9
                                    h-9
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    text-[var(--nexus-text-muted)]
                                    hover:text-[var(--nexus-text)]
                                "
                            >

                                <X
                                    size={18}
                                />

                            </button>

                        </div>


                        {/* =================================================
                            BODY
                        ================================================= */}

                        <div
    className="
        p-6
        space-y-6
        max-h-[calc(100vh-220px)]
        overflow-y-auto
        pr-2

        [&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-violet-500/30
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-violet-500/50
    "
>


                            {/* =================================================
                                TÍTULO
                            ================================================= */}

                            <div>

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text-secondary)]
                                        mb-2
                                    "
                                >

                                    Título

                                </label>


                                <input
                                    type="text"
                                    value={
                                        form.titulo
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            titulo:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Ej. Introducción al modelo OSI"
                                    disabled={
                                        saving
                                    }
                                    className="
                                        w-full
                                        h-12
                                        rounded-xl
                                        bg-[var(--nexus-bg)]
                                        border
                                        border-[var(--nexus-border)]
                                        px-4
                                        text-sm
                                        text-[var(--nexus-text)]
                                        placeholder:text-[var(--nexus-text-muted)]
                                        outline-none
                                        focus:border-violet-500/50
                                        focus:ring-2
                                        focus:ring-violet-500/10
                                    "
                                />

                            </div>


                            {/* =================================================
                                TIPO
                            ================================================= */}

                            <div>

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text-secondary)]
                                        mb-3
                                    "
                                >

                                    Tipo de contenido

                                </label>


                                <div
                                    className="
                                        grid
                                        grid-cols-2
                                        md:grid-cols-3
                                        gap-3
                                    "
                                >

                                    {tiposContenido.map(
                                        (tipo) => {

                                            const Icon =
                                                tipo.icon;


                                            const activo =
                                                form.tipo ===
                                                tipo.value;


                                            return (

                                                <button
                                                    key={
                                                        tipo.value
                                                    }
                                                    type="button"
                                                    onClick={() =>
                                                        cambiarTipo(
                                                            tipo.value
                                                        )
                                                    }
                                                    disabled={
                                                        saving
                                                    }
                                                    className={`
                                                        flex
                                                        items-center
                                                        gap-3
                                                        p-3
                                                        rounded-xl
                                                        border
                                                        text-left
                                                        transition-all

                                                        ${
                                                            activo
                                                                ? `
                                                                    border-violet-500/40
                                                                    bg-violet-500/10
                                                                    text-[var(--nexus-text)]
                                                                `
                                                                : `
                                                                    border-[var(--nexus-border)]
                                                                    text-[var(--nexus-text-secondary)]
                                                                    hover:border-violet-500/20
                                                                    hover:bg-black/5
                                                                    dark:hover:bg-white/5
                                                                `
                                                        }
                                                    `}
                                                >

                                                    <Icon
                                                        size={18}
                                                    />

                                                    <span
                                                        className="
                                                            text-sm
                                                            font-medium
                                                        "
                                                    >

                                                        {
                                                            tipo.label
                                                        }

                                                    </span>

                                                </button>

                                            );

                                        }
                                    )}

                                </div>

                            </div>


                            {/* =================================================
                                CONTENIDO / URL
                            ================================================= */}

                            <div>

                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text-secondary)]
                                        mb-2
                                    "
                                >

                                    {form.tipo ===
                                        "youtube"
                                        ? "Enlace de YouTube"
                                        : "Contenido"}

                                </label>


                                {form.tipo ===
                                    "youtube" ? (

                                    <input
                                        type="url"
                                        value={
                                            form.contenido
                                        }
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                contenido:
                                                    e.target.value,
                                            })
                                        }
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        disabled={
                                            saving
                                        }
                                        className="
                                            w-full
                                            h-12
                                            rounded-xl
                                            bg-[var(--nexus-bg)]
                                            border
                                            border-[var(--nexus-border)]
                                            px-4
                                            text-sm
                                            text-[var(--nexus-text)]
                                            placeholder:text-[var(--nexus-text-muted)]
                                            outline-none
                                            focus:border-violet-500/50
                                            focus:ring-2
                                            focus:ring-violet-500/10
                                        "
                                    />

                                ) : (

                                    <RichTextEditor
                                        value={
                                            form.contenido
                                        }
                                        onChange={(
                                            contenido
                                        ) =>
                                            setForm({
                                                ...form,
                                                contenido,
                                            })
                                        }
                                        disabled={
                                            saving
                                        }
                                        placeholder={
                                            form.tipo ===
                                                "texto"
                                                ? "Escribe el contenido educativo..."
                                                : "Puedes agregar una descripción opcional..."
                                        }
                                    />

                                )}

                            </div>


                            {/* =================================================
                                ARCHIVO
                            ================================================= */}

                            {[
                                "pdf",
                                "imagen",
                                "video",
                                "archivo",
                            ].includes(
                                form.tipo
                            ) && (

                                <div>

                                    <label
                                        className="
                                            block
                                            text-sm
                                            font-medium
                                            text-[var(--nexus-text-secondary)]
                                            mb-2
                                        "
                                    >

                                        Archivo

                                    </label>


                                    <label
                                        className="
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            gap-3
                                            min-h-36
                                            rounded-xl
                                            border
                                            border-dashed
                                            border-[var(--nexus-border)]
                                            bg-[var(--nexus-bg)]
                                            hover:border-violet-500/40
                                            cursor-pointer
                                            transition-all
                                        "
                                    >

                                        <Upload
                                            size={25}
                                            className="
                                                text-violet-400
                                            "
                                        />


                                        <span
                                            className="
                                                text-sm
                                                text-[var(--nexus-text-secondary)]
                                            "
                                        >

                                            {archivoSeleccionado
                                                ? archivoSeleccionado.name
                                                : "Selecciona un archivo"}

                                        </span>


                                        <span
                                            className="
                                                text-xs
                                                text-[var(--nexus-text-muted)]
                                            "
                                        >

                                            Máximo 20 MB

                                        </span>


                                        <input
                                            type="file"
                                            className="hidden"
                                            disabled={
                                                saving
                                            }
                                            onChange={(e) => {

                                                const archivo =
                                                    e.target.files?.[0] ||
                                                    null;

                                                setArchivoSeleccionado(
                                                    archivo
                                                );

                                            }}
                                        />

                                    </label>

                                </div>

                            )}

                        </div>


                        {/* =================================================
                            FOOTER
                        ================================================= */}

                        <div
                            className="
                                px-6
                                py-4
                                border-t
                                border-[var(--nexus-border)]
                                flex
                                items-center
                                justify-end
                                gap-3
                            "
                        >

                            <button
                                onClick={
                                    cerrarModal
                                }
                                disabled={
                                    saving
                                }
                                className="
                                    h-11
                                    px-5
                                    rounded-xl
                                    text-sm
                                    font-medium
                                    text-[var(--nexus-text-secondary)]
                                    hover:text-[var(--nexus-text)]
                                "
                            >

                                Cancelar

                            </button>


                            <button
                                onClick={
                                    guardarContenido
                                }
                                disabled={
                                    saving ||
                                    uploading ||
                                    !form.titulo.trim()
                                }
                                className="
                                    h-11
                                    px-5
                                    rounded-xl
                                    bg-violet-600
                                    hover:bg-violet-500
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                    text-sm
                                    font-semibold
                                    text-white
                                    inline-flex
                                    items-center
                                    gap-2
                                "
                            >

                                {(saving ||
                                    uploading) && (

                                    <Loader2
                                        size={17}
                                        className="
                                            animate-spin
                                        "
                                    />

                                )}


                                {uploading
                                    ? "Subiendo archivo..."
                                    : editingId !== null
                                        ? "Guardar cambios"
                                        : "Crear contenido"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}
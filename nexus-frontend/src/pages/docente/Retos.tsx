import {
    useEffect,
    useState,
    type ChangeEvent,
} from "react";

import {
    AlertCircle,
    BookOpen,
    Check,
    ChevronDown,
    Eye,
    EyeOff,
    Image as ImageIcon,
    Lightbulb,
    Loader2,
    MoreVertical,
    Pencil,
    Plus,
    Puzzle,
    Save,
    Trash2,
    Upload,
    X,
} from "lucide-react";

import {
    getMateriasRequest,
} from "../../api/materias";

import {
    getUnidadesMateriaRequest,
} from "../../api/unidades";

import type {
    Materia,
} from "../../types/materia";

import api from "../../api/axios";

import {
    obtenerRetosRequest,
    crearRetoRequest,
    actualizarRetoRequest,
    eliminarRetoRequest,
    cambiarSolucionRequest,
    cambiarEstadoRetoRequest,
} from "../../api/retos";

import type {
    Reto,
} from "../../api/retos";

import RichTextEditor
    from "../../components/docente/RichTextEditor";


/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
*/

interface Unidad {
    id: number;
    materia_id: number;
    nombre: string;
    descripcion?: string | null;
    orden?: number;
}

interface Tema {
    id: number;
    unidad_id: number;
    nombre: string;
    descripcion?: string | null;
    orden?: number;
}


/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function Retos() {

    /*
    |--------------------------------------------------------------------------
    | ESTADOS PRINCIPALES
    |--------------------------------------------------------------------------
    */

    const [
        materias,
        setMaterias,
    ] = useState<Materia[]>([]);

    const [
        unidades,
        setUnidades,
    ] = useState<Unidad[]>([]);

    const [
        temas,
        setTemas,
    ] = useState<Tema[]>([]);

    const [
        retos,
        setRetos,
    ] = useState<Reto[]>([]);


    /*
    |--------------------------------------------------------------------------
    | SELECCIÓN
    |--------------------------------------------------------------------------
    */

    const [
        materiaSeleccionada,
        setMateriaSeleccionada,
    ] = useState<number | null>(
        null
    );

    const [
        unidadSeleccionada,
        setUnidadSeleccionada,
    ] = useState<number | null>(
        null
    );

    const [
        temaSeleccionado,
        setTemaSeleccionado,
    ] = useState<number | null>(
        null
    );


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        loadingUnidades,
        setLoadingUnidades,
    ] = useState(false);

    const [
        loadingTemas,
        setLoadingTemas,
    ] = useState(false);

    const [
        loadingRetos,
        setLoadingRetos,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | GUARDADO
    |--------------------------------------------------------------------------
    */

    const [
        saving,
        setSaving,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | ERRORES
    |--------------------------------------------------------------------------
    */

    const [
        error,
        setError,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | MODAL
    |--------------------------------------------------------------------------
    */

    const [
        showModal,
        setShowModal,
    ] = useState(false);

    const [
        editingId,
        setEditingId,
    ] = useState<number | null>(
        null
    );


    /*
    |--------------------------------------------------------------------------
    | MENÚ
    |--------------------------------------------------------------------------
    */

    const [
        menuAbierto,
        setMenuAbierto,
    ] = useState<number | null>(
        null
    );


    /*
    |--------------------------------------------------------------------------
    | IMÁGENES
    |--------------------------------------------------------------------------
    */

    const [
        imagenReto,
        setImagenReto,
    ] = useState<File | null>(
        null
    );

    const [
        imagenSolucion,
        setImagenSolucion,
    ] = useState<File | null>(
        null
    );

    const [
        previewReto,
        setPreviewReto,
    ] = useState<string | null>(
        null
    );

    const [
        previewSolucion,
        setPreviewSolucion,
    ] = useState<string | null>(
        null
    );


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR IMÁGENES EXISTENTES
    |--------------------------------------------------------------------------
    */

    const [
        eliminarImagenReto,
        setEliminarImagenReto,
    ] = useState(false);

    const [
        eliminarImagenSolucion,
        setEliminarImagenSolucion,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | FORMULARIO
    |--------------------------------------------------------------------------
    */

    const [
        form,
        setForm,
    ] = useState({

        titulo: "",

        descripcion: "",

        solucion: "",

        mostrar_solucion: false,

        activo: true,

    });


    /*
    |--------------------------------------------------------------------------
    | CARGAR MATERIAS
    |--------------------------------------------------------------------------
    */

    const cargarMaterias =
        async () => {

            try {

                setLoading(true);

                setError("");

                const data =
                    await getMateriasRequest();

                setMaterias(data);

            } catch (
                err: any
            ) {

                console.error(
                    "Error cargando materias:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "No se pudieron cargar las materias."
                );

            } finally {

                setLoading(false);

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CARGAR AL INICIO
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        cargarMaterias();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | CAMBIAR MATERIA
    |--------------------------------------------------------------------------
    */

    const cambiarMateria =
        async (
            materiaId: number
        ) => {

            setMateriaSeleccionada(
                materiaId
            );

            setUnidadSeleccionada(
                null
            );

            setTemaSeleccionado(
                null
            );

            setUnidades([]);

            setTemas([]);

            setRetos([]);

            setError("");

            try {

                setLoadingUnidades(
                    true
                );

                const data =
                    await getUnidadesMateriaRequest(
                        materiaId
                    );

                const ordenadas =
                    [...data].sort(
                        (
                            a: any,
                            b: any
                        ) =>
                            (
                                a.orden ?? 0
                            ) -
                            (
                                b.orden ?? 0
                            )
                    );

                setUnidades(
                    ordenadas
                );

            } catch (
                err: any
            ) {

                console.error(
                    "Error cargando unidades:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "No se pudieron cargar las unidades."
                );

            } finally {

                setLoadingUnidades(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CAMBIAR UNIDAD
    |--------------------------------------------------------------------------
    */

    const cambiarUnidad =
        async (
            unidadId: number
        ) => {

            setUnidadSeleccionada(
                unidadId
            );

            setTemaSeleccionado(
                null
            );

            setTemas([]);

            setRetos([]);

            setError("");

            try {

                setLoadingTemas(
                    true
                );

                const response =
                    await api.get(
                        `/unidades/${unidadId}/temas`
                    );

                let data: Tema[] = [];

                if (
                    Array.isArray(
                        response.data
                    )
                ) {

                    data =
                        response.data;

                } else if (
                    response.data &&
                    Array.isArray(
                        response.data.temas
                    )
                ) {

                    data =
                        response.data.temas;

                }

                data =
                    [...data].sort(
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

                setTemas(
                    data
                );

            } catch (
                err: any
            ) {

                console.error(
                    "Error cargando temas:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "No se pudieron cargar los temas."
                );

            } finally {

                setLoadingTemas(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CAMBIAR TEMA
    |--------------------------------------------------------------------------
    */

    const cambiarTema =
        async (
            temaId: number
        ) => {

            setTemaSeleccionado(
                temaId
            );

            setError("");

            await cargarRetos(
                temaId
            );

        };


    /*
    |--------------------------------------------------------------------------
    | CARGAR RETOS
    |--------------------------------------------------------------------------
    */

    const cargarRetos =
        async (
            temaId: number
        ) => {

            try {

                setLoadingRetos(
                    true
                );

                const data =
                    await obtenerRetosRequest(
                        temaId
                    );

                setRetos(
                    data
                );

            } catch (
                err: any
            ) {

                console.error(
                    "Error cargando retos:",
                    err
                );

                setRetos([]);

                setError(
                    err?.response?.data?.message ||
                    "No se pudieron cargar los retos."
                );

            } finally {

                setLoadingRetos(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | NUEVO RETO
    |--------------------------------------------------------------------------
    */

    const abrirNuevoReto =
        () => {

            if (
                !temaSeleccionado
            ) {

                setError(
                    "Primero selecciona un tema."
                );

                return;

            }

            setEditingId(
                null
            );

            setForm({

                titulo: "",

                descripcion: "",

                solucion: "",

                mostrar_solucion: false,

                activo: true,

            });

            setImagenReto(
                null
            );

            setImagenSolucion(
                null
            );

            setPreviewReto(
                null
            );

            setPreviewSolucion(
                null
            );

            setEliminarImagenReto(
                false
            );

            setEliminarImagenSolucion(
                false
            );

            setError("");

            setShowModal(
                true
            );

        };


    /*
    |--------------------------------------------------------------------------
    | EDITAR RETO
    |--------------------------------------------------------------------------
    */

    const editarReto =
        (
            reto: Reto
        ) => {

            setEditingId(
                reto.id
            );

            setForm({

                titulo:
                    reto.titulo || "",

                descripcion:
                    reto.descripcion || "",

                solucion:
                    reto.solucion || "",

                mostrar_solucion:
                    Boolean(
                        reto.mostrar_solucion
                    ),

                activo:
                    Boolean(
                        reto.activo
                    ),

            });

            setImagenReto(
                null
            );

            setImagenSolucion(
                null
            );

            setPreviewReto(
                obtenerUrlImagen(
                    reto.imagen_reto
                )
            );

            setPreviewSolucion(
                obtenerUrlImagen(
                    reto.imagen_solucion
                )
            );

            setEliminarImagenReto(
                false
            );

            setEliminarImagenSolucion(
                false
            );

            setMenuAbierto(
                null
            );

            setError("");

            setShowModal(
                true
            );

        };


    /*
    |--------------------------------------------------------------------------
    | URL IMAGEN
    |--------------------------------------------------------------------------
    */

    const obtenerUrlImagen =
        (
            ruta?: string | null
        ) => {

            if (!ruta) {
                return null;
            }

            if (
                ruta.startsWith(
                    "http://"
                ) ||
                ruta.startsWith(
                    "https://"
                )
            ) {

                return ruta;

            }

            if (
                ruta.startsWith("/")
            ) {

                const base =
                    api.defaults.baseURL ||
                    window.location.origin;

                const origen =
                    base
                        .replace(
                            /\/api\/?$/,
                            ""
                        )
                        .replace(
                            /\/$/,
                            ""
                        );

                return (
                    origen +
                    ruta
                );

            }

            const base =
                api.defaults.baseURL ||
                window.location.origin;

            const origen =
                base
                    .replace(
                        /\/api\/?$/,
                        ""
                    )
                    .replace(
                        /\/$/,
                        ""
                    );

            return (
                origen +
                "/storage/" +
                ruta.replace(
                    /^\/+/,
                    ""
                )
            );

        };


    /*
    |--------------------------------------------------------------------------
    | SELECCIONAR IMAGEN RETO
    |--------------------------------------------------------------------------
    */

    const seleccionarImagenReto =
        (
            event: ChangeEvent<HTMLInputElement>
        ) => {

            const archivo =
                event.target.files?.[0];

            if (!archivo) {
                return;
            }

            if (
                !archivo.type.startsWith(
                    "image/"
                )
            ) {

                setError(
                    "La imagen del reto debe ser una imagen válida."
                );

                return;

            }

            if (
                archivo.size >
                10 * 1024 * 1024
            ) {

                setError(
                    "La imagen no puede superar los 10 MB."
                );

                return;

            }

            setImagenReto(
                archivo
            );

            setPreviewReto(
                URL.createObjectURL(
                    archivo
                )
            );

            setEliminarImagenReto(
                false
            );

            setError("");

        };


    /*
    |--------------------------------------------------------------------------
    | SELECCIONAR IMAGEN SOLUCIÓN
    |--------------------------------------------------------------------------
    */

    const seleccionarImagenSolucion =
        (
            event: ChangeEvent<HTMLInputElement>
        ) => {

            const archivo =
                event.target.files?.[0];

            if (!archivo) {
                return;
            }

            if (
                !archivo.type.startsWith(
                    "image/"
                )
            ) {

                setError(
                    "La imagen de la solución debe ser una imagen válida."
                );

                return;

            }

            if (
                archivo.size >
                10 * 1024 * 1024
            ) {

                setError(
                    "La imagen no puede superar los 10 MB."
                );

                return;

            }

            setImagenSolucion(
                archivo
            );

            setPreviewSolucion(
                URL.createObjectURL(
                    archivo
                )
            );

            setEliminarImagenSolucion(
                false
            );

            setError("");

        };


    /*
    |--------------------------------------------------------------------------
    | QUITAR IMAGEN RETO
    |--------------------------------------------------------------------------
    */

    const quitarImagenReto =
        () => {

            setImagenReto(
                null
            );

            setPreviewReto(
                null
            );

            if (
                editingId !== null
            ) {

                setEliminarImagenReto(
                    true
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | QUITAR IMAGEN SOLUCIÓN
    |--------------------------------------------------------------------------
    */

    const quitarImagenSolucion =
        () => {

            setImagenSolucion(
                null
            );

            setPreviewSolucion(
                null
            );

            if (
                editingId !== null
            ) {

                setEliminarImagenSolucion(
                    true
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | GUARDAR RETO
    |--------------------------------------------------------------------------
    */

    const guardarReto =
        async () => {

            if (
                !temaSeleccionado
            ) {

                setError(
                    "Selecciona un tema."
                );

                return;

            }

            if (
                !form.titulo.trim()
            ) {

                setError(
                    "El título del reto es obligatorio."
                );

                return;

            }

            if (
                !form.descripcion.trim() ||
                form.descripcion ===
                    "<p></p>"
            ) {

                setError(
                    "La descripción del reto es obligatoria."
                );

                return;

            }

            if (
                !form.solucion.trim() ||
                form.solucion ===
                    "<p></p>"
            ) {

                setError(
                    "La solución del reto es obligatoria."
                );

                return;

            }

            try {

                setSaving(
                    true
                );

                setError("");

                /*
                |--------------------------------------------------------------------------
                | CREAR
                |--------------------------------------------------------------------------
                */

                if (
                    editingId === null
                ) {

                    const nuevo =
                        await crearRetoRequest({

                            tema_id:
                                temaSeleccionado,

                            titulo:
                                form.titulo.trim(),

                            descripcion:
                                form.descripcion,

                            solucion:
                                form.solucion,

                            mostrar_solucion:
                                form.mostrar_solucion,

                            activo:
                                form.activo,

                            imagen_reto:
                                imagenReto,

                            imagen_solucion:
                                imagenSolucion,

                        });

                    setRetos(
                        actuales => [
                            nuevo,
                            ...actuales,
                        ]
                    );

                }

                /*
                |--------------------------------------------------------------------------
                | EDITAR
                |--------------------------------------------------------------------------
                */

                else {

                    const actualizado =
                        await actualizarRetoRequest(

                            editingId,

                            {

                                titulo:
                                    form.titulo.trim(),

                                descripcion:
                                    form.descripcion,

                                solucion:
                                    form.solucion,

                                mostrar_solucion:
                                    form.mostrar_solucion,

                                activo:
                                    form.activo,

                                imagen_reto:
                                    imagenReto,

                                imagen_solucion:
                                    imagenSolucion,

                                eliminar_imagen_reto:
                                    eliminarImagenReto,

                                eliminar_imagen_solucion:
                                    eliminarImagenSolucion,

                            }

                        );

                    setRetos(
                        actuales =>
                            actuales.map(
                                reto =>
                                    reto.id ===
                                    editingId
                                        ? actualizado
                                        : reto
                            )
                    );

                }

                cerrarModal();

            } catch (
                err: any
            ) {

                console.error(
                    "Error guardando reto:",
                    err
                );

                const errores =
                    err?.response?.data?.errors;

                if (
                    errores
                ) {

                    const primero =
                        Object.values(
                            errores
                        )[0];

                    if (
                        Array.isArray(
                            primero
                        )
                    ) {

                        setError(
                            String(
                                primero[0]
                            )
                        );

                    } else {

                        setError(
                            "Los datos enviados no son válidos."
                        );

                    }

                } else {

                    setError(
                        err?.response?.data?.message ||
                        "No se pudo guardar el reto."
                    );

                }

            } finally {

                setSaving(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | MOSTRAR / OCULTAR SOLUCIÓN
    |--------------------------------------------------------------------------
    */

    const cambiarVisibilidadSolucion =
        async (
            reto: Reto
        ) => {

            try {

                setError("");

                await cambiarSolucionRequest(
                    reto.id,
                    !reto.mostrar_solucion
                );

                setRetos(
                    actuales =>
                        actuales.map(
                            item =>
                                item &&
                                item.id === reto.id
                                    ? {
                                        ...item,
                                        mostrar_solucion:
                                            !item.mostrar_solucion,
                                    }
                                    : item
                        )
                );

                setMenuAbierto(
                    null
                );

            } catch (
                err: any
            ) {

                console.error(
                    "Error cambiando solución:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "No se pudo cambiar la visibilidad de la solución."
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | ACTIVAR / DESACTIVAR
    |--------------------------------------------------------------------------
    */

    const cambiarEstado =
        async (
            reto: Reto
        ) => {

            try {

                setError("");

                await cambiarEstadoRetoRequest(
                    reto.id,
                    !reto.activo
                );

                setRetos(
                    actuales =>
                        actuales.map(
                            item =>
                                item &&
                                item.id === reto.id
                                    ? {
                                        ...item,
                                        activo: !item.activo,
                                    }
                                    : item
                        )
                );

                setMenuAbierto(
                    null
                );

            } catch (
                err: any
            ) {

                console.error(
                    "Error cambiando estado:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "No se pudo cambiar el estado del reto."
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR
    |--------------------------------------------------------------------------
    */

    const eliminarReto =
        async (
            reto: Reto
        ) => {

            const confirmar =
                window.confirm(

                    `¿Seguro que deseas eliminar el reto "${reto.titulo}"?`

                );

            if (!confirmar) {
                return;
            }

            try {

                setError("");

                await eliminarRetoRequest(
                    reto.id
                );

                setRetos(
                    actuales =>
                        actuales.filter(
                            item =>
                                item.id !==
                                reto.id
                        )
                );

                setMenuAbierto(
                    null
                );

            } catch (
                err: any
            ) {

                console.error(
                    "Error eliminando reto:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "No se pudo eliminar el reto."
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CERRAR MODAL
    |--------------------------------------------------------------------------
    */

    const cerrarModal =
        () => {

            if (
                saving
            ) {
                return;
            }

            setShowModal(
                false
            );

            setEditingId(
                null
            );

            setImagenReto(
                null
            );

            setImagenSolucion(
                null
            );

            setPreviewReto(
                null
            );

            setPreviewSolucion(
                null
            );

            setEliminarImagenReto(
                false
            );

            setEliminarImagenSolucion(
                false
            );

            setForm({

                titulo: "",

                descripcion: "",

                solucion: "",

                mostrar_solucion: false,

                activo: true,

            });

        };


    /*
    |--------------------------------------------------------------------------
    | MATERIA ACTUAL
    |--------------------------------------------------------------------------
    */

    const materiaActual =
        materias.find(
            materia =>
                materia.id ===
                materiaSeleccionada
        );


    /*
    |--------------------------------------------------------------------------
    | UNIDAD ACTUAL
    |--------------------------------------------------------------------------
    */

    const unidadActual =
        unidades.find(
            unidad =>
                unidad.id ===
                unidadSeleccionada
        );


    /*
    |--------------------------------------------------------------------------
    | TEMA ACTUAL
    |--------------------------------------------------------------------------
    */

    const temaActual =
        temas.find(
            tema =>
                tema.id ===
                temaSeleccionado
        );


    /*
    |--------------------------------------------------------------------------
    | LOADING PRINCIPAL
    |--------------------------------------------------------------------------
    */

    if (
        loading
    ) {

        return (

            <div
                className="
                    min-h-full
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-[var(--nexus-text-secondary)]
                "
            >

                <Loader2
                    size={36}
                    className="
                        animate-spin
                        text-violet-500
                    "
                />

                <p
                    className="
                        mt-4
                        text-sm
                    "
                >
                    Cargando retos...
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

        <>

            <div
                className="
                    space-y-7
                    pb-10
                "
            >

            {/* =========================================================
                HEADER
            ========================================================= */}

            <div
                className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-end
                    lg:justify-between
                    gap-5
                "
            >

                <div>

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

                            <Puzzle
                                size={21}
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
                            Práctica académica
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
                        Retos
                    </h1>

                    <p
                        className="
                            mt-2
                            max-w-2xl
                            text-[var(--nexus-text-secondary)]
                        "
                    >
                        Crea desafíos para que tus alumnos
                        los resuelvan en su cuaderno y
                        posteriormente puedan consultar
                        la solución.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={
                        abrirNuevoReto
                    }
                    disabled={
                        !temaSeleccionado
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
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        text-white
                        font-semibold
                        shadow-[0_0_30px_rgba(124,58,237,0.25)]
                        transition-all
                    "
                >

                    <Plus
                        size={20}
                    />

                    Nuevo reto

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
                        className="
                            mt-0.5
                            shrink-0
                        "
                    />

                    <p
                        className="
                            flex-1
                            text-sm
                        "
                    >
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="
                            hover:text-white
                        "
                    >

                        <X
                            size={18}
                        />

                    </button>

                </div>

            )}


            {/* =========================================================
                SELECTORES ACADÉMICOS
            ========================================================= */}

            <div
                className="
                    rounded-2xl
                    border
                    border-[var(--nexus-border)]
                    bg-[var(--nexus-surface-2)]
                    p-5
                "
            >

                <div
                    className="
                        flex
                        items-center
                        gap-2
                        mb-5
                    "
                >

                    <BookOpen
                        size={18}
                        className="
                            text-violet-400
                        "
                    />

                    <h2
                        className="
                            font-bold
                            text-[var(--nexus-text)]
                        "
                    >
                        Ubicación del reto
                    </h2>

                </div>


                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-4
                    "
                >

                    {/* MATERIA */}

                    <div>

                        <label
                            className="
                                block
                                text-xs
                                font-semibold
                                text-[var(--nexus-text-muted)]
                                mb-2
                            "
                        >
                            Materia
                        </label>

                        <div
                            className="
                                relative
                            "
                        >

                            <select
                                value={
                                    materiaSeleccionada ??
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    cambiarMateria(
                                        Number(
                                            event.target.value
                                        )
                                    )
                                }
                                className="
                                    w-full
                                    h-11
                                    appearance-none
                                    rounded-xl
                                    border
                                    border-[var(--nexus-border)]
                                    bg-[var(--nexus-bg)]
                                    px-4
                                    pr-10
                                    text-sm
                                    text-[var(--nexus-text)]
                                    outline-none
                                    focus:border-violet-500/50
                                "
                            >

                                <option
                                    value=""
                                >
                                    Selecciona una materia
                                </option>

                                {materias.map(
                                    materia => (

                                        <option
                                            key={
                                                materia.id
                                            }
                                            value={
                                                materia.id
                                            }
                                        >
                                            {
                                                materia.nombre
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                            <ChevronDown
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-[var(--nexus-text-muted)]
                                "
                            />

                        </div>

                    </div>


                    {/* UNIDAD */}

                    <div>

                        <label
                            className="
                                block
                                text-xs
                                font-semibold
                                text-[var(--nexus-text-muted)]
                                mb-2
                            "
                        >
                            Unidad
                        </label>

                        <div
                            className="
                                relative
                            "
                        >

                            <select
                                value={
                                    unidadSeleccionada ??
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    cambiarUnidad(
                                        Number(
                                            event.target.value
                                        )
                                    )
                                }
                                disabled={
                                    !materiaSeleccionada ||
                                    loadingUnidades
                                }
                                className="
                                    w-full
                                    h-11
                                    appearance-none
                                    rounded-xl
                                    border
                                    border-[var(--nexus-border)]
                                    bg-[var(--nexus-bg)]
                                    px-4
                                    pr-10
                                    text-sm
                                    text-[var(--nexus-text)]
                                    outline-none
                                    focus:border-violet-500/50
                                    disabled:opacity-40
                                "
                            >

                                <option
                                    value=""
                                >
                                    {loadingUnidades
                                        ? "Cargando unidades..."
                                        : "Selecciona una unidad"}
                                </option>

                                {unidades.map(
                                    unidad => (

                                        <option
                                            key={
                                                unidad.id
                                            }
                                            value={
                                                unidad.id
                                            }
                                        >
                                            {
                                                unidad.nombre
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                            <ChevronDown
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-[var(--nexus-text-muted)]
                                "
                            />

                        </div>

                    </div>


                    {/* TEMA */}

                    <div>

                        <label
                            className="
                                block
                                text-xs
                                font-semibold
                                text-[var(--nexus-text-muted)]
                                mb-2
                            "
                        >
                            Tema
                        </label>

                        <div
                            className="
                                relative
                            "
                        >

                            <select
                                value={
                                    temaSeleccionado ??
                                    ""
                                }
                                onChange={(
                                    event
                                ) =>
                                    cambiarTema(
                                        Number(
                                            event.target.value
                                        )
                                    )
                                }
                                disabled={
                                    !unidadSeleccionada ||
                                    loadingTemas
                                }
                                className="
                                    w-full
                                    h-11
                                    appearance-none
                                    rounded-xl
                                    border
                                    border-[var(--nexus-border)]
                                    bg-[var(--nexus-bg)]
                                    px-4
                                    pr-10
                                    text-sm
                                    text-[var(--nexus-text)]
                                    outline-none
                                    focus:border-violet-500/50
                                    disabled:opacity-40
                                "
                            >

                                <option
                                    value=""
                                >
                                    {loadingTemas
                                        ? "Cargando temas..."
                                        : "Selecciona un tema"}
                                </option>

                                {temas.map(
                                    tema => (

                                        <option
                                            key={
                                                tema.id
                                            }
                                            value={
                                                tema.id
                                            }
                                        >
                                            {
                                                tema.nombre
                                            }
                                        </option>

                                    )
                                )}

                            </select>

                            <ChevronDown
                                size={17}
                                className="
                                    pointer-events-none
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-[var(--nexus-text-muted)]
                                "
                            />

                        </div>

                    </div>

                </div>


                {/* RUTA ACTUAL */}

                {temaActual && (

                    <div
                        className="
                            mt-4
                            flex
                            flex-wrap
                            items-center
                            gap-2
                            text-xs
                            text-[var(--nexus-text-muted)]
                        "
                    >

                        <span>
                            {materiaActual?.nombre}
                        </span>

                        <span>
                            /
                        </span>

                        <span>
                            {unidadActual?.nombre}
                        </span>

                        <span>
                            /
                        </span>

                        <span
                            className="
                                text-violet-400
                                font-semibold
                            "
                        >
                            {temaActual.nombre}
                        </span>

                    </div>

                )}

            </div>


            {/* =========================================================
                ESTADO INICIAL
            ========================================================= */}

            {!temaSeleccionado && (

                <div
                    className="
                        rounded-2xl
                        border
                        border-dashed
                        border-[var(--nexus-border)]
                        bg-[var(--nexus-surface-2)]
                        py-20
                        px-6
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

                        <Puzzle
                            size={29}
                            className="
                                text-violet-400
                            "
                        />

                    </div>

                    <h2
                        className="
                            mt-5
                            text-lg
                            font-bold
                            text-[var(--nexus-text)]
                        "
                    >
                        Selecciona un tema
                    </h2>

                    <p
                        className="
                            mt-2
                            max-w-md
                            mx-auto
                            text-sm
                            leading-6
                            text-[var(--nexus-text-muted)]
                        "
                    >
                        Elige una materia, una unidad
                        y finalmente un tema para
                        administrar sus retos.
                    </p>

                </div>

            )}


            {/* =========================================================
                CARGANDO RETOS
            ========================================================= */}

            {temaSeleccionado &&
                loadingRetos && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--nexus-border)]
                            bg-[var(--nexus-surface-2)]
                            py-20
                            flex
                            flex-col
                            items-center
                            justify-center
                        "
                    >

                        <Loader2
                            size={32}
                            className="
                                animate-spin
                                text-violet-500
                            "
                        />

                        <p
                            className="
                                mt-4
                                text-sm
                                text-[var(--nexus-text-muted)]
                            "
                        >
                            Cargando retos...
                        </p>

                    </div>

                )}


            {/* =========================================================
                SIN RETOS
            ========================================================= */}

            {temaSeleccionado &&
                !loadingRetos &&
                retos.filter(Boolean).length === 0 && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-dashed
                            border-[var(--nexus-border)]
                            bg-[var(--nexus-surface-2)]
                            py-16
                            px-6
                            text-center
                        "
                    >

                        <div
                            className="
                                mx-auto
                                w-14
                                h-14
                                rounded-xl
                                bg-white/[0.03]
                                border
                                border-[var(--nexus-border)]
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Lightbulb
                                size={25}
                                className="
                                    text-[var(--nexus-text-muted)]
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
                            Aún no hay retos
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-[var(--nexus-text-muted)]
                            "
                        >
                            Este tema todavía no tiene
                            retos publicados.
                        </p>

                        <button
                            type="button"
                            onClick={
                                abrirNuevoReto
                            }
                            className="
                                mt-5
                                inline-flex
                                items-center
                                gap-2
                                rounded-xl
                                bg-violet-600
                                hover:bg-violet-500
                                px-4
                                h-10
                                text-sm
                                font-semibold
                                text-white
                                transition
                            "
                        >

                            <Plus
                                size={17}
                            />

                            Crear primer reto

                        </button>

                    </div>

                )}


            {/* =========================================================
                LISTA DE RETOS
            ========================================================= */}

            {temaSeleccionado &&
                !loadingRetos &&
                retos.filter(Boolean).length > 0 && (

                    <div
                        className="
                            space-y-4
                        "
                    >

                        <div
                            className="
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
                                    Retos del tema
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-[var(--nexus-text-muted)]
                                    "
                                >
                                    {retos.filter(Boolean).length}{" "}
                                    {retos.length === 1
                                        ? "reto"
                                        : "retos"}
                                </p>

                            </div>

                        </div>


                        {retos.filter(Boolean).map(
                            (
                                reto,
                                index
                            ) => (

                                <div
                                    key={
                                        reto.id
                                    }
                                    className={`
                                        relative
                                        overflow-visible
                                        rounded-2xl
                                        border
                                        bg-[var(--nexus-surface-2)]
                                        transition-all
                                        ${
                                            reto.activo
                                                ? "border-[var(--nexus-border)] hover:border-violet-500/25"
                                                : "border-red-500/15 opacity-70"
                                        }
                                    `}
                                >

                                    {/* =================================================
                                        HEADER RETO
                                    ================================================= */}

                                    <div
                                        className="
                                            px-5
                                            py-4
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
                                                gap-3
                                                min-w-0
                                            "
                                        >

                                            <div
                                                className="
                                                    shrink-0
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

                                                <span
                                                    className="
                                                        text-sm
                                                        font-black
                                                        text-violet-400
                                                    "
                                                >
                                                    {String(
                                                        index + 1
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </span>

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
                                                        flex-wrap
                                                    "
                                                >

                                                    <h3
                                                        className="
                                                            font-bold
                                                            text-[var(--nexus-text)]
                                                            truncate
                                                        "
                                                    >
                                                        {
                                                            reto.titulo
                                                        }
                                                    </h3>

                                                    {!reto.activo && (

                                                        <span
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-1
                                                                rounded-full
                                                                bg-red-500/10
                                                                border
                                                                border-red-500/20
                                                                px-2
                                                                py-0.5
                                                                text-[10px]
                                                                font-semibold
                                                                text-red-400
                                                            "
                                                        >
                                                            Inactivo
                                                        </span>

                                                    )}

                                                    {reto.mostrar_solucion && (

                                                        <span
                                                            className="
                                                                inline-flex
                                                                items-center
                                                                gap-1
                                                                rounded-full
                                                                bg-emerald-500/10
                                                                border
                                                                border-emerald-500/20
                                                                px-2
                                                                py-0.5
                                                                text-[10px]
                                                                font-semibold
                                                                text-emerald-400
                                                            "
                                                        >
                                                            <Check
                                                                size={11}
                                                            />
                                                            Solución visible
                                                        </span>

                                                    )}

                                                </div>

                                                <p
                                                    className="
                                                        mt-1
                                                        text-xs
                                                        text-[var(--nexus-text-muted)]
                                                    "
                                                >
                                                    Reto de práctica
                                                </p>

                                            </div>

                                        </div>


                                        {/* MENÚ */}

                                        <div
                                            className="
                                                relative
                                                shrink-0
                                            "
                                        >

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setMenuAbierto(
                                                        menuAbierto ===
                                                        reto.id
                                                            ? null
                                                            : reto.id
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
                                                    hover:bg-white/[0.05]
                                                    transition
                                                "
                                            >

                                                <MoreVertical
                                                    size={18}
                                                />

                                            </button>


                                            {menuAbierto ===
                                                reto.id && (

                                                <div
                                                    className="
                                                        absolute
                                                        right-0
                                                        top-11
                                                        z-50
                                                        w-56
                                                        rounded-xl
                                                        border
                                                        border-[var(--nexus-border)]
                                                        bg-[var(--nexus-bg)]
                                                        shadow-2xl
                                                        p-1.5
                                                    "
                                                >

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            editarReto(
                                                                reto
                                                            )
                                                        }
                                                        className="
                                                            w-full
                                                            flex
                                                            items-center
                                                            gap-3
                                                            rounded-lg
                                                            px-3
                                                            py-2.5
                                                            text-sm
                                                            text-[var(--nexus-text-secondary)]
                                                            hover:bg-white/[0.05]
                                                            hover:text-white
                                                            transition
                                                        "
                                                    >

                                                        <Pencil
                                                            size={16}
                                                        />

                                                        Editar reto

                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            cambiarVisibilidadSolucion(
                                                                reto
                                                            )
                                                        }
                                                        className="
                                                            w-full
                                                            flex
                                                            items-center
                                                            gap-3
                                                            rounded-lg
                                                            px-3
                                                            py-2.5
                                                            text-sm
                                                            text-[var(--nexus-text-secondary)]
                                                            hover:bg-white/[0.05]
                                                            hover:text-white
                                                            transition
                                                        "
                                                    >

                                                        {reto.mostrar_solucion ? (
                                                            <EyeOff
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={16}
                                                            />
                                                        )}

                                                        {reto.mostrar_solucion
                                                            ? "Ocultar solución"
                                                            : "Mostrar solución"}

                                                    </button>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            cambiarEstado(
                                                                reto
                                                            )
                                                        }
                                                        className="
                                                            w-full
                                                            flex
                                                            items-center
                                                            gap-3
                                                            rounded-lg
                                                            px-3
                                                            py-2.5
                                                            text-sm
                                                            text-[var(--nexus-text-secondary)]
                                                            hover:bg-white/[0.05]
                                                            hover:text-white
                                                            transition
                                                        "
                                                    >

                                                        {reto.activo ? (
                                                            <EyeOff
                                                                size={16}
                                                            />
                                                        ) : (
                                                            <Eye
                                                                size={16}
                                                            />
                                                        )}

                                                        {reto.activo
                                                            ? "Desactivar reto"
                                                            : "Activar reto"}

                                                    </button>


                                                    <div
                                                        className="
                                                            my-1
                                                            border-t
                                                            border-[var(--nexus-border)]
                                                        "
                                                    />


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            eliminarReto(
                                                                reto
                                                            )
                                                        }
                                                        className="
                                                            w-full
                                                            flex
                                                            items-center
                                                            gap-3
                                                            rounded-lg
                                                            px-3
                                                            py-2.5
                                                            text-sm
                                                            text-red-400
                                                            hover:bg-red-500/10
                                                            transition
                                                        "
                                                    >

                                                        <Trash2
                                                            size={16}
                                                        />

                                                        Eliminar reto

                                                    </button>

                                                </div>

                                            )}

                                        </div>

                                    </div>


                                    {/* =================================================
                                        CUERPO
                                    ================================================= */}

                                    <div
                                        className="
                                            p-5
                                        "
                                    >

                                        <div
                                            className="
                                                grid
                                                grid-cols-1
                                                lg:grid-cols-[1fr_280px]
                                                gap-5
                                            "
                                        >

                                            <div>

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        mb-3
                                                    "
                                                >

                                                    <Puzzle
                                                        size={16}
                                                        className="
                                                            text-violet-400
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            text-xs
                                                            uppercase
                                                            tracking-[1.5px]
                                                            font-semibold
                                                            text-[var(--nexus-text-muted)]
                                                        "
                                                    >
                                                        Enunciado
                                                    </span>

                                                </div>


                                                <div
                                                    className="
                                                        prose
                                                        prose-sm
                                                        max-w-none
                                                        text-[var(--nexus-text-secondary)]
                                                        [&_p]:leading-7
                                                        [&_h1]:text-[var(--nexus-text)]
                                                        [&_h2]:text-[var(--nexus-text)]
                                                        [&_h3]:text-[var(--nexus-text)]
                                                        [&_strong]:text-[var(--nexus-text)]
                                                        [&_a]:text-violet-400
                                                        [&_img]:rounded-xl
                                                    "
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            reto.descripcion ||
                                                            "<p>Sin descripción.</p>",
                                                    }}
                                                />

                                            </div>


                                            {/* IMAGEN */}

                                            {reto.imagen_reto && (

                                                <div
                                                    className="
                                                        rounded-xl
                                                        overflow-hidden
                                                        border
                                                        border-[var(--nexus-border)]
                                                        bg-black/10
                                                    "
                                                >

                                                    <img
                                                        src={
                                                            obtenerUrlImagen(
                                                                reto.imagen_reto
                                                            ) ||
                                                            ""
                                                        }
                                                        alt={
                                                            reto.titulo
                                                        }
                                                        className="
                                                            w-full
                                                            h-full
                                                            min-h-[180px]
                                                            max-h-[260px]
                                                            object-cover
                                                        "
                                                    />

                                                </div>

                                            )}

                                        </div>


                                        {/* SOLUCIÓN */}

                                        <div
                                            className="
                                                mt-5
                                                pt-5
                                                border-t
                                                border-[var(--nexus-border)]
                                            "
                                        >

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <Lightbulb
                                                        size={17}
                                                        className="
                                                            text-amber-400
                                                        "
                                                    />

                                                    <span
                                                        className="
                                                            text-xs
                                                            uppercase
                                                            tracking-[1.5px]
                                                            font-semibold
                                                            text-[var(--nexus-text-muted)]
                                                        "
                                                    >
                                                        Solución
                                                    </span>

                                                </div>

                                                <span
                                                    className={`
                                                        inline-flex
                                                        items-center
                                                        gap-1.5
                                                        rounded-full
                                                        px-2.5
                                                        py-1
                                                        text-[10px]
                                                        font-semibold
                                                        border
                                                        ${
                                                            reto.mostrar_solucion
                                                                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                                : "bg-white/[0.03] border-[var(--nexus-border)] text-[var(--nexus-text-muted)]"
                                                        }
                                                    `}
                                                >

                                                    {reto.mostrar_solucion ? (
                                                        <>
                                                            <Eye
                                                                size={12}
                                                            />
                                                            Visible para alumnos
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff
                                                                size={12}
                                                            />
                                                            Oculta
                                                        </>
                                                    )}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>


        {showModal && (

            <div
                className="
                    fixed
                    inset-0
                    z-[100]
                    flex
                    items-center
                    justify-center
                    p-4
                    bg-black/70
                    backdrop-blur-sm
                "
                onMouseDown={(
                    event
                ) => {

                    if (
                        event.target ===
                        event.currentTarget
                    ) {

                        cerrarModal();

                    }

                }}
            >

                <div
                    className="
                        w-full
                        max-w-5xl
                        max-h-[92vh]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[var(--nexus-border)]
                        bg-[var(--nexus-bg)]
                        shadow-[0_30px_100px_rgba(0,0,0,0.55)]
                        flex
                        flex-col
                    "
                >

                    {/* =================================================
                        MODAL HEADER
                    ================================================= */}

                    <div
                        className="
                            shrink-0
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
                                gap-3
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

                                <Puzzle
                                    size={19}
                                    className="
                                        text-violet-400
                                    "
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
                                    {editingId === null
                                        ? "Crear nuevo reto"
                                        : "Editar reto"}
                                </h2>

                                <p
                                    className="
                                        text-xs
                                        text-[var(--nexus-text-muted)]
                                    "
                                >
                                    {temaActual?.nombre ||
                                        "Tema seleccionado"}
                                </p>

                            </div>

                        </div>


                        <button
                            type="button"
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
                                hover:bg-white/[0.05]
                                hover:text-[var(--nexus-text)]
                                disabled:opacity-40
                            "
                        >

                            <X
                                size={19}
                            />

                        </button>

                    </div>


                    {/* =================================================
                        MODAL BODY
                    ================================================= */}

                    <div
                        className="
                            flex-1
                            min-h-0
                            overflow-y-auto
                            p-6
                            space-y-6
                        "
                    >

                        {/* ERROR MODAL */}

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
                                    size={18}
                                    className="
                                        shrink-0
                                        mt-0.5
                                    "
                                />

                                <p
                                    className="
                                        text-sm
                                        flex-1
                                    "
                                >
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setError("")
                                    }
                                >

                                    <X
                                        size={17}
                                    />

                                </button>

                            </div>

                        )}


                        {/* =================================================
                            TÍTULO
                        ================================================= */}

                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-[var(--nexus-text)]
                                    mb-2
                                "
                            >
                                Título del reto
                            </label>

                            <input
                                type="text"
                                value={
                                    form.titulo
                                }
                                onChange={(
                                    event
                                ) =>
                                    setForm({
                                        ...form,
                                        titulo:
                                            event.target.value,
                                    })
                                }
                                disabled={
                                    saving
                                }
                                placeholder="Ej. Calcula el área de la siguiente figura"
                                className="
                                    w-full
                                    h-11
                                    rounded-xl
                                    border
                                    border-[var(--nexus-border)]
                                    bg-[var(--nexus-surface-2)]
                                    px-4
                                    text-sm
                                    text-[var(--nexus-text)]
                                    placeholder:text-[var(--nexus-text-muted)]
                                    outline-none
                                    focus:border-violet-500/50
                                    disabled:opacity-50
                                "
                            />

                        </div>


                        {/* =================================================
                            DESCRIPCIÓN
                        ================================================= */}

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-3
                                    mb-2
                                "
                            >

                                <label
                                    className="
                                        text-sm
                                        font-semibold
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    Enunciado del reto
                                </label>

                                <span
                                    className="
                                        text-xs
                                        text-[var(--nexus-text-muted)]
                                    "
                                >
                                    Lo que verá el alumno
                                </span>

                            </div>

                            <RichTextEditor
                                value={
                                    form.descripcion
                                }
                                onChange={(
                                    value
                                ) =>
                                    setForm({
                                        ...form,
                                        descripcion:
                                            value,
                                    })
                                }
                                disabled={
                                    saving
                                }
                                placeholder="Escribe aquí el reto, las instrucciones, datos, fórmulas o cualquier explicación necesaria..."
                            />

                        </div>


                        {/* =================================================
                            IMAGEN RETO
                        ================================================= */}

                        <div>

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    mb-2
                                "
                            >

                                <label
                                    className="
                                        text-sm
                                        font-semibold
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    Imagen del reto
                                </label>

                                <span
                                    className="
                                        text-xs
                                        text-[var(--nexus-text-muted)]
                                    "
                                >
                                    Opcional · máximo 10 MB
                                </span>

                            </div>


                            {previewReto ? (

                                <div
                                    className="
                                        relative
                                        rounded-xl
                                        overflow-hidden
                                        border
                                        border-[var(--nexus-border)]
                                        bg-black/10
                                    "
                                >

                                    <img
                                        src={
                                            previewReto
                                        }
                                        alt="Vista previa del reto"
                                        className="
                                            w-full
                                            max-h-[320px]
                                            object-contain
                                            bg-black/10
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={
                                            quitarImagenReto
                                        }
                                        disabled={
                                            saving
                                        }
                                        className="
                                            absolute
                                            top-3
                                            right-3
                                            w-9
                                            h-9
                                            rounded-lg
                                            bg-black/70
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            hover:bg-red-500
                                            transition
                                        "
                                    >

                                        <Trash2
                                            size={16}
                                        />

                                    </button>

                                </div>

                            ) : (

                                <label
                                    className="
                                        flex
                                        flex-col
                                        items-center
                                        justify-center
                                        min-h-[150px]
                                        rounded-xl
                                        border
                                        border-dashed
                                        border-[var(--nexus-border)]
                                        bg-[var(--nexus-surface-2)]
                                        hover:border-violet-500/40
                                        hover:bg-violet-500/[0.02]
                                        cursor-pointer
                                        transition
                                    "
                                >

                                    <Upload
                                        size={24}
                                        className="
                                            text-violet-400
                                        "
                                    />

                                    <span
                                        className="
                                            mt-3
                                            text-sm
                                            font-medium
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >
                                        Subir imagen
                                    </span>

                                    <span
                                        className="
                                            mt-1
                                            text-xs
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        JPG, PNG o WEBP
                                    </span>

                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={
                                            seleccionarImagenReto
                                        }
                                        disabled={
                                            saving
                                        }
                                        className="
                                            hidden
                                        "
                                    />

                                </label>

                            )}

                        </div>


                        {/* =================================================
                            SOLUCIÓN
                        ================================================= */}

                        <div
                            className="
                                rounded-2xl
                                border
                                border-amber-500/15
                                bg-amber-500/[0.025]
                                p-5
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    mb-4
                                "
                            >

                                <div
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        bg-amber-500/10
                                        border
                                        border-amber-500/20
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >

                                    <Lightbulb
                                        size={18}
                                        className="
                                            text-amber-400
                                        "
                                    />

                                </div>

                                <div>

                                    <h3
                                        className="
                                            font-bold
                                            text-[var(--nexus-text)]
                                        "
                                    >
                                        Solución
                                    </h3>

                                    <p
                                        className="
                                            text-xs
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        El alumno podrá verla
                                        cuando tú la actives.
                                    </p>

                                </div>

                            </div>


                            <RichTextEditor
                                value={
                                    form.solucion
                                }
                                onChange={(
                                    value
                                ) =>
                                    setForm({
                                        ...form,
                                        solucion:
                                            value,
                                    })
                                }
                                disabled={
                                    saving
                                }
                                placeholder="Escribe la solución paso a paso..."
                            />


                            {/* IMAGEN SOLUCIÓN */}

                            <div
                                className="
                                    mt-5
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        mb-2
                                    "
                                >

                                    <label
                                        className="
                                            text-sm
                                            font-semibold
                                            text-[var(--nexus-text)]
                                        "
                                    >
                                        Imagen de la solución
                                    </label>

                                    <span
                                        className="
                                            text-xs
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        Opcional
                                    </span>

                                </div>


                                {previewSolucion ? (

                                    <div
                                        className="
                                            relative
                                            rounded-xl
                                            overflow-hidden
                                            border
                                            border-[var(--nexus-border)]
                                        "
                                    >

                                        <img
                                            src={
                                                previewSolucion
                                            }
                                            alt="Vista previa de solución"
                                            className="
                                                w-full
                                                max-h-[300px]
                                                object-contain
                                                bg-black/10
                                            "
                                        />

                                        <button
                                            type="button"
                                            onClick={
                                                quitarImagenSolucion
                                            }
                                            disabled={
                                                saving
                                            }
                                            className="
                                                absolute
                                                top-3
                                                right-3
                                                w-9
                                                h-9
                                                rounded-lg
                                                bg-black/70
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                                hover:bg-red-500
                                                transition
                                            "
                                        >

                                            <Trash2
                                                size={16}
                                            />

                                        </button>

                                    </div>

                                ) : (

                                    <label
                                        className="
                                            flex
                                            flex-col
                                            items-center
                                            justify-center
                                            min-h-[130px]
                                            rounded-xl
                                            border
                                            border-dashed
                                            border-[var(--nexus-border)]
                                            bg-[var(--nexus-bg)]
                                            hover:border-amber-500/40
                                            cursor-pointer
                                            transition
                                        "
                                    >

                                        <ImageIcon
                                            size={23}
                                            className="
                                                text-amber-400
                                            "
                                        />

                                        <span
                                            className="
                                                mt-2
                                                text-sm
                                                text-[var(--nexus-text-secondary)]
                                            "
                                        >
                                            Agregar imagen
                                        </span>

                                        <input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={
                                                seleccionarImagenSolucion
                                            }
                                            disabled={
                                                saving
                                            }
                                            className="
                                                hidden
                                            "
                                        />

                                    </label>

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            CONFIGURACIÓN
                        ================================================= */}

                        <div
                            className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                gap-4
                            "
                        >

                            {/* MOSTRAR SOLUCIÓN */}

                            <button
                                type="button"
                                onClick={() =>
                                    setForm({
                                        ...form,
                                        mostrar_solucion:
                                            !form.mostrar_solucion,
                                    })
                                }
                                disabled={
                                    saving
                                }
                                className={`
                                    text-left
                                    rounded-xl
                                    border
                                    p-4
                                    transition
                                    ${
                                        form.mostrar_solucion
                                            ? "border-emerald-500/25 bg-emerald-500/[0.05]"
                                            : "border-[var(--nexus-border)] bg-[var(--nexus-surface-2)]"
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

                                    <div>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            {form.mostrar_solucion ? (
                                                <Eye
                                                    size={17}
                                                    className="
                                                        text-emerald-400
                                                    "
                                                />
                                            ) : (
                                                <EyeOff
                                                    size={17}
                                                    className="
                                                        text-[var(--nexus-text-muted)]
                                                    "
                                                />
                                            )}

                                            <span
                                                className="
                                                    text-sm
                                                    font-semibold
                                                    text-[var(--nexus-text)]
                                                "
                                            >
                                                Mostrar solución
                                            </span>

                                        </div>

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                text-[var(--nexus-text-muted)]
                                            "
                                        >
                                            {form.mostrar_solucion
                                                ? "Los alumnos podrán consultar la solución."
                                                : "La solución permanecerá oculta."}
                                        </p>

                                    </div>


                                    <div
                                        className={`
                                            w-11
                                            h-6
                                            rounded-full
                                            p-1
                                            transition
                                            ${
                                                form.mostrar_solucion
                                                    ? "bg-emerald-500"
                                                    : "bg-white/10"
                                            }
                                        `}
                                    >

                                        <div
                                            className={`
                                                w-4
                                                h-4
                                                rounded-full
                                                bg-white
                                                transition
                                                ${
                                                    form.mostrar_solucion
                                                        ? "translate-x-5"
                                                        : "translate-x-0"
                                                }
                                            `}
                                        />

                                    </div>

                                </div>

                            </button>


                            {/* ESTADO */}

                            <button
                                type="button"
                                onClick={() =>
                                    setForm({
                                        ...form,
                                        activo:
                                            !form.activo,
                                    })
                                }
                                disabled={
                                    saving
                                }
                                className={`
                                    text-left
                                    rounded-xl
                                    border
                                    p-4
                                    transition
                                    ${
                                        form.activo
                                            ? "border-violet-500/25 bg-violet-500/[0.05]"
                                            : "border-[var(--nexus-border)] bg-[var(--nexus-surface-2)]"
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

                                    <div>

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <Check
                                                size={17}
                                                className={
                                                    form.activo
                                                        ? "text-violet-400"
                                                        : "text-[var(--nexus-text-muted)]"
                                                }
                                            />

                                            <span
                                                className="
                                                    text-sm
                                                    font-semibold
                                                    text-[var(--nexus-text)]
                                                "
                                            >
                                                Reto activo
                                            </span>

                                        </div>

                                        <p
                                            className="
                                                mt-1
                                                text-xs
                                                text-[var(--nexus-text-muted)]
                                            "
                                        >
                                            {form.activo
                                                ? "El reto está disponible."
                                                : "El reto está desactivado."}
                                        </p>

                                    </div>


                                    <div
                                        className={`
                                            w-11
                                            h-6
                                            rounded-full
                                            p-1
                                            transition
                                            ${
                                                form.activo
                                                    ? "bg-violet-600"
                                                    : "bg-white/10"
                                            }
                                        `}
                                    >

                                        <div
                                            className={`
                                                w-4
                                                h-4
                                                rounded-full
                                                bg-white
                                                transition
                                                ${
                                                    form.activo
                                                        ? "translate-x-5"
                                                        : "translate-x-0"
                                                }
                                            `}
                                        />

                                    </div>

                                </div>

                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        MODAL FOOTER
                    ================================================= */}

                    <div
                        className="
                            shrink-0
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
                            type="button"
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
                                border
                                border-[var(--nexus-border)]
                                text-sm
                                font-semibold
                                text-[var(--nexus-text-secondary)]
                                hover:bg-white/[0.04]
                                hover:text-[var(--nexus-text)]
                                disabled:opacity-40
                                transition
                            "
                        >
                            Cancelar
                        </button>


                        <button
                            type="button"
                            onClick={
                                guardarReto
                            }
                            disabled={
                                saving
                            }
                            className="
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
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                                transition
                            "
                        >

                            {saving ? (

                                <>

                                    <Loader2
                                        size={17}
                                        className="
                                            animate-spin
                                        "
                                    />

                                    Guardando...

                                </>

                            ) : (

                                <>

                                    <Save
                                        size={17}
                                    />

                                    {editingId === null
                                        ? "Crear reto"
                                        : "Guardar cambios"}

                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        )}

        </>

    );

}
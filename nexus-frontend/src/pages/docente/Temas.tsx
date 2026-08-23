import {
    ArrowLeft,
    Plus,
    BookOpen,
    Pencil,
    Trash2,
    Loader2,
    AlertCircle,
    X,
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
    getTemasUnidadRequest,
    crearTemaRequest,
    actualizarTemaRequest,
    eliminarTemaRequest,
} from "../../api/temas";

import type {
    Tema,
} from "../../api/temas";


export default function Temas() {

    const navigate = useNavigate();

    const {
        materiaId,
        unidadId,
    } = useParams();


    const [temas, setTemas] =
        useState<Tema[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    const [showModal, setShowModal] =
        useState(false);

    const [editingId, setEditingId] =
        useState<number | null>(null);


    const [form, setForm] = useState({
        nombre: "",
        descripcion: "",
        orden: 1,
    });


    /*
    |--------------------------------------------------------------------------
    | CARGAR TEMAS
    |--------------------------------------------------------------------------
    */

    const cargarTemas = async () => {

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


            const data =
                await getTemasUnidadRequest(
                    Number(unidadId)
                );


            setTemas(data);

        } catch (error: any) {

            console.error(
                "Error al cargar temas:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudieron cargar los temas."
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

        cargarTemas();

    }, [unidadId]);


    /*
    |--------------------------------------------------------------------------
    | NUEVO TEMA
    |--------------------------------------------------------------------------
    */

    const abrirNuevoTema = () => {

        setEditingId(null);

        setForm({
            nombre: "",
            descripcion: "",
            orden: temas.length + 1,
        });

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | EDITAR TEMA
    |--------------------------------------------------------------------------
    */

    const editarTema = (
        tema: Tema
    ) => {

        setEditingId(
            tema.id
        );

        setForm({
            nombre: tema.nombre,
            descripcion:
                tema.descripcion || "",
            orden: tema.orden,
        });

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | GUARDAR TEMA
    |--------------------------------------------------------------------------
    */

    const guardarTema = async () => {

        if (!form.nombre.trim()) {

            setError(
                "El nombre del tema es obligatorio."
            );

            return;

        }


        if (!unidadId) {

            setError(
                "No se encontró la unidad."
            );

            return;

        }


        try {

            setSaving(true);

            setError("");


            /*
            |--------------------------------------------------------------------------
            | EDITAR
            |--------------------------------------------------------------------------
            */

            if (editingId !== null) {

                await actualizarTemaRequest(
                    editingId,
                    {
                        nombre:
                            form.nombre.trim(),

                        descripcion:
                            form.descripcion.trim(),

                        orden:
                            form.orden,
                    }
                );

            }


            /*
            |--------------------------------------------------------------------------
            | CREAR
            |--------------------------------------------------------------------------
            */

            else {

                await crearTemaRequest({

                    unidad_id:
                        Number(unidadId),

                    nombre:
                        form.nombre.trim(),

                    descripcion:
                        form.descripcion.trim(),

                    orden:
                        form.orden,

                });

            }


            setShowModal(false);

            setEditingId(null);


            setForm({
                nombre: "",
                descripcion: "",
                orden: 1,
            });


            await cargarTemas();

        } catch (error: any) {

            console.error(
                "Error al guardar tema:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudo guardar el tema."
            );

        } finally {

            setSaving(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR TEMA
    |--------------------------------------------------------------------------
    */

    const eliminarTema = async (
        id: number
    ) => {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar este tema?"
            );


        if (!confirmar) {
            return;
        }


        try {

            setError("");


            await eliminarTemaRequest(
                id
            );


            setTemas(
                actuales =>
                    actuales.filter(
                        tema =>
                            tema.id !== id
                    )
            );

        } catch (error: any) {

            console.error(
                "Error al eliminar tema:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudo eliminar el tema."
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

        setError("");

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
                    Cargando temas...
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
                                `/dashboard/docente/materias/${materiaId}`
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

                        Volver a unidades

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

                            <BookOpen
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
                            Unidad de aprendizaje
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
                        Temas
                    </h1>


                    <p
                        className="
                            mt-2
                            text-[var(--nexus-text-secondary)]
                        "
                    >
                        Organiza los temas que forman parte
                        de esta unidad.
                    </p>

                </div>


                <button
                    onClick={
                        abrirNuevoTema
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

                    Nuevo tema

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
                LISTA DE TEMAS
            ========================================================= */}

            {temas.length > 0 ? (

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-5
                    "
                >

                    {temas.map(
                        (tema) => (

                            <div
                                key={
                                    tema.id
                                }
                                className="
                                    group
                                    rounded-2xl
                                    bg-[var(--nexus-surface-secondary)]
                                    border
                                    border-[var(--nexus-border)]
                                    p-6
                                    hover:-translate-y-1
                                    hover:border-violet-500/30
                                    hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]
                                    transition-all
                                    duration-300
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
                                            w-12
                                            h-12
                                            rounded-xl
                                            bg-violet-500/10
                                            border
                                            border-violet-500/20
                                            flex
                                            items-center
                                            justify-center
                                            text-violet-400
                                            font-bold
                                        "
                                    >

                                        {tema.orden}

                                    </div>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-1
                                        "
                                    >

                                        <button
                                            onClick={() =>
                                                editarTema(
                                                    tema
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
                                                eliminarTema(
                                                    tema.id
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


                                <div className="mt-5">

                                    <p
                                        className="
                                            text-xs
                                            uppercase
                                            tracking-wider
                                            text-violet-400
                                            font-semibold
                                        "
                                    >
                                        Tema {tema.orden}
                                    </p>


                                    <h2
                                        className="
                                            mt-2
                                            text-xl
                                            font-bold
                                            text-[var(--nexus-text)]
                                        "
                                    >
                                        {tema.nombre}
                                    </h2>


                                    <p
                                        className="
                                            mt-2
                                            text-sm
                                            leading-6
                                            text-[var(--nexus-text-muted)]
                                            line-clamp-3
                                            min-h-[72px]
                                        "
                                    >
                                        {
                                            tema.descripcion ||
                                            "Sin descripción."
                                        }
                                    </p>

                                </div>


                               <button
    onClick={() =>
        navigate(
            `/dashboard/docente/materias/${materiaId}/unidades/${unidadId}/temas/${tema.id}`
        )
    }
    className="
        mt-5
        w-full
        h-11
        rounded-xl
        bg-[var(--nexus-surface)]
        border
        border-[var(--nexus-border)]
        text-sm
        font-semibold
        text-[var(--nexus-text-secondary)]
        hover:text-[var(--nexus-text)]
        hover:border-violet-500/30
        transition-all
    "
>
    Entrar al tema
</button>

                            </div>

                        )
                    )}

                </div>

            ) : (

                <div
                    className="
                        min-h-[400px]
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

                            <BookOpen
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
                            Crea el primer tema para comenzar
                            a desarrollar el contenido de esta
                            unidad.
                        </p>


                        <button
                            onClick={
                                abrirNuevoTema
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

                            Crear tema

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
                            max-w-lg
                            rounded-2xl
                            bg-[var(--nexus-surface-secondary)]
                            border
                            border-[var(--nexus-border)]
                            shadow-[0_30px_100px_rgba(0,0,0,0.6)]
                            overflow-hidden
                        "
                    >

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
                                        ? "Editar tema"
                                        : "Nuevo tema"}
                                </h2>

                                <p
                                    className="
                                        text-xs
                                        text-[var(--nexus-text-muted)]
                                        mt-1
                                    "
                                >
                                    Agrega un tema a esta unidad.
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


                        <div className="p-6 space-y-6">


                            {/* NOMBRE */}

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
                                    Nombre del tema
                                </label>


                                <input
                                    type="text"
                                    value={
                                        form.nombre
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nombre:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Ej. Modelo OSI"
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


                            {/* DESCRIPCIÓN */}

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
                                    Descripción

                                    <span
                                        className="
                                            ml-1
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        opcional
                                    </span>

                                </label>


                                <textarea
                                    value={
                                        form.descripcion
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            descripcion:
                                                e.target.value,
                                        })
                                    }
                                    placeholder="Describe brevemente este tema..."
                                    rows={4}
                                    disabled={
                                        saving
                                    }
                                    className="
                                        w-full
                                        rounded-xl
                                        bg-[var(--nexus-bg)]
                                        border
                                        border-[var(--nexus-border)]
                                        px-4
                                        py-3
                                        text-sm
                                        text-[var(--nexus-text)]
                                        placeholder:text-[var(--nexus-text-muted)]
                                        outline-none
                                        resize-none
                                        focus:border-violet-500/50
                                        focus:ring-2
                                        focus:ring-violet-500/10
                                    "
                                />

                            </div>


                            {/* ORDEN */}

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
                                    Número de tema
                                </label>


                                <input
                                    type="number"
                                    min={1}
                                    value={
                                        form.orden
                                    }
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            orden:
                                                Number(
                                                    e.target.value
                                                ),
                                        })
                                    }
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
                                        outline-none
                                        focus:border-violet-500/50
                                        focus:ring-2
                                        focus:ring-violet-500/10
                                    "
                                />

                            </div>

                        </div>


                        {/* FOOTER */}

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
                                    guardarTema
                                }
                                disabled={
                                    saving ||
                                    !form.nombre.trim()
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

                                {saving && (

                                    <Loader2
                                        size={17}
                                        className="
                                            animate-spin
                                        "
                                    />

                                )}

                                {editingId !== null
                                    ? "Guardar cambios"
                                    : "Crear tema"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}
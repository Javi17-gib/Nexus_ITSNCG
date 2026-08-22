import {
    ArrowLeft,
    Plus,
    Layers3,
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
    getUnidadesMateriaRequest,
    crearUnidadRequest,
    actualizarUnidadRequest,
    eliminarUnidadRequest,
} from "../../api/unidades";

import type {
    Unidad,
} from "../../api/unidades";


export default function Unidades() {

    const navigate = useNavigate();

    const {
        materiaId,
    } = useParams();


    const [unidades, setUnidades] =
        useState<Unidad[]>([]);

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
    | CARGAR UNIDADES
    |--------------------------------------------------------------------------
    */

    const cargarUnidades = async () => {

        if (!materiaId) {
            setError(
                "No se encontró la materia."
            );

            setLoading(false);

            return;
        }


        try {

            setLoading(true);

            setError("");


            const data =
                await getUnidadesMateriaRequest(
                    Number(materiaId)
                );


            setUnidades(data);

        } catch (error: any) {

            console.error(
                "Error al cargar unidades:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudieron cargar las unidades."
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

        cargarUnidades();

    }, [materiaId]);


    /*
    |--------------------------------------------------------------------------
    | NUEVA UNIDAD
    |--------------------------------------------------------------------------
    */

    const abrirNuevaUnidad = () => {

        setEditingId(null);

        setForm({
            nombre: "",
            descripcion: "",
            orden: unidades.length + 1,
        });

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | EDITAR
    |--------------------------------------------------------------------------
    */

    const editarUnidad = (
        unidad: Unidad
    ) => {

        setEditingId(
            unidad.id
        );

        setForm({
            nombre: unidad.nombre,
            descripcion:
                unidad.descripcion || "",
            orden: unidad.orden,
        });

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | GUARDAR
    |--------------------------------------------------------------------------
    */

    const guardarUnidad = async () => {

        if (!form.nombre.trim()) {

            setError(
                "El nombre de la unidad es obligatorio."
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

            if (
                editingId !== null
            ) {

                await actualizarUnidadRequest(
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

                if (!materiaId) {

                    setError(
                        "No se encontró la materia."
                    );

                    return;

                }


                await crearUnidadRequest({
                    materia_id:
                        Number(materiaId),

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


            await cargarUnidades();


            setForm({
                nombre: "",
                descripcion: "",
                orden: 1,
            });

        } catch (error: any) {

            console.error(
                "Error al guardar unidad:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudo guardar la unidad."
            );

        } finally {

            setSaving(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR
    |--------------------------------------------------------------------------
    */

    const eliminarUnidad = async (
        id: number
    ) => {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar esta unidad?"
            );


        if (!confirmar) {
            return;
        }


        try {

            setError("");


            await eliminarUnidadRequest(
                id
            );


            setUnidades(
                actuales =>
                    actuales.filter(
                        unidad =>
                            unidad.id !== id
                    )
            );

        } catch (error: any) {

            console.error(
                "Error al eliminar unidad:",
                error
            );


            setError(
                error?.response?.data?.message ||
                "No se pudo eliminar la unidad."
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
                    Cargando unidades...
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
                                "/dashboard/docente/materias"
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

                        Volver a materias

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

                            <Layers3
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
                            Contenido académico
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
                        Unidades
                    </h1>


                    <p
                        className="
                            mt-2
                            text-[var(--nexus-text-secondary)]
                        "
                    >
                        Organiza el contenido de esta materia
                        por unidades de aprendizaje.
                    </p>

                </div>


                <button
                    onClick={
                        abrirNuevaUnidad
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

                    Nueva unidad

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

                    <div className="flex-1">

                        <p className="text-sm font-medium">
                            {error}
                        </p>

                    </div>


                    <button
                        onClick={() =>
                            setError("")
                        }
                        className="
                            text-red-400
                            hover:text-[var(--nexus-text)]
                        "
                    >

                        <X
                            size={18}
                        />

                    </button>

                </div>

            )}


            {/* =========================================================
                UNIDADES
            ========================================================= */}

            {unidades.length > 0 ? (

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-5
                    "
                >

                    {unidades.map(
                        (unidad) => (

                            <div
                                key={
                                    unidad.id
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

                                        {unidad.orden}

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
                                                editarUnidad(
                                                    unidad
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
                                                eliminarUnidad(
                                                    unidad.id
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
                                        Unidad {unidad.orden}
                                    </p>


                                    <h2
                                        className="
                                            mt-2
                                            text-xl
                                            font-bold
                                            text-[var(--nexus-text)]
                                        "
                                    >
                                        {unidad.nombre}
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
                                            unidad.descripcion ||
                                            "Sin descripción."
                                        }
                                    </p>

                                </div>


                                <button
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

                                    Entrar a la unidad

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

                            <Layers3
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
                            Aún no hay unidades
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--nexus-text-muted)]
                            "
                        >
                            Crea la primera unidad para
                            comenzar a organizar el contenido
                            de esta materia.
                        </p>


                        <button
                            onClick={
                                abrirNuevaUnidad
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

                            Crear unidad

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
                                        ? "Editar unidad"
                                        : "Nueva unidad"}
                                </h2>

                                <p
                                    className="
                                        text-xs
                                        text-[var(--nexus-text-muted)]
                                        mt-1
                                    "
                                >
                                    Organiza una parte del
                                    contenido de la materia.
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
                                    hover:bg-black/5
                                    dark:hover:bg-white/5
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
                                    Nombre de la unidad
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
                                    placeholder="Ej. Fundamentos de redes"
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
                                    placeholder="Describe brevemente qué aprenderán los estudiantes..."
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
                                    Número de unidad
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
                                    hover:bg-black/5
                                    dark:hover:bg-white/5
                                "
                            >
                                Cancelar
                            </button>


                            <button
                                onClick={
                                    guardarUnidad
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
                                    : "Crear unidad"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}
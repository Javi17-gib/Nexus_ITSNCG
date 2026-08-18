import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    BookOpen,
    Plus,
    Search,
    Users,
    Layers3,
    ArrowRight,
    MoreVertical,
    Pencil,
    Trash2,
    GraduationCap,
    Loader2,
    AlertCircle,
    X,
    Code2,
    Calculator,
    FlaskConical,
    Cpu,
    Palette,
    Globe,
    Database,
    Network,
    Languages,
    Music,
    Image,
    Atom,
    Sigma,
    Monitor,
    Terminal,
    BookMarked,
    FileText,
    HeartPulse,
    Briefcase,
    Scale,
    Landmark,
    Wrench,
    Gamepad2,
    Brain,
} from "lucide-react";

import type {
    LucideIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
    getMateriasRequest,
    createMateriaRequest,
    updateMateriaRequest,
    deleteMateriaRequest,
} from "../../api/materias";

import type {
    Materia,
} from "../../types/materia";


/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
*/

type IconoMateria =
    | "book"
    | "code"
    | "calculator"
    | "flask"
    | "cpu"
    | "palette"
    | "globe"
    | "database"
    | "network"
    | "languages"
    | "music"
    | "image"
    | "atom"
    | "sigma"
    | "monitor"
    | "terminal"
    | "bookmarked"
    | "file"
    | "health"
    | "business"
    | "scale"
    | "landmark"
    | "wrench"
    | "gamepad"
    | "brain";

interface IconoOption {
    id: IconoMateria;
    nombre: string;
    icon: LucideIcon;
}


/*
|--------------------------------------------------------------------------
| ICONOS DISPONIBLES
|--------------------------------------------------------------------------
*/

const ICONOS_MATERIA: IconoOption[] = [

    {
        id: "book",
        nombre: "Libro",
        icon: BookOpen,
    },

    {
        id: "code",
        nombre: "Programación",
        icon: Code2,
    },

    {
        id: "calculator",
        nombre: "Matemáticas",
        icon: Calculator,
    },

    {
        id: "flask",
        nombre: "Ciencias",
        icon: FlaskConical,
    },

    {
        id: "cpu",
        nombre: "Tecnología",
        icon: Cpu,
    },

    {
        id: "palette",
        nombre: "Diseño",
        icon: Palette,
    },

    {
        id: "globe",
        nombre: "Geografía",
        icon: Globe,
    },

    {
        id: "database",
        nombre: "Bases de datos",
        icon: Database,
    },

    {
        id: "network",
        nombre: "Redes",
        icon: Network,
    },

    {
        id: "languages",
        nombre: "Idiomas",
        icon: Languages,
    },

    {
        id: "music",
        nombre: "Música",
        icon: Music,
    },

    {
        id: "image",
        nombre: "Multimedia",
        icon: Image,
    },

    {
        id: "atom",
        nombre: "Física",
        icon: Atom,
    },

    {
        id: "sigma",
        nombre: "Cálculo",
        icon: Sigma,
    },

    {
        id: "monitor",
        nombre: "Computación",
        icon: Monitor,
    },

    {
        id: "terminal",
        nombre: "Terminal",
        icon: Terminal,
    },

    {
        id: "bookmarked",
        nombre: "Lectura",
        icon: BookMarked,
    },

    {
        id: "file",
        nombre: "Documentos",
        icon: FileText,
    },

    {
        id: "health",
        nombre: "Salud",
        icon: HeartPulse,
    },

    {
        id: "business",
        nombre: "Negocios",
        icon: Briefcase,
    },

    {
        id: "scale",
        nombre: "Derecho",
        icon: Scale,
    },

    {
        id: "landmark",
        nombre: "Historia",
        icon: Landmark,
    },

    {
        id: "wrench",
        nombre: "Ingeniería",
        icon: Wrench,
    },

    {
        id: "gamepad",
        nombre: "Videojuegos",
        icon: Gamepad2,
    },

    {
        id: "brain",
        nombre: "Psicología",
        icon: Brain,
    },

];


/*
|--------------------------------------------------------------------------
| COLORES PREDETERMINADOS
|--------------------------------------------------------------------------
*/

const COLORES_MATERIA = [

    {
        id: "violet",
        nombre: "Violeta",
        color: "#8b5cf6",
    },

    {
        id: "blue",
        nombre: "Azul",
        color: "#3b82f6",
    },

    {
        id: "cyan",
        nombre: "Cian",
        color: "#06b6d4",
    },

    {
        id: "emerald",
        nombre: "Esmeralda",
        color: "#10b981",
    },

    {
        id: "green",
        nombre: "Verde",
        color: "#22c55e",
    },

    {
        id: "yellow",
        nombre: "Amarillo",
        color: "#eab308",
    },

    {
        id: "orange",
        nombre: "Naranja",
        color: "#f97316",
    },

    {
        id: "red",
        nombre: "Rojo",
        color: "#ef4444",
    },

    {
        id: "pink",
        nombre: "Rosa",
        color: "#ec4899",
    },

    {
        id: "indigo",
        nombre: "Índigo",
        color: "#6366f1",
    },

];


/*
|--------------------------------------------------------------------------
| OBTENER ICONO
|--------------------------------------------------------------------------
*/

const obtenerIcono = (
    nombre?: string | null
): LucideIcon => {

    const encontrado =
        ICONOS_MATERIA.find(
            (item) =>
                item.id === nombre
        );

    return encontrado?.icon ??
        BookOpen;
};


/*
|--------------------------------------------------------------------------
| NORMALIZAR COLOR
|--------------------------------------------------------------------------
*/

const obtenerColor = (
    color?: string | null
): string => {

    if (!color) {
        return "#8b5cf6";
    }

    const encontrado =
        COLORES_MATERIA.find(
            (item) =>
                item.id === color
        );

    if (encontrado) {
        return encontrado.color;
    }

    /*
    |--------------------------------------------------------------------------
    | También permite HEX guardado directamente
    |--------------------------------------------------------------------------
    */

    if (
        color.startsWith("#") &&
        (
            color.length === 7 ||
            color.length === 4
        )
    ) {
        return color;
    }

    return "#8b5cf6";
};


/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function Materias() {

    const navigate = useNavigate();


    /*
    |--------------------------------------------------------------------------
    | ESTADOS
    |--------------------------------------------------------------------------
    */

    const [materias, setMaterias] =
        useState<Materia[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [error, setError] =
        useState("");

    const [showModal, setShowModal] =
        useState(false);

    const [showMenu, setShowMenu] =
        useState<number | null>(null);

    const [editingId, setEditingId] =
        useState<number | null>(null);


    /*
    |--------------------------------------------------------------------------
    | FORMULARIO
    |--------------------------------------------------------------------------
    */

    const [form, setForm] = useState({

        nombre: "",

        descripcion: "",

        color: "#8b5cf6",

        icono: "book" as IconoMateria,

    });


    /*
    |--------------------------------------------------------------------------
    | CARGAR MATERIAS
    |--------------------------------------------------------------------------
    */

    const cargarMaterias = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getMateriasRequest();

            setMaterias(data);

        } catch (error: any) {

            console.error(
                "Error al obtener materias:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "No se pudieron cargar las materias."
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

        cargarMaterias();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | FILTRAR
    |--------------------------------------------------------------------------
    */

    const materiasFiltradas =
        useMemo(() => {

            const texto =
                search
                    .toLowerCase()
                    .trim();

            if (!texto) {
                return materias;
            }

            return materias.filter(
                (materia) =>
                    materia.nombre
                        .toLowerCase()
                        .includes(texto) ||

                    (
                        materia.descripcion ||
                        ""
                    )
                        .toLowerCase()
                        .includes(texto)
            );

        }, [
            materias,
            search,
        ]);


    /*
    |--------------------------------------------------------------------------
    | ABRIR NUEVA MATERIA
    |--------------------------------------------------------------------------
    */

    const abrirNuevaMateria = () => {

        setEditingId(null);

        setForm({

            nombre: "",

            descripcion: "",

            color: "#8b5cf6",

            icono: "book",

        });

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | EDITAR MATERIA
    |--------------------------------------------------------------------------
    */

    const editarMateria = (
        materia: Materia
    ) => {

        setEditingId(
            materia.id
        );

        setForm({

            nombre:
                materia.nombre,

            descripcion:
                materia.descripcion ||
                "",

            color:
                obtenerColor(
                    materia.color
                ),

            icono:
                (
                    ICONOS_MATERIA.some(
                        (item) =>
                            item.id ===
                            materia.icono
                    )
                        ? materia.icono
                        : "book"
                ) as IconoMateria,

        });

        setShowMenu(null);

        setError("");

        setShowModal(true);

    };


    /*
    |--------------------------------------------------------------------------
    | GUARDAR MATERIA
    |--------------------------------------------------------------------------
    */

    const guardarMateria = async () => {

        if (
            !form.nombre.trim()
        ) {

            setError(
                "El nombre de la materia es obligatorio."
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

                const response =
                    await updateMateriaRequest(
                        editingId,
                        {

                            nombre:
                                form.nombre.trim(),

                            descripcion:
                                form.descripcion.trim(),

                            color:
                                form.color,

                            icono:
                                form.icono,

                            activa:
                                true,

                        }
                    );

                setMaterias(
                    (actuales) =>
                        actuales.map(
                            (materia) =>
                                materia.id ===
                                editingId
                                    ? response.materia
                                    : materia
                        )
                );

            }


            /*
            |--------------------------------------------------------------------------
            | CREAR
            |--------------------------------------------------------------------------
            */

            else {

                const response =
                    await createMateriaRequest(
                        {

                            nombre:
                                form.nombre.trim(),

                            descripcion:
                                form.descripcion.trim(),

                            color:
                                form.color,

                            icono:
                                form.icono,

                            activa:
                                true,

                        }
                    );

                setMaterias(
                    (actuales) => [

                        ...actuales,

                        response.materia,

                    ]
                );

            }


            /*
            |--------------------------------------------------------------------------
            | CERRAR
            |--------------------------------------------------------------------------
            */

            setShowModal(false);

            setEditingId(null);

            setForm({

                nombre: "",

                descripcion: "",

                color: "#8b5cf6",

                icono: "book",

            });

        } catch (error: any) {

            console.error(
                "Error al guardar materia:",
                error
            );


            /*
            |--------------------------------------------------------------------------
            | ERRORES DE VALIDACIÓN
            |--------------------------------------------------------------------------
            */

            const errores =
                error?.response?.data?.errors;

            if (errores) {

                const primerError =
                    Object.values(
                        errores
                    )[0];

                if (
                    Array.isArray(
                        primerError
                    )
                ) {

                    setError(
                        String(
                            primerError[0]
                        )
                    );

                } else {

                    setError(
                        "Los datos enviados no son válidos."
                    );

                }

            } else {

                setError(
                    error?.response?.data?.message ||
                    "No se pudo guardar la materia."
                );

            }

        } finally {

            setSaving(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR
    |--------------------------------------------------------------------------
    */

    const eliminarMateria = async (
        id: number
    ) => {

        const confirmar =
            window.confirm(
                "¿Seguro que deseas eliminar esta materia?"
            );

        if (!confirmar) {
            return;
        }

        try {

            setError("");

            await deleteMateriaRequest(
                id
            );

            setMaterias(
                (actuales) =>
                    actuales.filter(
                        (materia) =>
                            materia.id !== id
                    )
            );

            setShowMenu(null);

        } catch (error: any) {

            console.error(
                "Error al eliminar materia:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "No se pudo eliminar la materia."
            );

        }

    };


    /*
    |--------------------------------------------------------------------------
    | ABRIR MATERIA
    |--------------------------------------------------------------------------
    */

    const abrirMateria = (
        id: number
    ) => {

        navigate(
            `/dashboard/docente/materias/${id}`
        );

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

        setForm({

            nombre: "",

            descripcion: "",

            color: "#8b5cf6",

            icono: "book",

        });

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
                    Cargando tus materias...
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
                            Gestión académica
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
                        Mis materias
                    </h1>


                    <p
                        className="
                            mt-2
                            text-[var(--nexus-text-secondary)]
                            max-w-2xl
                        "
                    >
                        Crea y administra tus materias.
                        Desde aquí podrás construir todo
                        el contenido que verá tu alumnado.
                    </p>

                </div>


                <button
                    onClick={
                        abrirNuevaMateria
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
                        hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]
                        transition-all
                    "
                >

                    <Plus size={20} />

                    Nueva materia

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

                        <X size={18} />

                    </button>

                </div>

            )}


            {/* =========================================================
                BUSCADOR
            ========================================================= */}

            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                "
            >

                <div
                    className="
                        text-sm
                        text-[var(--nexus-text-muted)]
                    "
                >

                    {materias.length}

                    {" "}

                    {materias.length === 1
                        ? "materia"
                        : "materias"}

                </div>


                <div
                    className="
                        relative
                        w-full
                        md:w-80
                    "
                >

                    <Search
                        size={18}
                        className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-[var(--nexus-text-muted)]
                        "
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Buscar materia..."
                        className="
                            w-full
                            h-11
                            rounded-xl
                            bg-[var(--nexus-surface-secondary)]
                            border
                            border-[var(--nexus-border)]
                            pl-11
                            pr-4
                            text-sm
                            text-[var(--nexus-text)]
                            placeholder:text-[var(--nexus-text-muted)]
                            outline-none
                            focus:border-violet-500/40
                            focus:ring-2
                            focus:ring-violet-500/10
                        "
                    />

                </div>

            </div>


            {/* =========================================================
                MATERIAS
            ========================================================= */}

            {materiasFiltradas.length > 0 ? (

                <div
                    className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        xl:grid-cols-3
                        gap-5
                    "
                >

                    {materiasFiltradas.map(
                        (materia) => {

                            const color =
                                obtenerColor(
                                    materia.color
                                );

                            const Icono =
                                obtenerIcono(
                                    materia.icono
                                );


                            return (

                                <div
                                    key={
                                        materia.id
                                    }
                                    className="
                                        group
                                        relative
                                        overflow-visible
                                        rounded-2xl
                                        bg-[var(--nexus-surface-secondary)]
                                        border
                                        border-[var(--nexus-border)]
                                        hover:border-[var(--nexus-border)]
                                        transition-all
                                        duration-300
                                        hover:-translate-y-1
                                        hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]
                                    "
                                >

                                    {/* =================================================
                                        BRILLO
                                    ================================================= */}

                                    <div
                                        className="
                                            absolute
                                            -top-24
                                            -right-24
                                            w-48
                                            h-48
                                            rounded-full
                                            opacity-10
                                            blur-3xl
                                            group-hover:opacity-20
                                            transition-opacity
                                            pointer-events-none
                                        "
                                        style={{
                                            backgroundColor:
                                                color,
                                        }}
                                    />


                                    {/* =================================================
                                        LÍNEA SUPERIOR
                                    ================================================= */}

                                    <div
                                        className="
                                            h-1.5
                                            rounded-t-2xl
                                        "
                                        style={{
                                            background:
                                                `linear-gradient(90deg, ${color}, ${color}99)`,
                                        }}
                                    />


                                    <div className="p-6">


                                        {/* =================================================
                                            ICONO + MENÚ
                                        ================================================= */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                            "
                                        >

                                            <div
                                                className="
                                                    w-12
                                                    h-12
                                                    rounded-xl
                                                    border
                                                    flex
                                                    items-center
                                                    justify-center
                                                "
                                                style={{
                                                    backgroundColor:
                                                        `${color}18`,
                                                    borderColor:
                                                        `${color}45`,
                                                }}
                                            >

                                                <Icono
                                                    size={23}
                                                    style={{
                                                        color,
                                                    }}
                                                />

                                            </div>


                                            <div className="relative">

                                                <button
                                                    onClick={() =>
                                                        setShowMenu(
                                                            showMenu ===
                                                                materia.id
                                                                ? null
                                                                : materia.id
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
                                                        hover:bg-black/5 dark:hover:bg-white/5
                                                    "
                                                >

                                                    <MoreVertical
                                                        size={18}
                                                    />

                                                </button>


                                                {showMenu ===
                                                    materia.id && (

                                                    <div
                                                        className="
                                                            absolute
                                                            right-0
                                                            top-10
                                                            z-30
                                                            w-40
                                                            rounded-xl
                                                            bg-[var(--nexus-surface)]
                                                            border
                                                            border-[var(--nexus-border)]
                                                            shadow-2xl
                                                            p-1
                                                        "
                                                    >

                                                        <button
                                                            onClick={() =>
                                                                editarMateria(
                                                                    materia
                                                                )
                                                            }
                                                            className="
                                                                w-full
                                                                flex
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-2
                                                                rounded-lg
                                                                text-sm
                                                                text-[var(--nexus-text-secondary)]
                                                                hover:text-[var(--nexus-text)]
                                                                hover:bg-black/5 dark:hover:bg-white/5
                                                            "
                                                        >

                                                            <Pencil
                                                                size={15}
                                                            />

                                                            Editar

                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                eliminarMateria(
                                                                    materia.id
                                                                )
                                                            }
                                                            className="
                                                                w-full
                                                                flex
                                                                items-center
                                                                gap-2
                                                                px-3
                                                                py-2
                                                                rounded-lg
                                                                text-sm
                                                                text-red-400
                                                                hover:bg-red-500/10
                                                            "
                                                        >

                                                            <Trash2
                                                                size={15}
                                                            />

                                                            Eliminar

                                                        </button>

                                                    </div>

                                                )}

                                            </div>

                                        </div>


                                        {/* =================================================
                                            INFORMACIÓN
                                        ================================================= */}

                                        <div className="mt-5">

                                            <div
                                                className="
                                                    flex
                                                    items-center
                                                    justify-between
                                                    gap-3
                                                "
                                            >

                                                <h2
                                                    className="
                                                        text-xl
                                                        font-bold
                                                        text-[var(--nexus-text)]
                                                        truncate
                                                    "
                                                >
                                                    {
                                                        materia.nombre
                                                    }
                                                </h2>


                                                <span
                                                    className="
                                                        shrink-0
                                                        px-2
                                                        py-1
                                                        rounded-md
                                                        bg-white/5
                                                        text-[10px]
                                                        text-[var(--nexus-text-muted)]
                                                        font-mono
                                                    "
                                                >
                                                    MAT-

                                                    {String(
                                                        materia.id
                                                    ).padStart(
                                                        2,
                                                        "0"
                                                    )}

                                                </span>

                                            </div>


                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    leading-6
                                                    text-[var(--nexus-text-muted)]
                                                    line-clamp-2
                                                    min-h-[48px]
                                                "
                                            >
                                                {
                                                    materia.descripcion ||
                                                    "Sin descripción."
                                                }
                                            </p>

                                        </div>


                                        {/* =================================================
                                            ESTADÍSTICAS
                                        ================================================= */}

                                        <div
                                            className="
                                                grid
                                                grid-cols-3
                                                gap-2
                                                mt-6
                                            "
                                        >

                                            <div
                                                className="
                                                    rounded-xl
                                                    bg-[var(--nexus-surface-secondary)]
                                                    border
                                                    border-[var(--nexus-border)]
                                                    p-3
                                                "
                                            >

                                                <Layers3
                                                    size={16}
                                                    style={{
                                                        color,
                                                    }}
                                                    className="mb-2"
                                                />

                                                <p
                                                    className="
                                                        text-lg
                                                        font-bold
                                                        text-[var(--nexus-text)]
                                                    "
                                                >
                                                    {
                                                        materia.unidades ??
                                                        0
                                                    }
                                                </p>

                                                <p
                                                    className="
                                                        text-[11px]
                                                        text-[var(--nexus-text-muted)]
                                                    "
                                                >
                                                    Unidades
                                                </p>

                                            </div>


                                            <div
                                                className="
                                                    rounded-xl
                                                    bg-[var(--nexus-surface-secondary)]
                                                    border
                                                    border-[var(--nexus-border)]
                                                    p-3
                                                "
                                            >

                                                <BookOpen
                                                    size={16}
                                                    className="
                                                        text-blue-400
                                                        mb-2
                                                    "
                                                />

                                                <p
                                                    className="
                                                        text-lg
                                                        font-bold
                                                        text-[var(--nexus-text)]
                                                    "
                                                >
                                                    {
                                                        materia.temas ??
                                                        0
                                                    }
                                                </p>

                                                <p
                                                    className="
                                                        text-[11px]
                                                        text-[var(--nexus-text-muted)]
                                                    "
                                                >
                                                    Temas
                                                </p>

                                            </div>


                                            <div
                                                className="
                                                    rounded-xl
                                                    bg-[var(--nexus-surface-secondary)]
                                                    border
                                                    border-[var(--nexus-border)]
                                                    p-3
                                                "
                                            >

                                                <Users
                                                    size={16}
                                                    className="
                                                        text-cyan-400
                                                        mb-2
                                                    "
                                                />

                                                <p
                                                    className="
                                                        text-lg
                                                        font-bold
                                                        text-[var(--nexus-text)]
                                                    "
                                                >
                                                    {
                                                        materia.grupos ??
                                                        0
                                                    }
                                                </p>

                                                <p
                                                    className="
                                                        text-[11px]
                                                        text-[var(--nexus-text-muted)]
                                                    "
                                                >
                                                    Grupos
                                                </p>

                                            </div>

                                        </div>


                                        {/* =================================================
                                            ADMINISTRAR
                                        ================================================= */}

                                        <button
                                            onClick={() =>
                                                abrirMateria(
                                                    materia.id
                                                )
                                            }
                                            className="
                                                mt-5
                                                w-full
                                                h-11
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                gap-2
                                                bg-[var(--nexus-surface-secondary)]
                                                border
                                                border-[var(--nexus-border)]
                                                text-sm
                                                font-semibold
                                                text-[var(--nexus-text-secondary)]
                                                hover:text-[var(--nexus-text)]
                                                transition-all
                                            "
                                            onMouseEnter={(e) => {

                                                e.currentTarget.style.backgroundColor =
                                                    `${color}12`;

                                                e.currentTarget.style.borderColor =
                                                    `${color}35`;

                                            }}
                                            onMouseLeave={(e) => {

                                                e.currentTarget.style.backgroundColor =
                                                    "";

                                                e.currentTarget.style.borderColor =
                                                    "";

                                            }}
                                        >

                                            Administrar materia

                                            <ArrowRight
                                                size={17}
                                            />

                                        </button>

                                    </div>

                                </div>

                            );

                        }
                    )}


                    {/* =====================================================
                        NUEVA MATERIA
                    ===================================================== */}

                    <button
                        onClick={
                            abrirNuevaMateria
                        }
                        className="
                            min-h-[360px]
                            rounded-2xl
                            border
                            border-dashed
                            border-[var(--nexus-border)]
                            hover:border-violet-500/30
                            bg-[var(--nexus-surface-secondary)]
                            hover:bg-violet-500/[0.03]
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-4
                            text-[var(--nexus-text-muted)]
                            hover:text-violet-300
                            transition-all
                            group
                        "
                    >

                        <div
                            className="
                                w-14
                                h-14
                                rounded-2xl
                                border
                                border-[var(--nexus-border)]
                                group-hover:border-violet-500/30
                                flex
                                items-center
                                justify-center
                            "
                        >

                            <Plus size={24} />

                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    font-semibold
                                "
                            >
                                Crear nueva materia
                            </p>

                            <p
                                className="
                                    text-xs
                                    text-[var(--nexus-text-muted)]
                                    mt-1
                                "
                            >
                                Comienza un nuevo espacio
                                académico
                            </p>

                        </div>

                    </button>

                </div>

            ) : (

                /* =========================================================
                   VACÍO
                ========================================================= */

                <div
                    className="
                        min-h-[420px]
                        rounded-2xl
                        border
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
                            {search
                                ? "No encontramos materias"
                                : "Aún no tienes materias"}
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--nexus-text-muted)]
                            "
                        >
                            {search
                                ? "Prueba con otro nombre."
                                : "Crea tu primera materia para comenzar a construir tu espacio de aprendizaje."}
                        </p>


                        {!search && (

                            <button
                                onClick={
                                    abrirNuevaMateria
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

                                <Plus size={18} />

                                Crear materia

                            </button>

                        )}

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
                            "
                        >

                            <div
                                className="
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
                                            flex
                                            items-center
                                            justify-center
                                            border
                                        "
                                        style={{
                                            backgroundColor:
                                                `${form.color}18`,
                                            borderColor:
                                                `${form.color}45`,
                                        }}
                                    >

                                        {(() => {

                                            const Icono =
                                                obtenerIcono(
                                                    form.icono
                                                );

                                            return (

                                                <Icono
                                                    size={20}
                                                    style={{
                                                        color:
                                                            form.color,
                                                    }}
                                                />

                                            );

                                        })()}

                                    </div>


                                    <div>

                                        <h2
                                            className="
                                                text-lg
                                                font-bold
                                                text-[var(--nexus-text)]
                                            "
                                        >
                                            {editingId !==
                                            null
                                                ? "Editar materia"
                                                : "Nueva materia"}
                                        </h2>


                                        <p
                                            className="
                                                text-xs
                                                text-[var(--nexus-text-muted)]
                                                mt-0.5
                                            "
                                        >
                                            Personaliza el espacio
                                            académico.
                                        </p>

                                    </div>

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
                                        hover:bg-black/5 dark:hover:bg-white/5
                                    "
                                >

                                    <X size={18} />

                                </button>

                            </div>

                        </div>


                        {/* =================================================
                            FORMULARIO
                        ================================================= */}

                        <div className="p-6 space-y-7">


                            {/* =============================================
                                NOMBRE
                            ============================================= */}

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
                                    Nombre de la materia
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
                                                e.target
                                                    .value,
                                        })
                                    }
                                    placeholder="Ej. Programación Web"
                                    autoFocus
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


                            {/* =============================================
                                DESCRIPCIÓN
                            ============================================= */}

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
                                            text-[var(--nexus-text-muted)]
                                            ml-1
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
                                                e.target
                                                    .value,
                                        })
                                    }
                                    placeholder="Describe brevemente qué aprenderán los estudiantes..."
                                    rows={3}
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


                            {/* =============================================
                                COLOR
                            ============================================= */}

                            <div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        mb-3
                                    "
                                >

                                    <label
                                        className="
                                            text-sm
                                            font-medium
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >
                                        Color de la materia
                                    </label>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                        "
                                    >

                                        <div
                                            className="
                                                w-5
                                                h-5
                                                rounded-full
                                                border
                                                border-white/20
                                            "
                                            style={{
                                                backgroundColor:
                                                    form.color,
                                            }}
                                        />

                                        <span
                                            className="
                                                text-xs
                                                font-mono
                                                text-[var(--nexus-text-muted)]
                                            "
                                        >
                                            {form.color}
                                        </span>

                                    </div>

                                </div>


                                {/* COLORES */}

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        gap-3
                                    "
                                >

                                    {COLORES_MATERIA.map(
                                        (color) => (

                                            <button
                                                key={
                                                    color.id
                                                }
                                                type="button"
                                                title={
                                                    color.nombre
                                                }
                                                onClick={() =>
                                                    setForm({
                                                        ...form,
                                                        color:
                                                            color.color,
                                                    })
                                                }
                                                className="
                                                    relative
                                                    w-9
                                                    h-9
                                                    rounded-full
                                                    border-2
                                                    border-transparent
                                                    hover:scale-110
                                                    transition-transform
                                                "
                                                style={{
                                                    backgroundColor:
                                                        color.color,
                                                }}
                                            >

                                                {form.color
                                                    .toLowerCase() ===
                                                    color.color.toLowerCase() && (

                                                    <div
                                                        className="
                                                            absolute
                                                            inset-1
                                                            rounded-full
                                                            border-2
                                                            border-white
                                                        "
                                                    />

                                                )}

                                            </button>

                                        )
                                    )}


                                    {/* COLOR PERSONALIZADO */}

                                    <label
                                        title="Elegir color personalizado"
                                        className="
                                            relative
                                            w-9
                                            h-9
                                            rounded-full
                                            overflow-hidden
                                            cursor-pointer
                                            border
                                            border-white/20
                                            bg-gradient-to-br
                                            from-red-500
                                            via-yellow-400
                                            to-blue-500
                                            hover:scale-110
                                            transition-transform
                                        "
                                    >

                                        <input
                                            type="color"
                                            value={
                                                form.color
                                            }
                                            onChange={(e) =>
                                                setForm({
                                                    ...form,
                                                    color:
                                                        e.target
                                                            .value,
                                                })
                                            }
                                            className="
                                                absolute
                                                inset-0
                                                w-full
                                                h-full
                                                opacity-0
                                                cursor-pointer
                                            "
                                        />

                                        <span
                                            className="
                                                absolute
                                                inset-0
                                                flex
                                                items-center
                                                justify-center
                                                pointer-events-none
                                            "
                                        >

                                            <Plus
                                                size={15}
                                                className="
                                                    text-[var(--nexus-text)]
                                                    drop-shadow
                                                "
                                            />

                                        </span>

                                    </label>

                                </div>

                            </div>


                            {/* =============================================
                                ICONO
                            ============================================= */}

                            <div>

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        mb-3
                                    "
                                >

                                    <label
                                        className="
                                            text-sm
                                            font-medium
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >
                                        Icono de la materia
                                    </label>


                                    <span
                                        className="
                                            text-xs
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        {
                                            ICONOS_MATERIA.find(
                                                (item) =>
                                                    item.id ===
                                                    form.icono
                                            )?.nombre
                                        }
                                    </span>

                                </div>


                                <div
                                    className="
                                        grid
                                        grid-cols-5
                                        sm:grid-cols-7
                                        gap-2
                                        max-h-52
                                        overflow-y-auto
                                        pr-1
                                    "
                                >

                                    {ICONOS_MATERIA.map(
                                        (item) => {

                                            const Icono =
                                                item.icon;

                                            const seleccionado =
                                                form.icono ===
                                                item.id;


                                            return (

                                                <button
                                                    key={
                                                        item.id
                                                    }
                                                    type="button"
                                                    title={
                                                        item.nombre
                                                    }
                                                    onClick={() =>
                                                        setForm({
                                                            ...form,
                                                            icono:
                                                                item.id,
                                                        })
                                                    }
                                                    className="
                                                        h-12
                                                        rounded-xl
                                                        flex
                                                        items-center
                                                        justify-center
                                                        border
                                                        transition-all
                                                    "
                                                    style={{
                                                        backgroundColor:
                                                            seleccionado
                                                                ? `${form.color}18`
                                                                : "rgba(255,255,255,0.02)",

                                                        borderColor:
                                                            seleccionado
                                                                ? `${form.color}70`
                                                                : "rgba(255,255,255,0.05)",
                                                    }}
                                                >

                                                    <Icono
                                                        size={21}
                                                        style={{
                                                            color:
                                                                seleccionado
                                                                    ? form.color
                                                                    : "#64748b",
                                                        }}
                                                    />

                                                </button>

                                            );

                                        }
                                    )}

                                </div>

                            </div>


                            {/* =============================================
                                VISTA PREVIA
                            ============================================= */}

                            <div>

                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text-secondary)]
                                        mb-3
                                    "
                                >
                                    Vista previa
                                </p>


                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-[var(--nexus-border)]
                                        bg-[var(--nexus-bg)]
                                        p-4
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
                                                w-12
                                                h-12
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                border
                                            "
                                            style={{
                                                backgroundColor:
                                                    `${form.color}18`,
                                                borderColor:
                                                    `${form.color}45`,
                                            }}
                                        >

                                            {(() => {

                                                const Icono =
                                                    obtenerIcono(
                                                        form.icono
                                                    );

                                                return (

                                                    <Icono
                                                        size={23}
                                                        style={{
                                                            color:
                                                                form.color,
                                                        }}
                                                    />

                                                );

                                            })()}

                                        </div>


                                        <div className="min-w-0">

                                            <p
                                                className="
                                                    text-[var(--nexus-text)]
                                                    font-semibold
                                                    truncate
                                                "
                                            >
                                                {form.nombre ||
                                                    "Nombre de la materia"}
                                            </p>


                                            <p
                                                className="
                                                    text-xs
                                                    text-[var(--nexus-text-muted)]
                                                    mt-1
                                                    truncate
                                                "
                                            >
                                                {form.descripcion ||
                                                    "Descripción de la materia"}
                                            </p>

                                        </div>

                                    </div>


                                    <div
                                        className="
                                            mt-4
                                            h-1
                                            rounded-full
                                        "
                                        style={{
                                            backgroundColor:
                                                form.color,
                                        }}
                                    />

                                </div>

                            </div>

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
                                    hover:bg-black/5 dark:hover:bg-white/5
                                    disabled:opacity-40
                                "
                            >
                                Cancelar
                            </button>


                            <button
                                onClick={
                                    guardarMateria
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
                                    : "Crear materia"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );
}
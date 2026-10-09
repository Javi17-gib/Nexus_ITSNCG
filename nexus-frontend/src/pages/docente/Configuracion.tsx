import {
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";

import {
    Camera,
    CheckCircle2,
    Mail,
    Save,
    User,
    XCircle,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import api from "../../api/axios";

export default function Configuracion() {

    const { user, updateProfile } = useAuth();

    const fileInputRef =
        useRef<HTMLInputElement | null>(null);

    const [nombre, setNombre] =
        useState("");

    const [apellidoPaterno, setApellidoPaterno] =
        useState("");

    const [apellidoMaterno, setApellidoMaterno] =
        useState("");

    const [correo, setCorreo] =
        useState("");

    const [foto, setFoto] =
        useState<File | null>(null);

    const [preview, setPreview] =
        useState("");

    const [guardando, setGuardando] =
        useState(false);

    const [mensaje, setMensaje] =
        useState("");

    const [error, setError] =
        useState("");

    /*
    |--------------------------------------------------------------------------
    | CARGAR INFORMACIÓN ACTUAL DEL USUARIO
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!user) return;

        setNombre(user.nombre || "");

        setApellidoPaterno(
            user.apellido_paterno || ""
        );

        setApellidoMaterno(
            user.apellido_materno || ""
        );

        setCorreo(user.correo || "");

        if (user.foto_perfil) {

            setPreview(
                normalizarFotoUrl(
                    user.foto_perfil
                )
            );

        } else {

            setPreview("");

        }

    }, [user]);

    /*
    |--------------------------------------------------------------------------
    | URL DE FOTO DE PERFIL
    |--------------------------------------------------------------------------
    */

    function normalizarFotoUrl(
        ruta?: string | null
    ) {

        if (!ruta) return "";

        const valor = ruta.trim();

        if (!valor) return "";

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

    /*
    |--------------------------------------------------------------------------
    | SELECCIONAR FOTO
    |--------------------------------------------------------------------------
    */

    const seleccionarFoto = (
        event: ChangeEvent<HTMLInputElement>
    ) => {

        const archivo =
            event.target.files?.[0];

        if (!archivo) return;

        setError("");
        setMensaje("");

        /*
        | TIPOS PERMITIDOS
        */

        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/webp",
        ];

        if (
            !tiposPermitidos.includes(
                archivo.type
            )
        ) {

            setError(
                "La foto debe ser JPG, PNG o WEBP."
            );

            return;
        }

        /*
        | TAMAÑO MÁXIMO: 5 MB
        */

        if (
            archivo.size >
            5 * 1024 * 1024
        ) {

            setError(
                "La foto no puede superar los 5 MB."
            );

            return;
        }

        setFoto(archivo);

        /*
        | VISTA PREVIA
        */

        const objectUrl =
            URL.createObjectURL(
                archivo
            );

        setPreview(objectUrl);
    };

    /*
    |--------------------------------------------------------------------------
    | CANCELAR FOTO SELECCIONADA
    |--------------------------------------------------------------------------
    */

    const cancelarFoto = () => {

        setFoto(null);

        if (user?.foto_perfil) {

            setPreview(
                normalizarFotoUrl(
                    user.foto_perfil
                )
            );

        } else {

            setPreview("");

        }

        if (fileInputRef.current) {

            fileInputRef.current.value = "";

        }
    };

    /*
    |--------------------------------------------------------------------------
    | GUARDAR PERFIL
    |--------------------------------------------------------------------------
    */

    const guardarPerfil = async (
        event: FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        setMensaje("");
        setError("");

        /*
        | VALIDACIONES
        */

        if (!nombre.trim()) {

            setError(
                "El nombre es obligatorio."
            );

            return;
        }

        if (!apellidoPaterno.trim()) {

            setError(
                "El apellido paterno es obligatorio."
            );

            return;
        }

        if (!correo.trim()) {

            setError(
                "El correo es obligatorio."
            );

            return;
        }

        setGuardando(true);

        try {

            const formData =
                new FormData();

            formData.append(
                "nombre",
                nombre.trim()
            );

            formData.append(
                "apellido_paterno",
                apellidoPaterno.trim()
            );

            formData.append(
                "apellido_materno",
                apellidoMaterno.trim()
            );

            formData.append(
                "correo",
                correo.trim()
            );

            if (foto) {

                formData.append(
                    "foto_perfil",
                    foto
                );

            }

            await updateProfile(
                formData
            );

            setFoto(null);

            if (
                fileInputRef.current
            ) {

                fileInputRef.current.value =
                    "";

            }

            setMensaje(
                "Tu perfil se actualizó correctamente."
            );

        } catch (err: any) {

            console.error(
                "Error al actualizar perfil:",
                err
            );

            const errores =
                err?.response?.data?.errors;

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
                        "No se pudieron actualizar los datos."
                    );

                }

            } else if (
                err?.response?.data?.message
            ) {

                setError(
                    err.response.data.message
                );

            } else {

                setError(
                    "Ocurrió un error al actualizar tu perfil."
                );
            }

        } finally {

            setGuardando(false);

        }
    };

    /*
    |--------------------------------------------------------------------------
    | INICIALES
    |--------------------------------------------------------------------------
    */

    const iniciales = (
        `${nombre?.charAt(0) || ""}${apellidoPaterno?.charAt(0) || ""}`
    ).toUpperCase();

    return (

        <div
            className="
                min-h-full
                w-full
                overflow-y-auto
                px-4
                py-6
                sm:px-6
                lg:px-8
                bg-[var(--nexus-bg)]
            "
        >

            <div
                className="
                    mx-auto
                    w-full
                    max-w-5xl
                "
            >

                {/* =========================================================
                    ENCABEZADO
                ========================================================= */}

                <div className="mb-6">

                    <div
                        className="
                            mb-2
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-violet-400
                        "
                    >

                        <User
                            size={16}
                        />

                        <span>
                            Cuenta
                        </span>

                    </div>

                    <h1
                        className="
                            text-2xl
                            font-bold
                            tracking-tight
                            text-[var(--nexus-text)]
                            sm:text-3xl
                        "
                    >
                        Configuración
                    </h1>

                    <p
                        className="
                            mt-1
                            max-w-2xl
                            text-sm
                            text-[var(--nexus-text-secondary)]
                        "
                    >
                        Administra la información que
                        aparece en tu perfil del ITSNCG.
                    </p>

                </div>


                {/* =========================================================
                    CONTENIDO
                ========================================================= */}

                <form
                    onSubmit={guardarPerfil}
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[var(--nexus-border)]
                        bg-[var(--nexus-surface)]
                        shadow-2xl
                    "
                >

                    {/* =====================================================
                        PERFIL
                    ===================================================== */}

                    <div
                        className="
                            border-b
                            border-[var(--nexus-border)]
                            px-5
                            py-5
                            sm:px-7
                        "
                    >

                        <div
                            className="
                                flex
                                flex-col
                                gap-5
                                sm:flex-row
                                sm:items-center
                            "
                        >

                            {/* FOTO */}

                            <div
                                className="
                                    relative
                                    h-24
                                    w-24
                                    shrink-0
                                "
                            >

                                <div
                                    className="
                                        flex
                                        h-24
                                        w-24
                                        items-center
                                        justify-center
                                        overflow-hidden
                                        rounded-full
                                        border
                                        border-violet-400/30
                                        bg-gradient-to-br
                                        from-violet-600
                                        to-indigo-600
                                        text-2xl
                                        font-bold
                                        text-white
                                        shadow-lg
                                        shadow-violet-900/30
                                    "
                                >

                                    {preview ? (

                                        <img
                                            src={preview}
                                            alt="Foto de perfil"
                                            className="
                                                h-full
                                                w-full
                                                object-cover
                                            "
                                        />

                                    ) : (

                                        iniciales || (
                                            <User
                                                size={32}
                                            />
                                        )

                                    )}

                                </div>


                                {/* BOTÓN CÁMARA */}

                                <button
                                    type="button"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="
                                        absolute
                                        bottom-0
                                        right-0
                                        flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[var(--nexus-surface)]
                                        bg-violet-600
                                        text-white
                                        shadow-lg
                                        transition
                                        hover:bg-violet-500
                                    "
                                    title="Cambiar foto"
                                >

                                    <Camera
                                        size={15}
                                    />

                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                                    onChange={
                                        seleccionarFoto
                                    }
                                    className="hidden"
                                />

                            </div>


                            {/* INFORMACIÓN FOTO */}

                            <div>

                                <h2
                                    className="
                                        text-base
                                        font-semibold
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    Foto de perfil
                                </h2>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-[var(--nexus-text-secondary)]
                                    "
                                >
                                    Esta imagen aparecerá
                                    en tu perfil y en la
                                    navegación del ITSNCG.
                                </p>

                                <p
                                    className="
                                        mt-2
                                        text-xs
                                        text-[var(--nexus-text-muted)]
                                    "
                                >
                                    JPG, PNG o WEBP · Máximo 5 MB
                                </p>

                                {foto && (

                                    <button
                                        type="button"
                                        onClick={
                                            cancelarFoto
                                        }
                                        className="
                                            mt-3
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            text-xs
                                            font-medium
                                            text-[var(--nexus-text-secondary)]
                                            transition
                                            hover:text-[var(--nexus-text)]
                                        "
                                    >

                                        <XCircle
                                            size={14}
                                        />

                                        Cancelar nueva foto

                                    </button>

                                )}

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        DATOS PERSONALES
                    ===================================================== */}

                    <div
                        className="
                            px-5
                            py-6
                            sm:px-7
                        "
                    >

                        <div className="mb-5">

                            <h2
                                className="
                                    text-base
                                    font-semibold
                                    text-[var(--nexus-text)]
                                "
                            >
                                Información personal
                            </h2>

                            <p
                                className="
                                    mt-1
                                    text-sm
                                    text-[var(--nexus-text-secondary)]
                                "
                            >
                                Mantén actualizados tus
                                datos personales.
                            </p>

                        </div>


                        <div
                            className="
                                grid
                                grid-cols-1
                                gap-5
                                md:grid-cols-2
                            "
                        >

                            {/* NOMBRE */}

                            <div>

                                <label
                                    htmlFor="nombre"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    Nombre
                                </label>

                                <div className="relative">

                                    <User
                                        size={17}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-[var(--nexus-text-muted)]
                                        "
                                    />

                                    <input
                                        id="nombre"
                                        type="text"
                                        value={nombre}
                                        onChange={(e) =>
                                            setNombre(
                                                e.target.value
                                            )
                                        }
                                        maxLength={100}
                                        className="
                                            h-11
                                            w-full
                                            rounded-xl
                                            border
                                            border-[var(--nexus-border)]
                                            bg-[var(--nexus-bg)]
                                            pl-10
                                            pr-4
                                            text-sm
                                            text-[var(--nexus-text)]
                                            outline-none
                                            transition
                                            placeholder:text-[var(--nexus-text-muted)]
                                            focus:border-violet-500/60
                                            focus:ring-2
                                            focus:ring-violet-500/10
                                        "
                                        placeholder="Tu nombre"
                                    />

                                </div>

                            </div>


                            {/* APELLIDO PATERNO */}

                            <div>

                                <label
                                    htmlFor="apellidoPaterno"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    Apellido paterno
                                </label>

                                <input
                                    id="apellidoPaterno"
                                    type="text"
                                    value={
                                        apellidoPaterno
                                    }
                                    onChange={(e) =>
                                        setApellidoPaterno(
                                            e.target.value
                                        )
                                    }
                                    maxLength={100}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[var(--nexus-border)]
                                        bg-[var(--nexus-bg)]
                                        px-4
                                        text-sm
                                        text-[var(--nexus-text)]
                                        outline-none
                                        transition
                                        placeholder:text-[var(--nexus-text-muted)]
                                        focus:border-violet-500/60
                                        focus:ring-2
                                        focus:ring-violet-500/10
                                    "
                                    placeholder="Apellido paterno"
                                />

                            </div>


                            {/* APELLIDO MATERNO */}

                            <div>

                                <label
                                    htmlFor="apellidoMaterno"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    Apellido materno
                                </label>

                                <input
                                    id="apellidoMaterno"
                                    type="text"
                                    value={
                                        apellidoMaterno
                                    }
                                    onChange={(e) =>
                                        setApellidoMaterno(
                                            e.target.value
                                        )
                                    }
                                    maxLength={100}
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-[var(--nexus-border)]
                                        bg-[var(--nexus-bg)]
                                        px-4
                                        text-sm
                                        text-[var(--nexus-text)]
                                        outline-none
                                        transition
                                        placeholder:text-[var(--nexus-text-muted)]
                                        focus:border-violet-500/60
                                        focus:ring-2
                                        focus:ring-violet-500/10
                                    "
                                    placeholder="Apellido materno"
                                />

                            </div>


                            {/* CORREO */}

                            <div>

                                <label
                                    htmlFor="correo"
                                    className="
                                        mb-2
                                        block
                                        text-sm
                                        font-medium
                                        text-[var(--nexus-text)]
                                    "
                                >
                                    Correo electrónico
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={17}
                                        className="
                                            pointer-events-none
                                            absolute
                                            left-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-[var(--nexus-text-muted)]
                                        "
                                    />

                                    <input
                                        id="correo"
                                        type="email"
                                        value={correo}
                                        onChange={(e) =>
                                            setCorreo(
                                                e.target.value
                                            )
                                        }
                                        maxLength={150}
                                        className="
                                            h-11
                                            w-full
                                            rounded-xl
                                            border
                                            border-[var(--nexus-border)]
                                            bg-[var(--nexus-bg)]
                                            pl-10
                                            pr-4
                                            text-sm
                                            text-[var(--nexus-text)]
                                            outline-none
                                            transition
                                            placeholder:text-[var(--nexus-text-muted)]
                                            focus:border-violet-500/60
                                            focus:ring-2
                                            focus:ring-violet-500/10
                                        "
                                        placeholder="correo@ejemplo.com"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =====================================================
                        MENSAJES
                    ===================================================== */}

                    {(mensaje || error) && (

                        <div
                            className="
                                px-5
                                pb-5
                                sm:px-7
                            "
                        >

                            {mensaje && (

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-emerald-500/20
                                        bg-emerald-500/10
                                        px-4
                                        py-3
                                        text-sm
                                        text-emerald-500
                                        dark:text-emerald-300
                                    "
                                >

                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0"
                                    />

                                    <span>
                                        {mensaje}
                                    </span>

                                </div>

                            )}

                            {error && (

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                        rounded-xl
                                        border
                                        border-red-500/20
                                        bg-red-500/10
                                        px-4
                                        py-3
                                        text-sm
                                        text-red-500
                                        dark:text-red-300
                                    "
                                >

                                    <XCircle
                                        size={18}
                                        className="shrink-0"
                                    />

                                    <span>
                                        {error}
                                    </span>

                                </div>

                            )}

                        </div>

                    )}


                    {/* =====================================================
                        FOOTER / GUARDAR
                    ===================================================== */}

                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            border-t
                            border-[var(--nexus-border)]
                            px-5
                            py-5
                            sm:flex-row
                            sm:items-center
                            sm:justify-end
                            sm:px-7
                        "
                    >

                        <button
                            type="submit"
                            disabled={guardando}
                            className="
                                inline-flex
                                h-11
                                items-center
                                justify-center
                                gap-2
                                rounded-xl
                                bg-violet-600
                                px-5
                                text-sm
                                font-semibold
                                text-white
                                shadow-lg
                                shadow-violet-900/20
                                transition
                                hover:bg-violet-500
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {guardando ? (

                                <>
                                    <span
                                        className="
                                            h-4
                                            w-4
                                            animate-spin
                                            rounded-full
                                            border-2
                                            border-white/30
                                            border-t-white
                                        "
                                    />

                                    Guardando...

                                </>

                            ) : (

                                <>
                                    <Save
                                        size={17}
                                    />

                                    Guardar cambios

                                </>

                            )}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}
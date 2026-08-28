import {
    Bell,
    Search,
    ChevronDown,
    Users,
    Clock,
    ArrowRight,
    X,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import { useAuth } from "../../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

import api from "../../api/axios";


/*
|--------------------------------------------------------------------------
| TIPOS
|--------------------------------------------------------------------------
*/

interface Notificacion {

    id: number;

    grupo_id: number;

    grupo: string;

    materia: string;

    user_id: number;

    alumno: string;

    fecha: string;

}


interface NotificacionesResponse {

    total: number;

    notificaciones: Notificacion[];

}


/*
|--------------------------------------------------------------------------
| TOPBAR
|--------------------------------------------------------------------------
*/

export default function Topbar() {

    const { user } = useAuth();


    /*
    |--------------------------------------------------------------------------
    | ESTADO DE NOTIFICACIONES
    |--------------------------------------------------------------------------
    */

    const [
        notificaciones,
        setNotificaciones,
    ] = useState<Notificacion[]>([]);


    const [
        mostrarNotificaciones,
        setMostrarNotificaciones,
    ] = useState(false);


    const [
        cargandoNotificaciones,
        setCargandoNotificaciones,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | REFERENCIA DEL PANEL
    |--------------------------------------------------------------------------
    */

    const notificacionesRef =
        useRef<HTMLDivElement | null>(
            null
        );


    /*
    |--------------------------------------------------------------------------
    | NOMBRE COMPLETO
    |--------------------------------------------------------------------------
    */

    const nombreCompleto = [

        user?.nombre,

        user?.apellido_paterno,

    ]
        .filter(Boolean)
        .join(" ");


    /*
    |--------------------------------------------------------------------------
    | INICIALES DEL USUARIO
    |--------------------------------------------------------------------------
    */

    const inicial =
        user?.nombre
            ?.charAt(0)
            ?.toUpperCase() || "D";


    /*
    |--------------------------------------------------------------------------
    | OBTENER NOTIFICACIONES
    |--------------------------------------------------------------------------
    */

    const cargarNotificaciones =
        async () => {

            try {

                setCargandoNotificaciones(
                    true
                );


                const response =
                    await api.get<NotificacionesResponse>(
                        "/notificaciones/docente"
                    );


                console.log(
                    "🔔 Notificaciones del docente:",
                    response.data
                );


                setNotificaciones(
                    Array.isArray(
                        response.data?.notificaciones
                    )
                        ? response.data.notificaciones
                        : []
                );


            } catch (error) {

                console.error(
                    "❌ Error al obtener notificaciones:",
                    error
                );


            } finally {

                setCargandoNotificaciones(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CARGAR AL INICIAR
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            user?.rol !==
            "docente"
        ) {

            return;

        }


        cargarNotificaciones();


        /*
        |--------------------------------------------------------------------------
        | ACTUALIZAR CADA 30 SEGUNDOS
        |--------------------------------------------------------------------------
        */

        const intervalo =
            window.setInterval(
                () => {

                    cargarNotificaciones();

                },
                30000
            );


        return () => {

            window.clearInterval(
                intervalo
            );

        };

    }, [
        user?.rol
    ]);


    /*
    |--------------------------------------------------------------------------
    | CERRAR AL HACER CLIC AFUERA
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const manejarClick =
            (event: MouseEvent) => {

                if (
                    notificacionesRef.current &&
                    !notificacionesRef.current.contains(
                        event.target as Node
                    )
                ) {

                    setMostrarNotificaciones(
                        false
                    );

                }

            };


        if (
            mostrarNotificaciones
        ) {

            document.addEventListener(
                "mousedown",
                manejarClick
            );

        }


        return () => {

            document.removeEventListener(
                "mousedown",
                manejarClick
            );

        };

    }, [
        mostrarNotificaciones
    ]);


    /*
    |--------------------------------------------------------------------------
    | FORMATEAR FECHA
    |--------------------------------------------------------------------------
    */

    const tiempoTranscurrido =
        (
            fecha: string
        ) => {

            const fechaSolicitud =
                new Date(
                    fecha
                );


            const ahora =
                new Date();


            const diferencia =
                Math.floor(
                    (
                        ahora.getTime() -
                        fechaSolicitud.getTime()
                    ) / 1000
                );


            if (
                diferencia <
                60
            ) {

                return "Hace unos segundos";

            }


            const minutos =
                Math.floor(
                    diferencia /
                    60
                );


            if (
                minutos <
                60
            ) {

                return `Hace ${
                    minutos
                } ${
                    minutos === 1
                        ? "minuto"
                        : "minutos"
                }`;

            }


            const horas =
                Math.floor(
                    minutos /
                    60
                );


            if (
                horas <
                24
            ) {

                return `Hace ${
                    horas
                } ${
                    horas === 1
                        ? "hora"
                        : "horas"
                }`;

            }


            const dias =
                Math.floor(
                    horas /
                    24
                );


            return `Hace ${
                dias
            } ${
                dias === 1
                    ? "día"
                    : "días"
            }`;

        };


    /*
    |--------------------------------------------------------------------------
    | ABRIR NOTIFICACIONES
    |--------------------------------------------------------------------------
    */

    const abrirNotificaciones =
        () => {

            setMostrarNotificaciones(
                (actual) =>
                    !actual
            );


            /*
            |--------------------------------------------------------------------------
            | ACTUALIZAR AL ABRIR
            |--------------------------------------------------------------------------
            */

            if (
                !mostrarNotificaciones
            ) {

                cargarNotificaciones();

            }

        };


    /*
    |--------------------------------------------------------------------------
    | IR A GRUPOS
    |--------------------------------------------------------------------------
    */

    const irAGrupos =
        () => {

            setMostrarNotificaciones(
                false
            );


            window.location.href =
                "/dashboard/docente/grupos";

        };


    return (

        <header
            className="
                h-20
                shrink-0
                px-6
                lg:px-8
                flex
                items-center
                justify-between
                bg-[var(--nexus-bg)]
                border-b
                border-[var(--nexus-border)]
                transition-colors
                duration-300
            "
        >

            {/* =========================================================
                BUSCADOR
            ========================================================= */}

            <div className="relative">

                <Search
                    size={18}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[var(--nexus-text-muted)]
                        pointer-events-none
                    "
                />


                <input
                    type="text"
                    placeholder="Buscar en ITS..."
                    className="
                        w-[260px]
                        lg:w-[360px]
                        h-11
                        rounded-xl
                        bg-[var(--nexus-surface)]
                        border
                        border-[var(--nexus-border)]
                        pl-11
                        pr-4
                        text-sm
                        text-[var(--nexus-text)]
                        placeholder:text-[var(--nexus-text-muted)]
                        outline-none
                        transition-all
                        duration-200
                        focus:border-violet-500/40
                        focus:ring-2
                        focus:ring-violet-500/10
                    "
                />

            </div>


            {/* =========================================================
                PARTE DERECHA
            ========================================================= */}

            <div
                className="
                    flex
                    items-center
                    gap-3
                    lg:gap-5
                "
            >

                {/* =====================================================
                    CAMBIO DE TEMA
                ===================================================== */}

                <ThemeToggle />


                {/* =====================================================
                    NOTIFICACIONES
                ===================================================== */}

                <div
                    ref={
                        notificacionesRef
                    }
                    className="
                        relative
                    "
                >

                    <button
                        type="button"
                        aria-label="Notificaciones"
                        onClick={
                            abrirNotificaciones
                        }
                        className="
                            relative
                            w-10
                            h-10
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            text-[var(--nexus-text-secondary)]
                            hover:text-[var(--nexus-text)]
                            hover:bg-black/5
                            dark:hover:bg-white/5
                            transition-all
                            duration-200
                        "
                    >

                        <Bell
                            size={20}
                        />


                        {/* =================================================
                            CONTADOR
                        ================================================= */}

                        {
                            notificaciones.length >
                            0
                                ? (
                                    <span
                                        className="
                                            absolute
                                            -top-1
                                            -right-1
                                            min-w-[19px]
                                            h-[19px]
                                            px-1
                                            rounded-full
                                            bg-violet-600
                                            text-white
                                            text-[10px]
                                            font-bold
                                            flex
                                            items-center
                                            justify-center
                                            border-2
                                            border-[var(--nexus-bg)]
                                            shadow-[0_0_12px_rgba(139,92,246,0.7)]
                                        "
                                    >

                                        {
                                            notificaciones.length >
                                            99
                                                ? "99+"
                                                : notificaciones.length
                                        }

                                    </span>
                                )
                                : null
                        }

                    </button>


                    {/* =====================================================
                        PANEL DE NOTIFICACIONES
                    ===================================================== */}

                    {
                        mostrarNotificaciones
                            ? (

                                <div
                                    className="
                                        absolute
                                        right-0
                                        top-14
                                        w-[380px]
                                        max-w-[calc(100vw-32px)]
                                        rounded-2xl
                                        bg-[var(--nexus-surface)]
                                        border
                                        border-[var(--nexus-border)]
                                        shadow-2xl
                                        overflow-hidden
                                        z-50
                                    "
                                >

                                    {/* =====================================
                                        ENCABEZADO
                                    ===================================== */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            px-5
                                            py-4
                                            border-b
                                            border-[var(--nexus-border)]
                                        "
                                    >

                                        <div>

                                            <h3
                                                className="
                                                    text-sm
                                                    font-bold
                                                    text-[var(--nexus-text)]
                                                "
                                            >

                                                Notificaciones

                                            </h3>


                                            <p
                                                className="
                                                    text-xs
                                                    text-[var(--nexus-text-muted)]
                                                    mt-0.5
                                                "
                                            >

                                                {
                                                    notificaciones.length
                                                }{" "}
                                                {
                                                    notificaciones.length === 1
                                                        ? "solicitud pendiente"
                                                        : "solicitudes pendientes"
                                                }

                                            </p>

                                        </div>


                                        <button
                                            type="button"
                                            onClick={() =>
                                                setMostrarNotificaciones(
                                                    false
                                                )
                                            }
                                            className="
                                                w-8
                                                h-8
                                                rounded-lg
                                                flex
                                                items-center
                                                justify-center
                                                text-[var(--nexus-text-muted)]
                                                hover:text-[var(--nexus-text)]
                                                hover:bg-black/5
                                                dark:hover:bg-white/5
                                                transition-all
                                            "
                                        >

                                            <X
                                                size={16}
                                            />

                                        </button>

                                    </div>


                                    {/* =====================================
                                        CONTENIDO
                                    ===================================== */}

                                    <div
                                        className="
                                            max-h-[390px]
                                            overflow-y-auto
                                        "
                                    >

                                        {
                                            cargandoNotificaciones &&
                                            notificaciones.length === 0
                                                ? (

                                                    <div
                                                        className="
                                                            py-12
                                                            flex
                                                            flex-col
                                                            items-center
                                                            justify-center
                                                            text-center
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                w-10
                                                                h-10
                                                                rounded-full
                                                                border-2
                                                                border-violet-500/20
                                                                border-t-violet-500
                                                                animate-spin
                                                            "
                                                        />

                                                        <p
                                                            className="
                                                                mt-3
                                                                text-xs
                                                                text-[var(--nexus-text-muted)]
                                                            "
                                                        >

                                                            Cargando solicitudes...

                                                        </p>

                                                    </div>

                                                )
                                                : notificaciones.length === 0
                                                    ? (

                                                        <div
                                                            className="
                                                                py-12
                                                                px-6
                                                                flex
                                                                flex-col
                                                                items-center
                                                                justify-center
                                                                text-center
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    w-14
                                                                    h-14
                                                                    rounded-2xl
                                                                    bg-violet-500/10
                                                                    text-violet-500
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                "
                                                            >

                                                                <Bell
                                                                    size={25}
                                                                />

                                                            </div>


                                                            <h4
                                                                className="
                                                                    mt-4
                                                                    text-sm
                                                                    font-semibold
                                                                    text-[var(--nexus-text)]
                                                                "
                                                            >

                                                                Todo al día

                                                            </h4>


                                                            <p
                                                                className="
                                                                    mt-1
                                                                    text-xs
                                                                    leading-5
                                                                    text-[var(--nexus-text-muted)]
                                                                "
                                                            >

                                                                No tienes solicitudes
                                                                pendientes por revisar.

                                                            </p>

                                                        </div>

                                                    )
                                                    : (

                                                        <div>

                                                            {
                                                                notificaciones.map(
                                                                    (
                                                                        notificacion
                                                                    ) => (

                                                                        <div
                                                                            key={
                                                                                notificacion.id
                                                                            }
                                                                            className="
                                                                                px-5
                                                                                py-4
                                                                                border-b
                                                                                border-[var(--nexus-border)]
                                                                                hover:bg-black/[0.025]
                                                                                dark:hover:bg-white/[0.025]
                                                                                transition-all
                                                                            "
                                                                        >

                                                                            <div
                                                                                className="
                                                                                    flex
                                                                                    gap-3
                                                                                "
                                                                            >

                                                                                {/* =================================
                                                                                    ICONO
                                                                                ================================= */}

                                                                                <div
                                                                                    className="
                                                                                        shrink-0
                                                                                        w-10
                                                                                        h-10
                                                                                        rounded-xl
                                                                                        bg-violet-500/10
                                                                                        text-violet-500
                                                                                        flex
                                                                                        items-center
                                                                                        justify-center
                                                                                    "
                                                                                >

                                                                                    <Users
                                                                                        size={18}
                                                                                    />

                                                                                </div>


                                                                                {/* =================================
                                                                                    INFORMACIÓN
                                                                                ================================= */}

                                                                                <div
                                                                                    className="
                                                                                        min-w-0
                                                                                        flex-1
                                                                                    "
                                                                                >

                                                                                    <p
                                                                                        className="
                                                                                            text-sm
                                                                                            font-semibold
                                                                                            text-[var(--nexus-text)]
                                                                                            truncate
                                                                                        "
                                                                                    >

                                                                                        {
                                                                                            notificacion.alumno
                                                                                        }

                                                                                    </p>


                                                                                    <p
                                                                                        className="
                                                                                            mt-1
                                                                                            text-xs
                                                                                            leading-5
                                                                                            text-[var(--nexus-text-secondary)]
                                                                                        "
                                                                                    >

                                                                                        Quiere
                                                                                        unirse
                                                                                        a{" "}

                                                                                        <span
                                                                                            className="
                                                                                                font-semibold
                                                                                                text-[var(--nexus-text)]
                                                                                            "
                                                                                        >

                                                                                            {
                                                                                                notificacion.grupo
                                                                                            }

                                                                                        </span>

                                                                                        {" · "}

                                                                                        {
                                                                                            notificacion.materia
                                                                                        }

                                                                                    </p>


                                                                                    <div
                                                                                        className="
                                                                                            mt-2
                                                                                            flex
                                                                                            items-center
                                                                                            gap-1.5
                                                                                            text-[10px]
                                                                                            text-[var(--nexus-text-muted)]
                                                                                        "
                                                                                    >

                                                                                        <Clock
                                                                                            size={12}
                                                                                        />

                                                                                        {
                                                                                            tiempoTranscurrido(
                                                                                                notificacion.fecha
                                                                                            )
                                                                                        }

                                                                                    </div>

                                                                                </div>

                                                                            </div>


                                                                            {/* =================================
                                                                                ACCIÓN
                                                                            ================================= */}

                                                                            <button
                                                                                type="button"
                                                                                onClick={
                                                                                    irAGrupos
                                                                                }
                                                                                className="
                                                                                    mt-3
                                                                                    w-full
                                                                                    h-9
                                                                                    rounded-lg
                                                                                    bg-violet-500/10
                                                                                    text-violet-500
                                                                                    hover:bg-violet-500/15
                                                                                    flex
                                                                                    items-center
                                                                                    justify-center
                                                                                    gap-2
                                                                                    text-xs
                                                                                    font-semibold
                                                                                    transition-all
                                                                                "
                                                                            >

                                                                                Ver solicitud

                                                                                <ArrowRight
                                                                                    size={14}
                                                                                />

                                                                            </button>

                                                                        </div>

                                                                    )
                                                                )
                                                            }

                                                        </div>

                                                    )

                                        }

                                    </div>


                                    {/* =====================================
                                        PIE
                                    ===================================== */}

                                    {
                                        notificaciones.length >
                                        0
                                            ? (

                                                <div
                                                    className="
                                                        px-5
                                                        py-3
                                                        border-t
                                                        border-[var(--nexus-border)]
                                                    "
                                                >

                                                    <button
                                                        type="button"
                                                        onClick={
                                                            irAGrupos
                                                        }
                                                        className="
                                                            w-full
                                                            flex
                                                            items-center
                                                            justify-center
                                                            gap-2
                                                            text-xs
                                                            font-semibold
                                                            text-violet-500
                                                            hover:text-violet-400
                                                            transition-colors
                                                        "
                                                    >

                                                        Ver todas las solicitudes

                                                        <ArrowRight
                                                            size={14}
                                                        />

                                                    </button>

                                                </div>

                                            )
                                            : null
                                    }

                                </div>

                            )
                            : null
                    }

                </div>


                {/* =====================================================
                    SEPARADOR
                ===================================================== */}

                <div
                    className="
                        h-8
                        w-px
                        bg-[var(--nexus-border)]
                    "
                />


                {/* =====================================================
                    USUARIO
                ===================================================== */}

                <button
                    type="button"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-2
                        py-1.5
                        hover:bg-black/5
                        dark:hover:bg-white/5
                        transition-all
                        duration-200
                    "
                >

                    {/* =================================================
                        AVATAR
                    ================================================= */}

                    <div
                        className="
                            w-10
                            h-10
                            rounded-full
                            bg-gradient-to-br
                            from-violet-600
                            to-blue-600
                            flex
                            items-center
                            justify-center
                            text-white
                            font-bold
                            shadow-[0_0_20px_rgba(124,58,237,0.2)]
                            shrink-0
                        "
                    >

                        {inicial}

                    </div>


                    {/* =================================================
                        INFORMACIÓN DEL USUARIO
                    ================================================= */}

                    <div
                        className="
                            text-left
                            hidden
                            sm:block
                            max-w-[180px]
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-semibold
                                text-[var(--nexus-text)]
                                truncate
                            "
                        >

                            {
                                nombreCompleto ||
                                "Docente"
                            }

                        </p>


                        <p
                            className="
                                text-xs
                                text-[var(--nexus-text-muted)]
                                mt-0.5
                            "
                        >

                            Docente

                        </p>

                    </div>


                    {/* =================================================
                        FLECHA
                    ================================================= */}

                    <ChevronDown
                        size={16}
                        className="
                            text-[var(--nexus-text-muted)]
                            shrink-0
                        "
                    />

                </button>

            </div>

        </header>

    );

}
import {
    Bot,
    Send,
    X,
    Sparkles,
    User,
    Loader2,
    Trash2,
} from "lucide-react";

import {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    preguntarChatbotRequest,
} from "../../api/chatbot";


interface Mensaje {
    id: number;
    tipo: "usuario" | "bot";
    texto: string;
}


interface ChatbotAlumnoProps {
    materia?: string;
}


export default function ChatbotAlumno({
    materia,
}: ChatbotAlumnoProps) {

    /*
    |--------------------------------------------------------------------------
    | ESTADOS
    |--------------------------------------------------------------------------
    */

    const [
        abierto,
        setAbierto,
    ] = useState(false);


    const [
        mensaje,
        setMensaje,
    ] = useState("");


    const [
        enviando,
        setEnviando,
    ] = useState(false);


    const [
        mensajes,
        setMensajes,
    ] = useState<Mensaje[]>([]);


    /*
    |--------------------------------------------------------------------------
    | REFERENCIA DEL CONTENEDOR DE MENSAJES
    |--------------------------------------------------------------------------
    */

    const mensajesRef =
        useRef<HTMLDivElement | null>(null);


    /*
    |--------------------------------------------------------------------------
    | MENSAJE INICIAL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            abierto &&
            mensajes.length === 0
        ) {

            setMensajes([

                {
                    id: Date.now(),
                    tipo: "bot",
                    texto:
                        "¡Hola! 👋 Soy el asistente de NEXUS. ¿En qué tema académico puedo ayudarte?",
                },

            ]);

        }

    }, [
        abierto,
        mensajes.length,
    ]);


    /*
    |--------------------------------------------------------------------------
    | SCROLL AUTOMÁTICO
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (mensajesRef.current) {

            mensajesRef.current.scrollTop =
                mensajesRef.current.scrollHeight;

        }

    }, [
        mensajes,
        enviando,
    ]);


    /*
    |--------------------------------------------------------------------------
    | ENVIAR MENSAJE
    |--------------------------------------------------------------------------
    */

    const enviarMensaje =
        async () => {

            const texto =
                mensaje.trim();


            if (
                !texto ||
                enviando
            ) {

                return;

            }


            /*
            |--------------------------------------------------------------------------
            | MENSAJE DEL ALUMNO
            |--------------------------------------------------------------------------
            */

            const mensajeUsuario: Mensaje = {

                id:
                    Date.now(),

                tipo:
                    "usuario",

                texto,

            };


            setMensajes(
                anteriores => [
                    ...anteriores,
                    mensajeUsuario,
                ]
            );


            setMensaje("");


            setEnviando(true);


            try {

                /*
                |--------------------------------------------------------------------------
                | PETICIÓN AL BACKEND
                |--------------------------------------------------------------------------
                */

                const respuesta =
                    await preguntarChatbotRequest({

                        mensaje:
                            texto,

                        materia:
                            materia ||
                            undefined,

                    });


                /*
                |--------------------------------------------------------------------------
                | RESPUESTA DEL CHATBOT
                |--------------------------------------------------------------------------
                */

                const mensajeBot: Mensaje = {

                    id:
                        Date.now() + 1,

                    tipo:
                        "bot",

                    texto:
                        respuesta.respuesta ||
                        "No pude generar una respuesta.",

                };


                setMensajes(
                    anteriores => [
                        ...anteriores,
                        mensajeBot,
                    ]
                );


            } catch (error) {

                console.error(
                    "❌ Error en chatbot:",
                    error
                );


                setMensajes(
                    anteriores => [

                        ...anteriores,

                        {

                            id:
                                Date.now() + 1,

                            tipo:
                                "bot",

                            texto:
                                "Lo siento 😕. No pude conectarme con el asistente en este momento. Intenta nuevamente.",

                        },

                    ]
                );


            } finally {

                setEnviando(false);

            }

        };


    /*
    |--------------------------------------------------------------------------
    | ENTER PARA ENVIAR
    |--------------------------------------------------------------------------
    */

    const manejarTecla =
        (
            event:
                React.KeyboardEvent<HTMLInputElement>
        ) => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                enviarMensaje();

            }

        };


    /*
    |--------------------------------------------------------------------------
    | LIMPIAR CONVERSACIÓN
    |--------------------------------------------------------------------------
    */

    const limpiarConversacion =
        () => {

            setMensajes([]);

        };


    return (

        <>

            {/* =====================================================
                VENTANA DEL CHAT
            ===================================================== */}

            {abierto && (

                <div
                    className="
                        fixed
                        right-5
                        bottom-24
                        z-[500]
                        w-[360px]
                        max-w-[calc(100vw-32px)]
                        h-[520px]
                        max-h-[calc(100vh-120px)]
                        flex
                        flex-col
                        overflow-hidden
                        rounded-3xl
                        bg-[#080912]/95
                        backdrop-blur-2xl
                        border
                        border-violet-500/20
                        shadow-[0_25px_90px_rgba(0,0,0,0.65)]
                    "
                >

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div
                        className="
                            shrink-0
                            px-5
                            py-4
                            flex
                            items-center
                            justify-between
                            border-b
                            border-white/[0.07]
                            bg-gradient-to-r
                            from-violet-600/10
                            to-indigo-600/10
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
                                    relative
                                    w-11
                                    h-11
                                    rounded-2xl
                                    flex
                                    items-center
                                    justify-center
                                    bg-gradient-to-br
                                    from-violet-600
                                    to-indigo-600
                                    shadow-[0_0_25px_rgba(139,92,246,0.35)]
                                "
                            >

                                <Bot
                                    size={22}
                                    className="
                                        text-white
                                    "
                                />


                                <span
                                    className="
                                        absolute
                                        right-0
                                        bottom-0
                                        w-3
                                        h-3
                                        rounded-full
                                        bg-emerald-400
                                        border-2
                                        border-[#080912]
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

                                    <p
                                        className="
                                            text-sm
                                            font-bold
                                            text-white
                                        "
                                    >

                                        Asistente NEXUS

                                    </p>


                                    <Sparkles
                                        size={14}
                                        className="
                                            text-violet-400
                                        "
                                    />

                                </div>


                                <p
                                    className="
                                        mt-0.5
                                        text-[11px]
                                        text-slate-500
                                    "
                                >

                                    Tutor académico con IA

                                </p>


                                {materia && (

                                    <p
                                        className="
                                            mt-1
                                            text-[10px]
                                            text-violet-300
                                        "
                                    >

                                        Materia: {materia}

                                    </p>

                                )}

                            </div>

                        </div>


                        {/* =================================================
                            BOTONES HEADER
                        ================================================= */}

                        <div
                            className="
                                flex
                                items-center
                                gap-1
                            "
                        >

                            <button
                                type="button"
                                onClick={
                                    limpiarConversacion
                                }
                                title="Limpiar conversación"
                                className="
                                    w-9
                                    h-9
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-slate-500
                                    hover:text-white
                                    hover:bg-white/[0.06]
                                    transition-all
                                "
                            >

                                <Trash2
                                    size={16}
                                />

                            </button>


                            <button
                                type="button"
                                onClick={() =>
                                    setAbierto(
                                        false
                                    )
                                }
                                title="Cerrar"
                                className="
                                    w-9
                                    h-9
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    text-slate-500
                                    hover:text-white
                                    hover:bg-white/[0.06]
                                    transition-all
                                "
                            >

                                <X
                                    size={18}
                                />

                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        MENSAJES
                    ================================================= */}

                    <div
                        ref={mensajesRef}
                        className="
                            flex-1
                            min-h-0
                            overflow-y-auto
                            px-4
                            py-5
                            space-y-4
                            scrollbar-thin
                            scrollbar-thumb-white/10
                            scrollbar-track-transparent
                        "
                    >

                        {mensajes.map(
                            (item) => (

                                <div
                                    key={
                                        item.id
                                    }
                                    className={`
                                        flex
                                        ${
                                            item.tipo ===
                                            "usuario"
                                                ? "justify-end"
                                                : "justify-start"
                                        }
                                    `}
                                >

                                    <div
                                        className={`
                                            flex
                                            items-end
                                            gap-2
                                            max-w-[88%]
                                            ${
                                                item.tipo ===
                                                "usuario"
                                                    ? "flex-row-reverse"
                                                    : "flex-row"
                                            }
                                        `}
                                    >

                                        {/* AVATAR */}

                                        <div
                                            className={`
                                                shrink-0
                                                w-7
                                                h-7
                                                rounded-lg
                                                flex
                                                items-center
                                                justify-center
                                                ${
                                                    item.tipo ===
                                                    "usuario"
                                                        ? "bg-indigo-600/20 text-indigo-300"
                                                        : "bg-violet-600/20 text-violet-300"
                                                }
                                            `}
                                        >

                                            {item.tipo ===
                                            "usuario" ? (

                                                <User
                                                    size={14}
                                                />

                                            ) : (

                                                <Bot
                                                    size={14}
                                                />

                                            )}

                                        </div>


                                        {/* BURBUJA */}

                                        <div
                                            className={`
                                                rounded-2xl
                                                px-4
                                                py-3
                                                text-sm
                                                leading-relaxed
                                                whitespace-pre-wrap
                                                ${
                                                    item.tipo ===
                                                    "usuario"
                                                        ? "rounded-br-md bg-violet-600 text-white"
                                                        : "rounded-bl-md bg-white/[0.055] border border-white/[0.06] text-slate-300"
                                                }
                                            `}
                                        >

                                            {item.texto}

                                        </div>

                                    </div>

                                </div>

                            )
                        )}


                        {/* =================================================
                            INDICADOR ESCRIBIENDO
                        ================================================= */}

                        {enviando && (

                            <div
                                className="
                                    flex
                                    justify-start
                                "
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
                                            w-7
                                            h-7
                                            rounded-lg
                                            flex
                                            items-center
                                            justify-center
                                            bg-violet-600/20
                                            text-violet-300
                                        "
                                    >

                                        <Bot
                                            size={14}
                                        />

                                    </div>


                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            rounded-2xl
                                            rounded-bl-md
                                            px-4
                                            py-3
                                            bg-white/[0.055]
                                            border
                                            border-white/[0.06]
                                            text-slate-500
                                        "
                                    >

                                        <Loader2
                                            size={15}
                                            className="
                                                animate-spin
                                            "
                                        />

                                        <span
                                            className="
                                                text-xs
                                            "
                                        >

                                            NEXUS está pensando...

                                        </span>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* =================================================
                        INPUT
                    ================================================= */}

                    <div
                        className="
                            shrink-0
                            p-4
                            border-t
                            border-white/[0.07]
                            bg-black/10
                        "
                    >

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                rounded-2xl
                                bg-white/[0.04]
                                border
                                border-white/[0.07]
                                p-1.5
                                focus-within:border-violet-500/40
                                focus-within:ring-2
                                focus-within:ring-violet-500/10
                                transition-all
                            "
                        >

                            <input
                                type="text"
                                value={
                                    mensaje
                                }
                                onChange={
                                    event =>
                                        setMensaje(
                                            event.target.value
                                        )
                                }
                                onKeyDown={
                                    manejarTecla
                                }
                                disabled={
                                    enviando
                                }
                                placeholder={
                                    materia
                                        ? `Pregunta sobre ${materia}...`
                                        : "Escribe tu pregunta..."
                                }
                                className="
                                    flex-1
                                    min-w-0
                                    h-10
                                    bg-transparent
                                    px-3
                                    text-sm
                                    text-white
                                    placeholder:text-slate-600
                                    outline-none
                                    disabled:opacity-50
                                "
                            />


                            <button
                                type="button"
                                onClick={
                                    enviarMensaje
                                }
                                disabled={
                                    enviando ||
                                    !mensaje.trim()
                                }
                                className="
                                    shrink-0
                                    w-10
                                    h-10
                                    rounded-xl
                                    flex
                                    items-center
                                    justify-center
                                    bg-violet-600
                                    text-white
                                    shadow-[0_0_20px_rgba(139,92,246,0.2)]
                                    hover:bg-violet-500
                                    disabled:opacity-30
                                    disabled:cursor-not-allowed
                                    transition-all
                                "
                            >

                                {enviando ? (

                                    <Loader2
                                        size={17}
                                        className="
                                            animate-spin
                                        "
                                    />

                                ) : (

                                    <Send
                                        size={17}
                                    />

                                )}

                            </button>

                        </div>


                        <p
                            className="
                                mt-2
                                text-center
                                text-[9px]
                                text-slate-700
                            "
                        >

                            NEXUS puede cometer errores.
                            Verifica información importante.

                        </p>

                    </div>

                </div>

            )}


            {/* =====================================================
                BOTÓN FLOTANTE
            ===================================================== */}

            <button
                type="button"
                onClick={() =>
                    setAbierto(
                        !abierto
                    )
                }
                title={
                    abierto
                        ? "Cerrar asistente"
                        : "Abrir asistente NEXUS"
                }
                className="
                    fixed
                    right-5
                    bottom-5
                    z-[500]
                    w-16
                    h-16
                    rounded-full
                    flex
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-violet-600
                    via-purple-600
                    to-indigo-600
                    text-white
                    border
                    border-white/10
                    shadow-[0_0_35px_rgba(139,92,246,0.45)]
                    hover:scale-105
                    hover:shadow-[0_0_45px_rgba(139,92,246,0.6)]
                    active:scale-95
                    transition-all
                    duration-200
                "
            >

                {abierto ? (

                    <X
                        size={25}
                    />

                ) : (

                    <Bot
                        size={27}
                    />

                )}


                {/* INDICADOR */}

                {!abierto && (

                    <span
                        className="
                            absolute
                            top-0
                            right-0
                            w-4
                            h-4
                            rounded-full
                            bg-emerald-400
                            border-[3px]
                            border-[#02030A]
                            shadow-[0_0_12px_rgba(52,211,153,0.7)]
                        "
                    />

                )}

            </button>

        </>

    );

}
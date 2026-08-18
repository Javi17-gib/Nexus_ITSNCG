import { motion } from "framer-motion";

import {
    BookOpen,
    Lock,
    Calculator,
    Code2,
    Database,
    Atom,
    Sigma,
    Brain,
    Cpu,
    FlaskConical,
    Globe,
    GraduationCap,
    Laptop,
    FileCode2,
    Server,
    Network,
    BookMarked,
    BarChart3,
    Terminal,
    Braces,
} from "lucide-react";


interface MateriaNodeProps {

    nombre: string;

    color: string;

    icono?: string;

    unidades?: number;

    x: number;

    y: number;

    activa?: boolean;

    bloqueada?: boolean;

    onClick?: () => void;

}


/*
|--------------------------------------------------------------------------
| ICONOS
|--------------------------------------------------------------------------
*/

const iconos: Record<
    string,
    React.ComponentType<{
        size?: number;
        className?: string;
    }>
> = {

    calculator: Calculator,
    Calculator: Calculator,

    code: Code2,
    Code: Code2,
    Code2: Code2,

    database: Database,
    Database: Database,

    atom: Atom,
    Atom: Atom,

    sigma: Sigma,
    Sigma: Sigma,

    brain: Brain,
    Brain: Brain,

    cpu: Cpu,
    Cpu: Cpu,

    flask: FlaskConical,
    Flask: FlaskConical,

    globe: Globe,
    Globe: Globe,

    graduation: GraduationCap,
    GraduationCap: GraduationCap,

    laptop: Laptop,
    Laptop: Laptop,

    filecode: FileCode2,
    FileCode2: FileCode2,

    server: Server,
    Server: Server,

    network: Network,
    Network: Network,

    book: BookOpen,
    BookOpen: BookOpen,

    bookmark: BookMarked,
    BookMarked: BookMarked,

    chart: BarChart3,
    BarChart3: BarChart3,

    terminal: Terminal,
    Terminal: Terminal,

    braces: Braces,
    Braces: Braces,

};


/*
|--------------------------------------------------------------------------
| OBTENER ICONO
|--------------------------------------------------------------------------
*/

function obtenerIcono(
    icono?: string
) {

    if (!icono) {

        return BookOpen;

    }


    const nombreIcono =
        icono.trim();


    return (
        iconos[nombreIcono] ||
        BookOpen
    );

}


/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function MateriaNode({

    nombre,

    color,

    icono,

    unidades = 0,

    x,

    y,

    bloqueada = false,

    onClick,

}: MateriaNodeProps) {


    const Icono =
        obtenerIcono(icono);


    return (

        <motion.button

            type="button"

            onClick={
                bloqueada
                    ? undefined
                    : onClick
            }

          className="
    absolute
    z-30
    group-hover:z-[200]
    -translate-x-1/2
    -translate-y-1/2
    group
    text-left
    outline-none
"

            style={{

                left: "50%",

                top: "50%",

                x,

                y,

            }}

            initial={{

                opacity: 0,

                scale: 0.55,

            }}

            animate={{

                opacity: 1,

                scale: 1,

            }}

            transition={{

                duration: 0.7,

                ease: "easeOut",

            }}

            whileHover={
                bloqueada
                    ? {}
                    : {

                        scale: 1.1,

                    }
            }

            whileTap={
                bloqueada
                    ? {}
                    : {

                        scale: 0.96,

                    }
            }

        >

            {/* =====================================================
                AURA EXTERIOR
            ===================================================== */}

            <motion.div

                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-36
                    h-36
                    rounded-full
                    pointer-events-none
                    blur-3xl
                "

                style={{

                    backgroundColor:
                        color,

                    opacity:
                        bloqueada
                            ? 0.025
                            : 0.08,

                }}

                animate={
                    bloqueada
                        ? {}
                        : {

                            scale: [
                                0.9,
                                1.15,
                                0.9,
                            ],

                            opacity: [
                                0.05,
                                0.1,
                                0.05,
                            ],

                        }
                }

                transition={{

                    duration: 4,

                    repeat: Infinity,

                    ease: "easeInOut",

                }}

            />


            {/* =====================================================
                ÓRBITA EXTERIOR
            ===================================================== */}

            <motion.div

                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[104px]
                    h-[58px]
                    rounded-[50%]
                    border
                    pointer-events-none
                "

                style={{

                    borderColor:
                        bloqueada
                            ? "rgba(148,163,184,0.05)"
                            : `${color}25`,

                }}

                animate={
                    bloqueada
                        ? {}
                        : {

                            rotate: 360,

                        }
                }

                transition={{

                    duration: 14,

                    repeat: Infinity,

                    ease: "linear",

                }}

            >

                {/* PARTÍCULA ORBITAL */}

                {!bloqueada && (

                    <span

                        className="
                            absolute
                            -top-1
                            left-1/2
                            w-2
                            h-2
                            rounded-full
                        "

                        style={{

                            backgroundColor:
                                color,

                            boxShadow:
                                `0 0 10px ${color}`,

                        }}

                    />

                )}

            </motion.div>


            {/* =====================================================
                ÓRBITA INTERIOR
            ===================================================== */}

            <motion.div

                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[88px]
                    h-[42px]
                    rounded-[50%]
                    border
                    border-dashed
                    pointer-events-none
                "

                style={{

                    borderColor:
                        bloqueada
                            ? "rgba(148,163,184,0.04)"
                            : `${color}18`,

                }}

                animate={
                    bloqueada
                        ? {}
                        : {

                            rotate: -360,

                        }
                }

                transition={{

                    duration: 10,

                    repeat: Infinity,

                    ease: "linear",

                }}

            />


            {/* =====================================================
                PLANETA / NÚCLEO
            ===================================================== */}

            <div

                className="
                    relative
                    w-[68px]
                    h-[68px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    overflow-hidden
                    transition-all
                    duration-300
                "

                style={{

                    background:

                        bloqueada

                            ? "rgba(15,23,42,0.75)"

                            : `
                                radial-gradient(
                                    circle at 35% 30%,
                                    ${color}65 0%,
                                    ${color}25 32%,
                                    rgba(8,12,25,0.95) 78%
                                )
                            `,

                    borderColor:

                        bloqueada

                            ? "rgba(148,163,184,0.15)"

                            : `${color}85`,

                    boxShadow:

                        bloqueada

                            ? "none"

                            : `
                                0 0 18px ${color}35,
                                0 0 45px ${color}18,
                                inset 0 0 20px ${color}20
                            `,

                }}

            >

                {/* =================================================
                    REFLEJO DEL PLANETA
                ================================================= */}

                {!bloqueada && (

                    <div

                        className="
                            absolute
                            -top-3
                            -left-3
                            w-9
                            h-9
                            rounded-full
                            bg-white/20
                            blur-md
                            pointer-events-none
                        "

                    />

                )}


                {/* =================================================
                    TEXTURA INTERIOR
                ================================================= */}

                {!bloqueada && (

                    <div

                        className="
                            absolute
                            inset-2
                            rounded-full
                            border
                            border-white/5
                            pointer-events-none
                        "

                    />

                )}


                {/* =================================================
                    ICONO
                ================================================= */}

                {bloqueada ? (

                    <Lock

                        size={20}

                        className="
                            relative
                            z-20
                            text-slate-500
                        "

                    />

                ) : (

                    <Icono

                        size={23}

                        strokeWidth={1.8}

                        className="
                            relative
                            z-20
                            text-white
                            drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]
                        "

                    />

                )}

            </div>


            {/* =====================================================
                PULSO DEL PLANETA
            ===================================================== */}

            {!bloqueada && (

                <motion.div

                    className="
                        absolute
                        left-1/2
                        top-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        w-[68px]
                        h-[68px]
                        rounded-full
                        border
                        pointer-events-none
                    "

                    style={{

                        borderColor:
                            `${color}50`,

                    }}

                    animate={{

                        scale: [
                            1,
                            1.28,
                            1,
                        ],

                        opacity: [
                            0.45,
                            0,
                            0.45,
                        ],

                    }}

                    transition={{

                        duration: 3,

                        repeat: Infinity,

                        ease: "easeOut",

                    }}

                />

            )}


            {/* =====================================================
                INFORMACIÓN
            ===================================================== */}

            <div

                className="
                    absolute
                    left-1/2
                    top-[91px]
                    -translate-x-1/2
                    w-48
                    text-center
                    pointer-events-none
                "

            >

                {/* NOMBRE */}

                <p

                    className="
                        text-sm
                        font-semibold
                        text-white
                        whitespace-nowrap
                        overflow-hidden
                        text-ellipsis
                        drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]
                    "

                >

                    {nombre}

                </p>


                {/* UNIDADES */}

                <div

                    className="
                        mt-1
                        flex
                        items-center
                        justify-center
                    "

                >

                    <span

                        className="
                            inline-flex
                            items-center
                            gap-1.5
                            px-2.5
                            py-1
                            rounded-full
                            bg-black/25
                            border
                            text-[10px]
                            font-medium
                            backdrop-blur-sm
                        "

                        style={{

                            color:
                                bloqueada
                                    ? "#64748b"
                                    : color,

                            borderColor:
                                bloqueada
                                    ? "rgba(148,163,184,0.08)"
                                    : `${color}20`,

                        }}

                    >

                        <BookOpen
                            size={10}
                        />

                        {unidades}

                        {unidades === 1
                            ? "unidad"
                            : "unidades"}

                    </span>

                </div>

            </div>


            {/* =====================================================
                TOOLTIP
            ===================================================== */}

            {!bloqueada && (

                <div
    className="
        absolute
        left-[82px]
        top-1/2
        -translate-y-1/2
        opacity-0
        -translate-x-2
        group-hover:opacity-100
        group-hover:translate-x-0
        transition-all
        duration-200
        pointer-events-none
        whitespace-nowrap
        z-50
    "
>

                    <div

                        className="
                            rounded-xl
                            bg-[#080B18]/95
                            border
                            border-white/10
                            px-4
                            py-2.5
                            shadow-[0_10px_40px_rgba(0,0,0,0.45)]
                            backdrop-blur-xl
                        "

                    >

                        <p

                            className="
                                text-xs
                                font-semibold
                                text-white
                            "

                        >

                            Explorar {nombre}

                        </p>


                        <p

                            className="
                                mt-0.5
                                text-[10px]
                                text-slate-500
                            "

                        >

                            {unidades}{" "}
                            {unidades === 1
                                ? "unidad disponible"
                                : "unidades disponibles"}

                        </p>

                    </div>

                </div>

            )}

        </motion.button>

    );

}
import { motion } from "framer-motion";

interface Connection {
    x: number;
    y: number;
    color?: string;
}

interface NexusConnectionsProps {
    connections: Connection[];
}

export default function NexusConnections({
    connections,
}: NexusConnectionsProps) {

    return (

        <div
            className="
                absolute
                inset-0
                pointer-events-none
                overflow-visible
                z-10
            "
        >

            {connections.map(
                (connection, index) => {

                    const {
                        x,
                        y,
                        color = "#8B5CF6",
                    } = connection;


                    /*
                    |--------------------------------------------------------------------------
                    | DISTANCIA
                    |--------------------------------------------------------------------------
                    */

                    const distance =
                        Math.sqrt(
                            x * x +
                            y * y
                        );


                    /*
                    |--------------------------------------------------------------------------
                    | ÁNGULO
                    |--------------------------------------------------------------------------
                    */

                    const angle =
                        Math.atan2(
                            y,
                            x
                        ) *
                        (180 / Math.PI);


                    return (

                        <div
                            key={index}

                            className="
                                absolute
                                left-1/2
                                top-1/2
                                h-px
                                origin-left
                            "

                            style={{

                                width:
                                    `${distance}px`,

                                transform:
                                    `rotate(${angle}deg)`,

                            }}
                        >

                            {/* =================================================
                                LÍNEA PRINCIPAL
                            ================================================= */}

                            <div
                                className="
                                    absolute
                                    inset-0
                                    h-px
                                "

                                style={{

                                    background:
                                        `linear-gradient(
                                            90deg,
                                            ${color}45 0%,
                                            ${color}18 55%,
                                            transparent 100%
                                        )`,

                                }}
                            />


                            {/* =================================================
                                GLOW
                            ================================================= */}

                            <div
                                className="
                                    absolute
                                    left-0
                                    right-0
                                    top-1/2
                                    h-3
                                    -translate-y-1/2
                                    blur-md
                                "

                                style={{

                                    background:
                                        `linear-gradient(
                                            90deg,
                                            ${color}18,
                                            transparent
                                        )`,

                                }}
                            />


                            {/* =================================================
                                PARTÍCULA VIAJANDO
                            ================================================= */}

                            <motion.div

                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    -translate-y-1/2
                                    w-1.5
                                    h-1.5
                                    rounded-full
                                "

                                style={{

                                    backgroundColor:
                                        color,

                                    boxShadow:
                                        `
                                        0 0 6px ${color},
                                        0 0 14px ${color},
                                        0 0 22px ${color}
                                        `,

                                }}

                                animate={{

                                    x: [
                                        0,
                                        distance * 0.35,
                                        distance * 0.72,
                                        distance,
                                    ],

                                    opacity: [
                                        0,
                                        1,
                                        1,
                                        0,
                                    ],

                                    scale: [
                                        0.6,
                                        1,
                                        1,
                                        0.6,
                                    ],

                                }}

                                transition={{

                                    duration:
                                        3.5 +

                                        index *
                                        0.35,

                                    repeat:
                                        Infinity,

                                    ease:
                                        "easeInOut",

                                    delay:
                                        index *
                                        0.7,

                                }}

                            />


                            {/* =================================================
                                SEGUNDA PARTÍCULA
                            ================================================= */}

                            <motion.div

                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    -translate-y-1/2
                                    w-1
                                    h-1
                                    rounded-full
                                "

                                style={{

                                    backgroundColor:
                                        color,

                                    boxShadow:
                                        `0 0 10px ${color}`,

                                }}

                                animate={{

                                    x: [
                                        distance * 0.1,
                                        distance * 0.55,
                                        distance * 0.95,
                                    ],

                                    opacity: [
                                        0,
                                        0.7,
                                        0,
                                    ],

                                }}

                                transition={{

                                    duration:
                                        4.5 +

                                        index *
                                        0.25,

                                    repeat:
                                        Infinity,

                                    ease:
                                        "linear",

                                    delay:
                                        1.5 +
                                        index *
                                        0.8,

                                }}

                            />

                        </div>

                    );

                }

            )}

        </div>

    );

}
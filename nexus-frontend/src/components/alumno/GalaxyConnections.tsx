import { motion } from "framer-motion";

interface Connection {
    id: number;
    x: number;
    y: number;
    color: string;
}

const connections: Connection[] = [
    {
        id: 1,
        x: -310,
        y: -145,
        color: "#8B5CF6",
    },
    {
        id: 2,
        x: 0,
        y: -250,
        color: "#3B82F6",
    },
    {
        id: 3,
        x: 310,
        y: -145,
        color: "#F97316",
    },
    {
        id: 4,
        x: -330,
        y: 120,
        color: "#22C55E",
    },
    {
        id: 5,
        x: 330,
        y: 100,
        color: "#06B6D4",
    },
    {
        id: 6,
        x: 0,
        y: 280,
        color: "#A855F7",
    },
];


export default function GalaxyConnections() {

    return (

        <div
            className="
                absolute
                inset-0
                z-10
                pointer-events-none
                overflow-hidden
            "
        >

            {/* =====================================================
                CONEXIONES
            ===================================================== */}

            {connections.map((connection) => {

                const angle =
                    Math.atan2(
                        connection.y,
                        connection.x
                    ) *
                    (180 / Math.PI);

                const distance =
                    Math.sqrt(
                        connection.x *
                            connection.x +
                        connection.y *
                            connection.y
                    );


                return (

                    <div
                        key={connection.id}
                        className="
                            absolute
                            left-1/2
                            top-1/2
                            origin-left
                        "
                        style={{
                            width: `${distance}px`,
                            transform: `
                                rotate(${angle}deg)
                            `,
                        }}
                    >

                        {/* =================================================
                            LÍNEA BASE
                        ================================================= */}

                        <div
                            className="
                                absolute
                                left-0
                                top-1/2
                                -translate-y-1/2
                                w-full
                                h-px
                                opacity-40
                            "
                            style={{
                                background: `
                                    linear-gradient(
                                        90deg,
                                        rgba(139,92,246,0.05),
                                        ${connection.color},
                                        transparent
                                    )
                                `,
                                boxShadow:
                                    `0 0 8px ${connection.color}`,
                            }}
                        />


                        {/* =================================================
                            LÍNEA PULSANTE
                        ================================================= */}

                        <motion.div
                            className="
                                absolute
                                left-0
                                top-1/2
                                -translate-y-1/2
                                h-[2px]
                                rounded-full
                            "
                            style={{
                                width: "80px",
                                background:
                                    `linear-gradient(
                                        90deg,
                                        transparent,
                                        ${connection.color},
                                        transparent
                                    )`,
                                boxShadow:
                                    `0 0 12px ${connection.color}`,
                            }}
                            animate={{
                                x: [
                                    -80,
                                    distance,
                                ],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                                delay:
                                    connection.id *
                                    0.35,
                            }}
                        />

                    </div>

                );

            })}


            {/* =====================================================
                PEQUEÑOS NODOS INTERMEDIOS
            ===================================================== */}

            {connections.map((connection) => (

                <motion.div
                    key={`node-${connection.id}`}
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        w-2
                        h-2
                        rounded-full
                    "
                    style={{
                        marginLeft:
                            connection.x - 4,

                        marginTop:
                            connection.y - 4,

                        background:
                            connection.color,

                        boxShadow:
                            `0 0 12px ${connection.color}`,
                    }}
                    animate={{
                        opacity: [
                            0.25,
                            1,
                            0.25,
                        ],
                        scale: [
                            0.8,
                            1.2,
                            0.8,
                        ],
                    }}
                    transition={{
                        duration:
                            2.5 +
                            connection.id *
                            0.2,

                        repeat: Infinity,

                        ease: "easeInOut",

                        delay:
                            connection.id *
                            0.25,
                    }}
                />

            ))}

        </div>

    );

}
import { motion } from "framer-motion";

export default function NexusCore() {

    return (

        <div
            className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-20
                pointer-events-none
            "
        >

            {/* =====================================================
                AURA PRINCIPAL
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-56
                    h-56
                    rounded-full
                    blur-3xl
                "
                style={{
                    background:
                        "radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(99,102,241,0.12) 35%, transparent 72%)",
                }}
                animate={{
                    scale: [0.9, 1.08, 0.9],
                    opacity: [0.65, 1, 0.65],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


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
                    w-40
                    h-40
                    rounded-full
                    blur-2xl
                "
                style={{
                    background:
                        "radial-gradient(circle, rgba(168,85,247,0.35), transparent 70%)",
                }}
                animate={{
                    scale: [1, 1.18, 1],
                }}
                transition={{
                    duration: 3,
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
                    w-[190px]
                    h-[92px]
                    rounded-[50%]
                    border
                    border-violet-500/20
                "
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >

                <span
                    className="
                        absolute
                        top-0
                        left-1/2
                        -translate-x-1/2
                        -translate-y-1/2
                        w-2
                        h-2
                        rounded-full
                        bg-violet-400
                        shadow-[0_0_15px_rgba(167,139,250,0.9)]
                    "
                />

            </motion.div>


            {/* =====================================================
                ÓRBITA DIAGONAL
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[170px]
                    h-[75px]
                    rounded-[50%]
                    border
                    border-indigo-400/15
                "
                animate={{
                    rotate: -360,
                }}
                transition={{
                    duration: 14,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >

                <span
                    className="
                        absolute
                        bottom-0
                        left-1/2
                        -translate-x-1/2
                        translate-y-1/2
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-indigo-300
                        shadow-[0_0_12px_rgba(129,140,248,0.9)]
                    "
                />

            </motion.div>


            {/* =====================================================
                ANILLO CENTRAL
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[116px]
                    h-[116px]
                    rounded-full
                    border
                    border-violet-400/25
                "
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />


            {/* =====================================================
                NÚCLEO
            ===================================================== */}

            <motion.div
                className="
                    relative
                    w-[82px]
                    h-[82px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    border
                    border-violet-300/60
                    overflow-hidden
                "
                style={{
                    background:
                        "radial-gradient(circle at 35% 30%, #c084fc 0%, #8b5cf6 28%, #4c1d95 62%, #160b2f 100%)",

                    boxShadow:
                        "0 0 25px rgba(139,92,246,0.7), 0 0 70px rgba(124,58,237,0.35), inset 0 0 25px rgba(255,255,255,0.12)",
                }}
                animate={{
                    boxShadow: [
                        "0 0 25px rgba(139,92,246,0.65), 0 0 60px rgba(124,58,237,0.25), inset 0 0 25px rgba(255,255,255,0.12)",

                        "0 0 35px rgba(168,85,247,0.9), 0 0 90px rgba(124,58,237,0.4), inset 0 0 30px rgba(255,255,255,0.18)",

                        "0 0 25px rgba(139,92,246,0.65), 0 0 60px rgba(124,58,237,0.25), inset 0 0 25px rgba(255,255,255,0.12)",
                    ],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >

                {/* REFLEJO */}

                <div
                    className="
                        absolute
                        -top-4
                        -left-3
                        w-10
                        h-10
                        rounded-full
                        bg-white/25
                        blur-md
                    "
                />


                {/* LOGO */}

                <span
                    className="
                        relative
                        z-10
                        text-2xl
                        font-black
                        text-white
                        drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]
                    "
                >
                    N
                </span>

            </motion.div>


            {/* =====================================================
                PULSO
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[82px]
                    h-[82px]
                    rounded-full
                    border
                    border-violet-400/50
                "
                animate={{
                    scale: [1, 1.8],
                    opacity: [0.55, 0],
                }}
                transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeOut",
                }}
            />


            {/* =====================================================
                TEXTO
            ===================================================== */}

            <div
                className="
                    absolute
                    top-[105px]
                    left-1/2
                    -translate-x-1/2
                    text-center
                    whitespace-nowrap
                "
            >

                <p
                    className="
                        text-sm
                        font-bold
                        tracking-[0.28em]
                        text-white
                        drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]
                    "
                >
                    NEXUS
                </p>

                <p
                    className="
                        mt-1
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-violet-300/70
                    "
                >
                    Núcleo del conocimiento
                </p>

            </div>

        </div>

    );

}
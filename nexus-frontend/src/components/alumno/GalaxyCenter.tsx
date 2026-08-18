import { motion } from "framer-motion";

export default function GalaxyCenter() {

    return (
        <div
            className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                z-20
                flex
                items-center
                justify-center
            "
        >

            {/* =====================================================
                GLOW EXTERIOR
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    w-48
                    h-48
                    rounded-full
                    bg-violet-600/20
                    blur-[55px]
                "
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.45, 0.7, 0.45],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =====================================================
                HALO
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    w-36
                    h-36
                    rounded-full
                    border
                    border-violet-400/30
                "
                animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.3, 0.65, 0.3],
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =====================================================
                SEGUNDO HALO
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    w-28
                    h-28
                    rounded-full
                    border
                    border-blue-400/25
                "
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 18,
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
                    w-20
                    h-20
                    rounded-[22px]
                    bg-gradient-to-br
                    from-violet-500
                    via-purple-600
                    to-blue-600
                    flex
                    items-center
                    justify-center
                    border
                    border-violet-300/40
                    shadow-[0_0_45px_rgba(139,92,246,0.75)]
                "
                animate={{
                    scale: [1, 1.04, 1],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >

                {/* BRILLO INTERNO */}

                <div
                    className="
                        absolute
                        inset-1
                        rounded-[20px]
                        bg-gradient-to-br
                        from-white/10
                        to-transparent
                    "
                />


                {/* N */}

                <span
                    className="
                        relative
                        z-10
                        text-4xl
                        font-black
                        text-white
                        select-none
                    "
                >
                    N
                </span>

            </motion.div>


            {/* =====================================================
                PUNTOS ORBITALES
            ===================================================== */}

            <motion.span
                className="
                    absolute
                    w-2
                    h-2
                    rounded-full
                    bg-violet-300
                    shadow-[0_0_12px_rgba(196,181,253,1)]
                "
                style={{
                    top: "-48px",
                    left: "50%",
                    marginLeft: "-4px",
                }}
                animate={{
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
            />

            <motion.span
                className="
                    absolute
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-blue-300
                    shadow-[0_0_10px_rgba(147,197,253,1)]
                "
                style={{
                    bottom: "-42px",
                    left: "50%",
                    marginLeft: "-3px",
                }}
                animate={{
                    opacity: [1, 0.3, 1],
                }}
                transition={{
                    duration: 2.5,
                    repeat: Infinity,
                }}
            />

        </div>
    );
}
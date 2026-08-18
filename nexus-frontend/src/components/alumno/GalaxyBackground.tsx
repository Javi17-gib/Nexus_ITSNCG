import { motion } from "framer-motion";
import Stars from "../common/Stars";

export default function GalaxyBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#02030A]">

            {/* =====================================================
                ESTRELLAS
            ===================================================== */}

            <div className="absolute inset-0 z-0">
                <Stars />
            </div>


            {/* =====================================================
                NEBULOSA VIOLETA
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    w-[700px]
                    h-[700px]
                    rounded-full
                    bg-violet-700/10
                    blur-[150px]
                    pointer-events-none
                "
                style={{
                    left: "50%",
                    top: "48%",
                    transform: "translate(-50%, -50%)",
                }}
                animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.45, 0.7, 0.45],
                }}
                transition={{
                    duration: 9,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =====================================================
                NEBULOSA AZUL
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    w-[500px]
                    h-[500px]
                    rounded-full
                    bg-blue-600/10
                    blur-[140px]
                    pointer-events-none
                "
                style={{
                    left: "25%",
                    top: "35%",
                }}
                animate={{
                    x: [0, 35, 0],
                    y: [0, -20, 0],
                    opacity: [0.3, 0.55, 0.3],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =====================================================
                NEBULOSA CYAN
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    w-[450px]
                    h-[450px]
                    rounded-full
                    bg-cyan-500/5
                    blur-[130px]
                    pointer-events-none
                "
                style={{
                    right: "12%",
                    bottom: "18%",
                }}
                animate={{
                    x: [0, -30, 0],
                    y: [0, 25, 0],
                    opacity: [0.25, 0.5, 0.25],
                }}
                transition={{
                    duration: 11,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            {/* =====================================================
                HALO CENTRAL
            ===================================================== */}

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[520px]
                    h-[520px]
                    rounded-full
                    border
                    border-violet-500/10
                    pointer-events-none
                "
            />


            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[390px]
                    h-[390px]
                    rounded-full
                    border
                    border-blue-500/10
                    pointer-events-none
                "
            />


            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    -translate-x-1/2
                    -translate-y-1/2
                    w-[260px]
                    h-[260px]
                    rounded-full
                    border
                    border-violet-400/10
                    pointer-events-none
                "
            />


            {/* =====================================================
                ÓRBITA HORIZONTAL
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[760px]
                    h-[270px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-violet-500/15
                    pointer-events-none
                "
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 80,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />


            {/* =====================================================
                ÓRBITA DIAGONAL
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[700px]
                    h-[230px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-blue-500/10
                    pointer-events-none
                "
                style={{
                    transform: "translate(-50%, -50%) rotate(35deg)",
                }}
                animate={{
                    rotate: [35, 395],
                }}
                transition={{
                    duration: 95,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />


            {/* =====================================================
                ÓRBITA VERTICAL
            ===================================================== */}

            <motion.div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    w-[560px]
                    h-[190px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-[50%]
                    border
                    border-cyan-500/10
                    pointer-events-none
                "
                style={{
                    transform:
                        "translate(-50%, -50%) rotate(-45deg)",
                }}
                animate={{
                    rotate: [-45, 315],
                }}
                transition={{
                    duration: 110,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />


            {/* =====================================================
                PUNTOS DE LUZ
            ===================================================== */}

            <div
                className="
                    absolute
                    left-[18%]
                    top-[22%]
                    w-1
                    h-1
                    rounded-full
                    bg-violet-300
                    shadow-[0_0_12px_rgba(196,181,253,0.9)]
                "
            />

            <div
                className="
                    absolute
                    left-[72%]
                    top-[18%]
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-blue-300
                    shadow-[0_0_15px_rgba(147,197,253,0.9)]
                "
            />

            <div
                className="
                    absolute
                    left-[82%]
                    top-[68%]
                    w-1
                    h-1
                    rounded-full
                    bg-cyan-300
                    shadow-[0_0_12px_rgba(103,232,249,0.9)]
                "
            />

            <div
                className="
                    absolute
                    left-[22%]
                    bottom-[20%]
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-purple-300
                    shadow-[0_0_15px_rgba(216,180,254,0.9)]
                "
            />


            {/* =====================================================
                OSCURECER BORDES
            ===================================================== */}

            <div
                className="
                    absolute
                    inset-0
                    pointer-events-none
                    bg-[radial-gradient(circle_at_center,transparent_35%,rgba(2,3,10,0.45)_100%)]
                "
            />

        </div>
    );
}
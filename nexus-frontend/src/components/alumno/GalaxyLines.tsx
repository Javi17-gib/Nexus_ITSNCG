import {
    motion,
} from "framer-motion";

interface GalaxyPosition {
    x: number;
    y: number;
}

interface GalaxyLinesProps {
    positions: GalaxyPosition[];
    colors: string[];
}


export default function GalaxyLines({
    positions,
    colors,
}: GalaxyLinesProps) {

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

            {positions.map(
                (
                    position,
                    index
                ) => {

                    const distance =
                        Math.sqrt(
                            position.x *
                                position.x +
                            position.y *
                                position.y
                        );


                    const angle =
                        Math.atan2(
                            position.y,
                            position.x
                        ) *
                        (180 / Math.PI);


                    const color =
                        colors[index] ||
                        "#8B5CF6";


                    return (

                        <div
                            key={index}
                            className="
                                absolute
                                left-1/2
                                top-1/2
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
                                LÍNEA
                            ================================================= */}

                            <div
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    -translate-y-1/2
                                    w-full
                                    h-px
                                "
                                style={{
                                    background:
                                        `linear-gradient(
                                            90deg,
                                            ${color}10,
                                            ${color}55,
                                            ${color}10
                                        )`,

                                    boxShadow:
                                        `0 0 8px ${color}30`,
                                }}
                            />


                            {/* =================================================
                                PARTÍCULA VIAJANDO
                            ================================================= */}

                            <motion.div
                                className="
                                    absolute
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
                                        `0 0 10px ${color}`,
                                }}
                                animate={{
                                    x: [
                                        0,
                                        distance,
                                    ],
                                    opacity: [
                                        0,
                                        1,
                                        0,
                                    ],
                                }}
                                transition={{
                                    duration:
                                        2.5 +
                                        index * 0.25,

                                    repeat:
                                        Infinity,

                                    ease:
                                        "linear",

                                    delay:
                                        index * 0.3,
                                }}
                            />

                        </div>

                    );

                }
            )}

        </div>

    );

}
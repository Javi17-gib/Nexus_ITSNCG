import {
    useEffect,
    useState,
} from "react";

import type { ReactNode } from "react";


interface GalaxyPosition {
    x: number;
    y: number;
}


interface GalaxyLayoutProps {

    total: number;

    children: (
        position: GalaxyPosition,
        index: number
    ) => ReactNode;

}


export default function GalaxyLayout({
    total,
    children,
}: GalaxyLayoutProps) {

    const [
        viewport,
        setViewport,
    ] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });


    /*
    |--------------------------------------------------------------------------
    | DETECTAR CAMBIO DE TAMAÑO
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        const handleResize = () => {

            setViewport({
                width: window.innerWidth,
                height: window.innerHeight,
            });

        };


        window.addEventListener(
            "resize",
            handleResize
        );


        return () => {

            window.removeEventListener(
                "resize",
                handleResize
            );

        };

    }, []);


    /*
    |--------------------------------------------------------------------------
    | RADIO RESPONSIVE
    |--------------------------------------------------------------------------
    */

    const isMobile =
        viewport.width < 640;

    const isTablet =
        viewport.width >= 640 &&
        viewport.width < 1024;


    let radioX = 330;
    let radioY = 230;


    if (isMobile) {

        radioX = Math.min(
            viewport.width * 0.36,
            170
        );

        radioY = Math.min(
            viewport.height * 0.30,
            170
        );

    } else if (isTablet) {

        radioX = Math.min(
            viewport.width * 0.32,
            260
        );

        radioY = Math.min(
            viewport.height * 0.30,
            210
        );

    } else {

        radioX = Math.min(
            viewport.width * 0.30,
            380
        );

        radioY = Math.min(
            viewport.height * 0.31,
            270
        );

    }


    /*
    |--------------------------------------------------------------------------
    | GENERAR POSICIONES
    |--------------------------------------------------------------------------
    */

    const positions: GalaxyPosition[] = [];


    for (let i = 0; i < total; i++) {

        const angle =
            (Math.PI * 2 * i) /
                Math.max(total, 1) -
            Math.PI / 2;


        /*
        | Pequeña variación para que no
        | parezca un círculo perfecto.
        */

        const variation =
            i % 2 === 0
                ? 1
                : 0.88;


        const x =
            Math.cos(angle) *
            radioX *
            variation;


        const y =
            Math.sin(angle) *
            radioY *
            variation;


        positions.push({
            x,
            y,
        });

    }


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <>

            {positions.map(
                (
                    position,
                    index
                ) => (

                    <div
                        key={index}
                        className="
                            absolute
                            inset-0
                            pointer-events-none
                        "
                    >

                        <div
                            className="
                                pointer-events-auto
                            "
                        >

                            {children(
                                position,
                                index
                            )}

                        </div>

                    </div>

                )
            )}

        </>

    );

}
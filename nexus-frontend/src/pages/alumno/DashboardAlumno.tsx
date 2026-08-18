import {
    useEffect,
    useState,
} from "react";

import GalaxyBackground from "../../components/alumno/GalaxyBackground";
import GalaxyCenter from "../../components/alumno/GalaxyCenter";
import GalaxyLayout from "../../components/alumno/GalaxyLayout";
import GalaxyLines from "../../components/alumno/GalaxyLines";
import MateriaNode from "../../components/alumno/MateriaNode";
import NexusConnections from "../../components/common/NexusConnections";

import {
    getMateriasRequest,
} from "../../api/materias";

import type {
    Materia,
} from "../../api/materias";


interface GalaxyPosition {
    x: number;
    y: number;
}


export default function DashboardAlumno() {

    /*
    |--------------------------------------------------------------------------
    | MATERIAS
    |--------------------------------------------------------------------------
    */

    const [
        materias,
        setMaterias,
    ] = useState<Materia[]>([]);


    /*
    |--------------------------------------------------------------------------
    | POSICIONES DE LA GALAXIA
    |--------------------------------------------------------------------------
    */

    const [
        positions,
        setPositions,
    ] = useState<GalaxyPosition[]>([]);


    /*
    |--------------------------------------------------------------------------
    | ESTADOS
    |--------------------------------------------------------------------------
    */

    const [
        loading,
        setLoading,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState<string | null>(
        null
    );


    /*
    |--------------------------------------------------------------------------
    | CARGAR MATERIAS
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

    let montado = true;


    const cargarMaterias = async () => {

        try {

            console.log(
                "🌌 Cargando materias para la galaxia..."
            );

            setLoading(true);
            setError(null);


            const data =
                await getMateriasRequest();


            console.log(
                "📚 Materias recibidas:",
                data
            );


            if (!montado) {
                return;
            }


            /*
            |--------------------------------------------------------------------------
            | FILTRAR MATERIAS ACTIVAS
            |--------------------------------------------------------------------------
            */

            const materiasActivas =
                data.filter(
                    (materia) =>
                        materia.activa !== false
                );


            console.log(
                "🌌 Materias activas:",
                materiasActivas
            );


            setMaterias(
                materiasActivas
            );


            /*
            |--------------------------------------------------------------------------
            | IMPORTANTE
            |--------------------------------------------------------------------------
            |
            | Los datos ya llegaron.
            | Dejamos de mostrar "Explorando el universo".
            |
            |--------------------------------------------------------------------------
            */

            setLoading(false);


        } catch (error: any) {

            console.error(
                "❌ ERROR AL CARGAR MATERIAS"
            );


            console.error(
                "Error completo:",
                error
            );


            console.error(
                "Respuesta del servidor:",
                error?.response?.data
            );


            console.error(
                "Código HTTP:",
                error?.response?.status
            );


            console.error(
                "URL:",
                error?.config?.url
            );


            if (montado) {

                setError(
                    "No fue posible cargar las materias."
                );

                setLoading(false);

            }

        }

    };


    cargarMaterias();


    return () => {

        montado = false;

    };

}, []);


    /*
    |--------------------------------------------------------------------------
    | CALCULAR POSICIONES
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            materias.length === 0
        ) {

            setPositions([]);

            return;

        }


        const calcularPosiciones =
            () => {

                const width =
                    window.innerWidth;

                const height =
                    window.innerHeight;


                const isMobile =
                    width < 640;

                const isTablet =
                    width >= 640 &&
                    width < 1024;


                let radioX = 330;
                let radioY = 230;


                if (isMobile) {

                    radioX =
                        Math.min(
                            width * 0.36,
                            170
                        );

                    radioY =
                        Math.min(
                            height * 0.30,
                            170
                        );

                } else if (isTablet) {

                    radioX =
                        Math.min(
                            width * 0.32,
                            260
                        );

                    radioY =
                        Math.min(
                            height * 0.30,
                            210
                        );

                } else {

                    radioX =
                        Math.min(
                            width * 0.30,
                            380
                        );

                    radioY =
                        Math.min(
                            height * 0.31,
                            270
                        );

                }


                const nuevasPosiciones:
                    GalaxyPosition[] = [];


                materias.forEach(
                    (_, index) => {

                        const angle =
                            (
                                Math.PI *
                                2 *
                                index
                            ) /
                                materias.length -
                            Math.PI / 2;


                        const variation =
                            index % 2 === 0
                                ? 1
                                : 0.88;


                        nuevasPosiciones.push({

                            x:
                                Math.cos(angle) *
                                radioX *
                                variation,

                            y:
                                Math.sin(angle) *
                                radioY *
                                variation,

                        });

                    }
                );


                setPositions(
                    nuevasPosiciones
                );

            };


        calcularPosiciones();


        window.addEventListener(
            "resize",
            calcularPosiciones
        );


        return () => {

            window.removeEventListener(
                "resize",
                calcularPosiciones
            );

        };

    }, [materias]);


    /*
    |--------------------------------------------------------------------------
    | COLORES PARA LAS CONEXIONES
    |--------------------------------------------------------------------------
    */

    const colores =
        materias.map(
            (materia) =>
                materia.color ||
                "#8B5CF6"
        );


    /*
    |--------------------------------------------------------------------------
    | LOADING
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (

            <div
                className="
                    relative
                    w-full
                    h-full
                    overflow-hidden
                    bg-[#02030A]
                    flex
                    items-center
                    justify-center
                "
            >

                <GalaxyBackground />

                <div
                    className="
                        relative
                        z-50
                        flex
                        flex-col
                        items-center
                        gap-4
                    "
                >

                    <div
                        className="
                            w-12
                            h-12
                            rounded-full
                            border-2
                            border-violet-500/20
                            border-t-violet-400
                            animate-spin
                        "
                    />

                    <p
                        className="
                            text-sm
                            text-slate-400
                        "
                    >
                        Explorando el universo...
                    </p>

                </div>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | ERROR
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (

            <div
                className="
                    relative
                    w-full
                    h-full
                    overflow-hidden
                    bg-[#02030A]
                    flex
                    items-center
                    justify-center
                "
            >

                <GalaxyBackground />

                <div
                    className="
                        relative
                        z-50
                        max-w-sm
                        text-center
                        px-6
                    "
                >

                    <div
                        className="
                            w-16
                            h-16
                            mx-auto
                            rounded-full
                            bg-red-500/10
                            border
                            border-red-500/20
                            flex
                            items-center
                            justify-center
                            text-red-400
                            text-2xl
                        "
                    >
                        !
                    </div>


                    <h2
                        className="
                            mt-5
                            text-lg
                            font-bold
                            text-white
                        "
                    >
                        No pudimos cargar tu galaxia
                    </h2>


                    <p
                        className="
                            mt-2
                            text-sm
                            text-slate-500
                        "
                    >
                        {error}
                    </p>

                </div>

            </div>

        );

    }


    /*
    |--------------------------------------------------------------------------
    | DASHBOARD
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                relative
                w-full
                h-full
                overflow-hidden
            "
        >

            {/* =====================================================
                FONDO
            ===================================================== */}

            <GalaxyBackground />


            {/* =====================================================
                CONEXIONES
            ===================================================== */}

            {positions.length ===
                materias.length &&
                materias.length > 0 && (

                    <GalaxyLines
                        positions={
                            positions
                        }
                        colors={
                            colores
                        }
                    />

                )}
            
            

            {/* =====================================================
                MATERIAS
            ===================================================== */}

            {positions.length ===
                materias.length &&
                materias.length > 0 && (

                    <GalaxyLayout
                        total={
                            materias.length
                        }
                    >

                        {(
                            _position,
                            index
                        ) => {

                            const materia =
                                materias[index];


                            const position =
                                positions[index];


                            return (

                               <MateriaNode
    nombre={materia.nombre}
    color={materia.color || "#8B5CF6"}
    icono={materia.icono || undefined}
    unidades={materia.unidades_count || 0}
    x={position.x}
    y={position.y}
    onClick={() => {
        console.log(
            "Materia seleccionada:",
            materia
        );
    }}
/>

                            );

                        }}

                    </GalaxyLayout>

                )}


            {/* =====================================================
                SIN MATERIAS
            ===================================================== */}

            {materias.length === 0 && (

                <div
                    className="
                        absolute
                        inset-0
                        z-40
                        flex
                        items-center
                        justify-center
                        pointer-events-none
                    "
                >

                    <div
                        className="
                            text-center
                            max-w-sm
                        "
                    >

                        <div
                            className="
                                mx-auto
                                w-20
                                h-20
                                rounded-full
                                border
                                border-violet-500/20
                                bg-violet-500/5
                                flex
                                items-center
                                justify-center
                                text-3xl
                            "
                        >
                            ✦
                        </div>


                        <h2
                            className="
                                mt-5
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            Tu universo está esperando
                        </h2>


                        <p
                            className="
                                mt-2
                                text-sm
                                text-slate-500
                            "
                        >
                            Todavía no tienes materias
                            disponibles.
                        </p>

                    </div>

                </div>

            )}


            {/* =====================================================
                NÚCLEO
            ===================================================== */}

            <GalaxyCenter />

        </div>

    );

}
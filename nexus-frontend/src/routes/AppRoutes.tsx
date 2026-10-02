import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
} from "react-router-dom";


// =====================================================
// AUTH
// =====================================================

import Login
    from "../pages/auth/Login";


// =====================================================
// ALUMNO
// =====================================================

import DashboardAlumno
    from "../pages/alumno/DashboardAlumno";

import UnidadesAlumno
    from "../pages/alumno/UnidadesAlumno";

import ContenidoTemaAlumno
    from "../pages/alumno/ContenidoTemaAlumno";

import DashboardAlumnoLayout
    from "../layouts/DashboardAlumnoLayout";

import ConfiguracionAlumno
    from "../pages/alumno/ConfiguracionAlumno";

import ForgotPassword 
    from "../pages/auth/ForgotPassword";


// =====================================================
// DOCENTE
// =====================================================

import ContenidoTema
    from "../pages/docente/ContenidoTema";

import DashboardDocenteLayout
    from "../layouts/DashboardDocenteLayout";

import DashboardDocente
    from "../pages/docente/DashboardDocente";

import Materias
    from "../pages/docente/Materias";

import Unidades
    from "../pages/docente/Unidades";

import Temas
    from "../pages/docente/Temas";

import Grupos
    from "../pages/docente/Grupos";

import Contenido
    from "../pages/docente/Contenido";

import Retos
    from "../pages/docente/Retos";

import Reportes
    from "../pages/docente/Reportes";

import Configuracion
    from "../pages/docente/Configuracion";


// =====================================================
// PÁGINA NO ENCONTRADA - DOCENTE
// =====================================================

function NotFoundDocente() {

    const navigate =
        useNavigate();


    return (

        <div
            className="
                h-full
                min-h-0
                w-full
                flex
                items-center
                justify-center
                p-8
                overflow-y-auto
            "
        >

            <div
                className="
                    w-full
                    max-w-md
                    text-center
                "
            >

                {/* =================================================
                    ICONO
                ================================================= */}

                <div
                    className="
                        mx-auto
                        mb-6
                        w-20
                        h-20
                        rounded-2xl
                        bg-violet-500/10
                        border
                        border-violet-500/20
                        flex
                        items-center
                        justify-center
                    "
                >

                    <span
                        className="
                            text-xl
                            font-black
                            text-violet-400
                        "
                    >
                        404
                    </span>

                </div>


                {/* =================================================
                    TÍTULO
                ================================================= */}

                <h1
                    className="
                        text-2xl
                        md:text-3xl
                        font-black
                        text-[var(--nexus-text)]
                    "
                >
                    Sección no encontrada
                </h1>


                {/* =================================================
                    DESCRIPCIÓN
                ================================================= */}

                <p
                    className="
                        mt-3
                        text-sm
                        leading-6
                        text-[var(--nexus-text-muted)]
                    "
                >
                    Esta sección no existe dentro
                    del espacio docente o la ruta
                    que intentaste abrir no está disponible.
                </p>


                {/* =================================================
                    BOTÓN
                ================================================= */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/dashboard/docente"
                        )
                    }
                    className="
                        mt-7
                        inline-flex
                        items-center
                        justify-center
                        h-11
                        px-6
                        rounded-xl
                        bg-violet-600
                        hover:bg-violet-500
                        text-white
                        text-sm
                        font-semibold
                        shadow-[0_0_30px_rgba(124,58,237,0.2)]
                        hover:shadow-[0_0_40px_rgba(124,58,237,0.35)]
                        transition-all
                    "
                >
                    Volver al panel
                </button>

            </div>

        </div>

    );

}


// =====================================================
// RUTAS
// =====================================================

export default function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =================================================
                    LOGIN
                ================================================= */}

                <Route
                    path="/"
                    element={
                        <Login />
                    }
                />

                <Route
                    path="/forgot-password"
                    element={<ForgotPassword />
                        
                    }
                />

                {/* =================================================
                    ALUMNO
                ================================================= */}

                <Route
                    path="/dashboard/alumno"
                    element={
                        <DashboardAlumnoLayout />
                    }
                >

                    {/* =================================================
                        INICIO / GALAXIA

                        /dashboard/alumno
                    ================================================= */}

                    <Route
                        index
                        element={
                            <DashboardAlumno />
                        }
                    />


                    {/* =================================================
                        CONFIGURACIÓN DEL ALUMNO

                        /dashboard/alumno/configuracion
                    ================================================= */}

                    <Route
                        path="configuracion"
                        element={
                            <ConfiguracionAlumno />
                        }
                    />


                    {/* =================================================
                        MATERIAS

                        /dashboard/alumno/materias/:materiaId
                    ================================================= */}

                    <Route
                        path="materias/:materiaId"
                        element={
                            <UnidadesAlumno />
                        }
                    />


                    {/* =================================================
                        UNIDAD

                        /dashboard/alumno/materias/:materiaId/
                        unidades/:unidadId
                    ================================================= */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId"
                        element={
                            <ContenidoTemaAlumno />
                        }
                    />


                    {/* =================================================
                        TEMA

                        /dashboard/alumno/materias/:materiaId/
                        unidades/:unidadId/temas/:temaId
                    ================================================= */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId/temas/:temaId"
                        element={
                            <ContenidoTemaAlumno />
                        }
                    />

                </Route>


                {/* =================================================
                    DOCENTE
                ================================================= */}

                <Route
                    path="/dashboard/docente"
                    element={
                        <DashboardDocenteLayout />
                    }
                >

                    {/* =================================================
                        INICIO
                    ================================================= */}

                    <Route
                        index
                        element={
                            <DashboardDocente />
                        }
                    />


                    {/* =================================================
                        MATERIAS
                    ================================================= */}

                    <Route
                        path="materias"
                        element={
                            <Materias />
                        }
                    />


                    {/* =================================================
                        MATERIA

                        /dashboard/docente/materias/:materiaId
                    ================================================= */}

                    <Route
                        path="materias/:materiaId"
                        element={
                            <Unidades />
                        }
                    />


                    {/* =================================================
                        UNIDADES

                        /dashboard/docente/materias/:materiaId/unidades
                    ================================================= */}

                    <Route
                        path="materias/:materiaId/unidades"
                        element={
                            <Unidades />
                        }
                    />


                    {/* =================================================
                        TEMAS

                        /dashboard/docente/materias/:materiaId/
                        unidades/:unidadId
                    ================================================= */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId"
                        element={
                            <Temas />
                        }
                    />


                    {/* =================================================
                        GRUPOS

                        /dashboard/docente/grupos
                    ================================================= */}

                    <Route
                        path="grupos"
                        element={
                            <Grupos />
                        }
                    />


                    {/* =================================================
                        CONTENIDO

                        /dashboard/docente/contenido
                    ================================================= */}

                    <Route
                        path="contenido"
                        element={
                            <Contenido />
                        }
                    />


                    {/* =================================================
                        RETOS

                        /dashboard/docente/retos
                    ================================================= */}

                    <Route
                        path="retos"
                        element={
                            <Retos />
                        }
                    />


                    {/* =================================================
                        REPORTES

                        /dashboard/docente/reportes
                    ================================================= */}

                    <Route
                        path="reportes"
                        element={
                            <Reportes />
                        }
                    />


                    {/* =================================================
                        CONFIGURACIÓN DOCENTE

                        /dashboard/docente/configuracion
                    ================================================= */}

                    <Route
                        path="configuracion"
                        element={
                            <Configuracion />
                        }
                    />


                    {/* =================================================
                        CONTENIDO DE TEMA

                        /dashboard/docente/materias/:materiaId/
                        unidades/:unidadId/temas/:temaId
                    ================================================= */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId/temas/:temaId"
                        element={
                            <ContenidoTema />
                        }
                    />


                    {/* =================================================
                        RUTA NO ENCONTRADA
                        
                        Cualquier ruta docente que no exista
                        terminará aquí en lugar de mostrar
                        una pantalla negra.
                    ================================================= */}

                    <Route
                        path="*"
                        element={
                            <NotFoundDocente />
                        }
                    />

                </Route>

            </Routes>

        </BrowserRouter>

    );

}
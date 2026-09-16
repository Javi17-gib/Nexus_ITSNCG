import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

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
                    ================================================= */}

                    <Route
                        path="materias/:materiaId"
                        element={
                            <Unidades />
                        }
                    />


                    {/* =================================================
                        UNIDADES
                    ================================================= */}

                    <Route
                        path="materias/:materiaId/unidades"
                        element={
                            <Unidades />
                        }
                    />


                    {/* =================================================
                        TEMAS
                    ================================================= */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId"
                        element={
                            <Temas />
                        }
                    />


                    {/* =================================================
                        GRUPOS
                    ================================================= */}

                    <Route
                        path="grupos"
                        element={
                            <Grupos />
                        }
                    />


                    {/* =================================================
                        CONTENIDO
                    ================================================= */}

                    <Route
                        path="contenido"
                        element={
                            <Contenido />
                        }
                    />


                    {/* =================================================
                        RETOS
                    ================================================= */}

                    <Route
                        path="retos"
                        element={
                            <Retos />
                        }
                    />


                    {/* =================================================
                        REPORTES
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

                </Route>

            </Routes>

        </BrowserRouter>
    );
}
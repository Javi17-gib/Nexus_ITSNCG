import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";


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
                    DASHBOARD ALUMNO
                ================================================= */}

                <Route
                    path="/dashboard/alumno"
                    element={
                        <DashboardAlumnoLayout />
                    }
                >


                    {/* ---------------------------------------------
                        GALAXIA / INICIO
                    --------------------------------------------- */}

                    <Route
                        index
                        element={
                            <DashboardAlumno />
                        }
                    />


                    {/* ---------------------------------------------
                        MATERIAS DEL ALUMNO
                    --------------------------------------------- */}

                    <Route
                        path="materias/:materiaId"
                        element={
                            <UnidadesAlumno />
                        }
                    />


                    {/* ---------------------------------------------
                        UNIDAD → ESPACIO DE ESTUDIO
                        
                        Al seleccionar una unidad ya NO pasamos
                        por una pantalla independiente de temas.

                        Se abre directamente:
                        ContenidoTemaAlumno
                    --------------------------------------------- */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId"
                        element={
                            <ContenidoTemaAlumno />
                        }
                    />


                    {/* ---------------------------------------------
                        CONTENIDO DE UN TEMA ESPECÍFICO
                        
                        Esta ruta se mantiene para:
                        - cambiar entre temas
                        - anterior / siguiente
                        - enlaces directos
                    --------------------------------------------- */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId/temas/:temaId"
                        element={
                            <ContenidoTemaAlumno />
                        }
                    />


                </Route>


                {/* =================================================
                    DASHBOARD DOCENTE
                ================================================= */}

                <Route
                    path="/dashboard/docente"
                    element={
                        <DashboardDocenteLayout />
                    }
                >


                    {/* ---------------------------------------------
                        INICIO
                    --------------------------------------------- */}

                    <Route
                        index
                        element={
                            <DashboardDocente />
                        }
                    />


                    {/* ---------------------------------------------
                        MATERIAS
                    --------------------------------------------- */}

                    <Route
                        path="materias"
                        element={
                            <Materias />
                        }
                    />


                    {/* ---------------------------------------------
                        MATERIA
                    --------------------------------------------- */}

                    <Route
                        path="materias/:materiaId"
                        element={
                            <Unidades />
                        }
                    />


                    {/* ---------------------------------------------
                        UNIDADES DE LA MATERIA
                    --------------------------------------------- */}

                    <Route
                        path="materias/:materiaId/unidades"
                        element={
                            <Unidades />
                        }
                    />


                    {/* ---------------------------------------------
                        TEMAS DE UNA UNIDAD
                        
                        Esta pantalla SÍ se mantiene para el docente,
                        porque aquí administra los temas.
                    --------------------------------------------- */}

                    <Route
                        path="materias/:materiaId/unidades/:unidadId"
                        element={
                            <Temas />
                        }
                    />


                    {/* ---------------------------------------------
                        GRUPOS
                    --------------------------------------------- */}

                    <Route
                        path="grupos"
                        element={
                            <Grupos />
                        }
                    />


                    {/* ---------------------------------------------
                        CONTENIDO
                    --------------------------------------------- */}

                    <Route
                        path="contenido"
                        element={
                            <Contenido />
                        }
                    />


                    {/* ---------------------------------------------
                        RETOS
                    --------------------------------------------- */}

                    <Route
                        path="retos"
                        element={
                            <Retos />
                        }
                    />


                    {/* ---------------------------------------------
                        REPORTES
                    --------------------------------------------- */}

                    <Route
                        path="reportes"
                        element={
                            <Reportes />
                        }
                    />


                    {/* ---------------------------------------------
                        CONFIGURACIÓN
                    --------------------------------------------- */}

                    <Route
                        path="configuracion"
                        element={
                            <Configuracion />
                        }
                    />


                    {/* ---------------------------------------------
                        CONTENIDO DE UN TEMA
                    --------------------------------------------- */}

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
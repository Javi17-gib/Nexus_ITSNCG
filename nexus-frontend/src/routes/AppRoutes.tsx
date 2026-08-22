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

import DashboardAlumnoLayout
    from "../layouts/DashboardAlumnoLayout";


// =====================================================
// DOCENTE
// =====================================================

import DashboardDocenteLayout
    from "../layouts/DashboardDocenteLayout";

import DashboardDocente
    from "../pages/docente/DashboardDocente";

import Materias
    from "../pages/docente/Materias";

import Unidades
    from "../pages/docente/Unidades";

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

                    <Route
                        index
                        element={
                            <DashboardAlumno />
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
                        UNIDADES DE UNA MATERIA
                    --------------------------------------------- */}

                    <Route
                        path="materias/:materiaId"
                        element={
                            <Unidades />
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


                </Route>


            </Routes>

        </BrowserRouter>

    );

}
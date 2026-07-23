import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import DashboardAlumno from "../pages/alumno/DashboardAlumno";

import DashboardDocenteLayout from "../layouts/DashboardDocenteLayout";

import DashboardDocente from "../pages/docente/DashboardDocente";
import Materias from "../pages/docente/Materias";
import Grupos from "../pages/docente/Grupos";
import Contenido from "../pages/docente/Contenido";
import Retos from "../pages/docente/Retos";
import Reportes from "../pages/docente/Reportes";
import Configuracion from "../pages/docente/Configuracion";

export default function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/dashboard/alumno"
                    element={<DashboardAlumno />}
                />

                <Route
                    path="/dashboard/docente"
                    element={<DashboardDocenteLayout />}
                >

                    <Route
                        index
                        element={<DashboardDocente />}
                    />

                    <Route
                        path="materias"
                        element={<Materias />}
                    />

                    <Route
                        path="grupos"
                        element={<Grupos />}
                    />

                    <Route
                        path="contenido"
                        element={<Contenido />}
                    />

                    <Route
                        path="retos"
                        element={<Retos />}
                    />

                    <Route
                        path="reportes"
                        element={<Reportes />}
                    />

                    <Route
                        path="configuracion"
                        element={<Configuracion />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}
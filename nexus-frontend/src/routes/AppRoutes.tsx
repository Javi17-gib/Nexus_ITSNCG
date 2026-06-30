import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import DashboardAlumno from "../pages/alumno/DashboardAlumno";
import DashboardDocente from "../pages/docente/DashboardDocente";

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
                    element={<DashboardDocente />}
                />

            </Routes>
        </BrowserRouter>
    );
}
import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardDocenteLayout() {

    return (

        <div
            className="
                h-screen
                overflow-hidden
                flex
                bg-[var(--nexus-bg)]
                text-[var(--nexus-text)]
                transition-colors
                duration-300
            "
        >

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <Sidebar />


            {/* =====================================================
                CONTENIDO PRINCIPAL
            ===================================================== */}

            <div
                className="
                    flex
                    flex-col
                    flex-1
                    min-w-0
                    min-h-0
                    h-screen
                    bg-[var(--nexus-bg)]
                    transition-colors
                    duration-300
                "
            >

                {/* =================================================
                    TOPBAR
                ================================================= */}

                <Topbar />


                {/* =================================================
                    CONTENIDO DE LA PÁGINA

                    ESTE ES EL ÚNICO CONTENEDOR
                    QUE TENDRÁ SCROLL
                ================================================= */}

                <main
                    className="
                        flex-1
                        min-h-0
                        overflow-y-auto
                        overflow-x-hidden
                        p-6
                        lg:p-8
                        bg-[var(--nexus-bg)]
                        text-[var(--nexus-text)]
                        transition-colors
                        duration-300
                    "
                >

                    <Outlet />

                </main>

            </div>

        </div>

    );

}
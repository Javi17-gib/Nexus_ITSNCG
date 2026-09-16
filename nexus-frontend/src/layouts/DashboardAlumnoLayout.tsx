import { Outlet } from "react-router-dom";

import TopbarAlumno
    from "../components/alumno/TopbarAlumno";

import ChatbotAlumno
    from "../components/alumno/ChatbotAlumno";


export default function DashboardAlumnoLayout() {

    return (

        <div
            className="
                h-screen
                w-full
                overflow-hidden
                flex
                flex-col
                bg-[#02030A]
                text-white
            "
        >

            {/* =====================================================
                TOPBAR DEL ALUMNO
            ===================================================== */}

            <TopbarAlumno />


            {/* =====================================================
                CONTENIDO PRINCIPAL
            ===================================================== */}

            <main
                className="
                    relative
                    flex-1
                    min-h-0
                    w-full
                    overflow-hidden
                "
            >

                <Outlet />

            </main>


            {/* =====================================================
                CHATBOT
            ===================================================== */}

            <ChatbotAlumno />

        </div>

    );

}
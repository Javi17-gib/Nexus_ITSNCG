import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export default function DashboardDocenteLayout() {

    return (

        <div className="flex min-h-screen bg-[#09090F] text-white">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <Topbar />

                <main className="flex-1 p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}
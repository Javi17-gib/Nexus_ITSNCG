import {
    Home,
    BookOpen,
    Users,
    FolderOpen,
    Trophy,
    BarChart3,
    Settings,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [

    {
        name: "Inicio",
        icon: Home,
        path: "/dashboard/docente",
    },

    {
        name: "Materias",
        icon: BookOpen,
        path: "/dashboard/docente/materias",
    },

    {
        name: "Grupos",
        icon: Users,
        path: "/dashboard/docente/grupos",
    },

    {
        name: "Contenido",
        icon: FolderOpen,
        path: "/dashboard/docente/contenido",
    },

    {
        name: "Retos",
        icon: Trophy,
        path: "/dashboard/docente/retos",
    },

    {
        name: "Reportes",
        icon: BarChart3,
        path: "/dashboard/docente/reportes",
    },

    {
        name: "Configuración",
        icon: Settings,
        path: "/dashboard/docente/configuracion",
    },

];

export default function Sidebar() {

    return (

        <aside className="w-72 bg-[#111118] border-r border-slate-800 flex flex-col">

            <div className="h-20 flex items-center justify-center">

                <h1 className="text-3xl font-black tracking-[6px]">

                    NEXUS

                </h1>

            </div>

            <nav className="flex-1 px-4">

                {menu.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-4 rounded-xl px-4 py-3 mb-2 transition-all

                                ${isActive

                                    ? "bg-violet-600 text-white"

                                    : "text-slate-400 hover:bg-[#1A1A26] hover:text-white"

                                }`

                            }

                        >

                            <Icon size={20} />

                            <span>

                                {item.name}

                            </span>

                        </NavLink>

                    );

                })}

            </nav>

            <div className="p-4">

                <button

                    className="w-full flex items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10"

                >

                    <LogOut size={20} />

                    Cerrar sesión

                </button>

            </div>

        </aside>

    );

}
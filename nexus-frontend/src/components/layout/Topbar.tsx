import { Bell, Search } from "lucide-react";

export default function Topbar() {

    return (

        <header className="h-20 border-b border-slate-800 bg-[#09090F] flex items-center justify-between px-8">

            <div className="relative">

                <Search
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                />

                <input

                    placeholder="Buscar..."

                    className="w-80 h-11 rounded-xl bg-[#111118] border border-slate-700 pl-11 pr-4"

                />

            </div>

            <div className="flex items-center gap-5">

                <Bell className="text-slate-400" />

                <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">

                        L

                    </div>

                    <div>

                        <p className="font-semibold">

                            Luis

                        </p>

                        <p className="text-sm text-slate-400">

                            Docente

                        </p>

                    </div>

                </div>

            </div>

        </header>

    );

}
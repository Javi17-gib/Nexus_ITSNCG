import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Hash } from "lucide-react";
import { motion } from "framer-motion";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("alumno");

  return (
    <div className="min-h-screen bg-[#09090F] flex">
      
      {/* IZQUIERDA */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden bg-[#09090F]">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[180px]" />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[180px]" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* LOGO NEXUS */}
          <div className="relative flex items-center justify-center w-48 h-48">
            <div className="absolute inset-0 rounded-full border border-violet-500/20" />
            <div className="absolute inset-0 rounded-full border border-violet-400/25 rotate-[35deg]" />
            <div className="absolute inset-6 rounded-full border border-blue-500/20" />
            <div className="absolute inset-6 rounded-full border border-blue-400/20 -rotate-[35deg]" />
            <div className="absolute w-32 h-32 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="relative w-28 h-28 rounded-[28px] bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_120px_rgba(139,92,246,0.65)]">
              <span className="text-white text-6xl font-black select-none">N</span>
            </div>
          </div>

          <h1 className="mt-6 text-6xl font-black tracking-[14px] text-white">NEXUS</h1>
          <p className="mt-3 text-slate-400 text-lg font-light">Academic Experience Reimagined</p>

          {/* BLOQUE ITSNCG */}
          <div className="mt-8 w-[340px] flex flex-col items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent shadow-[0_0_20px_rgba(139,92,246,0.7)]" />
            <p className="mt-5 text-slate-500 uppercase tracking-[6px] text-xs font-semibold">In Collaboration With</p>
            <img src="/images/logo.png" alt="ITSNCG" className="mt-5 h-24 w-auto object-contain opacity-90" />
            <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.7)]" />
          </div>

          {/* SLOGAN */}
          <div className="mt-8">
            <p className="text-lg text-slate-400 font-light">The Future of Learning</p>
            <p className="mt-1 text-3xl font-bold text-white">Starts Here</p>
          </div>
        </div>
      </div>

      {/* DERECHA */}
      <div className="flex-1 flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          className="w-full max-w-md flex flex-col items-center"
        >
          <div className="mb-10 lg:hidden text-center">
            <h1 className="text-4xl font-black text-white tracking-[8px]">NEXUS</h1>
          </div>

          <h2 className="text-4xl font-bold text-white text-center">{isLogin ? "Bienvenido" : "Crear cuenta"}</h2>
          <p className="mt-3 text-slate-400 text-center">{isLogin ? "Inicia sesión para continuar." : "Regístrate para comenzar."}</p>

          <div className="mt-10 w-full space-y-4">
            {!isLogin && (
              <>
                <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] px-4 text-white outline-none focus:border-violet-500"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Apellido Paterno"
                      className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] px-4 text-white outline-none focus:border-violet-500"
                    />

                    <input
                      type="text"
                      placeholder="Apellido Materno"
                      className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] px-4 text-white outline-none focus:border-violet-500"
                    />
                  </div>
                <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] px-4 text-slate-400 outline-none focus:border-violet-500"
                >
                    <option value="alumno">Alumno</option>
                    <option value="docente">Docente</option>
                </select>

                {role === "docente" && (
                    <div className="relative">
                        <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input type="text" placeholder="PIN de Docente" className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] pl-12 pr-4 text-white outline-none focus:border-violet-500" />
                    </div>
                )}
              </>
            )}

            <div>
              <label className="text-sm text-slate-400">Correo electrónico</label>
              <div className="relative mt-2">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input type="email" placeholder="correo@ejemplo.com" className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] pl-12 pr-4 text-white outline-none focus:border-violet-500" />
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-400">Contraseña</label>
              <div className="relative mt-2">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] pl-12 pr-12 text-white outline-none focus:border-violet-500" />
              </div>
            </div>
          </div>

          {isLogin && (
            <div className="mt-5 w-full flex justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400"><input type="checkbox" className="accent-violet-500" /> Recordarme</label>
              <button className="text-violet-400">¿Olvidaste tu contraseña?</button>
            </div>
          )}

          <button className="mt-8 w-full h-12 rounded-xl bg-violet-600 text-white font-semibold transition-all hover:bg-violet-500">
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>

          <div className="mt-8 text-center">
            <span className="text-slate-500">{isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}</span>
            <button onClick={() => setIsLogin(!isLogin)} className="ml-2 text-violet-400 font-medium">
              {isLogin ? "Crear cuenta" : "Inicia sesión"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
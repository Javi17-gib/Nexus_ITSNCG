import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye } from "lucide-react";

export default function Login() {
const [showRegister, setShowRegister] = useState(false);

return (
<div
className="
min-h-screen
flex
items-center
justify-center
relative
overflow-hidden
"
style={{
backgroundImage: "url('/images/fondonexus.png')",
backgroundSize: "cover",
backgroundPosition: "center",
backgroundRepeat: "no-repeat",
}}
>
{/* Overlay oscuro */} <div className="absolute inset-0 bg-black/60" />

```
  {/* Glow inferior */}
  <div className="absolute bottom-0 w-full h-96 bg-purple-700/15 blur-[180px]" />

  {/* Login */}
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="
      relative
      z-10
      w-[430px]
      min-h-[650px]
      rounded-[28px]
      border
      border-white/10
      bg-[#060B1F]/35
      backdrop-blur-3xl
      px-10
      py-12
      shadow-[0_0_60px_rgba(139,92,246,0.15)]
    "
  >
    {/* Logo */}
    <div className="flex flex-col items-center">

      <div
        className="
          h-14
          w-14
          rounded-2xl
          border
          border-purple-500/30
          bg-white/[0.02]
          backdrop-blur-xl
          flex
          items-center
          justify-center
          text-purple-400
          text-2xl
        "
      >
        ⬢
      </div>

      <h1
        className="
          mt-5
          text-3xl
          font-bold
          text-white
          tracking-[4px]
        "
      >
        ITSNCG
      </h1>

      <p className="mt-2 text-slate-400 text-sm">
        Plataforma Inteligente
      </p>
    </div>

    {/* Titulo */}
    <div className="mt-12 text-center">

      <h2 className="text-2xl font-bold text-white">
        Bienvenido de nuevo
      </h2>

      <p className="mt-2 text-slate-400 text-sm">
        Inicia sesión para continuar
      </p>

    </div>

    {/* Inputs */}
    <div className="mt-10 space-y-5">

      <div className="relative">

        <Mail
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          className="
            w-full
            h-14
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            pl-12
            pr-4
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-purple-500/50
            focus:bg-white/[0.05]
            focus:shadow-[0_0_25px_rgba(139,92,246,0.3)]
          "
        />
      </div>

      <div className="relative">

        <Lock
          size={18}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <Eye
          size={18}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-500
            cursor-pointer
          "
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="
            w-full
            h-14
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            pl-12
            pr-12
            text-white
            placeholder:text-slate-500
            outline-none
            transition-all
            duration-300
            focus:border-purple-500/50
            focus:bg-white/[0.05]
            focus:shadow-[0_0_25px_rgba(139,92,246,0.3)]
          "
        />
      </div>

    </div>

    {/* Opciones */}
    <div className="mt-6 flex items-center justify-between text-sm">

      <label className="flex items-center gap-2 text-slate-400">

        <input
          type="checkbox"
          className="accent-purple-500"
        />

        Recordarme

      </label>

      <button className="text-purple-400 hover:text-purple-300">
        ¿Olvidaste tu contraseña?
      </button>

    </div>

    {/* Botón */}
    <button
      className="
        mt-8
        w-full
        h-14
        rounded-xl
        bg-gradient-to-r
        from-purple-600
        to-violet-500
        font-semibold
        text-white
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]
      "
    >
      Iniciar Sesión
    </button>

    {/* Registro */}
    <div className="mt-8 text-center">

      <span className="text-slate-500">
        ¿No tienes cuenta?
      </span>

      <button
        onClick={() => setShowRegister(true)}
        className="
          ml-2
          text-purple-400
          hover:text-purple-300
        "
      >
        Regístrate aquí
      </button>

    </div>
  </motion.div>
</div>

);
}
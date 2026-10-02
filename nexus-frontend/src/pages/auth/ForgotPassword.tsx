import { useEffect, useState } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import { motion } from "framer-motion";

import Swal from "sweetalert2";

import { useNavigate } from "react-router-dom";

import {
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../../api/auth";

import itsLogo from "../../assets/images/its-logo.png";


type Step = "email" | "pin" | "success";


export default function ForgotPassword() {

  const navigate = useNavigate();


  /*
  |--------------------------------------------------------------------------
  | PASO ACTUAL
  |--------------------------------------------------------------------------
  */

  const [step, setStep] =
    useState<Step>("email");


  /*
  |--------------------------------------------------------------------------
  | DATOS
  |--------------------------------------------------------------------------
  */

  const [correo, setCorreo] =
    useState("");

  const [pin, setPin] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [passwordConfirmation, setPasswordConfirmation] =
    useState("");


  /*
  |--------------------------------------------------------------------------
  | MOSTRAR CONTRASEÑAS
  |--------------------------------------------------------------------------
  */

  const [showPassword, setShowPassword] =
    useState(false);

  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | ESTADO DE CARGA
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | TEMPORIZADOR DEL PIN
  |--------------------------------------------------------------------------
  |
  | 10 minutos = 600 segundos
  |
  */

  const [secondsLeft, setSecondsLeft] =
    useState(600);


  /*
  |--------------------------------------------------------------------------
  | CONTADOR DEL PIN
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (step !== "pin") {
      return;
    }

    if (secondsLeft <= 0) {
      return;
    }


    const timer = window.setInterval(() => {

      setSecondsLeft((previous) => {

        if (previous <= 1) {

          window.clearInterval(timer);

          return 0;
        }

        return previous - 1;
      });

    }, 1000);


    return () => {

      window.clearInterval(timer);

    };

  }, [step, secondsLeft]);


  /*
  |--------------------------------------------------------------------------
  | FORMATO DEL TIEMPO
  |--------------------------------------------------------------------------
  */

  const formatTime = (
    seconds: number
  ) => {

    const minutes =
      Math.floor(seconds / 60);

    const remainingSeconds =
      seconds % 60;


    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };


  /*
  |--------------------------------------------------------------------------
  | EXTRAER MENSAJE DEL BACKEND
  |--------------------------------------------------------------------------
  */

  const getErrorMessage = (
    error: any,
    defaultMessage: string
  ) => {

    let message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      defaultMessage;


    /*
    |--------------------------------------------------------------------------
    | ERRORES DE VALIDACIÓN DE LARAVEL
    |--------------------------------------------------------------------------
    */

    if (error?.response?.data?.errors) {

      const errors =
        error.response.data.errors;


      const firstError =
        Object.values(errors)[0];


      if (Array.isArray(firstError)) {

        message =
          firstError[0] as string;
      }
    }


    return message;
  };


  /*
  |--------------------------------------------------------------------------
  | ENVIAR PIN
  |--------------------------------------------------------------------------
  */

  const handleSendPin = async () => {

    /*
    |--------------------------------------------------------------------------
    | VALIDAR CORREO
    |--------------------------------------------------------------------------
    */

    if (!correo.trim()) {

      await Swal.fire({
        icon: "warning",
        title: "Correo requerido",
        text: "Ingresa el correo electrónico de tu cuenta.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | VALIDAR FORMATO
    |--------------------------------------------------------------------------
    */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (
      !emailRegex.test(
        correo.trim()
      )
    ) {

      await Swal.fire({
        icon: "warning",
        title: "Correo no válido",
        text: "Ingresa un correo electrónico válido.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    try {

      setLoading(true);


      /*
      |--------------------------------------------------------------------------
      | ALERTA DE CARGA
      |--------------------------------------------------------------------------
      */

      Swal.fire({
        title: "Enviando PIN...",
        text: "Estamos enviando el código de recuperación a tu correo.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        background: "#111118",
        color: "#fff",

        didOpen: () => {

          Swal.showLoading();

        },
      });


      /*
      |--------------------------------------------------------------------------
      | SOLICITAR PIN
      |--------------------------------------------------------------------------
      */

      await forgotPasswordRequest(
        correo.trim()
      );


      Swal.close();


      /*
      |--------------------------------------------------------------------------
      | REINICIAR DATOS
      |--------------------------------------------------------------------------
      */

      setSecondsLeft(600);

      setPin("");

      setPassword("");

      setPasswordConfirmation("");


      /*
      |--------------------------------------------------------------------------
      | PASAR AL PASO DEL PIN
      |--------------------------------------------------------------------------
      */

      setStep("pin");


      /*
      |--------------------------------------------------------------------------
      | CONFIRMACIÓN
      |--------------------------------------------------------------------------
      */

      await Swal.fire({
        icon: "success",
        title: "PIN enviado",
        text: "Si el correo está registrado, recibirás un PIN de recuperación.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Continuar",
      });

    } catch (error: any) {

      console.error(
        "Forgot password error:",
        error?.response?.data || error
      );


      Swal.close();


      const message =
        getErrorMessage(
          error,
          "No fue posible enviar el PIN. Inténtalo nuevamente."
        );


      await Swal.fire({
        icon: "error",
        title: "No se pudo enviar el PIN",
        text: message,
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

    } finally {

      setLoading(false);

    }
  };


  /*
  |--------------------------------------------------------------------------
  | RESTABLECER CONTRASEÑA
  |--------------------------------------------------------------------------
  */

  const handleResetPassword = async () => {

    /*
    |--------------------------------------------------------------------------
    | PIN EXPIRADO
    |--------------------------------------------------------------------------
    */

    if (secondsLeft <= 0) {

      await Swal.fire({
        icon: "warning",
        title: "PIN expirado",
        text: "El PIN ha expirado. Solicita uno nuevo.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Solicitar nuevo PIN",
      });

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | PIN VACÍO
    |--------------------------------------------------------------------------
    */

    if (!pin.trim()) {

      await Swal.fire({
        icon: "warning",
        title: "PIN requerido",
        text: "Ingresa el PIN de 5 dígitos que recibiste por correo.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | PIN INCORRECTO
    |--------------------------------------------------------------------------
    */

    if (
      !/^\d{5}$/.test(
        pin.trim()
      )
    ) {

      await Swal.fire({
        icon: "warning",
        title: "PIN no válido",
        text: "El PIN debe contener exactamente 5 dígitos.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | CONTRASEÑA VACÍA
    |--------------------------------------------------------------------------
    */

    if (!password) {

      await Swal.fire({
        icon: "warning",
        title: "Contraseña requerida",
        text: "Ingresa tu nueva contraseña.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | CONTRASEÑA CORTA
    |--------------------------------------------------------------------------
    */

    if (password.length < 8) {

      await Swal.fire({
        icon: "warning",
        title: "Contraseña demasiado corta",
        text: "La contraseña debe tener al menos 8 caracteres.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | CONFIRMACIÓN VACÍA
    |--------------------------------------------------------------------------
    */

    if (!passwordConfirmation) {

      await Swal.fire({
        icon: "warning",
        title: "Confirma tu contraseña",
        text: "Debes confirmar tu nueva contraseña.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    /*
    |--------------------------------------------------------------------------
    | CONTRASEÑAS DIFERENTES
    |--------------------------------------------------------------------------
    */

    if (
      password !==
      passwordConfirmation
    ) {

      await Swal.fire({
        icon: "warning",
        title: "Las contraseñas no coinciden",
        text: "Verifica que ambas contraseñas sean iguales.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

      return;
    }


    try {

      setLoading(true);


      /*
      |--------------------------------------------------------------------------
      | ALERTA DE CARGA
      |--------------------------------------------------------------------------
      */

      Swal.fire({
        title: "Actualizando contraseña...",
        text: "Estamos asegurando tu cuenta.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        background: "#111118",
        color: "#fff",

        didOpen: () => {

          Swal.showLoading();

        },
      });


      /*
      |--------------------------------------------------------------------------
      | RESTABLECER CONTRASEÑA
      |--------------------------------------------------------------------------
      */

      await resetPasswordRequest(
        correo.trim(),
        pin.trim(),
        password,
        passwordConfirmation
      );


      Swal.close();


      /*
      |--------------------------------------------------------------------------
      | CAMBIAR AL ESTADO DE ÉXITO
      |--------------------------------------------------------------------------
      */

      setStep("success");


      /*
      |--------------------------------------------------------------------------
      | ALERTA DE ÉXITO
      |--------------------------------------------------------------------------
      */

      await Swal.fire({
        icon: "success",
        title: "¡Contraseña actualizada!",
        text: "Tu contraseña fue cambiada correctamente.",
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Ir al inicio de sesión",
      });


      /*
      |--------------------------------------------------------------------------
      | REGRESAR AL LOGIN
      |--------------------------------------------------------------------------
      */

      navigate("/");

    } catch (error: any) {

      console.error(
        "Reset password error:",
        error?.response?.data || error
      );


      Swal.close();


      const message =
        getErrorMessage(
          error,
          "No fue posible actualizar la contraseña."
        );


      await Swal.fire({
        icon: "error",
        title: "No se pudo cambiar la contraseña",
        text: message,
        background: "#111118",
        color: "#fff",
        confirmButtonColor: "#7c3aed",
        confirmButtonText: "Entendido",
      });

    } finally {

      setLoading(false);

    }
  };


  /*
  |--------------------------------------------------------------------------
  | REENVIAR PIN
  |--------------------------------------------------------------------------
  */

  const handleResendPin = async () => {

    if (!correo.trim()) {

      setStep("email");

      return;
    }


    await handleSendPin();

  };


  /*
  |--------------------------------------------------------------------------
  | REGRESAR AL LOGIN
  |--------------------------------------------------------------------------
  */

  const handleBackToLogin = () => {

    navigate("/");

  };


  /*
  |--------------------------------------------------------------------------
  | REGRESAR AL CORREO
  |--------------------------------------------------------------------------
  */

  const handleBackToEmail = () => {

    if (loading) {
      return;
    }


    setStep("email");

    setPin("");

    setPassword("");

    setPasswordConfirmation("");

    setSecondsLeft(600);

  };


  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (

    <div className="min-h-screen bg-[#09090F] flex">


      {/* ================================================================
          IZQUIERDA
      ================================================================= */}

      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden bg-[#09090F]">


        {/* ============================================================
            GLOW SUPERIOR
        ============================================================= */}

        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[180px]" />


        {/* ============================================================
            GLOW INFERIOR
        ============================================================= */}

        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[180px]" />


        <div className="relative z-10 flex flex-col items-center text-center">


          {/* ============================================================
              UNIVERSO / LOGO
          ============================================================= */}

          <div className="relative flex items-center justify-center w-48 h-48">


            <div className="absolute inset-0 rounded-full border border-violet-500/20" />


            <div className="absolute inset-0 rounded-full border border-violet-400/25 rotate-[35deg]" />


            <div className="absolute inset-6 rounded-full border border-blue-500/20" />


            <div className="absolute inset-6 rounded-full border border-blue-400/20 -rotate-[35deg]" />


            <div className="absolute w-32 h-32 rounded-full bg-violet-500/20 blur-3xl" />


            <div className="relative w-28 h-28 rounded-[28px] bg-gradient-to-br from-violet-600 via-purple-600 to-blue-600 flex items-center justify-center shadow-[0_0_120px_rgba(139,92,246,0.65)]">


              <img
                src={itsLogo}
                alt="ITS"
                className="w-20 h-20 object-contain"
              />


            </div>

          </div>


          {/* ============================================================
              TITULO
          ============================================================= */}

          <h1 className="mt-6 text-6xl font-black tracking-[14px] text-white">
            ITSNCG
          </h1>


          <p className="mt-3 text-slate-400 text-lg font-light">
            Una Experiencia Académica Reinventada
          </p>


          {/* ============================================================
              COLABORACIÓN
          ============================================================= */}

          <div className="mt-8 w-[340px] flex flex-col items-center">


            <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />


            <p className="mt-5 text-slate-500 uppercase tracking-[6px] text-xs font-semibold">
              En Colaboracion Con
            </p>


            <img
              src="/images/logo.png"
              className="mt-5 h-24"
              alt="Logo"
            />


            <div className="mt-5 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          </div>


          {/* ============================================================
              TEXTO INFERIOR
          ============================================================= */}

          <div className="mt-8">


            <p className="text-lg text-slate-400">
              El Futuro de Aprendizaje
            </p>


            <p className="mt-1 text-3xl font-bold text-white">
              Comienza Aqui
            </p>


          </div>


        </div>

      </div>


      {/* ================================================================
          DERECHA
      ================================================================= */}

      <div className="flex-1 flex items-center justify-center px-6 py-10 overflow-y-auto">


        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full max-w-md flex flex-col items-center"
        >


          {/* ============================================================
              ICONO SUPERIOR
          ============================================================= */}

          <motion.div
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
            }}
            className="w-16 h-16 rounded-2xl bg-violet-600/15 border border-violet-500/20 flex items-center justify-center mb-5"
          >


            {step === "email" && (
              <Mail className="w-8 h-8 text-violet-400" />
            )}


            {step === "pin" && (
              <ShieldCheck className="w-8 h-8 text-violet-400" />
            )}


            {step === "success" && (
              <CheckCircle2 className="w-8 h-8 text-emerald-400" />
            )}


          </motion.div>


          {/* ============================================================
              TITULO
          ============================================================= */}

          <h2 className="text-4xl font-bold text-white text-center">


            {step === "email" &&
              "Recuperar contraseña"}


            {step === "pin" &&
              "Verifica tu correo"}


            {step === "success" &&
              "¡Todo listo!"}


          </h2>


          {/* ============================================================
              SUBTITULO
          ============================================================= */}

          <p className="mt-3 text-slate-400 text-center">


            {step === "email" &&
              "Ingresa tu correo y te enviaremos un PIN de recuperación."}


            {step === "pin" &&
              `Enviamos un PIN de 5 dígitos a ${correo}.`}


            {step === "success" &&
              "Tu contraseña fue actualizada correctamente."}


          </p>


          {/* ============================================================
              PASO 1 - CORREO
          ============================================================= */}

          {step === "email" && (

            <div className="mt-10 w-full space-y-4">


              <div>


                <label className="text-sm text-slate-400">
                  Correo electrónico
                </label>


                <div className="relative mt-2">


                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />


                  <input
                    type="email"
                    value={correo}
                    onChange={(e) =>
                      setCorreo(
                        e.target.value
                      )
                    }
                    onKeyDown={(e) => {

                      if (
                        e.key === "Enter"
                      ) {

                        handleSendPin();

                      }

                    }}
                    placeholder="correo@ejemplo.com"
                    disabled={loading}
                    autoComplete="email"
                    className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] pl-12 pr-4 text-white outline-none focus:border-violet-500 transition"
                  />


                </div>


              </div>


              <button
                type="button"
                disabled={loading}
                onClick={handleSendPin}
                className={`mt-6 w-full h-12 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-violet-900 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-500"
                }`}
              >


                <Mail className="w-5 h-5" />


                {loading
                  ? "Enviando PIN..."
                  : "Enviar PIN"}


              </button>


            </div>

          )}


          {/* ============================================================
              PASO 2 - PIN
          ============================================================= */}

          {step === "pin" && (

            <div className="mt-10 w-full space-y-5">


              {/* ========================================================
                  PIN
              ========================================================= */}

              <div>


                <label className="text-sm text-slate-400">
                  PIN de recuperación
                </label>


                <div className="relative mt-2">


                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />


                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    value={pin}
                    onChange={(e) =>
                      setPin(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 5)
                      )
                    }
                    placeholder="12345"
                    disabled={loading}
                    autoComplete="one-time-code"
                    className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] pl-12 pr-4 text-white tracking-[8px] text-center font-bold outline-none focus:border-violet-500 transition"
                  />


                </div>


              </div>


              {/* ========================================================
                  TEMPORIZADOR
              ========================================================= */}

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#111118] px-4 py-3">


                <div className="flex items-center gap-2 text-slate-400 text-sm">


                  <ShieldCheck className="w-4 h-4 text-violet-400" />


                  <span>
                    Vigencia del PIN
                  </span>


                </div>


                <span
                  className={`font-semibold ${
                    secondsLeft <= 60
                      ? "text-red-400"
                      : "text-violet-400"
                  }`}
                >

                  {secondsLeft > 0
                    ? formatTime(
                        secondsLeft
                      )
                    : "Expirado"}

                </span>


              </div>


              {/* ========================================================
                  NUEVA CONTRASEÑA
              ========================================================= */}

              <div>


                <label className="text-sm text-slate-400">
                  Nueva contraseña
                </label>


                <div className="relative mt-2">


                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />


                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="Mínimo 8 caracteres"
                    disabled={loading}
                    autoComplete="new-password"
                    className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] pl-12 pr-12 text-white outline-none focus:border-violet-500 transition"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  >


                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}


                  </button>


                </div>


              </div>


              {/* ========================================================
                  CONFIRMAR CONTRASEÑA
              ========================================================= */}

              <div>


                <label className="text-sm text-slate-400">
                  Confirmar contraseña
                </label>


                <div className="relative mt-2">


                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />


                  <input
                    type={
                      showPasswordConfirmation
                        ? "text"
                        : "password"
                    }
                    value={
                      passwordConfirmation
                    }
                    onChange={(e) =>
                      setPasswordConfirmation(
                        e.target.value
                      )
                    }
                    placeholder="Repite tu contraseña"
                    disabled={loading}
                    autoComplete="new-password"
                    className="w-full h-12 rounded-xl border border-slate-700 bg-[#111118] pl-12 pr-12 text-white outline-none focus:border-violet-500 transition"
                  />


                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswordConfirmation(
                        !showPasswordConfirmation
                      )
                    }
                    disabled={loading}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
                  >


                    {showPasswordConfirmation ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}


                  </button>


                </div>


              </div>


              {/* ========================================================
                  BOTÓN CAMBIAR CONTRASEÑA
              ========================================================= */}

              <button
                type="button"
                disabled={loading}
                onClick={
                  handleResetPassword
                }
                className={`w-full h-12 rounded-xl text-white font-semibold transition flex items-center justify-center gap-2 ${
                  loading
                    ? "bg-violet-900 cursor-not-allowed"
                    : "bg-violet-600 hover:bg-violet-500"
                }`}
              >


                <Lock className="w-5 h-5" />


                {loading
                  ? "Actualizando..."
                  : "Cambiar contraseña"}


              </button>


              {/* ========================================================
                  OPCIONES
              ========================================================= */}

              <div className="flex items-center justify-between text-sm pt-1">


                <button
                  type="button"
                  disabled={loading}
                  onClick={
                    handleBackToEmail
                  }
                  className="text-slate-400 hover:text-white transition"
                >
                  Cambiar correo
                </button>


                <button
                  type="button"
                  disabled={loading}
                  onClick={
                    handleResendPin
                  }
                  className="text-violet-400 hover:text-violet-300 transition flex items-center gap-1"
                >


                  <RefreshCw className="w-4 h-4" />


                  Reenviar PIN


                </button>


              </div>


            </div>

          )}


          {/* ============================================================
              PASO 3 - ÉXITO
          ============================================================= */}

          {step === "success" && (

            <div className="mt-10 w-full">


              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">


                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">


                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />


                </div>


                <p className="mt-5 text-white font-semibold text-lg">
                  Contraseña actualizada
                </p>


                <p className="mt-2 text-slate-400 text-sm leading-6">
                  Ya puedes iniciar sesión con tu nueva contraseña.
                </p>


              </div>


              <button
                type="button"
                onClick={
                  handleBackToLogin
                }
                className="mt-6 w-full h-12 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition flex items-center justify-center gap-2"
              >


                <ArrowLeft className="w-5 h-5" />


                Ir al inicio de sesión


              </button>


            </div>

          )}


          {/* ============================================================
              REGRESAR AL LOGIN
          ============================================================= */}

          {step !== "success" && (

            <div className="mt-8 text-center">


              <button
                type="button"
                disabled={loading}
                onClick={
                  handleBackToLogin
                }
                className="text-violet-400 hover:text-violet-300 transition flex items-center justify-center gap-2"
              >


                <ArrowLeft className="w-4 h-4" />


                Regresar al inicio de sesión


              </button>


            </div>

          )}


        </motion.div>

      </div>

    </div>
  );
}
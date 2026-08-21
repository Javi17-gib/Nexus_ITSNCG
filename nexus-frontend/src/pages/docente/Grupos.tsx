import {
    Users,
    Plus,
    BookOpen,
    MoreVertical,
    Copy,
    CheckCircle2,
    Search,
    X,
    Loader2,
    GraduationCap,
    CalendarDays,
    UserPlus,
    UserCheck,
    UserX,
    Mail,
    Trash2,
    Pencil,
    AlertTriangle,
} from "lucide-react";

import {
    useEffect,
    useState,
} from "react";

import {
    getGruposRequest,
    crearGrupoRequest,
    actualizarGrupoRequest,
    eliminarGrupoRequest,
    getAlumnosGrupoRequest,
    getSolicitudesGrupoRequest,
    aceptarAlumnoRequest,
    rechazarAlumnoRequest,
    eliminarAlumnoRequest,
} from "../../api/grupos";

import {
    getMateriasRequest,
} from "../../api/materias";

import type {
    Materia,
} from "../../api/materias";


/*
|--------------------------------------------------------------------------
| TIPO GRUPO
|--------------------------------------------------------------------------
*/

interface Grupo {

    id: number;

    nombre: string;

    materia_id: number;

    docente_id: number;

    codigo_acceso: string;

    semestre: string;

    periodo: string;

    activo: boolean;

    materia?: Materia;

}


/*
|--------------------------------------------------------------------------
| TIPO ALUMNO
|--------------------------------------------------------------------------
*/

interface AlumnoGrupo {

    id: number;

    nombre: string;

    apellido_paterno?: string | null;

    apellido_materno?: string | null;

    correo: string;

    foto_perfil?: string | null;

}


/*
|--------------------------------------------------------------------------
| TIPO SOLICITUD
|--------------------------------------------------------------------------
*/

interface Solicitud {

    id: number;

    grupo_id: number;

    user_id: number;

    estado: string;

    user: AlumnoGrupo;

}


/*
|--------------------------------------------------------------------------
| COMPONENTE
|--------------------------------------------------------------------------
*/

export default function Grupos() {


    /*
    |--------------------------------------------------------------------------
    | GRUPOS
    |--------------------------------------------------------------------------
    */

    const [
        grupos,
        setGrupos,
    ] = useState<Grupo[]>([]);


    const [
        cargando,
        setCargando,
    ] = useState(true);


    const [
        error,
        setError,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | BÚSQUEDA
    |--------------------------------------------------------------------------
    */

    const [
        busqueda,
        setBusqueda,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | COPIAR CÓDIGO
    |--------------------------------------------------------------------------
    */

    const [
        copiado,
        setCopiado,
    ] = useState<number | null>(null);


    /*
    |--------------------------------------------------------------------------
    | MODAL CREAR
    |--------------------------------------------------------------------------
    */

    const [
        mostrarModal,
        setMostrarModal,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | MATERIAS
    |--------------------------------------------------------------------------
    */

    const [
        materias,
        setMaterias,
    ] = useState<Materia[]>([]);


    const [
        cargandoMaterias,
        setCargandoMaterias,
    ] = useState(false);


    /*
    |--------------------------------------------------------------------------
    | FORMULARIO
    |--------------------------------------------------------------------------
    */

    const [
        materiaId,
        setMateriaId,
    ] = useState("");


    const [
        nombreGrupo,
        setNombreGrupo,
    ] = useState("");


    const [
        semestre,
        setSemestre,
    ] = useState("");


    const [
        periodo,
        setPeriodo,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | CREANDO
    |--------------------------------------------------------------------------
    */

    const [
        creando,
        setCreando,
    ] = useState(false);


    const [
        errorFormulario,
        setErrorFormulario,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | MENÚ DE GRUPO
    |--------------------------------------------------------------------------
    */

    const [
        menuGrupo,
        setMenuGrupo,
    ] = useState<number | null>(null);


    /*
    |--------------------------------------------------------------------------
    | MODAL ALUMNOS
    |--------------------------------------------------------------------------
    */

    const [
        mostrarAlumnos,
        setMostrarAlumnos,
    ] = useState(false);


    const [
        grupoSeleccionado,
        setGrupoSeleccionado,
    ] = useState<Grupo | null>(null);


    const [
        alumnos,
        setAlumnos,
    ] = useState<AlumnoGrupo[]>([]);


    const [
        cargandoAlumnos,
        setCargandoAlumnos,
    ] = useState(false);


    const [
        errorAlumnos,
        setErrorAlumnos,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | MODAL SOLICITUDES
    |--------------------------------------------------------------------------
    */

    const [
        mostrarSolicitudes,
        setMostrarSolicitudes,
    ] = useState(false);


    const [
        solicitudes,
        setSolicitudes,
    ] = useState<Solicitud[]>([]);


    const [
        cargandoSolicitudes,
        setCargandoSolicitudes,
    ] = useState(false);


    const [
        errorSolicitudes,
        setErrorSolicitudes,
    ] = useState("");


    /*
    |--------------------------------------------------------------------------
    | ALUMNO PROCESANDO
    |--------------------------------------------------------------------------
    */

    const [
        procesandoAlumno,
        setProcesandoAlumno,
    ] = useState<number | null>(null);

    /*
    |--------------------------------------------------------------------------
    | ALUMNO ELIMINANDO
    |--------------------------------------------------------------------------
    */

    const [
        eliminandoAlumno,
        setEliminandoAlumno,
    ] = useState<number | null>(null);

    /*
    |--------------------------------------------------------------------------
    | EDITAR / ELIMINAR GRUPO
    |--------------------------------------------------------------------------
    */

    const [
        mostrarEditar,
        setMostrarEditar,
    ] = useState(false);

    const [
        grupoEditando,
        setGrupoEditando,
    ] = useState<Grupo | null>(null);

    const [
        editando,
        setEditando,
    ] = useState(false);

    const [
        eliminandoGrupo,
        setEliminandoGrupo,
    ] = useState<number | null>(null);

    const [
        errorEditar,
        setErrorEditar,
    ] = useState("");

    /*
    |--------------------------------------------------------------------------
    | CONFIRMACIONES DE ELIMINACIÓN
    |--------------------------------------------------------------------------
    */

    const [
        grupoEliminar,
        setGrupoEliminar,
    ] = useState<Grupo | null>(null);

    const [
        alumnoEliminar,
        setAlumnoEliminar,
    ] = useState<AlumnoGrupo | null>(null);

    const [
        eliminandoConfirmacion,
        setEliminandoConfirmacion,
    ] = useState(false);




    /*
    |--------------------------------------------------------------------------
    | CARGAR GRUPOS
    |--------------------------------------------------------------------------
    */

    const cargarGrupos =
        async () => {

            try {

                setCargando(true);

                setError("");


                const respuesta =
                    await getGruposRequest();


                console.log(
                    "👥 Grupos del docente:",
                    respuesta
                );


                setGrupos(
                    Array.isArray(respuesta)
                        ? respuesta
                        : []
                );


            } catch (err) {

                console.error(
                    "❌ Error al cargar grupos:",
                    err
                );


                setError(
                    "No fue posible cargar los grupos."
                );


            } finally {

                setCargando(false);

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CARGAR GRUPOS AL INICIAR
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        cargarGrupos();

    }, []);


    /*
    |--------------------------------------------------------------------------
    | ABRIR MODAL CREAR
    |--------------------------------------------------------------------------
    */

    const abrirModal =
        async () => {

            setMostrarModal(true);

            setErrorFormulario("");

            setMateriaId("");

            setNombreGrupo("");

            setSemestre("");

            setPeriodo("");

            setCargandoMaterias(true);


            try {

                const respuesta =
                    await getMateriasRequest();


                console.log(
                    "📚 Materias disponibles:",
                    respuesta
                );


                setMaterias(
                    Array.isArray(respuesta)
                        ? respuesta
                        : []
                );


            } catch (error) {

                console.error(
                    "❌ Error al cargar materias:",
                    error
                );


                setErrorFormulario(
                    "No fue posible cargar tus materias."
                );


            } finally {

                setCargandoMaterias(false);

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CERRAR MODAL CREAR
    |--------------------------------------------------------------------------
    */

    const cerrarModal =
        () => {

            if (creando) {

                return;

            }


            setMostrarModal(false);

        };


    /*
    |--------------------------------------------------------------------------
    | CREAR GRUPO
    |--------------------------------------------------------------------------
    */

    const crearGrupo =
        async () => {

            setErrorFormulario("");


            if (!materiaId) {

                setErrorFormulario(
                    "Selecciona una materia."
                );

                return;

            }


            if (!nombreGrupo.trim()) {

                setErrorFormulario(
                    "Escribe el nombre del grupo."
                );

                return;

            }


            if (!semestre.trim()) {

                setErrorFormulario(
                    "Escribe el semestre."
                );

                return;

            }


            if (!periodo.trim()) {

                setErrorFormulario(
                    "Escribe el periodo."
                );

                return;

            }


            try {

                setCreando(true);


                const respuesta =
                    await crearGrupoRequest({

                        nombre:
                            nombreGrupo.trim(),

                        materia_id:
                            Number(materiaId),

                        semestre:
                            semestre.trim(),

                        periodo:
                            periodo.trim(),

                        activo:
                            true,

                    });


                console.log(
                    "✅ Grupo creado:",
                    respuesta
                );


                setMostrarModal(false);


                setMateriaId("");

                setNombreGrupo("");

                setSemestre("");

                setPeriodo("");


                await cargarGrupos();


            } catch (error: any) {

                console.error(
                    "❌ Error al crear grupo:",
                    error
                );


                const mensaje =
                    error?.response?.data?.message;


                setErrorFormulario(
                    mensaje ||
                    "No fue posible crear el grupo."
                );


            } finally {

                setCreando(false);

            }

        };


    /*
    |--------------------------------------------------------------------------
    | EDITAR GRUPO
    |--------------------------------------------------------------------------
    */

    const abrirEditarGrupo = async (grupo: Grupo) => {

        setMenuGrupo(null);

        setGrupoEditando(grupo);

        setMateriaId(String(grupo.materia_id));
        setNombreGrupo(grupo.nombre);
        setSemestre(grupo.semestre);
        setPeriodo(grupo.periodo);

        setErrorEditar("");
        setMostrarEditar(true);
        setCargandoMaterias(true);

        try {

            const respuesta = await getMateriasRequest();

            setMaterias(
                Array.isArray(respuesta)
                    ? respuesta
                    : []
            );

        } catch (error) {

            console.error(
                "❌ Error al cargar materias para editar:",
                error
            );

            setErrorEditar(
                "No fue posible cargar tus materias."
            );

        } finally {

            setCargandoMaterias(false);

        }

    };


    const cerrarEditarGrupo = () => {

        if (editando) {
            return;
        }

        setMostrarEditar(false);
        setGrupoEditando(null);

        setMateriaId("");
        setNombreGrupo("");
        setSemestre("");
        setPeriodo("");

        setErrorEditar("");

    };


    const guardarEdicionGrupo = async () => {

        setErrorEditar("");

        if (!grupoEditando) {
            return;
        }

        if (!materiaId) {
            setErrorEditar("Selecciona una materia.");
            return;
        }

        if (!nombreGrupo.trim()) {
            setErrorEditar("Escribe el nombre del grupo.");
            return;
        }

        if (!semestre.trim()) {
            setErrorEditar("Escribe el semestre.");
            return;
        }

        if (!periodo.trim()) {
            setErrorEditar("Escribe el periodo.");
            return;
        }

        try {

            setEditando(true);

            const respuesta = await actualizarGrupoRequest(
                grupoEditando.id,
                {
                    nombre: nombreGrupo.trim(),
                    materia_id: Number(materiaId),
                    semestre: semestre.trim(),
                    periodo: periodo.trim(),
                    activo: grupoEditando.activo,
                }
            );

            console.log(
                "✅ Grupo actualizado:",
                respuesta
            );

            const materiaSeleccionada =
                materias.find(
                    (materia) =>
                        materia.id === Number(materiaId)
                );

            const grupoActualizado =
                respuesta?.grupo;

            if (grupoActualizado) {

                setGrupos((actuales) =>
                    actuales.map((item) =>
                        item.id === grupoEditando.id
                            ? {
                                ...item,
                                ...grupoActualizado,
                                materia:
                                    materiaSeleccionada ||
                                    item.materia,
                            }
                            : item
                    )
                );

            } else {

                await cargarGrupos();

            }

            setMostrarEditar(false);
            setGrupoEditando(null);

            setMateriaId("");
            setNombreGrupo("");
            setSemestre("");
            setPeriodo("");

        } catch (error: any) {

            console.error(
                "❌ Error al actualizar grupo:",
                error
            );

            const mensaje =
                error?.response?.data?.message;

            setErrorEditar(
                mensaje ||
                "No fue posible actualizar el grupo."
            );

        } finally {

            setEditando(false);

        }

    };


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR GRUPO
    |--------------------------------------------------------------------------
    */

    const eliminarGrupo = (grupo: Grupo) => {

        setMenuGrupo(null);
        setGrupoEliminar(grupo);

    };


    const confirmarEliminarGrupo = async () => {

        if (!grupoEliminar) return;

        try {

            setEliminandoConfirmacion(true);
            setEliminandoGrupo(grupoEliminar.id);
            setError("");

            await eliminarGrupoRequest(
                grupoEliminar.id
            );

            setGrupos((actuales) =>
                actuales.filter(
                    (item) =>
                        item.id !== grupoEliminar.id
                )
            );

            setGrupoEliminar(null);

        } catch (error: any) {

            console.error(
                "❌ Error al eliminar grupo:",
                error
            );

            setError(
                error?.response?.data?.message ||
                "No fue posible eliminar el grupo."
            );

        } finally {

            setEliminandoGrupo(null);
            setEliminandoConfirmacion(false);

        }

    };


    const cancelarEliminarGrupo = () => {

        if (!eliminandoConfirmacion) {
            setGrupoEliminar(null);
        }

    };


    /*
    |--------------------------------------------------------------------------
    | VER ALUMNOS
    |--------------------------------------------------------------------------
    */

    const verAlumnos =
        async (
            grupo: Grupo
        ) => {

            setMenuGrupo(null);

            setGrupoSeleccionado(
                grupo
            );

            setMostrarAlumnos(
                true
            );

            setCargandoAlumnos(
                true
            );

            setErrorAlumnos("");

            setAlumnos([]);


            try {

                const respuesta =
                    await getAlumnosGrupoRequest(
                        grupo.id
                    );


                console.log(
                    "👥 Alumnos del grupo:",
                    respuesta
                );


                setAlumnos(

                    Array.isArray(
                        respuesta
                    )

                        ? respuesta
                            .map(
                                (
                                    registro: any
                                ) =>
                                    registro.user
                            )
                            .filter(Boolean)

                        : []

                );


            } catch (error) {

                console.error(
                    "❌ Error al cargar alumnos:",
                    error
                );


                setErrorAlumnos(
                    "No fue posible cargar los alumnos."
                );


            } finally {

                setCargandoAlumnos(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CERRAR MODAL ALUMNOS
    |--------------------------------------------------------------------------
    */

    const cerrarModalAlumnos =
        () => {

            setMostrarAlumnos(
                false
            );

            setGrupoSeleccionado(
                null
            );

            setAlumnos([]);

            setErrorAlumnos("");

        };


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR ALUMNO DEL GRUPO
    |--------------------------------------------------------------------------
    */

    const eliminarAlumno = (
        alumno: AlumnoGrupo
    ) => {

        setAlumnoEliminar(alumno);

    };


    const confirmarEliminarAlumno = async () => {

        if (
            !grupoSeleccionado ||
            !alumnoEliminar
        ) return;

        try {

            setEliminandoConfirmacion(true);
            setEliminandoAlumno(alumnoEliminar.id);
            setErrorAlumnos("");

            await eliminarAlumnoRequest(
                grupoSeleccionado.id,
                alumnoEliminar.id
            );

            setAlumnos((actuales) =>
                actuales.filter(
                    (item) =>
                        item.id !== alumnoEliminar.id
                )
            );

            setAlumnoEliminar(null);

        } catch (error: any) {

            console.error(
                "❌ Error al eliminar alumno:",
                error
            );

            setErrorAlumnos(
                error?.response?.data?.message ||
                "No fue posible eliminar al alumno del grupo."
            );

        } finally {

            setEliminandoAlumno(null);
            setEliminandoConfirmacion(false);

        }

    };


    const cancelarEliminarAlumno = () => {

        if (!eliminandoConfirmacion) {
            setAlumnoEliminar(null);
        }

    };


    /*
    |--------------------------------------------------------------------------
    | CARGAR SOLICITUDES
    |--------------------------------------------------------------------------
    */

    const verSolicitudes =
        async (
            grupo: Grupo
        ) => {

            setMenuGrupo(null);

            setGrupoSeleccionado(
                grupo
            );

            setMostrarSolicitudes(
                true
            );

            setCargandoSolicitudes(
                true
            );

            setErrorSolicitudes("");

            setSolicitudes([]);


            try {

                const respuesta =
                    await getSolicitudesGrupoRequest(
                        grupo.id
                    );


                console.log(
                    "📩 Solicitudes del grupo:",
                    respuesta
                );


                /*
                |--------------------------------------------------------------------------
                | Laravel devuelve:
                |
                | {
                |     grupo_id: 1,
                |     solicitudes: [...]
                | }
                |--------------------------------------------------------------------------
                */

                if (
                    Array.isArray(
                        respuesta?.solicitudes
                    )
                ) {

                    setSolicitudes(
                        respuesta.solicitudes
                    );

                } else {

                    setSolicitudes([]);

                }


            } catch (error) {

                console.error(
                    "❌ Error al cargar solicitudes:",
                    error
                );


                setErrorSolicitudes(
                    "No fue posible cargar las solicitudes."
                );


            } finally {

                setCargandoSolicitudes(
                    false
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | CERRAR SOLICITUDES
    |--------------------------------------------------------------------------
    */

    const cerrarSolicitudes =
        () => {

            setMostrarSolicitudes(
                false
            );

            setSolicitudes([]);

            setGrupoSeleccionado(
                null
            );

            setErrorSolicitudes("");

        };


    /*
    |--------------------------------------------------------------------------
    | ACEPTAR ALUMNO
    |--------------------------------------------------------------------------
    */

    const aceptarAlumno =
        async (
            solicitud: Solicitud
        ) => {

            if (
                !grupoSeleccionado
            ) {

                return;

            }


            try {

                setProcesandoAlumno(
                    solicitud.user_id
                );


                await aceptarAlumnoRequest(

                    grupoSeleccionado.id,

                    solicitud.user_id

                );


                console.log(
                    "✅ Alumno aceptado"
                );


                /*
                |--------------------------------------------------------------------------
                | QUITAR DE SOLICITUDES
                |--------------------------------------------------------------------------
                */

                setSolicitudes(
                    (actuales) =>
                        actuales.filter(
                            (item) =>
                                item.user_id !==
                                solicitud.user_id
                        )
                );


            } catch (error) {

                console.error(
                    "❌ Error al aceptar alumno:",
                    error
                );


                setErrorSolicitudes(
                    "No fue posible aceptar al alumno."
                );


            } finally {

                setProcesandoAlumno(
                    null
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | RECHAZAR ALUMNO
    |--------------------------------------------------------------------------
    */

    const rechazarAlumno =
        async (
            solicitud: Solicitud
        ) => {

            if (
                !grupoSeleccionado
            ) {

                return;

            }


            try {

                setProcesandoAlumno(
                    solicitud.user_id
                );


                await rechazarAlumnoRequest(

                    grupoSeleccionado.id,

                    solicitud.user_id

                );


                console.log(
                    "❌ Alumno rechazado"
                );


                setSolicitudes(
                    (actuales) =>
                        actuales.filter(
                            (item) =>
                                item.user_id !==
                                solicitud.user_id
                        )
                );


            } catch (error) {

                console.error(
                    "❌ Error al rechazar alumno:",
                    error
                );


                setErrorSolicitudes(
                    "No fue posible rechazar al alumno."
                );


            } finally {

                setProcesandoAlumno(
                    null
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | COPIAR CÓDIGO
    |--------------------------------------------------------------------------
    */

    const copiarCodigo =
        async (
            grupo: Grupo
        ) => {

            try {

                await navigator.clipboard.writeText(
                    grupo.codigo_acceso
                );


                setCopiado(
                    grupo.id
                );


                setTimeout(() => {

                    setCopiado(
                        null
                    );

                }, 2000);


            } catch (error) {

                console.error(
                    "❌ No se pudo copiar el código:",
                    error
                );

            }

        };


    /*
    |--------------------------------------------------------------------------
    | FILTRAR GRUPOS
    |--------------------------------------------------------------------------
    */

    const gruposFiltrados =
        grupos.filter(
            (
                grupo
            ) => {

                const texto =
                    busqueda
                        .toLowerCase()
                        .trim();


                if (!texto) {

                    return true;

                }


                return (

                    grupo.nombre
                        ?.toLowerCase()
                        .includes(texto)

                    ||

                    grupo.materia?.nombre
                        ?.toLowerCase()
                        .includes(texto)

                    ||

                    grupo.codigo_acceso
                        ?.toLowerCase()
                        .includes(texto)

                );

            }
        );


    /*
    |--------------------------------------------------------------------------
    | NOMBRE COMPLETO
    |--------------------------------------------------------------------------
    */

    const obtenerNombre =
        (
            alumno: AlumnoGrupo
        ) => {

            return [

                alumno.nombre,

                alumno.apellido_paterno,

                alumno.apellido_materno,

            ]
                .filter(Boolean)
                .join(" ");

        };


    /*
    |--------------------------------------------------------------------------
    | RENDER
    |--------------------------------------------------------------------------
    */

    return (

        <div
            className="
                relative
                w-full
                min-h-full
                pb-8
                text-[var(--nexus-text)]
                transition-colors
                duration-300
            "
        >


            {/* =====================================================
                ENCABEZADO
            ===================================================== */}

            <section
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    p-7
                    lg:p-9
                    mb-7
                    border
                    border-[var(--nexus-border)]
                    bg-[var(--nexus-surface)]
                "
            >

                <div
                    className="
                        absolute
                        -top-24
                        -right-24
                        w-72
                        h-72
                        rounded-full
                        bg-blue-600/10
                        blur-3xl
                        pointer-events-none
                    "
                />


                <div
                    className="
                        absolute
                        -bottom-28
                        right-1/4
                        w-64
                        h-64
                        rounded-full
                        bg-violet-600/[0.07]
                        blur-3xl
                        pointer-events-none
                    "
                />


                <div
                    className="
                        relative
                        z-10
                        flex
                        flex-col
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                        gap-6
                    "
                >

                    <div>

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-blue-500/10
                                border
                                border-blue-500/15
                                text-blue-500
                                text-[11px]
                                font-medium
                                mb-4
                            "
                        >

                            <Users size={13} />

                            Gestión de grupos

                        </div>


                        <h1
                            className="
                                text-3xl
                                sm:text-4xl
                                font-black
                                tracking-tight
                                text-[var(--nexus-text)]
                            "
                        >

                            Mis grupos

                        </h1>


                        <p
                            className="
                                mt-3
                                max-w-2xl
                                text-sm
                                sm:text-base
                                leading-relaxed
                                text-[var(--nexus-text-secondary)]
                            "
                        >

                            Organiza tus alumnos por grupos,
                            genera códigos de acceso y administra
                            sus solicitudes de ingreso.

                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={
                            abrirModal
                        }
                        className="
                            shrink-0
                            inline-flex
                            items-center
                            justify-center
                            gap-2.5
                            px-5
                            py-3
                            rounded-xl
                            bg-violet-600
                            hover:bg-violet-500
                            text-sm
                            font-semibold
                            text-white
                            shadow-[0_10px_30px_rgba(139,92,246,0.22)]
                            hover:shadow-[0_12px_35px_rgba(139,92,246,0.32)]
                            transition-all
                        "
                    >

                        <Plus
                            size={18}
                        />

                        Crear grupo

                    </button>

                </div>

            </section>


            {/* =====================================================
                BÚSQUEDA
            ===================================================== */}

            <section
                className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    mb-6
                "
            >

                <div>

                    <h2
                        className="
                            text-lg
                            font-bold
                            text-[var(--nexus-text)]
                        "
                    >

                        Tus grupos

                    </h2>


                    <p
                        className="
                            mt-1
                            text-xs
                            text-[var(--nexus-text-secondary)]
                        "
                    >

                        {grupos.length}{" "}

                        {
                            grupos.length === 1
                                ? "grupo registrado"
                                : "grupos registrados"
                        }

                    </p>

                </div>


                <div
                    className="
                        relative
                        w-full
                        sm:w-80
                    "
                >

                    <Search
                        size={17}
                        className="
                            absolute
                            left-3.5
                            top-1/2
                            -translate-y-1/2
                            text-[var(--nexus-text-muted)]
                        "
                    />


                    <input
                        type="text"
                        value={
                            busqueda
                        }
                        onChange={
                            (e) =>
                                setBusqueda(
                                    e.target.value
                                )
                        }
                        placeholder="Buscar grupo..."
                        className="
                            w-full
                            h-11
                            pl-10
                            pr-4
                            rounded-xl
                            bg-[var(--nexus-surface)]
                            border
                            border-[var(--nexus-border)]
                            text-sm
                            text-[var(--nexus-text)]
                            placeholder:text-[var(--nexus-text-muted)]
                            outline-none
                            focus:border-violet-500/40
                            transition-all
                        "
                    />

                </div>

            </section>


            {/* =====================================================
                CARGANDO
            ===================================================== */}

            {
                cargando && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--nexus-border)]
                            bg-[var(--nexus-surface)]
                            p-12
                            flex
                            flex-col
                            items-center
                            justify-center
                        "
                    >

                        <div
                            className="
                                w-10
                                h-10
                                rounded-full
                                border-2
                                border-violet-500/20
                                border-t-violet-500
                                animate-spin
                            "
                        />


                        <p
                            className="
                                mt-4
                                text-sm
                                text-[var(--nexus-text-secondary)]
                            "
                        >

                            Cargando grupos...

                        </p>

                    </div>

                )
            }


            {/* =====================================================
                ERROR
            ===================================================== */}

            {
                !cargando &&
                error && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-red-500/15
                            bg-red-500/[0.04]
                            p-6
                        "
                    >

                        <p
                            className="
                                text-sm
                                font-medium
                                text-red-400
                            "
                        >

                            {error}

                        </p>

                    </div>

                )
            }


            {/* =====================================================
                SIN GRUPOS
            ===================================================== */}

            {
                !cargando &&
                !error &&
                gruposFiltrados.length === 0 && (

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--nexus-border)]
                            bg-[var(--nexus-surface)]
                            p-12
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                        "
                    >

                        <div
                            className="
                                w-16
                                h-16
                                rounded-2xl
                                flex
                                items-center
                                justify-center
                                bg-violet-500/10
                                text-violet-500
                            "
                        >

                            <Users
                                size={28}
                            />

                        </div>


                        <h3
                            className="
                                mt-5
                                text-lg
                                font-bold
                                text-[var(--nexus-text)]
                            "
                        >

                            {
                                busqueda
                                    ? "No encontramos grupos"
                                    : "Todavía no tienes grupos"
                            }

                        </h3>


                        <p
                            className="
                                mt-2
                                max-w-md
                                text-sm
                                leading-relaxed
                                text-[var(--nexus-text-secondary)]
                            "
                        >

                            {
                                busqueda
                                    ? "Prueba con otro nombre, materia o código."
                                    : "Crea tu primer grupo para comenzar a organizar a tus alumnos."
                            }

                        </p>


                        {
                            !busqueda && (

                                <button
                                    type="button"
                                    onClick={
                                        abrirModal
                                    }
                                    className="
                                        mt-6
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-5
                                        py-2.5
                                        rounded-xl
                                        bg-violet-600
                                        hover:bg-violet-500
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition-all
                                    "
                                >

                                    <Plus
                                        size={17}
                                    />

                                    Crear primer grupo

                                </button>

                            )
                        }

                    </div>

                )
            }


            {/* =====================================================
                GRUPOS
            ===================================================== */}

            {
                !cargando &&
                !error &&
                gruposFiltrados.length > 0 && (

                    <section
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            xl:grid-cols-3
                            gap-5
                        "
                    >

                        {
                            gruposFiltrados.map(
                                (
                                    grupo
                                ) => (

                                    <article
                                        key={
                                            grupo.id
                                        }
                                        className="
                                            group
                                            relative
                                            overflow-visible
                                            rounded-2xl
                                            bg-[var(--nexus-surface)]
                                            border
                                            border-[var(--nexus-border)]
                                            hover:border-violet-500/20
                                            transition-all
                                            duration-200
                                        "
                                    >

                                        {/* BARRA */}

                                        <div
                                            className="
                                                relative
                                                h-2
                                                overflow-hidden
                                                rounded-t-2xl
                                                bg-gradient-to-r
                                                from-violet-600
                                                to-blue-500
                                            "
                                        />


                                        <div
                                            className="
                                                p-5
                                            "
                                        >

                                            {/* CABECERA */}

                                            <div
                                                className="
                                                    flex
                                                    items-start
                                                    justify-between
                                                    gap-4
                                                "
                                            >

                                                <div
                                                    className="
                                                        min-w-0
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            inline-flex
                                                            items-center
                                                            gap-1.5
                                                            px-2.5
                                                            py-1
                                                            rounded-lg
                                                            bg-violet-500/10
                                                            text-violet-500
                                                            text-[10px]
                                                            font-semibold
                                                        "
                                                    >

                                                        <BookOpen
                                                            size={12}
                                                        />

                                                        {
                                                            grupo.materia?.nombre ||
                                                            "Materia"
                                                        }

                                                    </div>


                                                    <h3
                                                        className="
                                                            mt-3
                                                            text-lg
                                                            font-bold
                                                            truncate
                                                            text-[var(--nexus-text)]
                                                        "
                                                    >

                                                        {
                                                            grupo.nombre
                                                        }

                                                    </h3>

                                                </div>


                                                {/* =================================================
                                                    BOTÓN MENÚ
                                                ================================================= */}

                                                <div
                                                    className="
                                                        relative
                                                        shrink-0
                                                    "
                                                >

                                                    <button
                                                        type="button"
                                                        onClick={() => {

                                                            setMenuGrupo(
                                                                menuGrupo ===
                                                                    grupo.id
                                                                    ? null
                                                                    : grupo.id
                                                            );

                                                        }}
                                                        className="
                                                            w-9
                                                            h-9
                                                            rounded-lg
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-[var(--nexus-text-muted)]
                                                            hover:text-[var(--nexus-text)]
                                                            hover:bg-[var(--nexus-surface-2)]
                                                            transition-all
                                                        "
                                                        title="Opciones del grupo"
                                                    >

                                                        <MoreVertical
                                                            size={18}
                                                        />

                                                    </button>


                                                    {/* MENÚ */}

                                                    {
                                                        menuGrupo ===
                                                            grupo.id && (

                                                            <div
                                                                className="
                                                                    absolute
                                                                    right-0
                                                                    top-11
                                                                    z-50
                                                                    w-52
                                                                    rounded-xl
                                                                    overflow-hidden
                                                                    bg-[var(--nexus-surface)]
                                                                    border
                                                                    border-[var(--nexus-border)]
                                                                    shadow-2xl
                                                                "
                                                            >

                                                                {/* VER ALUMNOS */}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        verAlumnos(
                                                                            grupo
                                                                        )
                                                                    }
                                                                    className="
                                                                        w-full
                                                                        flex
                                                                        items-center
                                                                        gap-3
                                                                        px-4
                                                                        py-3
                                                                        text-left
                                                                        text-sm
                                                                        text-[var(--nexus-text-secondary)]
                                                                        hover:text-[var(--nexus-text)]
                                                                        hover:bg-[var(--nexus-surface-2)]
                                                                        transition-all
                                                                    "
                                                                >

                                                                    <Users
                                                                        size={17}
                                                                    />

                                                                    <span>

                                                                        Ver alumnos

                                                                    </span>

                                                                </button>


                                                                {/* SOLICITUDES */}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        verSolicitudes(
                                                                            grupo
                                                                        )
                                                                    }
                                                                    className="
                                                                        w-full
                                                                        flex
                                                                        items-center
                                                                        gap-3
                                                                        px-4
                                                                        py-3
                                                                        text-left
                                                                        text-sm
                                                                        text-[var(--nexus-text-secondary)]
                                                                        hover:text-[var(--nexus-text)]
                                                                        hover:bg-[var(--nexus-surface-2)]
                                                                        transition-all
                                                                    "
                                                                >

                                                                    <UserPlus
                                                                        size={17}
                                                                    />

                                                                    <span>

                                                                        Solicitudes

                                                                    </span>

                                                                </button>


                                                                <div
                                                                    className="
                                                                        h-px
                                                                        bg-[var(--nexus-border)]
                                                                    "
                                                                />


                                                                {/* EDITAR */}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        abrirEditarGrupo(
                                                                            grupo
                                                                        )
                                                                    }
                                                                    className="
                                                                        w-full
                                                                        flex
                                                                        items-center
                                                                        gap-3
                                                                        px-4
                                                                        py-3
                                                                        text-left
                                                                        text-sm
                                                                        text-[var(--nexus-text-secondary)]
                                                                        hover:text-[var(--nexus-text)]
                                                                        hover:bg-[var(--nexus-surface-2)]
                                                                        transition-all
                                                                    "
                                                                >

                                                                    <Pencil
                                                                        size={17}
                                                                    />

                                                                    <span>

                                                                        Editar grupo

                                                                    </span>

                                                                </button>


                                                                {/* ELIMINAR */}

                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        eliminarGrupo(
                                                                            grupo
                                                                        )
                                                                    }
                                                                    disabled={
                                                                        eliminandoGrupo ===
                                                                        grupo.id
                                                                    }
                                                                    className="
                                                                        w-full
                                                                        flex
                                                                        items-center
                                                                        gap-3
                                                                        px-4
                                                                        py-3
                                                                        text-left
                                                                        text-sm
                                                                        text-red-400
                                                                        hover:bg-red-500/5
                                                                        transition-all
                                                                    "
                                                                >

                                                                    <Trash2
                                                                        size={17}
                                                                    />

                                                                    <span>

                                                                        {
                                                                            eliminandoGrupo ===
                                                                            grupo.id
                                                                                ? "Eliminando..."
                                                                                : "Eliminar grupo"
                                                                        }

                                                                    </span>

                                                                </button>

                                                            </div>

                                                        )
                                                    }

                                                </div>

                                            </div>


                                            {/* SEMESTRE / PERIODO */}

                                            <div
                                                className="
                                                    mt-5
                                                    grid
                                                    grid-cols-2
                                                    gap-3
                                                "
                                            >

                                                <div
                                                    className="
                                                        rounded-xl
                                                        p-3
                                                        bg-[var(--nexus-surface-2)]
                                                        border
                                                        border-[var(--nexus-border)]
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-[10px]
                                                            text-[var(--nexus-text-muted)]
                                                        "
                                                    >

                                                        Semestre

                                                    </p>


                                                    <p
                                                        className="
                                                            mt-1
                                                            text-sm
                                                            font-semibold
                                                            text-[var(--nexus-text)]
                                                        "
                                                    >

                                                        {
                                                            grupo.semestre
                                                        }

                                                    </p>

                                                </div>


                                                <div
                                                    className="
                                                        rounded-xl
                                                        p-3
                                                        bg-[var(--nexus-surface-2)]
                                                        border
                                                        border-[var(--nexus-border)]
                                                    "
                                                >

                                                    <p
                                                        className="
                                                            text-[10px]
                                                            text-[var(--nexus-text-muted)]
                                                        "
                                                    >

                                                        Periodo

                                                    </p>


                                                    <p
                                                        className="
                                                            mt-1
                                                            text-sm
                                                            font-semibold
                                                            truncate
                                                            text-[var(--nexus-text)]
                                                        "
                                                    >

                                                        {
                                                            grupo.periodo
                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            {/* CÓDIGO */}

                                            <div
                                                className="
                                                    mt-4
                                                    rounded-xl
                                                    p-4
                                                    bg-violet-500/[0.05]
                                                    border
                                                    border-violet-500/10
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        gap-3
                                                    "
                                                >

                                                    <div>

                                                        <p
                                                            className="
                                                                text-[10px]
                                                                font-medium
                                                                text-[var(--nexus-text-muted)]
                                                            "
                                                        >

                                                            Código de acceso

                                                        </p>


                                                        <p
                                                            className="
                                                                mt-1
                                                                text-xl
                                                                font-black
                                                                tracking-[0.18em]
                                                                text-violet-500
                                                            "
                                                        >

                                                            {
                                                                grupo.codigo_acceso
                                                            }

                                                        </p>

                                                    </div>


                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            copiarCodigo(
                                                                grupo
                                                            )
                                                        }
                                                        className="
                                                            w-10
                                                            h-10
                                                            rounded-xl
                                                            flex
                                                            items-center
                                                            justify-center
                                                            bg-[var(--nexus-surface)]
                                                            border
                                                            border-[var(--nexus-border)]
                                                            text-[var(--nexus-text-secondary)]
                                                            hover:text-violet-500
                                                            hover:border-violet-500/20
                                                            transition-all
                                                        "
                                                        title="Copiar código"
                                                    >

                                                        {
                                                            copiado ===
                                                            grupo.id
                                                                ? (

                                                                    <CheckCircle2
                                                                        size={18}
                                                                        className="
                                                                            text-emerald-500
                                                                        "
                                                                    />

                                                                )
                                                                : (

                                                                    <Copy
                                                                        size={18}
                                                                    />

                                                                )
                                                        }

                                                    </button>

                                                </div>

                                            </div>


                                            {/* PIE */}

                                            <div
                                                className="
                                                    mt-4
                                                    flex
                                                    items-center
                                                    justify-between
                                                "
                                            >

                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    <span
                                                        className={`
                                                            w-2
                                                            h-2
                                                            rounded-full
                                                            ${
                                                                grupo.activo
                                                                    ? "bg-emerald-500"
                                                                    : "bg-slate-500"
                                                            }
                                                        `}
                                                    />


                                                    <span
                                                        className="
                                                            text-xs
                                                            text-[var(--nexus-text-secondary)]
                                                        "
                                                    >

                                                        {
                                                            grupo.activo
                                                                ? "Grupo activo"
                                                                : "Grupo inactivo"
                                                        }

                                                    </span>

                                                </div>


                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-1.5
                                                        text-xs
                                                        text-[var(--nexus-text-muted)]
                                                    "
                                                >

                                                    <Users
                                                        size={14}
                                                    />

                                                    Alumnos

                                                </div>

                                            </div>

                                        </div>

                                    </article>

                                )
                            )
                        }

                    </section>

                )
            }


            {/* =====================================================
                MODAL CREAR GRUPO
            ===================================================== */}

            {
                mostrarModal && (

                    <div
                        className="
                            fixed
                            inset-0
                            z-[100]
                            flex
                            items-center
                            justify-center
                            p-4
                            bg-black/60
                            backdrop-blur-sm
                        "
                        onMouseDown={
                            (e) => {

                                if (
                                    e.target ===
                                    e.currentTarget
                                ) {

                                    cerrarModal();

                                }

                            }
                        }
                    >

                        <div
                            className="
                                relative
                                w-full
                                max-w-lg
                                max-h-[90vh]
                                overflow-y-auto
                                rounded-3xl
                                bg-[var(--nexus-surface)]
                                border
                                border-[var(--nexus-border)]
                                shadow-2xl
                            "
                        >

                            {/* CABECERA */}

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    p-6
                                    border-b
                                    border-[var(--nexus-border)]
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        -top-20
                                        -right-20
                                        w-48
                                        h-48
                                        rounded-full
                                        bg-violet-600/10
                                        blur-3xl
                                        pointer-events-none
                                    "
                                />


                                <div
                                    className="
                                        relative
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                w-11
                                                h-11
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                bg-violet-500/10
                                                text-violet-500
                                            "
                                        >

                                            <Users
                                                size={21}
                                            />

                                        </div>


                                        <div>

                                            <h2
                                                className="
                                                    text-lg
                                                    font-bold
                                                    text-[var(--nexus-text)]
                                                "
                                            >

                                                Crear nuevo grupo

                                            </h2>


                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >

                                                Asocia el grupo con una de
                                                tus materias.

                                            </p>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            cerrarModal
                                        }
                                        disabled={
                                            creando
                                        }
                                        className="
                                            w-9
                                            h-9
                                            rounded-lg
                                            flex
                                            items-center
                                            justify-center
                                            text-[var(--nexus-text-muted)]
                                            hover:text-[var(--nexus-text)]
                                            hover:bg-[var(--nexus-surface-2)]
                                            transition-all
                                        "
                                    >

                                        <X
                                            size={19}
                                        />

                                    </button>

                                </div>

                            </div>


                            {/* FORMULARIO */}

                            <div
                                className="
                                    p-6
                                    space-y-5
                                "
                            >

                                {
                                    errorFormulario && (

                                        <div
                                            className="
                                                rounded-xl
                                                border
                                                border-red-500/20
                                                bg-red-500/[0.05]
                                                px-4
                                                py-3
                                            "
                                        >

                                            <p
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-red-400
                                                "
                                            >

                                                {
                                                    errorFormulario
                                                }

                                            </p>

                                        </div>

                                    )
                                }


                                {/* MATERIA */}

                                <div>

                                    <label
                                        className="
                                            block
                                            mb-2
                                            text-xs
                                            font-semibold
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >

                                        Materia

                                    </label>


                                    <div
                                        className="
                                            relative
                                        "
                                    >

                                        <BookOpen
                                            size={16}
                                            className="
                                                absolute
                                                left-3.5
                                                top-1/2
                                                -translate-y-1/2
                                                text-[var(--nexus-text-muted)]
                                                pointer-events-none
                                            "
                                        />


                                        <select
                                            value={
                                                materiaId
                                            }
                                            onChange={
                                                (e) =>
                                                    setMateriaId(
                                                        e.target.value
                                                    )
                                            }
                                            disabled={
                                                cargandoMaterias ||
                                                creando
                                            }
                                            className="
                                                w-full
                                                h-12
                                                pl-10
                                                pr-4
                                                rounded-xl
                                                bg-[var(--nexus-surface-2)]
                                                border
                                                border-[var(--nexus-border)]
                                                text-sm
                                                text-[var(--nexus-text)]
                                                outline-none
                                                focus:border-violet-500/40
                                                transition-all
                                            "
                                        >

                                            <option
                                                value=""
                                            >

                                                {
                                                    cargandoMaterias
                                                        ? "Cargando materias..."
                                                        : materias.length === 0
                                                            ? "No tienes materias disponibles"
                                                            : "Selecciona una materia"
                                                }

                                            </option>


                                            {
                                                materias.map(
                                                    (
                                                        materia
                                                    ) => (

                                                        <option
                                                            key={
                                                                materia.id
                                                            }
                                                            value={
                                                                materia.id
                                                            }
                                                        >

                                                            {
                                                                materia.nombre
                                                            }

                                                        </option>

                                                    )
                                                )
                                            }

                                        </select>

                                    </div>

                                </div>


                                {/* NOMBRE */}

                                <div>

                                    <label
                                        className="
                                            block
                                            mb-2
                                            text-xs
                                            font-semibold
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >

                                        Nombre del grupo

                                    </label>


                                    <div
                                        className="
                                            relative
                                        "
                                    >

                                        <Users
                                            size={16}
                                            className="
                                                absolute
                                                left-3.5
                                                top-1/2
                                                -translate-y-1/2
                                                text-[var(--nexus-text-muted)]
                                            "
                                        />


                                        <input
                                            type="text"
                                            value={
                                                nombreGrupo
                                            }
                                            onChange={
                                                (e) =>
                                                    setNombreGrupo(
                                                        e.target.value
                                                    )
                                            }
                                            disabled={
                                                creando
                                            }
                                            placeholder="Ej. 5A"
                                            maxLength={
                                                255
                                            }
                                            className="
                                                w-full
                                                h-12
                                                pl-10
                                                pr-4
                                                rounded-xl
                                                bg-[var(--nexus-surface-2)]
                                                border
                                                border-[var(--nexus-border)]
                                                text-sm
                                                text-[var(--nexus-text)]
                                                placeholder:text-[var(--nexus-text-muted)]
                                                outline-none
                                                focus:border-violet-500/40
                                                transition-all
                                            "
                                        />

                                    </div>

                                </div>


                                {/* SEMESTRE / PERIODO */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-4
                                    "
                                >

                                    <div>

                                        <label
                                            className="
                                                block
                                                mb-2
                                                text-xs
                                                font-semibold
                                                text-[var(--nexus-text-secondary)]
                                            "
                                        >

                                            Semestre

                                        </label>


                                        <div
                                            className="
                                                relative
                                            "
                                        >

                                            <GraduationCap
                                                size={16}
                                                className="
                                                    absolute
                                                    left-3.5
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-[var(--nexus-text-muted)]
                                                "
                                            />


                                            <input
                                                type="text"
                                                value={
                                                    semestre
                                                }
                                                onChange={
                                                    (e) =>
                                                        setSemestre(
                                                            e.target.value
                                                        )
                                                }
                                                disabled={
                                                    creando
                                                }
                                                placeholder="Ej. 5"
                                                maxLength={
                                                    50
                                                }
                                                className="
                                                    w-full
                                                    h-12
                                                    pl-10
                                                    pr-3
                                                    rounded-xl
                                                    bg-[var(--nexus-surface-2)]
                                                    border
                                                    border-[var(--nexus-border)]
                                                    text-sm
                                                    text-[var(--nexus-text)]
                                                    placeholder:text-[var(--nexus-text-muted)]
                                                    outline-none
                                                    focus:border-violet-500/40
                                                    transition-all
                                                "
                                            />

                                        </div>

                                    </div>


                                    <div>

                                        <label
                                            className="
                                                block
                                                mb-2
                                                text-xs
                                                font-semibold
                                                text-[var(--nexus-text-secondary)]
                                            "
                                        >

                                            Periodo

                                        </label>


                                        <div
                                            className="
                                                relative
                                            "
                                        >

                                            <CalendarDays
                                                size={16}
                                                className="
                                                    absolute
                                                    left-3.5
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-[var(--nexus-text-muted)]
                                                "
                                            />


                                            <input
                                                type="text"
                                                value={
                                                    periodo
                                                }
                                                onChange={
                                                    (e) =>
                                                        setPeriodo(
                                                            e.target.value
                                                        )
                                                }
                                                disabled={
                                                    creando
                                                }
                                                placeholder="Ej. Enero-Junio"
                                                maxLength={
                                                    100
                                                }
                                                className="
                                                    w-full
                                                    h-12
                                                    pl-10
                                                    pr-3
                                                    rounded-xl
                                                    bg-[var(--nexus-surface-2)]
                                                    border
                                                    border-[var(--nexus-border)]
                                                    text-sm
                                                    text-[var(--nexus-text)]
                                                    placeholder:text-[var(--nexus-text-muted)]
                                                    outline-none
                                                    focus:border-violet-500/40
                                                    transition-all
                                                "
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* INFORMACIÓN */}

                                <div
                                    className="
                                        rounded-xl
                                        p-4
                                        bg-violet-500/[0.05]
                                        border
                                        border-violet-500/10
                                    "
                                >

                                    <p
                                        className="
                                            text-xs
                                            leading-relaxed
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >

                                        <span
                                            className="
                                                font-semibold
                                                text-violet-500
                                            "
                                        >

                                            Código de acceso:

                                        </span>{" "}

                                        NEXUS generará automáticamente
                                        un código único para que tus
                                        alumnos puedan solicitar unirse
                                        al grupo.

                                    </p>

                                </div>

                            </div>


                            {/* BOTONES */}

                            <div
                                className="
                                    flex
                                    flex-col-reverse
                                    sm:flex-row
                                    sm:justify-end
                                    gap-3
                                    p-6
                                    pt-0
                                "
                            >

                                <button
                                    type="button"
                                    onClick={
                                        cerrarModal
                                    }
                                    disabled={
                                        creando
                                    }
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        border
                                        border-[var(--nexus-border)]
                                        bg-[var(--nexus-surface-2)]
                                        text-sm
                                        font-semibold
                                        text-[var(--nexus-text-secondary)]
                                        hover:text-[var(--nexus-text)]
                                        transition-all
                                        disabled:opacity-50
                                    "
                                >

                                    Cancelar

                                </button>


                                <button
                                    type="button"
                                    onClick={
                                        crearGrupo
                                    }
                                    disabled={
                                        creando ||
                                        cargandoMaterias ||
                                        materias.length === 0
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-violet-600
                                        hover:bg-violet-500
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition-all
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                    "
                                >

                                    {
                                        creando
                                            ? (

                                                <>

                                                    <Loader2
                                                        size={17}
                                                        className="
                                                            animate-spin
                                                        "
                                                    />

                                                    Creando...

                                                </>

                                            )
                                            : (

                                                <>

                                                    <Plus
                                                        size={17}
                                                    />

                                                    Crear grupo

                                                </>

                                            )
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }


            {/* =====================================================
                MODAL EDITAR GRUPO
            ===================================================== */}

            {
                mostrarEditar && grupoEditando && (

                    <div
                        className="
                            fixed
                            inset-0
                            z-[105]
                            flex
                            items-center
                            justify-center
                            p-4
                            bg-black/60
                            backdrop-blur-sm
                        "
                        onMouseDown={(e) => {
                            if (e.target === e.currentTarget) {
                                cerrarEditarGrupo();
                            }
                        }}
                    >

                        <div
                            className="
                                relative
                                w-full
                                max-w-lg
                                max-h-[90vh]
                                overflow-y-auto
                                rounded-3xl
                                bg-[var(--nexus-surface)]
                                border
                                border-[var(--nexus-border)]
                                shadow-2xl
                            "
                        >

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    p-6
                                    border-b
                                    border-[var(--nexus-border)]
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        -top-20
                                        -right-20
                                        w-48
                                        h-48
                                        rounded-full
                                        bg-blue-600/10
                                        blur-3xl
                                        pointer-events-none
                                    "
                                />

                                <div
                                    className="
                                        relative
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                w-11
                                                h-11
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                bg-blue-500/10
                                                text-blue-500
                                            "
                                        >
                                            <Pencil size={20} />
                                        </div>

                                        <div>

                                            <h2
                                                className="
                                                    text-lg
                                                    font-bold
                                                    text-[var(--nexus-text)]
                                                "
                                            >
                                                Editar grupo
                                            </h2>

                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >
                                                Modifica la información del grupo.
                                            </p>

                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={cerrarEditarGrupo}
                                        disabled={editando}
                                        className="
                                            w-9
                                            h-9
                                            rounded-lg
                                            flex
                                            items-center
                                            justify-center
                                            text-[var(--nexus-text-muted)]
                                            hover:text-[var(--nexus-text)]
                                            hover:bg-[var(--nexus-surface-2)]
                                            transition-all
                                            disabled:opacity-50
                                        "
                                    >
                                        <X size={19} />
                                    </button>

                                </div>

                            </div>

                            <div
                                className="
                                    p-6
                                    space-y-5
                                "
                            >

                                {
                                    errorEditar && (

                                        <div
                                            className="
                                                rounded-xl
                                                border
                                                border-red-500/20
                                                bg-red-500/[0.05]
                                                px-4
                                                py-3
                                            "
                                        >
                                            <p
                                                className="
                                                    text-xs
                                                    font-medium
                                                    text-red-400
                                                "
                                            >
                                                {errorEditar}
                                            </p>
                                        </div>

                                    )
                                }


                                {/* MATERIA */}

                                <div>

                                    <label
                                        className="
                                            block
                                            mb-2
                                            text-xs
                                            font-semibold
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >
                                        Materia
                                    </label>

                                    <div className="relative">

                                        <BookOpen
                                            size={16}
                                            className="
                                                absolute
                                                left-3.5
                                                top-1/2
                                                -translate-y-1/2
                                                text-[var(--nexus-text-muted)]
                                                pointer-events-none
                                            "
                                        />

                                        <select
                                            value={materiaId}
                                            onChange={(e) =>
                                                setMateriaId(
                                                    e.target.value
                                                )
                                            }
                                            disabled={
                                                cargandoMaterias ||
                                                editando
                                            }
                                            className="
                                                w-full
                                                h-12
                                                pl-10
                                                pr-4
                                                rounded-xl
                                                bg-[var(--nexus-surface-2)]
                                                border
                                                border-[var(--nexus-border)]
                                                text-sm
                                                text-[var(--nexus-text)]
                                                outline-none
                                                focus:border-violet-500/40
                                                transition-all
                                            "
                                        >

                                            <option value="">
                                                {
                                                    cargandoMaterias
                                                        ? "Cargando materias..."
                                                        : "Selecciona una materia"
                                                }
                                            </option>

                                            {
                                                materias.map(
                                                    (materia) => (
                                                        <option
                                                            key={materia.id}
                                                            value={materia.id}
                                                        >
                                                            {materia.nombre}
                                                        </option>
                                                    )
                                                )
                                            }

                                        </select>

                                    </div>

                                </div>


                                {/* NOMBRE */}

                                <div>

                                    <label
                                        className="
                                            block
                                            mb-2
                                            text-xs
                                            font-semibold
                                            text-[var(--nexus-text-secondary)]
                                        "
                                    >
                                        Nombre del grupo
                                    </label>

                                    <div className="relative">

                                        <Users
                                            size={16}
                                            className="
                                                absolute
                                                left-3.5
                                                top-1/2
                                                -translate-y-1/2
                                                text-[var(--nexus-text-muted)]
                                            "
                                        />

                                        <input
                                            type="text"
                                            value={nombreGrupo}
                                            onChange={(e) =>
                                                setNombreGrupo(
                                                    e.target.value
                                                )
                                            }
                                            disabled={editando}
                                            maxLength={255}
                                            className="
                                                w-full
                                                h-12
                                                pl-10
                                                pr-4
                                                rounded-xl
                                                bg-[var(--nexus-surface-2)]
                                                border
                                                border-[var(--nexus-border)]
                                                text-sm
                                                text-[var(--nexus-text)]
                                                outline-none
                                                focus:border-violet-500/40
                                                transition-all
                                            "
                                        />

                                    </div>

                                </div>


                                {/* SEMESTRE / PERIODO */}

                                <div
                                    className="
                                        grid
                                        grid-cols-1
                                        sm:grid-cols-2
                                        gap-4
                                    "
                                >

                                    <div>

                                        <label
                                            className="
                                                block
                                                mb-2
                                                text-xs
                                                font-semibold
                                                text-[var(--nexus-text-secondary)]
                                            "
                                        >
                                            Semestre
                                        </label>

                                        <div className="relative">

                                            <GraduationCap
                                                size={16}
                                                className="
                                                    absolute
                                                    left-3.5
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-[var(--nexus-text-muted)]
                                                "
                                            />

                                            <input
                                                type="text"
                                                value={semestre}
                                                onChange={(e) =>
                                                    setSemestre(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={editando}
                                                maxLength={50}
                                                className="
                                                    w-full
                                                    h-12
                                                    pl-10
                                                    pr-3
                                                    rounded-xl
                                                    bg-[var(--nexus-surface-2)]
                                                    border
                                                    border-[var(--nexus-border)]
                                                    text-sm
                                                    text-[var(--nexus-text)]
                                                    outline-none
                                                    focus:border-violet-500/40
                                                    transition-all
                                                "
                                            />

                                        </div>

                                    </div>


                                    <div>

                                        <label
                                            className="
                                                block
                                                mb-2
                                                text-xs
                                                font-semibold
                                                text-[var(--nexus-text-secondary)]
                                            "
                                        >
                                            Periodo
                                        </label>

                                        <div className="relative">

                                            <CalendarDays
                                                size={16}
                                                className="
                                                    absolute
                                                    left-3.5
                                                    top-1/2
                                                    -translate-y-1/2
                                                    text-[var(--nexus-text-muted)]
                                                "
                                            />

                                            <input
                                                type="text"
                                                value={periodo}
                                                onChange={(e) =>
                                                    setPeriodo(
                                                        e.target.value
                                                    )
                                                }
                                                disabled={editando}
                                                maxLength={100}
                                                className="
                                                    w-full
                                                    h-12
                                                    pl-10
                                                    pr-3
                                                    rounded-xl
                                                    bg-[var(--nexus-surface-2)]
                                                    border
                                                    border-[var(--nexus-border)]
                                                    text-sm
                                                    text-[var(--nexus-text)]
                                                    outline-none
                                                    focus:border-violet-500/40
                                                    transition-all
                                                "
                                            />

                                        </div>

                                    </div>

                                </div>


                                {/* CÓDIGO */}

                                <div
                                    className="
                                        rounded-xl
                                        p-4
                                        bg-violet-500/[0.05]
                                        border
                                        border-violet-500/10
                                    "
                                >

                                    <p
                                        className="
                                            text-[10px]
                                            font-medium
                                            text-[var(--nexus-text-muted)]
                                        "
                                    >
                                        Código de acceso
                                    </p>

                                    <div
                                        className="
                                            mt-1
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                        "
                                    >

                                        <p
                                            className="
                                                text-xl
                                                font-black
                                                tracking-[0.18em]
                                                text-violet-500
                                            "
                                        >
                                            {grupoEditando.codigo_acceso}
                                        </p>

                                        <span
                                            className="
                                                text-[10px]
                                                text-[var(--nexus-text-muted)]
                                            "
                                        >
                                            No editable
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <div
                                className="
                                    flex
                                    flex-col-reverse
                                    sm:flex-row
                                    sm:justify-end
                                    gap-3
                                    p-6
                                    pt-0
                                "
                            >

                                <button
                                    type="button"
                                    onClick={cerrarEditarGrupo}
                                    disabled={editando}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        border
                                        border-[var(--nexus-border)]
                                        bg-[var(--nexus-surface-2)]
                                        text-sm
                                        font-semibold
                                        text-[var(--nexus-text-secondary)]
                                        hover:text-[var(--nexus-text)]
                                        transition-all
                                        disabled:opacity-50
                                    "
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={guardarEdicionGrupo}
                                    disabled={
                                        editando ||
                                        cargandoMaterias ||
                                        materias.length === 0
                                    }
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-violet-600
                                        hover:bg-violet-500
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition-all
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                    "
                                >

                                    {
                                        editando ? (

                                            <>

                                                <Loader2
                                                    size={17}
                                                    className="animate-spin"
                                                />

                                                Guardando...

                                            </>

                                        ) : (

                                            <>

                                                <CheckCircle2
                                                    size={17}
                                                />

                                                Guardar cambios

                                            </>

                                        )
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }



            {/* =====================================================
                MODAL CONFIRMAR ELIMINACIÓN DE GRUPO
            ===================================================== */}

            {
                grupoEliminar && (

                    <div className="
                        fixed inset-0 z-[120]
                        flex items-center justify-center p-4
                        bg-black/60 backdrop-blur-sm
                    ">

                        <div className="
                            w-full max-w-md rounded-3xl
                            bg-[var(--nexus-surface)]
                            border border-[var(--nexus-border)]
                            shadow-2xl overflow-hidden
                        ">

                            <div className="p-6 text-center">

                                <div className="
                                    mx-auto w-16 h-16 rounded-2xl
                                    bg-red-500/10 text-red-500
                                    flex items-center justify-center
                                ">
                                    <AlertTriangle size={30} />
                                </div>

                                <h2 className="
                                    mt-5 text-lg font-bold
                                    text-[var(--nexus-text)]
                                ">
                                    ¿Eliminar grupo?
                                </h2>

                                <p className="
                                    mt-2 text-sm leading-6
                                    text-[var(--nexus-text-secondary)]
                                ">
                                    Estás a punto de eliminar{" "}
                                    <span className="font-bold text-[var(--nexus-text)]">
                                        "{grupoEliminar.nombre}"
                                    </span>.
                                </p>

                                <div className="
                                    mt-4 rounded-xl
                                    bg-red-500/[0.05]
                                    border border-red-500/10
                                    px-4 py-3 text-left
                                ">
                                    <p className="text-xs leading-5 text-red-400">
                                        Se eliminará el grupo, su código de acceso
                                        y la relación de los alumnos con este grupo.
                                        Esta acción no se puede deshacer.
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-3 p-6 pt-0">

                                <button
                                    type="button"
                                    onClick={cancelarEliminarGrupo}
                                    disabled={eliminandoConfirmacion}
                                    className="
                                        flex-1 h-11 rounded-xl
                                        border border-[var(--nexus-border)]
                                        bg-[var(--nexus-surface-2)]
                                        text-sm font-semibold
                                        text-[var(--nexus-text-secondary)]
                                        hover:text-[var(--nexus-text)]
                                        transition-all disabled:opacity-50
                                    "
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={confirmarEliminarGrupo}
                                    disabled={eliminandoConfirmacion}
                                    className="
                                        flex-1 h-11 rounded-xl
                                        bg-red-600 hover:bg-red-500
                                        text-sm font-semibold text-white
                                        flex items-center justify-center gap-2
                                        transition-all disabled:opacity-50
                                    "
                                >
                                    {
                                        eliminandoConfirmacion ? (
                                            <>
                                                <Loader2 size={17} className="animate-spin" />
                                                Eliminando...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 size={17} />
                                                Sí, eliminar
                                            </>
                                        )
                                    }
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }


            {/* =====================================================
                MODAL CONFIRMAR ELIMINACIÓN DE ALUMNO
            ===================================================== */}

            {
                alumnoEliminar && (

                    <div className="
                        fixed inset-0 z-[125]
                        flex items-center justify-center p-4
                        bg-black/60 backdrop-blur-sm
                    ">

                        <div className="
                            w-full max-w-md rounded-3xl
                            bg-[var(--nexus-surface)]
                            border border-[var(--nexus-border)]
                            shadow-2xl overflow-hidden
                        ">

                            <div className="p-6 text-center">

                                <div className="
                                    mx-auto w-16 h-16 rounded-2xl
                                    bg-orange-500/10 text-orange-500
                                    flex items-center justify-center
                                ">
                                    <Users size={29} />
                                </div>

                                <h2 className="
                                    mt-5 text-lg font-bold
                                    text-[var(--nexus-text)]
                                ">
                                    ¿Sacar alumno del grupo?
                                </h2>

                                <p className="
                                    mt-2 text-sm leading-6
                                    text-[var(--nexus-text-secondary)]
                                ">
                                    Vas a quitar a{" "}
                                    <span className="font-bold text-[var(--nexus-text)]">
                                        {obtenerNombre(alumnoEliminar)}
                                    </span>{" "}
                                    del grupo{" "}
                                    <span className="font-bold text-[var(--nexus-text)]">
                                        "{grupoSeleccionado?.nombre}"
                                    </span>.
                                </p>

                                <div className="
                                    mt-4 rounded-xl
                                    bg-orange-500/[0.05]
                                    border border-orange-500/10
                                    px-4 py-3 text-left
                                ">
                                    <p className="text-xs leading-5 text-orange-400">
                                        El alumno no será eliminado de NEXUS.
                                        Solamente dejará de pertenecer a este
                                        grupo y la materia dejará de aparecerle
                                        en su espacio.
                                    </p>
                                </div>

                            </div>

                            <div className="flex gap-3 p-6 pt-0">

                                <button
                                    type="button"
                                    onClick={cancelarEliminarAlumno}
                                    disabled={eliminandoConfirmacion}
                                    className="
                                        flex-1 h-11 rounded-xl
                                        border border-[var(--nexus-border)]
                                        bg-[var(--nexus-surface-2)]
                                        text-sm font-semibold
                                        text-[var(--nexus-text-secondary)]
                                        hover:text-[var(--nexus-text)]
                                        transition-all disabled:opacity-50
                                    "
                                >
                                    Cancelar
                                </button>

                                <button
                                    type="button"
                                    onClick={confirmarEliminarAlumno}
                                    disabled={eliminandoConfirmacion}
                                    className="
                                        flex-1 h-11 rounded-xl
                                        bg-orange-600 hover:bg-orange-500
                                        text-sm font-semibold text-white
                                        flex items-center justify-center gap-2
                                        transition-all disabled:opacity-50
                                    "
                                >
                                    {
                                        eliminandoConfirmacion ? (
                                            <>
                                                <Loader2 size={17} className="animate-spin" />
                                                Quitando...
                                            </>
                                        ) : (
                                            <>
                                                <UserX size={17} />
                                                Sí, sacar alumno
                                            </>
                                        )
                                    }
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }


            {/* =====================================================
                MODAL ALUMNOS
            ===================================================== */}

            {
                mostrarAlumnos && (

                    <div
                        className="
                            fixed
                            inset-0
                            z-[110]
                            flex
                            items-center
                            justify-center
                            p-4
                            bg-black/60
                            backdrop-blur-sm
                        "
                        onMouseDown={
                            (e) => {

                                if (
                                    e.target ===
                                    e.currentTarget
                                ) {

                                    cerrarModalAlumnos();

                                }

                            }
                        }
                    >

                        <div
                            className="
                                relative
                                w-full
                                max-w-2xl
                                max-h-[85vh]
                                overflow-hidden
                                rounded-3xl
                                bg-[var(--nexus-surface)]
                                border
                                border-[var(--nexus-border)]
                                shadow-2xl
                            "
                        >

                            {/* CABECERA */}

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    p-6
                                    border-b
                                    border-[var(--nexus-border)]
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        -top-24
                                        -right-24
                                        w-56
                                        h-56
                                        rounded-full
                                        bg-violet-600/10
                                        blur-3xl
                                        pointer-events-none
                                    "
                                />


                                <div
                                    className="
                                        relative
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                w-12
                                                h-12
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                bg-violet-500/10
                                                text-violet-500
                                            "
                                        >

                                            <Users
                                                size={23}
                                            />

                                        </div>


                                        <div>

                                            <h2
                                                className="
                                                    text-xl
                                                    font-bold
                                                    text-[var(--nexus-text)]
                                                "
                                            >

                                                {
                                                    grupoSeleccionado?.nombre ||
                                                    "Grupo"
                                                }

                                            </h2>


                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >

                                                {
                                                    grupoSeleccionado?.materia?.nombre ||
                                                    "Materia"
                                                }

                                                {" • "}

                                                {
                                                    alumnos.length
                                                }{" "}

                                                {
                                                    alumnos.length === 1
                                                        ? "alumno"
                                                        : "alumnos"
                                                }

                                            </p>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            cerrarModalAlumnos
                                        }
                                        className="
                                            w-9
                                            h-9
                                            rounded-lg
                                            flex
                                            items-center
                                            justify-center
                                            text-[var(--nexus-text-muted)]
                                            hover:text-[var(--nexus-text)]
                                            hover:bg-[var(--nexus-surface-2)]
                                            transition-all
                                        "
                                    >

                                        <X
                                            size={19}
                                        />

                                    </button>

                                </div>

                            </div>


                            {/* CONTENIDO */}

                            <div
                                className="
                                    p-6
                                    overflow-y-auto
                                    max-h-[60vh]
                                "
                            >

                                {
                                    cargandoAlumnos && (

                                        <div
                                            className="
                                                py-12
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                            "
                                        >

                                            <Loader2
                                                size={32}
                                                className="
                                                    animate-spin
                                                    text-violet-500
                                                "
                                            />


                                            <p
                                                className="
                                                    mt-4
                                                    text-sm
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >

                                                Cargando alumnos...

                                            </p>

                                        </div>

                                    )
                                }


                                {
                                    !cargandoAlumnos &&
                                    errorAlumnos && (

                                        <div
                                            className="
                                                rounded-xl
                                                border
                                                border-red-500/20
                                                bg-red-500/[0.05]
                                                p-5
                                            "
                                        >

                                            <p
                                                className="
                                                    text-sm
                                                    text-red-400
                                                "
                                            >

                                                {
                                                    errorAlumnos
                                                }

                                            </p>

                                        </div>

                                    )
                                }


                                {
                                    !cargandoAlumnos &&
                                    !errorAlumnos &&
                                    alumnos.length === 0 && (

                                        <div
                                            className="
                                                py-12
                                                text-center
                                            "
                                        >

                                            <div
                                                className="
                                                    mx-auto
                                                    w-16
                                                    h-16
                                                    rounded-2xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    bg-violet-500/10
                                                    text-violet-500
                                                "
                                            >

                                                <Users
                                                    size={28}
                                                />

                                            </div>


                                            <h3
                                                className="
                                                    mt-5
                                                    text-lg
                                                    font-bold
                                                    text-[var(--nexus-text)]
                                                "
                                            >

                                                Todavía no hay alumnos

                                            </h3>


                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >

                                                Los alumnos aceptados
                                                en este grupo aparecerán
                                                aquí.

                                            </p>

                                        </div>

                                    )
                                }


                                {
                                    !cargandoAlumnos &&
                                    !errorAlumnos &&
                                    alumnos.length > 0 && (

                                        <div
                                            className="
                                                space-y-3
                                            "
                                        >

                                            {
                                                alumnos.map(
                                                    (
                                                        alumno
                                                    ) => (

                                                        <div
                                                            key={
                                                                alumno.id
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                gap-4
                                                                p-4
                                                                rounded-2xl
                                                                bg-[var(--nexus-surface-2)]
                                                                border
                                                                border-[var(--nexus-border)]
                                                                hover:border-violet-500/20
                                                                transition-all
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    shrink-0
                                                                    w-11
                                                                    h-11
                                                                    rounded-xl
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    bg-violet-500/10
                                                                    text-violet-500
                                                                    font-bold
                                                                    text-sm
                                                                "
                                                            >

                                                                {
                                                                    alumno.nombre
                                                                        ?.charAt(
                                                                            0
                                                                        )
                                                                        .toUpperCase()
                                                                }

                                                            </div>


                                                            <div
                                                                className="
                                                                    min-w-0
                                                                    flex-1
                                                                "
                                                            >

                                                                <p
                                                                    className="
                                                                        text-sm
                                                                        font-semibold
                                                                        truncate
                                                                        text-[var(--nexus-text)]
                                                                    "
                                                                >

                                                                    {
                                                                        obtenerNombre(
                                                                            alumno
                                                                        )
                                                                    }

                                                                </p>


                                                                <p
                                                                    className="
                                                                        mt-1
                                                                        text-xs
                                                                        truncate
                                                                        text-[var(--nexus-text-secondary)]
                                                                    "
                                                                >

                                                                    {
                                                                        alumno.correo
                                                                    }

                                                                </p>

                                                            </div>


                                                            <div
                                                                className="
                                                                    shrink-0
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                "
                                                            >

                                                                <div
                                                                    className="
                                                                        inline-flex
                                                                        items-center
                                                                        gap-1.5
                                                                        px-2.5
                                                                        py-1.5
                                                                        rounded-lg
                                                                        bg-emerald-500/10
                                                                        text-emerald-500
                                                                        text-[10px]
                                                                        font-semibold
                                                                    "
                                                                >
                                                                    <CheckCircle2 size={13} />
                                                                    Aceptado
                                                                </div>

                                                                <button
                                                                    type="button"
                                                                    disabled={eliminandoAlumno === alumno.id}
                                                                    onClick={() => eliminarAlumno(alumno)}
                                                                    className="
                                                                        inline-flex
                                                                        items-center
                                                                        justify-center
                                                                        w-9
                                                                        h-9
                                                                        rounded-lg
                                                                        border
                                                                        border-red-500/15
                                                                        bg-red-500/[0.05]
                                                                        text-red-400
                                                                        hover:bg-red-500/10
                                                                        hover:border-red-500/25
                                                                        transition-all
                                                                        disabled:opacity-50
                                                                        disabled:cursor-not-allowed
                                                                    "
                                                                    title="Eliminar alumno del grupo"
                                                                >
                                                                    {eliminandoAlumno === alumno.id ? (
                                                                        <Loader2 size={15} className="animate-spin" />
                                                                    ) : (
                                                                        <Trash2 size={15} />
                                                                    )}
                                                                </button>

                                                            </div>

                                                        </div>

                                                    )
                                                )
                                            }

                                        </div>

                                    )
                                }

                            </div>


                            {/* PIE */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    p-5
                                    border-t
                                    border-[var(--nexus-border)]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        text-[var(--nexus-text-secondary)]
                                    "
                                >

                                    <Users
                                        size={14}
                                    />

                                    {
                                        alumnos.length
                                    }{" "}

                                    {
                                        alumnos.length === 1
                                            ? "alumno aceptado"
                                            : "alumnos aceptados"
                                    }

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        cerrarModalAlumnos
                                    }
                                    className="
                                        px-5
                                        py-2.5
                                        rounded-xl
                                        bg-[var(--nexus-surface-2)]
                                        border
                                        border-[var(--nexus-border)]
                                        text-sm
                                        font-semibold
                                        text-[var(--nexus-text-secondary)]
                                        hover:text-[var(--nexus-text)]
                                        transition-all
                                    "
                                >

                                    Cerrar

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }


            {/* =====================================================
                MODAL SOLICITUDES
            ===================================================== */}

            {
                mostrarSolicitudes && (

                    <div
                        className="
                            fixed
                            inset-0
                            z-[120]
                            flex
                            items-center
                            justify-center
                            p-4
                            bg-black/60
                            backdrop-blur-sm
                        "
                        onMouseDown={
                            (e) => {

                                if (
                                    e.target ===
                                    e.currentTarget
                                ) {

                                    cerrarSolicitudes();

                                }

                            }
                        }
                    >

                        <div
                            className="
                                relative
                                w-full
                                max-w-2xl
                                max-h-[85vh]
                                overflow-hidden
                                rounded-3xl
                                bg-[var(--nexus-surface)]
                                border
                                border-[var(--nexus-border)]
                                shadow-2xl
                            "
                        >

                            {/* CABECERA */}

                            <div
                                className="
                                    relative
                                    overflow-hidden
                                    p-6
                                    border-b
                                    border-[var(--nexus-border)]
                                "
                            >

                                <div
                                    className="
                                        absolute
                                        -top-24
                                        -right-24
                                        w-56
                                        h-56
                                        rounded-full
                                        bg-amber-500/10
                                        blur-3xl
                                        pointer-events-none
                                    "
                                />


                                <div
                                    className="
                                        relative
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                                    >

                                        <div
                                            className="
                                                w-12
                                                h-12
                                                rounded-xl
                                                flex
                                                items-center
                                                justify-center
                                                bg-amber-500/10
                                                text-amber-500
                                            "
                                        >

                                            <UserPlus
                                                size={23}
                                            />

                                        </div>


                                        <div>

                                            <h2
                                                className="
                                                    text-xl
                                                    font-bold
                                                    text-[var(--nexus-text)]
                                                "
                                            >

                                                Solicitudes

                                            </h2>


                                            <p
                                                className="
                                                    mt-1
                                                    text-xs
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >

                                                {
                                                    grupoSeleccionado?.nombre ||
                                                    "Grupo"
                                                }

                                                {" • "}

                                                {
                                                    solicitudes.length
                                                }{" "}

                                                {
                                                    solicitudes.length === 1
                                                        ? "solicitud"
                                                        : "solicitudes"
                                                }

                                            </p>

                                        </div>

                                    </div>


                                    <button
                                        type="button"
                                        onClick={
                                            cerrarSolicitudes
                                        }
                                        disabled={
                                            procesandoAlumno !==
                                            null
                                        }
                                        className="
                                            w-9
                                            h-9
                                            rounded-lg
                                            flex
                                            items-center
                                            justify-center
                                            text-[var(--nexus-text-muted)]
                                            hover:text-[var(--nexus-text)]
                                            hover:bg-[var(--nexus-surface-2)]
                                            transition-all
                                        "
                                    >

                                        <X
                                            size={19}
                                        />

                                    </button>

                                </div>

                            </div>


                            {/* CONTENIDO */}

                            <div
                                className="
                                    p-6
                                    overflow-y-auto
                                    max-h-[60vh]
                                "
                            >

                                {
                                    cargandoSolicitudes && (

                                        <div
                                            className="
                                                py-12
                                                flex
                                                flex-col
                                                items-center
                                                justify-center
                                            "
                                        >

                                            <Loader2
                                                size={32}
                                                className="
                                                    animate-spin
                                                    text-amber-500
                                                "
                                            />


                                            <p
                                                className="
                                                    mt-4
                                                    text-sm
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >

                                                Cargando solicitudes...

                                            </p>

                                        </div>

                                    )
                                }


                                {/* ERROR */}

                                {
                                    !cargandoSolicitudes &&
                                    errorSolicitudes && (

                                        <div
                                            className="
                                                mb-4
                                                rounded-xl
                                                border
                                                border-red-500/20
                                                bg-red-500/[0.05]
                                                p-5
                                            "
                                        >

                                            <p
                                                className="
                                                    text-sm
                                                    text-red-400
                                                "
                                            >

                                                {
                                                    errorSolicitudes
                                                }

                                            </p>

                                        </div>

                                    )
                                }


                                {/* SIN SOLICITUDES */}

                                {
                                    !cargandoSolicitudes &&
                                    !errorSolicitudes &&
                                    solicitudes.length === 0 && (

                                        <div
                                            className="
                                                py-12
                                                text-center
                                            "
                                        >

                                            <div
                                                className="
                                                    mx-auto
                                                    w-16
                                                    h-16
                                                    rounded-2xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    bg-emerald-500/10
                                                    text-emerald-500
                                                "
                                            >

                                                <UserCheck
                                                    size={28}
                                                />

                                            </div>


                                            <h3
                                                className="
                                                    mt-5
                                                    text-lg
                                                    font-bold
                                                    text-[var(--nexus-text)]
                                                "
                                            >

                                                Todo al día

                                            </h3>


                                            <p
                                                className="
                                                    mt-2
                                                    text-sm
                                                    text-[var(--nexus-text-secondary)]
                                                "
                                            >

                                                No hay solicitudes
                                                pendientes para este grupo.

                                            </p>

                                        </div>

                                    )
                                }


                                {/* LISTA */}

                                {
                                    !cargandoSolicitudes &&
                                    solicitudes.length > 0 && (

                                        <div
                                            className="
                                                space-y-3
                                            "
                                        >

                                            {
                                                solicitudes.map(
                                                    (
                                                        solicitud
                                                    ) => {

                                                        const alumno =
                                                            solicitud.user;


                                                        const procesando =
                                                            procesandoAlumno ===
                                                            solicitud.user_id;


                                                        return (

                                                            <div
                                                                key={
                                                                    solicitud.id
                                                                }
                                                                className="
                                                                    rounded-2xl
                                                                    bg-[var(--nexus-surface-2)]
                                                                    border
                                                                    border-[var(--nexus-border)]
                                                                    p-4
                                                                "
                                                            >

                                                                <div
                                                                    className="
                                                                        flex
                                                                        flex-col
                                                                        sm:flex-row
                                                                        sm:items-center
                                                                        gap-4
                                                                    "
                                                                >

                                                                    {/* ALUMNO */}

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-center
                                                                            gap-4
                                                                            min-w-0
                                                                            flex-1
                                                                        "
                                                                    >

                                                                        <div
                                                                            className="
                                                                                shrink-0
                                                                                w-11
                                                                                h-11
                                                                                rounded-xl
                                                                                flex
                                                                                items-center
                                                                                justify-center
                                                                                bg-amber-500/10
                                                                                text-amber-500
                                                                                font-bold
                                                                                text-sm
                                                                            "
                                                                        >

                                                                            {
                                                                                alumno?.nombre
                                                                                    ?.charAt(
                                                                                        0
                                                                                    )
                                                                                    .toUpperCase()
                                                                            }

                                                                        </div>


                                                                        <div
                                                                            className="
                                                                                min-w-0
                                                                            "
                                                                        >

                                                                            <p
                                                                                className="
                                                                                    text-sm
                                                                                    font-semibold
                                                                                    truncate
                                                                                    text-[var(--nexus-text)]
                                                                                "
                                                                            >

                                                                                {
                                                                                    alumno
                                                                                        ? obtenerNombre(
                                                                                            alumno
                                                                                        )
                                                                                        : "Alumno"
                                                                                }

                                                                            </p>


                                                                            <p
                                                                                className="
                                                                                    mt-1
                                                                                    flex
                                                                                    items-center
                                                                                    gap-1.5
                                                                                    text-xs
                                                                                    truncate
                                                                                    text-[var(--nexus-text-secondary)]
                                                                                "
                                                                            >

                                                                                <Mail
                                                                                    size={12}
                                                                                />

                                                                                {
                                                                                    alumno?.correo ||
                                                                                    "Sin correo"
                                                                                }

                                                                            </p>

                                                                        </div>

                                                                    </div>


                                                                    {/* BOTONES */}

                                                                    <div
                                                                        className="
                                                                            flex
                                                                            items-center
                                                                            gap-2
                                                                            shrink-0
                                                                        "
                                                                    >

                                                                        <button
                                                                            type="button"
                                                                            disabled={
                                                                                procesando
                                                                            }
                                                                            onClick={() =>
                                                                                rechazarAlumno(
                                                                                    solicitud
                                                                                )
                                                                            }
                                                                            className="
                                                                                inline-flex
                                                                                items-center
                                                                                justify-center
                                                                                gap-1.5
                                                                                px-3.5
                                                                                py-2.5
                                                                                rounded-xl
                                                                                border
                                                                                border-red-500/15
                                                                                bg-red-500/[0.05]
                                                                                text-xs
                                                                                font-semibold
                                                                                text-red-400
                                                                                hover:bg-red-500/10
                                                                                transition-all
                                                                                disabled:opacity-50
                                                                                disabled:cursor-not-allowed
                                                                            "
                                                                        >

                                                                            {
                                                                                procesando
                                                                                    ? (
                                                                                        <Loader2
                                                                                            size={14}
                                                                                            className="
                                                                                                animate-spin
                                                                                            "
                                                                                        />
                                                                                    )
                                                                                    : (
                                                                                        <UserX
                                                                                            size={14}
                                                                                        />
                                                                                    )
                                                                            }

                                                                            Rechazar

                                                                        </button>


                                                                        <button
                                                                            type="button"
                                                                            disabled={
                                                                                procesando
                                                                            }
                                                                            onClick={() =>
                                                                                aceptarAlumno(
                                                                                    solicitud
                                                                                )
                                                                            }
                                                                            className="
                                                                                inline-flex
                                                                                items-center
                                                                                justify-center
                                                                                gap-1.5
                                                                                px-3.5
                                                                                py-2.5
                                                                                rounded-xl
                                                                                bg-emerald-600
                                                                                hover:bg-emerald-500
                                                                                text-xs
                                                                                font-semibold
                                                                                text-white
                                                                                transition-all
                                                                                disabled:opacity-50
                                                                                disabled:cursor-not-allowed
                                                                            "
                                                                        >

                                                                            {
                                                                                procesando
                                                                                    ? (
                                                                                        <Loader2
                                                                                            size={14}
                                                                                            className="
                                                                                                animate-spin
                                                                                            "
                                                                                        />
                                                                                    )
                                                                                    : (
                                                                                        <UserCheck
                                                                                            size={14}
                                                                                        />
                                                                                    )
                                                                            }

                                                                            Aceptar

                                                                        </button>

                                                                    </div>

                                                                </div>

                                                            </div>

                                                        );

                                                    }
                                                )
                                            }

                                        </div>

                                    )
                                }

                            </div>


                            {/* PIE */}

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                    p-5
                                    border-t
                                    border-[var(--nexus-border)]
                                "
                            >

                                <div
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-xs
                                        text-[var(--nexus-text-secondary)]
                                    "
                                >

                                    <UserPlus
                                        size={14}
                                    />

                                    {
                                        solicitudes.length
                                    }{" "}

                                    {
                                        solicitudes.length === 1
                                            ? "pendiente"
                                            : "pendientes"
                                    }

                                </div>


                                <button
                                    type="button"
                                    onClick={
                                        cerrarSolicitudes
                                    }
                                    disabled={
                                        procesandoAlumno !==
                                        null
                                    }
                                    className="
                                        px-5
                                        py-2.5
                                        rounded-xl
                                        bg-[var(--nexus-surface-2)]
                                        border
                                        border-[var(--nexus-border)]
                                        text-sm
                                        font-semibold
                                        text-[var(--nexus-text-secondary)]
                                        hover:text-[var(--nexus-text)]
                                        transition-all
                                    "
                                >

                                    Cerrar

                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div>

    );

}
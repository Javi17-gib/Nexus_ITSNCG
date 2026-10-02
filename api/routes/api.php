<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GrupoController;
use App\Http\Controllers\Api\MateriaController;
use App\Http\Controllers\Api\UnidadController;
use App\Http\Controllers\Api\TemaController;
use App\Http\Controllers\Api\ContenidoController;
use App\Http\Controllers\Api\ArchivoController;
use App\Http\Controllers\Api\RetoController;
use App\Http\Controllers\Api\EstadisticaController;
use App\Http\Controllers\Api\ChatbotController;
use App\Http\Controllers\Api\ReporteController;


/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
|
| Estas rutas NO requieren autenticación.
|
*/


/*
|--------------------------------------------------------------------------
| REGISTRO
|--------------------------------------------------------------------------
*/

Route::post(
    '/register',
    [AuthController::class, 'register']
);


/*
|--------------------------------------------------------------------------
| LOGIN
|--------------------------------------------------------------------------
*/

Route::post(
    '/login',
    [AuthController::class, 'login']
);


/*
|--------------------------------------------------------------------------
| RECUPERACIÓN DE CONTRASEÑA
|--------------------------------------------------------------------------
|
| Estas rutas deben permanecer públicas porque el usuario
| todavía no tiene un token de Sanctum.
|
*/


/*
|--------------------------------------------------------------------------
| SOLICITAR PIN
|--------------------------------------------------------------------------
*/

Route::post(
    '/forgot-password',
    [AuthController::class, 'forgotPassword']
);


/*
|--------------------------------------------------------------------------
| RESTABLECER CONTRASEÑA
|--------------------------------------------------------------------------
*/

Route::post(
    '/reset-password',
    [AuthController::class, 'resetPassword']
);


/*
|--------------------------------------------------------------------------
| RUTAS PROTEGIDAS (SANCTUM)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {


    /*
    |--------------------------------------------------------------------------
    | AUTH
    |--------------------------------------------------------------------------
    */


    /*
    | CERRAR SESIÓN
    */

    Route::post(
        '/logout',
        [AuthController::class, 'logout']
    );


    /*
    | USUARIO AUTENTICADO
    */

    Route::get(
        '/user',
        [AuthController::class, 'user']
    );


    /*
    | ACTUALIZAR PERFIL
    */

    Route::put(
        '/user/profile',
        [AuthController::class, 'updateProfile']
    );


    /*
    |--------------------------------------------------------------------------
    | GRUPOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'grupos',
        GrupoController::class
    );


    /*
    |--------------------------------------------------------------------------
    | NOTIFICACIONES DEL DOCENTE
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/notificaciones/docente',
        [GrupoController::class, 'notificacionesDocente']
    );


    /*
    |--------------------------------------------------------------------------
    | ALUMNO - UNIRSE A GRUPO
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/grupos/unirse',
        [GrupoController::class, 'unirsePorCodigo']
    );


    /*
    |--------------------------------------------------------------------------
    | SOLICITUDES PENDIENTES
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/grupos/{id}/pendientes',
        [GrupoController::class, 'pendientes']
    );


    /*
    |--------------------------------------------------------------------------
    | ACEPTAR ALUMNO
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/grupos/{grupoId}/aceptar/{userId}',
        [GrupoController::class, 'aceptarAlumno']
    );


    /*
    |--------------------------------------------------------------------------
    | RECHAZAR ALUMNO
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/grupos/{grupoId}/rechazar/{userId}',
        [GrupoController::class, 'rechazarAlumno']
    );


    /*
    |--------------------------------------------------------------------------
    | ALUMNOS DEL GRUPO
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/grupos/{id}/alumnos',
        [GrupoController::class, 'alumnos']
    );


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR ALUMNO DEL GRUPO
    |--------------------------------------------------------------------------
    */

    Route::delete(
        '/grupos/{grupoId}/alumnos/{userId}',
        [GrupoController::class, 'eliminarAlumno']
    );


    /*
    |--------------------------------------------------------------------------
    | MIS GRUPOS - ALUMNO
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/mis-grupos',
        [GrupoController::class, 'misGrupos']
    );


    /*
    |--------------------------------------------------------------------------
    | MATERIAS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'materias',
        MateriaController::class
    );


    /*
    |--------------------------------------------------------------------------
    | UNIDADES
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'unidades',
        UnidadController::class
    );


    Route::get(
        '/materias/{materiaId}/unidades',
        [UnidadController::class, 'porMateria']
    );


    /*
    |--------------------------------------------------------------------------
    | TEMAS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'temas',
        TemaController::class
    );


    Route::get(
        '/unidades/{unidadId}/temas',
        [TemaController::class, 'porUnidad']
    );


    /*
    |--------------------------------------------------------------------------
    | CONTENIDOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'contenidos',
        ContenidoController::class
    );


    Route::get(
        '/temas/{temaId}/contenidos',
        [ContenidoController::class, 'porTema']
    );


    /*
    |--------------------------------------------------------------------------
    | ARCHIVOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'archivos',
        ArchivoController::class
    );


    Route::get(
        '/contenidos/{contenidoId}/archivos',
        [ArchivoController::class, 'porContenido']
    );


    /*
    |--------------------------------------------------------------------------
    | RETOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource(
        'retos',
        RetoController::class
    );


    Route::get(
        '/temas/{tema}/retos',
        [RetoController::class, 'index']
    );


    Route::patch(
        '/retos/{id}/solucion',
        [RetoController::class, 'cambiarSolucion']
    );


    /*
    |--------------------------------------------------------------------------
    | ESTADÍSTICAS
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/estadisticas/registrar',
        [EstadisticaController::class, 'registrar']
    );


    Route::get(
        '/estadisticas/grupo/{grupoId}',
        [EstadisticaController::class, 'visitasPorGrupo']
    );


    Route::get(
        '/estadisticas/grupo/{grupoId}/semana',
        [EstadisticaController::class, 'visitasPorSemana']
    );


    Route::get(
        '/estadisticas/grupo/{grupoId}/activos',
        [EstadisticaController::class, 'alumnosActivos']
    );


    Route::get(
        '/estadisticas/materia/{materiaId}',
        [EstadisticaController::class, 'visitasPorMateria']
    );


    /*
    |--------------------------------------------------------------------------
    | DASHBOARD DOCENTE
    |--------------------------------------------------------------------------
    */

    Route::get(
        '/dashboard/docente',
        [EstadisticaController::class, 'dashboardDocente']
    );


    /*
    |--------------------------------------------------------------------------
    | REPORTES
    |--------------------------------------------------------------------------
    */


    Route::get(
        '/reportes/grupo/{grupoId}/actividad',
        [ReporteController::class, 'actividadGrupo']
    );


    Route::get(
        '/reportes/grupo/{grupoId}/pdf',
        [ReporteController::class, 'descargarPdf']
    );


    /*
    |--------------------------------------------------------------------------
    | CHATBOT
    |--------------------------------------------------------------------------
    */

    Route::post(
        '/chatbot',
        [ChatbotController::class, 'preguntar']
    );

});
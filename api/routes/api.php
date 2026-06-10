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

/*
|--------------------------------------------------------------------------
| RUTAS PÚBLICAS
|--------------------------------------------------------------------------
*/

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

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

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    /*
    |--------------------------------------------------------------------------
    | GRUPOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('grupos', GrupoController::class);

    Route::post(
        '/grupos/unirse',
        [GrupoController::class, 'unirsePorCodigo']
    );

    Route::get(
        '/grupos/{id}/pendientes',
        [GrupoController::class, 'pendientes']
    );

    Route::post(
        '/grupos/{grupoId}/aceptar/{userId}',
        [GrupoController::class, 'aceptarAlumno']
    );

    Route::post(
        '/grupos/{grupoId}/rechazar/{userId}',
        [GrupoController::class, 'rechazarAlumno']
    );

    Route::get(
        '/grupos/{id}/alumnos',
        [GrupoController::class, 'alumnos']
    );

    Route::get(
        '/mis-grupos',
        [GrupoController::class, 'misGrupos']
    );

    /*
    |--------------------------------------------------------------------------
    | MATERIAS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('materias', MateriaController::class);

    /*
    |--------------------------------------------------------------------------
    | UNIDADES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('unidades', UnidadController::class);

    Route::get(
        '/materias/{materiaId}/unidades',
        [UnidadController::class, 'porMateria']
    );

    /*
    |--------------------------------------------------------------------------
    | TEMAS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('temas', TemaController::class);

    Route::get(
        '/unidades/{unidadId}/temas',
        [TemaController::class, 'porUnidad']
    );

    /*
    |--------------------------------------------------------------------------
    | CONTENIDOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('contenidos', ContenidoController::class);

    Route::get(
        '/temas/{temaId}/contenidos',
        [ContenidoController::class, 'porTema']
    );

    /*
    |--------------------------------------------------------------------------
    | ARCHIVOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('archivos', ArchivoController::class);

    Route::get(
        '/contenidos/{contenidoId}/archivos',
        [ArchivoController::class, 'porContenido']
    );

    /*
    |--------------------------------------------------------------------------
    | RETOS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('retos', RetoController::class);

    Route::get(
        '/temas/{tema}/retos',
        [RetoController::class, 'index']
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

    Route::post('/chatbot', [ChatbotController::class, 'preguntar']);
});
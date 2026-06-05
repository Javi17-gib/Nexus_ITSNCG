<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GrupoController;

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

    // AUTH
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // GRUPOS
    Route::apiResource('grupos', GrupoController::class);

    // ALUMNO SE UNE
    Route::post('/grupos/unirse', [GrupoController::class, 'unirsePorCodigo']);

    // DOCENTE VE PENDIENTES
    Route::get('/grupos/{id}/pendientes', [GrupoController::class, 'pendientes']);

    Route::post('/grupos/{grupoId}/aceptar/{userId}', [GrupoController::class, 'aceptarAlumno']);
    Route::post('/grupos/{grupoId}/rechazar/{userId}', [GrupoController::class, 'rechazarAlumno']);

    Route::get('/grupos/{id}/alumnos', [GrupoController::class, 'alumnos']);

});
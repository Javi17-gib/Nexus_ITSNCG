<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\GrupoController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
 Route::get('/grupos/{id}/pendientes', [GrupoController::class, 'pendientes']);
Route::post('/grupos/unirse', [GrupoController::class, 'unirsePorCodigo']);

    Route::apiResource('grupos', GrupoController::class);

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', [AuthController::class, 'user']);

    
    
});
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        // Validar PIN para docentes
        if ($request->rol === 'docente') {

            if ($request->pin !== env('DOCENTE_PIN')) {

                return response()->json([
                    'message' => 'PIN de docente incorrecto'
                ], 403);
            }
        }

        $user = User::create([
            'nombre' => $request->nombre,
            'apellido_paterno' => $request->apellido_paterno,
            'apellido_materno' => $request->apellido_materno,
            'correo' => $request->correo,
            'password' => Hash::make($request->password),
            'rol' => $request->rol,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Usuario registrado correctamente',
            'token' => $token,
            'user' => $user
        ], 201);
    }

    public function login(LoginRequest $request)
    {
        $user = User::where('correo', $request->correo)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'token' => $token,
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
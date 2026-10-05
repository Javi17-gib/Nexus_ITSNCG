<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | REGISTRO
    |--------------------------------------------------------------------------
    */

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


    /*
    |--------------------------------------------------------------------------
    | LOGIN
    |--------------------------------------------------------------------------
    */

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


    /*
    |--------------------------------------------------------------------------
    | CERRAR SESIÓN
    |--------------------------------------------------------------------------
    */

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente'
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | USUARIO AUTENTICADO
    |--------------------------------------------------------------------------
    */

    public function user(Request $request)
    {
        return response()->json($request->user());
    }


    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR PERFIL
    |--------------------------------------------------------------------------
    */

    public function updateProfile(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:100'],

            'apellido_paterno' => [
                'required',
                'string',
                'max:100'
            ],

            'apellido_materno' => [
                'nullable',
                'string',
                'max:100'
            ],

            'correo' => [
                'required',
                'email',
                'max:150',
                'unique:users,correo,' . $user->id,
            ],

            'foto_perfil' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:5120',
            ],
        ]);

        $user->nombre = $validated['nombre'];

        $user->apellido_paterno =
            $validated['apellido_paterno'];

        $user->apellido_materno =
            $validated['apellido_materno'];

        $user->correo =
            $validated['correo'];


        /*
        |--------------------------------------------------------------------------
        | FOTO DE PERFIL
        |--------------------------------------------------------------------------
        */

        if ($request->hasFile('foto_perfil')) {

            // Eliminar foto anterior si existe
            if ($user->foto_perfil) {

                $rutaAnterior = storage_path(
                    'app/public/' . $user->foto_perfil
                );

                if (file_exists($rutaAnterior)) {
                    unlink($rutaAnterior);
                }
            }


            // Guardar nueva foto
            $ruta = $request
                ->file('foto_perfil')
                ->store(
                    'perfiles',
                    'public'
                );

            $user->foto_perfil = $ruta;
        }


        $user->save();


        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user' => $user,
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | RECUPERAR CONTRASEÑA - ENVIAR PIN
    |--------------------------------------------------------------------------
    */

    public function forgotPassword(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN
        |--------------------------------------------------------------------------
        */

        $request->validate([
            'correo' => [
                'required',
                'email'
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | BUSCAR USUARIO
        |--------------------------------------------------------------------------
        */

        $user = User::where(
            'correo',
            $request->correo
        )->first();


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA GENÉRICA
        |--------------------------------------------------------------------------
        |
        | No revelamos si el correo existe o no.
        |
        */

        if (!$user) {

            return response()->json([
                'message' =>
                    'Si el correo está registrado, recibirás un PIN de recuperación.'
            ]);
        }


        /*
        |--------------------------------------------------------------------------
        | GENERAR PIN DE 5 DÍGITOS
        |--------------------------------------------------------------------------
        */

        $pin = random_int(
            10000,
            99999
        );


        /*
        |--------------------------------------------------------------------------
        | GUARDAR PIN
        |--------------------------------------------------------------------------
        |
        | El PIN tendrá una duración de 10 minutos.
        |
        */

        $cacheKey =
            'password_reset_pin_' .
            $user->correo;


        Cache::put(
            $cacheKey,
            $pin,
            now()->addMinutes(10)
        );


        /*
        |--------------------------------------------------------------------------
        | ENVIAR CORREO
        |--------------------------------------------------------------------------
        */

        Mail::send(
    'emails.recuperacion-contrasena',
    [
        'codigo' => $pin,
        'nombre' => $user->nombre,
    ],
    function ($message) use ($user) {
        $message
            ->to($user->correo)
            ->subject('Recuperación de contraseña • NEXUS');
    }
);


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' =>
                'Si el correo está registrado, recibirás un PIN de recuperación.'
        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | RESTABLECER CONTRASEÑA
    |--------------------------------------------------------------------------
    */

    public function resetPassword(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN
        |--------------------------------------------------------------------------
        */

        $request->validate([
            'correo' => [
                'required',
                'email'
            ],

            'pin' => [
                'required',
                'digits:5'
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed'
            ],
        ]);


        /*
        |--------------------------------------------------------------------------
        | BUSCAR USUARIO
        |--------------------------------------------------------------------------
        */

        $user = User::where(
            'correo',
            $request->correo
        )->first();


        if (!$user) {

            return response()->json([
                'message' =>
                    'No se pudo restablecer la contraseña.'
            ], 400);
        }


        /*
        |--------------------------------------------------------------------------
        | OBTENER PIN
        |--------------------------------------------------------------------------
        */

        $cacheKey =
            'password_reset_pin_' .
            $user->correo;


        $pinGuardado =
            Cache::get($cacheKey);


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR PIN
        |--------------------------------------------------------------------------
        */

        if (
            !$pinGuardado ||
            (string) $pinGuardado !==
            (string) $request->pin
        ) {

            return response()->json([
                'message' =>
                    'El PIN es incorrecto o ha expirado.'
            ], 422);
        }


        /*
        |--------------------------------------------------------------------------
        | ACTUALIZAR CONTRASEÑA
        |--------------------------------------------------------------------------
        */

        $user->password =
            Hash::make(
                $request->password
            );

        $user->save();


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR PIN
        |--------------------------------------------------------------------------
        */

        Cache::forget(
            $cacheKey
        );


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'message' =>
                'Contraseña actualizada correctamente.'
        ]);
    }
}
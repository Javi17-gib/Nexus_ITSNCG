<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function preguntar(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN
        |--------------------------------------------------------------------------
        */

        $request->validate([
            'mensaje' => 'required|string',
            'materia' => 'nullable|string',
        ]);


        /*
        |--------------------------------------------------------------------------
        | DATOS
        |--------------------------------------------------------------------------
        */

        $mensaje = $request->mensaje;

        $materia =
            $request->materia ??
            'todas las materias';


        /*
        |--------------------------------------------------------------------------
        | PROMPT
        |--------------------------------------------------------------------------
        */

        $prompt = "
Eres un tutor académico experto en $materia.

Tu objetivo es ayudar a estudiantes de ingeniería.

Responde de forma:

- Clara
- Sencilla
- Ordenada
- Paso a paso cuando sea necesario
- Con ejemplos cuando ayuden a comprender

No hagas la tarea completa de un estudiante si eso evita que aprenda.
Primero explica el concepto y después ayuda con el procedimiento.

Pregunta del alumno:

$mensaje
";


        /*
        |--------------------------------------------------------------------------
        | API KEY
        |--------------------------------------------------------------------------
        */

        $apiKey =
            env('GEMINI_API_KEY');


        if (!$apiKey) {

            return response()->json([

                'message' =>
                    'No está configurada GEMINI_API_KEY en el archivo .env',

            ], 500);

        }


        try {

            /*
            |--------------------------------------------------------------------------
            | PETICIÓN A GEMINI
            |--------------------------------------------------------------------------
            */

            $response = Http::timeout(60)
                ->post(
                    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key='
                    . $apiKey,

                    [

                        'contents' => [

                            [

                                'parts' => [

                                    [

                                        'text' =>
                                            $prompt,

                                    ],

                                ],

                            ],

                        ],

                    ]
                );


            /*
            |--------------------------------------------------------------------------
            | OBTENER RESPUESTA JSON
            |--------------------------------------------------------------------------
            */

            $data =
                $response->json();


            /*
            |--------------------------------------------------------------------------
            | COMPROBAR ERROR HTTP
            |--------------------------------------------------------------------------
            */

            if (!$response->successful()) {

                return response()->json([

                    'message' =>
                        'Gemini rechazó la solicitud',

                    'status' =>
                        $response->status(),

                    'error' =>
                        $data['error']['message']
                        ?? 'Error desconocido de Gemini',

                ], 500);

            }


            /*
            |--------------------------------------------------------------------------
            | COMPROBAR CANDIDATES
            |--------------------------------------------------------------------------
            */

            if (
                !isset(
                    $data['candidates'][0]
                )
            ) {

                return response()->json([

                    'message' =>
                        'Gemini no devolvió una respuesta válida',

                    'respuesta_gemini' =>
                        $data,

                ], 500);

            }


            /*
            |--------------------------------------------------------------------------
            | EXTRAER TEXTO
            |--------------------------------------------------------------------------
            */

            $texto =
                $data['candidates'][0]['content']['parts'][0]['text']
                ?? null;


            /*
            |--------------------------------------------------------------------------
            | RESPUESTA VACÍA
            |--------------------------------------------------------------------------
            */

            if (!$texto) {

                return response()->json([

                    'message' =>
                        'Gemini devolvió una respuesta vacía',

                    'respuesta_gemini' =>
                        $data,

                ], 500);

            }


            /*
            |--------------------------------------------------------------------------
            | RESPUESTA CORRECTA
            |--------------------------------------------------------------------------
            */

            return response()->json([

                'respuesta' =>
                    $texto,

            ]);


        } catch (\Exception $e) {

            /*
            |--------------------------------------------------------------------------
            | ERROR GENERAL
            |--------------------------------------------------------------------------
            */

            return response()->json([

                'message' =>
                    'Error en el chatbot',

                'error' =>
                    $e->getMessage(),

            ], 500);

        }
    }
}
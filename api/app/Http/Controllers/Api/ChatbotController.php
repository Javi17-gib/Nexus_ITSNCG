<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatbotController extends Controller
{
    public function preguntar(Request $request)
    {
        $request->validate([
            'mensaje' => 'required|string',
            'materia' => 'nullable|string'
        ]);

        $mensaje = $request->mensaje;
        $materia = $request->materia ?? 'todas las materias';

        $prompt = "
Eres un tutor académico experto en $materia.
Responde de forma clara, sencilla y paso a paso para estudiantes de ingeniería.

Pregunta del alumno:
$mensaje
";

        try {

            $response = Http::post(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key='
                . env('GEMINI_API_KEY'),
                [
                    "contents" => [
                        [
                            "parts" => [
                                [
                                    "text" => $prompt
                                ]
                            ]
                        ]
                    ]
                ]
            );

            $data = $response->json();

            $texto = $data['candidates'][0]['content']['parts'][0]['text']
                ?? 'No se pudo generar respuesta';

            return response()->json([
                'respuesta' => $texto
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'message' => 'Error en el chatbot',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
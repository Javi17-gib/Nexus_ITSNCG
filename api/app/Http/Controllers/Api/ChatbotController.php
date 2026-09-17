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

        $mensaje = trim($request->mensaje);

        $materia =
            $request->materia ??
            'todas las materias';


        /*
        |--------------------------------------------------------------------------
        | PROMPT
        |--------------------------------------------------------------------------
        */

        $prompt = <<<PROMPT
Eres BUFALIN, el asistente académico de la plataforma educativa.

Tu nombre es BUFALIN.
Nunca te presentes como NEXUS.
Nunca menciones NEXUS ITSNCG ni "asistente de NEXUS" en tus respuestas.

Tu función es ayudar a estudiantes de ingeniería a comprender
sus temas académicos de manera clara, sencilla y didáctica.

Materia actual:
$materia

Pregunta del estudiante:
$mensaje

REGLAS IMPORTANTES DE RESPUESTA:

1. Responde directamente la pregunta del estudiante.

2. Si la pregunta es sencilla, responde de forma breve.
   No conviertas una pregunta sencilla en una explicación excesivamente larga.

3. Si el estudiante pide una explicación o el problema requiere procedimiento,
   explica paso a paso.

4. Usa un lenguaje natural, amigable y académico.

5. Puedes utilizar negritas con **texto** cuando sea útil.

6. NO utilices HTML.

7. NO utilices SVG.

8. NO utilices etiquetas HTML como <div>, <p>, <svg>, etc.

9. NO utilices Markdown con encabezados como:
   ###
   ##
   #

10. NO utilices líneas separadoras como:
    ---

11. NO utilices bloques de código salvo que sean absolutamente necesarios.

12. NO utilices fórmulas LaTeX con:
    $$
    \[
    \]
    \( \)

13. Para matemáticas utiliza texto sencillo y caracteres Unicode cuando sea
    posible.

    Ejemplos:
    2³
    x²
    x³
    √25
    π
    Δ
    2 × 3 = 6

14. Para una operación matemática sencilla muestra el procedimiento de forma
    corta.

    Ejemplo:

    2³ = 2 × 2 × 2
    2 × 2 = 4
    4 × 2 = 8

    Resultado: 8

15. No agregues información irrelevante.

16. No repitas innecesariamente la pregunta del estudiante.

17. No utilices frases demasiado formales o robóticas.

18. Puedes utilizar emojis ocasionalmente si ayudan a que la explicación sea
    más amigable, pero no abuses de ellos.

19. Si el estudiante pregunta algo que no requiere procedimiento,
    no inventes uno.

20. Si no tienes suficiente información para responder correctamente,
    indícalo claramente.

21. Si existe un resultado final, hazlo fácilmente identificable utilizando
    una línea como:

    Resultado: ...

22. Nunca incluyas la palabra "svg" en tu respuesta.

23. Nunca incluyas etiquetas, instrucciones internas, metadatos ni contenido
    relacionado con la generación de la respuesta.

24. Tu nombre es BUFALIN.

25. Nunca menciones NEXUS, NEXUS ITSNCG ni "asistente NEXUS" en tus respuestas.

26. Nunca generes enlaces hacia imágenes, archivos o páginas locales.

27. Nunca utilices Markdown para insertar imágenes o enlaces.

28. No generes URLs.

29. No incluyas referencias a archivos locales como localhost, 127.0.0.1, /src/,
    /assets/ o /storage/.

30. Si necesitas presentarte, di simplemente: "Soy BUFALIN, tu asistente académico."

IMPORTANTE:

La respuesta debe parecer escrita por un tutor humano.

Prioriza:
- claridad
- brevedad
- aprendizaje
- procedimiento cuando sea necesario
- resultado claro

No hagas respuestas largas cuando la pregunta pueda responderse correctamente
en pocas líneas.
PROMPT;


        /*
        |--------------------------------------------------------------------------
        | API KEY
        |--------------------------------------------------------------------------
        */

        $apiKey = env('GEMINI_API_KEY');


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
            | LIMPIAR RESPUESTA
            |--------------------------------------------------------------------------
            */

            $texto = $this->limpiarRespuesta($texto);


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


    /*
    |--------------------------------------------------------------------------
    | LIMPIAR RESPUESTA DE GEMINI
    |--------------------------------------------------------------------------
    */

    private function limpiarRespuesta(string $texto): string
    {
        /*
        |--------------------------------------------------------------------------
        | NORMALIZAR SALTOS
        |--------------------------------------------------------------------------
        */

        $texto =
            str_replace(
                ["\r\n", "\r"],
                "\n",
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR SVG
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/<svg\b[^>]*>.*?<\/svg>/is',
                '',
                $texto
            );

        $texto =
            preg_replace(
                '/\bsvg\b/i',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR ENLACES MARKDOWN
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/\[[^\]]*\]\((?:https?:\/\/|\/|\.\/)[^)]+\)/i',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR URLS
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/https?:\/\/[^\s)]+/i',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR REFERENCIAS LOCALES
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/(?:localhost|127\.0\.0\.1)[^\s)]*/i',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR NOMBRE ANTIGUO
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/\bNEXUS(?:\s+ITSNCG)?\b/i',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | LIMPIAR ESPACIOS RESULTANTES
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/[ \t]+/',
                ' ',
                $texto
            );


        $texto =
            preg_replace(
                "/\n{3,}/",
                "\n\n",
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR HTML
        |--------------------------------------------------------------------------
        */

        $texto =
            strip_tags($texto);


        /*
        |--------------------------------------------------------------------------
        | CONVERTIR ENCABEZADOS MARKDOWN
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/^\s*#{1,6}\s*/m',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR LÍNEAS SEPARADORAS
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/^\s*[-*_]{3,}\s*$/m',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | LIMPIAR LATEX DE BLOQUE
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/\$\$(.*?)\$\$/s',
                '$1',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | LIMPIAR DELIMITADORES LATEX
        |--------------------------------------------------------------------------
        */

        $texto =
            str_replace(
                ['\\(', '\\)', '\\[', '\\]'],
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | LIMPIAR DÓLARES SUELTOS
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                '/(?<!\$)\$(?!\$)/',
                '',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | CONVERTIR ALGUNAS POTENCIAS
        |--------------------------------------------------------------------------
        */

        $potencias = [

            '0' => '⁰',
            '1' => '¹',
            '2' => '²',
            '3' => '³',
            '4' => '⁴',
            '5' => '⁵',
            '6' => '⁶',
            '7' => '⁷',
            '8' => '⁸',
            '9' => '⁹',

        ];


        $texto =
            preg_replace_callback(
                '/([A-Za-z0-9])\^([0-9]+)/',
                function ($coincidencia) use ($potencias) {

                    $base =
                        $coincidencia[1];

                    $exponente =
                        $coincidencia[2];

                    $resultado = '';

                    foreach (
                        str_split($exponente)
                        as $digito
                    ) {

                        $resultado .=
                            $potencias[$digito]
                            ?? $digito;

                    }

                    return
                        $base .
                        $resultado;

                },
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | LIMPIAR ESPACIOS EXCESIVOS
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                "/[ \t]+/",
                ' ',
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | EVITAR MÁS DE DOS SALTOS
        |--------------------------------------------------------------------------
        */

        $texto =
            preg_replace(
                "/\n{3,}/",
                "\n\n",
                $texto
            );


        /*
        |--------------------------------------------------------------------------
        | QUITAR ESPACIOS AL PRINCIPIO Y FINAL
        |--------------------------------------------------------------------------
        */

        $texto =
            trim($texto);


        return $texto;
    }
}
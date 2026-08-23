<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Contenido;

class ContenidoController extends Controller
{
    /**
     * Verificar que sea docente
     */
    private function verificarDocente(Request $request)
    {
        if ($request->user()->rol !== 'docente') {

            return response()->json([
                'message' => 'Solo los docentes pueden realizar esta acción'
            ], 403);

        }

        return null;
    }


    /**
     * Listar contenidos
     */
    public function index()
    {
        return response()->json(
            Contenido::with('tema')
                ->orderBy('id')
                ->get()
        );
    }


    /**
     * Crear contenido
     */
    public function store(Request $request)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $request->validate([
            'tema_id' => 'required|exists:temas,id',
            'titulo' => 'required|string|max:255',
            'contenido' => 'nullable|string',
            'tipo' => 'nullable|in:texto,pdf,imagen,youtube,video,archivo'
        ]);

        $contenido = Contenido::create([
            'tema_id' => $request->tema_id,
            'titulo' => $request->titulo,
            'contenido' => $request->contenido,
            'tipo' => $request->tipo ?? 'texto'
        ]);

        return response()->json([
            'message' => 'Contenido creado correctamente',
            'contenido' => $contenido
        ], 201);
    }


    /**
     * Ver contenido
     */
    public function show(string $id)
    {
        $contenido = Contenido::with([
            'tema',
            'archivos'
        ])->find($id);

        if (!$contenido) {

            return response()->json([
                'message' => 'Contenido no encontrado'
            ], 404);

        }

        /*
        |--------------------------------------------------------------------------
        | AGREGAR URL A LOS ARCHIVOS
        |--------------------------------------------------------------------------
        */

        $contenido->archivos =
            $contenido->archivos->map(
                function ($archivo) {

                    return [
                        ...$archivo->toArray(),

                        'url' => asset(
                            'storage/' . $archivo->ruta
                        ),
                    ];

                }
            );


        return response()->json(
            $contenido
        );
    }


    /**
     * Actualizar contenido
     */
    public function update(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $contenido = Contenido::find($id);

        if (!$contenido) {

            return response()->json([
                'message' => 'Contenido no encontrado'
            ], 404);

        }

        $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'contenido' => 'nullable|string',
            'tipo' => 'nullable|in:texto,pdf,imagen,youtube,video,archivo'
        ]);

        $datos = [];

        if ($request->has('titulo')) {
            $datos['titulo'] = $request->titulo;
        }

        if ($request->has('contenido')) {
            $datos['contenido'] = $request->contenido;
        }

        if ($request->has('tipo')) {
            $datos['tipo'] = $request->tipo;
        }

        $contenido->update($datos);

        return response()->json([
            'message' => 'Contenido actualizado correctamente',
            'contenido' => $contenido
        ]);
    }


    /**
     * Eliminar contenido
     */
    public function destroy(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $contenido = Contenido::find($id);

        if (!$contenido) {

            return response()->json([
                'message' => 'Contenido no encontrado'
            ], 404);

        }

        $contenido->delete();

        return response()->json([
            'message' => 'Contenido eliminado correctamente'
        ]);
    }


    /**
     * Contenidos por tema
     */
    public function porTema($temaId)
    {
        $contenidos = Contenido::where(
            'tema_id',
            $temaId
        )
        ->with('archivos')
        ->orderBy('id')
        ->get()
        ->map(function ($contenido) {

            /*
            |--------------------------------------------------------------------------
            | AGREGAR URL A CADA ARCHIVO
            |--------------------------------------------------------------------------
            */

            $contenido->archivos =
                $contenido->archivos->map(
                    function ($archivo) {

                        return [
                            ...$archivo->toArray(),

                            'url' => asset(
                                'storage/' . $archivo->ruta
                            ),
                        ];

                    }
                );


            return $contenido;

        });


        return response()->json(
            $contenidos
        );
    }
}
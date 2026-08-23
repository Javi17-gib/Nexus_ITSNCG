<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Archivo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ArchivoController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | VERIFICAR DOCENTE
    |--------------------------------------------------------------------------
    */

    private function verificarDocente(Request $request)
    {
        if (!$request->user()) {

            return response()->json([
                'message' => 'Usuario no autenticado'
            ], 401);

        }

        if ($request->user()->rol !== 'docente') {

            return response()->json([
                'message' => 'Solo los docentes pueden realizar esta acción'
            ], 403);

        }

        return null;
    }


    /*
    |--------------------------------------------------------------------------
    | LISTAR ARCHIVOS
    |--------------------------------------------------------------------------
    */

    public function index()
    {
        $archivos = Archivo::with('contenido')
            ->orderBy('id')
            ->get()
            ->map(function ($archivo) {

                return [
                    ...$archivo->toArray(),

                    'url' => asset(
                        'storage/' . $archivo->ruta
                    ),
                ];

            });

        return response()->json(
            $archivos
        );
    }


    /*
    |--------------------------------------------------------------------------
    | CREAR ARCHIVO
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        if ($error = $this->verificarDocente($request)) {
            return $error;
        }


        $request->validate([

            'contenido_id' =>
                'required|exists:contenidos,id',

            'archivo' =>
                'required|file|max:20480',

            'tipo' =>
                'required|in:pdf,imagen,video,audio',

        ]);


        $file =
            $request->file('archivo');


        /*
        |--------------------------------------------------------------------------
        | GUARDAR ARCHIVO
        |--------------------------------------------------------------------------
        */

        $ruta =
            $file->store(
                'archivos',
                'public'
            );


        try {

            $archivo =
                Archivo::create([

                    'contenido_id' =>
                        $request->contenido_id,

                    'nombre' =>
                        $file->getClientOriginalName(),

                    'ruta' =>
                        $ruta,

                    'tipo' =>
                        $request->tipo,

                ]);


            return response()->json([

                'message' =>
                    'Archivo subido correctamente',

                'archivo' => [

                    ...$archivo->toArray(),

                    'url' =>
                        asset(
                            'storage/' .
                            $archivo->ruta
                        ),

                ],

            ], 201);


        } catch (\Throwable $e) {

            /*
            |--------------------------------------------------------------------------
            | SI FALLA LA BD, ELIMINAR ARCHIVO FÍSICO
            |--------------------------------------------------------------------------
            */

            Storage::disk('public')
                ->delete($ruta);


            return response()->json([

                'message' =>
                    'No se pudo guardar el archivo',

            ], 500);

        }
    }


    /*
    |--------------------------------------------------------------------------
    | VER ARCHIVO
    |--------------------------------------------------------------------------
    */

    public function show(string $id)
    {
        $archivo =
            Archivo::with('contenido')
                ->find($id);


        if (!$archivo) {

            return response()->json([

                'message' =>
                    'Archivo no encontrado'

            ], 404);

        }


        return response()->json([

            ...$archivo->toArray(),

            'url' =>
                asset(
                    'storage/' .
                    $archivo->ruta
                ),

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR / REEMPLAZAR ARCHIVO
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        string $id
    ) {

        if ($error = $this->verificarDocente($request)) {
            return $error;
        }


        /*
        |--------------------------------------------------------------------------
        | BUSCAR ARCHIVO
        |--------------------------------------------------------------------------
        */

        $archivo =
            Archivo::find($id);


        if (!$archivo) {

            return response()->json([

                'message' =>
                    'Archivo no encontrado'

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN
        |--------------------------------------------------------------------------
        */

        $request->validate([

            'nombre' =>
                'sometimes|required|string|max:255',

            'tipo' =>
                'sometimes|required|in:pdf,imagen,video,audio',

            'archivo' =>
                'nullable|file|max:20480',

        ]);


        /*
        |--------------------------------------------------------------------------
        | GUARDAR RUTA ANTERIOR
        |--------------------------------------------------------------------------
        */

        $rutaAnterior =
            $archivo->ruta;


        $rutaNueva =
            null;


        try {

            /*
            |--------------------------------------------------------------------------
            | ¿VIENE UN ARCHIVO NUEVO?
            |--------------------------------------------------------------------------
            */

            if ($request->hasFile('archivo')) {

                $file =
                    $request->file('archivo');


                /*
                |--------------------------------------------------------------------------
                | GUARDAR NUEVO ARCHIVO PRIMERO
                |--------------------------------------------------------------------------
                */

                $rutaNueva =
                    $file->store(
                        'archivos',
                        'public'
                    );


                /*
                |--------------------------------------------------------------------------
                | ACTUALIZAR REGISTRO
                |--------------------------------------------------------------------------
                */

                $archivo->ruta =
                    $rutaNueva;


                /*
                | Si el usuario mandó nombre manualmente
                | lo respetamos.
                |
                | Si no, usamos el nombre real del nuevo archivo.
                */

                if ($request->filled('nombre')) {

                    $archivo->nombre =
                        $request->nombre;

                } else {

                    $archivo->nombre =
                        $file->getClientOriginalName();

                }


                /*
                |--------------------------------------------------------------------------
                | TIPO
                |--------------------------------------------------------------------------
                */

                if ($request->filled('tipo')) {

                    $archivo->tipo =
                        $request->tipo;

                }


                $archivo->save();


                /*
                |--------------------------------------------------------------------------
                | AHORA SÍ ELIMINAMOS EL ARCHIVO ANTERIOR
                |--------------------------------------------------------------------------
                */

                if (
                    $rutaAnterior &&
                    $rutaAnterior !== $rutaNueva
                ) {

                    Storage::disk('public')
                        ->delete($rutaAnterior);

                }


            } else {

                /*
                |--------------------------------------------------------------------------
                | NO SE SUBIÓ ARCHIVO NUEVO
                |
                | Solo actualizar nombre/tipo
                |--------------------------------------------------------------------------
                */

                $datos = [];


                if ($request->has('nombre')) {

                    $datos['nombre'] =
                        $request->nombre;

                }


                if ($request->has('tipo')) {

                    $datos['tipo'] =
                        $request->tipo;

                }


                if (!empty($datos)) {

                    $archivo->update(
                        $datos
                    );

                }

            }


            /*
            |--------------------------------------------------------------------------
            | RESPUESTA
            |--------------------------------------------------------------------------
            */

            $archivo->refresh();


            return response()->json([

                'message' =>
                    $request->hasFile('archivo')
                        ? 'Archivo reemplazado correctamente'
                        : 'Archivo actualizado correctamente',

                'archivo' => [

                    ...$archivo->toArray(),

                    'url' =>
                        asset(
                            'storage/' .
                            $archivo->ruta
                        ),

                ],

            ]);


        } catch (\Throwable $e) {

            /*
            |--------------------------------------------------------------------------
            | SI FALLA, ELIMINAR EL NUEVO ARCHIVO
            |--------------------------------------------------------------------------
            */

            if ($rutaNueva) {

                Storage::disk('public')
                    ->delete($rutaNueva);

            }


            return response()->json([

                'message' =>
                    'No se pudo actualizar el archivo',

                'error' =>
                    config('app.debug')
                        ? $e->getMessage()
                        : null,

            ], 500);

        }
    }


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR ARCHIVO
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Request $request,
        string $id
    ) {

        if ($error = $this->verificarDocente($request)) {
            return $error;
        }


        $archivo =
            Archivo::find($id);


        if (!$archivo) {

            return response()->json([

                'message' =>
                    'Archivo no encontrado'

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR ARCHIVO FÍSICO
        |--------------------------------------------------------------------------
        */

        if ($archivo->ruta) {

            Storage::disk('public')
                ->delete(
                    $archivo->ruta
                );

        }


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR REGISTRO BD
        |--------------------------------------------------------------------------
        */

        $archivo->delete();


        return response()->json([

            'message' =>
                'Archivo eliminado correctamente'

        ]);

    }


    /*
    |--------------------------------------------------------------------------
    | ARCHIVOS POR CONTENIDO
    |--------------------------------------------------------------------------
    */

    public function porContenido(
        $contenidoId
    ) {

        $archivos =
            Archivo::where(
                'contenido_id',
                $contenidoId
            )
            ->orderBy('id')
            ->get()
            ->map(function ($archivo) {

                return [

                    ...$archivo->toArray(),

                    'url' =>
                        asset(
                            'storage/' .
                            $archivo->ruta
                        ),

                ];

            });


        return response()->json(
            $archivos
        );

    }
}
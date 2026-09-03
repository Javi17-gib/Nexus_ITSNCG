<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RetoController extends Controller
{

    /*
    |--------------------------------------------------------------------------
    | LISTAR RETOS DE UN TEMA
    |--------------------------------------------------------------------------
    */

    public function index(
        Request $request,
        $tema_id
    ) {

        $retos = Reto::where(
                'tema_id',
                $tema_id
            )
            ->where(
                'activo',
                true
            )
            ->latest()
            ->get();


        /*
        |--------------------------------------------------------------------------
        | PROTEGER SOLUCIÓN PARA ALUMNOS
        |--------------------------------------------------------------------------
        |
        | Si el docente no ha activado la solución,
        | el alumno no recibe su contenido.
        |
        */

        if (
            $request->user() &&
            $request->user()->rol === 'alumno'
        ) {

            $retos->transform(
                function ($reto) {

                    if (
                        !$reto->mostrar_solucion
                    ) {

                        $reto->solucion = null;

                        $reto->imagen_solucion = null;

                    }

                    return $reto;
                }
            );
        }


        return response()->json(
            $retos
        );
    }


    /*
    |--------------------------------------------------------------------------
    | CREAR RETO
    |--------------------------------------------------------------------------
    */

    public function store(
        Request $request
    ) {

        $request->validate([

            'tema_id' =>
                'required|exists:temas,id',

            'titulo' =>
                'required|string|max:255',

            'descripcion' =>
                'nullable|string',

            'solucion' =>
                'nullable|string',

            'mostrar_solucion' =>
                'nullable|boolean',

            'activo' =>
                'nullable|boolean',

            'imagen_reto' =>
                'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',

            'imagen_solucion' =>
                'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',

        ]);


        $reto = new Reto();


        /*
        |--------------------------------------------------------------------------
        | DATOS PRINCIPALES
        |--------------------------------------------------------------------------
        */

        $reto->tema_id =
            $request->tema_id;

        $reto->titulo =
            $request->titulo;

        $reto->descripcion =
            $request->descripcion;

        $reto->solucion =
            $request->solucion;


        /*
        |--------------------------------------------------------------------------
        | VISIBILIDAD
        |--------------------------------------------------------------------------
        */

        $reto->mostrar_solucion =
            $request->boolean(
                'mostrar_solucion',
                false
            );


        /*
        |--------------------------------------------------------------------------
        | ACTIVO
        |--------------------------------------------------------------------------
        */

        $reto->activo =
            $request->has('activo')
                ? $request->boolean('activo')
                : true;


        /*
        |--------------------------------------------------------------------------
        | IMAGEN DEL RETO
        |--------------------------------------------------------------------------
        */

        if (
            $request->hasFile(
                'imagen_reto'
            )
        ) {

            $reto->imagen_reto =
                $request
                    ->file('imagen_reto')
                    ->store(
                        'retos',
                        'public'
                    );
        }


        /*
        |--------------------------------------------------------------------------
        | IMAGEN DE LA SOLUCIÓN
        |--------------------------------------------------------------------------
        */

        if (
            $request->hasFile(
                'imagen_solucion'
            )
        ) {

            $reto->imagen_solucion =
                $request
                    ->file('imagen_solucion')
                    ->store(
                        'soluciones-retos',
                        'public'
                    );
        }


        /*
        |--------------------------------------------------------------------------
        | GUARDAR
        |--------------------------------------------------------------------------
        */

        $reto->save();


        return response()->json([

            'message' =>
                'Reto creado correctamente',

            'reto' =>
                $reto,

        ], 201);
    }


    /*
    |--------------------------------------------------------------------------
    | MOSTRAR UN RETO
    |--------------------------------------------------------------------------
    */

    public function show(
        Request $request,
        $id
    ) {

        $reto = Reto::with(
            'tema'
        )->find($id);


        if (!$reto) {

            return response()->json([

                'message' =>
                    'Reto no encontrado',

            ], 404);
        }


        /*
        |--------------------------------------------------------------------------
        | OCULTAR SOLUCIÓN
        |--------------------------------------------------------------------------
        */

        if (
            $request->user() &&
            $request->user()->rol === 'alumno' &&
            !$reto->mostrar_solucion
        ) {

            $reto->solucion = null;

            $reto->imagen_solucion = null;
        }


        return response()->json(
            $reto
        );
    }


    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR RETO
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        $id
    ) {

        $reto = Reto::find($id);


        if (!$reto) {

            return response()->json([

                'message' =>
                    'Reto no encontrado',

            ], 404);
        }


        $request->validate([

            'titulo' =>
                'sometimes|string|max:255',

            'descripcion' =>
                'nullable|string',

            'solucion' =>
                'nullable|string',

            'mostrar_solucion' =>
                'sometimes|boolean',

            'activo' =>
                'sometimes|boolean',

            'imagen_reto' =>
                'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',

            'imagen_solucion' =>
                'nullable|image|mimes:jpg,jpeg,png,webp|max:10240',

        ]);


        /*
        |--------------------------------------------------------------------------
        | TÍTULO
        |--------------------------------------------------------------------------
        */

        if (
            $request->has('titulo')
        ) {

            $reto->titulo =
                $request->titulo;
        }


        /*
        |--------------------------------------------------------------------------
        | DESCRIPCIÓN
        |--------------------------------------------------------------------------
        */

        if (
            $request->has('descripcion')
        ) {

            $reto->descripcion =
                $request->descripcion;
        }


        /*
        |--------------------------------------------------------------------------
        | SOLUCIÓN
        |--------------------------------------------------------------------------
        */

        if (
            $request->has('solucion')
        ) {

            $reto->solucion =
                $request->solucion;
        }


        /*
        |--------------------------------------------------------------------------
        | MOSTRAR SOLUCIÓN
        |--------------------------------------------------------------------------
        */

        if (
            $request->has(
                'mostrar_solucion'
            )
        ) {

            $reto->mostrar_solucion =
                $request->boolean(
                    'mostrar_solucion'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | ACTIVO
        |--------------------------------------------------------------------------
        */

        if (
            $request->has('activo')
        ) {

            $reto->activo =
                $request->boolean(
                    'activo'
                );
        }


        /*
        |--------------------------------------------------------------------------
        | REEMPLAZAR IMAGEN DEL RETO
        |--------------------------------------------------------------------------
        */

        if (
            $request->hasFile(
                'imagen_reto'
            )
        ) {

            if (
                $reto->imagen_reto
            ) {

                Storage::disk(
                    'public'
                )->delete(
                    $reto->imagen_reto
                );
            }


            $reto->imagen_reto =
                $request
                    ->file('imagen_reto')
                    ->store(
                        'retos',
                        'public'
                    );
        }


        /*
        |--------------------------------------------------------------------------
        | REEMPLAZAR IMAGEN DE SOLUCIÓN
        |--------------------------------------------------------------------------
        */

        if (
            $request->hasFile(
                'imagen_solucion'
            )
        ) {

            if (
                $reto->imagen_solucion
            ) {

                Storage::disk(
                    'public'
                )->delete(
                    $reto->imagen_solucion
                );
            }


            $reto->imagen_solucion =
                $request
                    ->file('imagen_solucion')
                    ->store(
                        'soluciones-retos',
                        'public'
                    );
        }


        /*
        |--------------------------------------------------------------------------
        | GUARDAR CAMBIOS
        |--------------------------------------------------------------------------
        */

        $reto->save();


        return response()->json([

            'message' =>
                'Reto actualizado correctamente',

            'reto' =>
                $reto,

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ACTIVAR / OCULTAR SOLUCIÓN
    |--------------------------------------------------------------------------
    */

    public function cambiarSolucion(
        Request $request,
        $id
    ) {

        $reto = Reto::find($id);


        if (!$reto) {

            return response()->json([

                'message' =>
                    'Reto no encontrado',

            ], 404);
        }


        $request->validate([

            'mostrar_solucion' =>
                'required|boolean',

        ]);


        $reto->mostrar_solucion =
            $request->boolean(
                'mostrar_solucion'
            );


        $reto->save();


        return response()->json([

            'message' =>
                $reto->mostrar_solucion

                    ? 'Solución mostrada a los alumnos'

                    : 'Solución oculta para los alumnos',

            'mostrar_solucion' =>
                $reto->mostrar_solucion,

            'reto' =>
                $reto,

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR RETO
    |--------------------------------------------------------------------------
    */

    public function destroy(
        $id
    ) {

        $reto = Reto::find($id);


        if (!$reto) {

            return response()->json([

                'message' =>
                    'Reto no encontrado',

            ], 404);
        }


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR IMAGEN DEL RETO
        |--------------------------------------------------------------------------
        */

        if (
            $reto->imagen_reto
        ) {

            Storage::disk(
                'public'
            )->delete(
                $reto->imagen_reto
            );
        }


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR IMAGEN DE SOLUCIÓN
        |--------------------------------------------------------------------------
        */

        if (
            $reto->imagen_solucion
        ) {

            Storage::disk(
                'public'
            )->delete(
                $reto->imagen_solucion
            );
        }


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR RETO
        |--------------------------------------------------------------------------
        */

        $reto->delete();


        return response()->json([

            'message' =>
                'Reto eliminado correctamente',

        ]);
    }
}
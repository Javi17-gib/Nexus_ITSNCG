<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Materia;

class MateriaController extends Controller
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
    | LISTAR MATERIAS
    |--------------------------------------------------------------------------
    |
    | DOCENTE:
    | Solo devuelve las materias creadas por el docente autenticado.
    |
    | ALUMNO:
    | Por ahora devuelve las materias activas.
    | Después lo conectaremos con sus grupos.
    |
    */

    public function index(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | DOCENTE
        |--------------------------------------------------------------------------
        */

        if ($request->user()->rol === 'docente') {

            $materias = Materia::withCount('unidades')
                ->where(
                    'docente_id',
                    $request->user()->id
                )
                ->orderBy('id', 'asc')
                ->get();

            return response()->json(
                $materias
            );
        }


        /*
        |--------------------------------------------------------------------------
        | ALUMNO
        |--------------------------------------------------------------------------
        |
        | Por ahora mostramos materias activas.
        | Más adelante filtraremos por grupos/asignaciones.
        |
        */

        $materias = Materia::withCount('unidades')
            ->where('activa', true)
            ->orderBy('id', 'asc')
            ->get();


        return response()->json(
            $materias
        );
    }


    /*
    |--------------------------------------------------------------------------
    | CREAR MATERIA
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTES
        |--------------------------------------------------------------------------
        */

        if (
            $respuesta =
                $this->verificarDocente($request)
        ) {

            return $respuesta;

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN
        |--------------------------------------------------------------------------
        */

        $request->validate([

            'nombre' =>
                'required|string|max:255',

            'descripcion' =>
                'nullable|string',

            'color' =>
                'nullable|string|max:50',

            'icono' =>
                'nullable|string|max:255',

            'portada' =>
                'nullable|string|max:255',

            'activa' =>
                'nullable|boolean',

        ]);


        /*
        |--------------------------------------------------------------------------
        | CREAR MATERIA
        |--------------------------------------------------------------------------
        */

        $materia = Materia::create([

            /*
            |--------------------------------------------------------------
            | DOCENTE AUTENTICADO
            |--------------------------------------------------------------
            */

            'docente_id' =>
                $request->user()->id,

            'nombre' =>
                $request->nombre,

            'descripcion' =>
                $request->descripcion,

            'color' =>
                $request->color,

            'icono' =>
                $request->icono,

            'portada' =>
                $request->portada,

            'activa' =>
                $request->activa ?? true,

        ]);


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' =>
                'Materia creada correctamente',

            'materia' =>
                $materia,

        ], 201);
    }


    /*
    |--------------------------------------------------------------------------
    | VER UNA MATERIA
    |--------------------------------------------------------------------------
    */

    public function show(
        Request $request,
        string $id
    ) {

        $materia =
            Materia::withCount('unidades')
                ->find($id);


        /*
        |--------------------------------------------------------------------------
        | NO EXISTE
        |--------------------------------------------------------------------------
        */

        if (!$materia) {

            return response()->json([

                'message' =>
                    'Materia no encontrada',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | DOCENTE
        |--------------------------------------------------------------------------
        |
        | Un docente solamente puede consultar
        | sus propias materias.
        |
        */

        if (
            $request->user()->rol === 'docente' &&
            $materia->docente_id != $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permiso para consultar esta materia',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json(
            $materia
        );
    }


    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR MATERIA
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        string $id
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTES
        |--------------------------------------------------------------------------
        */

        if (
            $respuesta =
                $this->verificarDocente($request)
        ) {

            return $respuesta;

        }


        /*
        |--------------------------------------------------------------------------
        | BUSCAR MATERIA
        |--------------------------------------------------------------------------
        */

        $materia =
            Materia::find($id);


        if (!$materia) {

            return response()->json([

                'message' =>
                    'Materia no encontrada',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $materia->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permiso para modificar esta materia',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN
        |--------------------------------------------------------------------------
        */

        $request->validate([

            'nombre' =>
                'sometimes|required|string|max:255',

            'descripcion' =>
                'nullable|string',

            'color' =>
                'nullable|string|max:50',

            'icono' =>
                'nullable|string|max:255',

            'portada' =>
                'nullable|string|max:255',

            'activa' =>
                'nullable|boolean',

        ]);


        /*
        |--------------------------------------------------------------------------
        | ACTUALIZAR
        |--------------------------------------------------------------------------
        |
        | IMPORTANTE:
        | No usamos $request->all()
        | porque no queremos permitir que el frontend
        | cambie docente_id.
        |
        */

        $materia->update([

            'nombre' =>
                $request->has('nombre')
                    ? $request->nombre
                    : $materia->nombre,

            'descripcion' =>
                $request->has('descripcion')
                    ? $request->descripcion
                    : $materia->descripcion,

            'color' =>
                $request->has('color')
                    ? $request->color
                    : $materia->color,

            'icono' =>
                $request->has('icono')
                    ? $request->icono
                    : $materia->icono,

            'portada' =>
                $request->has('portada')
                    ? $request->portada
                    : $materia->portada,

            'activa' =>
                $request->has('activa')
                    ? $request->activa
                    : $materia->activa,

        ]);


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' =>
                'Materia actualizada correctamente',

            'materia' =>
                $materia->fresh(),

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR MATERIA
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Request $request,
        string $id
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTES
        |--------------------------------------------------------------------------
        */

        if (
            $respuesta =
                $this->verificarDocente($request)
        ) {

            return $respuesta;

        }


        /*
        |--------------------------------------------------------------------------
        | BUSCAR MATERIA
        |--------------------------------------------------------------------------
        */

        $materia =
            Materia::find($id);


        if (!$materia) {

            return response()->json([

                'message' =>
                    'Materia no encontrada',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $materia->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permiso para eliminar esta materia',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR
        |--------------------------------------------------------------------------
        */

        $materia->delete();


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' =>
                'Materia eliminada correctamente',

        ]);
    }
}
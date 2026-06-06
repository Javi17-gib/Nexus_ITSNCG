<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Unidad;

class UnidadController extends Controller
{
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
     * Listar unidades
     */
    public function index()
    {
        return response()->json(
            Unidad::with('materia')
                ->orderBy('orden')
                ->get()
        );
    }

    /**
     * Crear unidad
     */
    public function store(Request $request)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $request->validate([
            'materia_id' => 'required|exists:materias,id',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'orden' => 'nullable|integer'
        ]);

        $unidad = Unidad::create([
            'materia_id' => $request->materia_id,
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'orden' => $request->orden ?? 1
        ]);

        return response()->json([
            'message' => 'Unidad creada correctamente',
            'unidad' => $unidad
        ], 201);
    }

    /**
     * Ver una unidad
     */
    public function show(string $id)
    {
        $unidad = Unidad::with('materia')->find($id);

        if (!$unidad) {
            return response()->json([
                'message' => 'Unidad no encontrada'
            ], 404);
        }

        return response()->json($unidad);
    }

    /**
     * Actualizar unidad
     */
    public function update(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $unidad = Unidad::find($id);

        if (!$unidad) {
            return response()->json([
                'message' => 'Unidad no encontrada'
            ], 404);
        }

        $unidad->update($request->all());

        return response()->json([
            'message' => 'Unidad actualizada correctamente',
            'unidad' => $unidad
        ]);
    }

    /**
     * Eliminar unidad
     */
    public function destroy(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $unidad = Unidad::find($id);

        if (!$unidad) {
            return response()->json([
                'message' => 'Unidad no encontrada'
            ], 404);
        }

        $unidad->delete();

        return response()->json([
            'message' => 'Unidad eliminada correctamente'
        ]);
    }

    /**
     * Obtener unidades por materia
     */
    public function porMateria($materiaId)
    {
        $unidades = Unidad::where('materia_id', $materiaId)
            ->orderBy('orden')
            ->get();

        return response()->json($unidades);
    }
}
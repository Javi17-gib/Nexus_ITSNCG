<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Materia;

class MateriaController extends Controller
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
     * Listar materias
     */
    public function index()
    {
        return response()->json(
            Materia::orderBy('id', 'asc')->get()
        );
    }

    /**
     * Crear materia
     */
    public function store(Request $request)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'color' => 'nullable|string|max:50',
            'icono' => 'nullable|string|max:255',
            'portada' => 'nullable|string|max:255',
            'activa' => 'nullable|boolean'
        ]);

        $materia = Materia::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'color' => $request->color,
            'icono' => $request->icono,
            'portada' => $request->portada,
            'activa' => $request->activa ?? true
        ]);

        return response()->json([
            'message' => 'Materia creada correctamente',
            'materia' => $materia
        ], 201);
    }

    /**
     * Ver una materia
     */
    public function show(string $id)
    {
        $materia = Materia::find($id);

        if (!$materia) {
            return response()->json([
                'message' => 'Materia no encontrada'
            ], 404);
        }

        return response()->json($materia);
    }

    /**
     * Actualizar materia
     */
    public function update(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $materia = Materia::find($id);

        if (!$materia) {
            return response()->json([
                'message' => 'Materia no encontrada'
            ], 404);
        }

        $materia->update($request->all());

        return response()->json([
            'message' => 'Materia actualizada correctamente',
            'materia' => $materia
        ]);
    }

    /**
     * Eliminar materia
     */
    public function destroy(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $materia = Materia::find($id);

        if (!$materia) {
            return response()->json([
                'message' => 'Materia no encontrada'
            ], 404);
        }

        $materia->delete();

        return response()->json([
            'message' => 'Materia eliminada correctamente'
        ]);
    }
}
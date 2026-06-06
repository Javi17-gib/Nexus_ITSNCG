<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tema;

class TemaController extends Controller
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
     * Listar temas
     */
    public function index()
    {
        return response()->json(
            Tema::with('unidad')
                ->orderBy('orden')
                ->get()
        );
    }

    /**
     * Crear tema
     */
    public function store(Request $request)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $request->validate([
            'unidad_id' => 'required|exists:unidades,id',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
            'orden' => 'nullable|integer'
        ]);

        $tema = Tema::create([
            'unidad_id' => $request->unidad_id,
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'orden' => $request->orden ?? 1
        ]);

        return response()->json([
            'message' => 'Tema creado correctamente',
            'tema' => $tema
        ], 201);
    }

    /**
     * Ver tema
     */
    public function show(string $id)
    {
        $tema = Tema::with('unidad')->find($id);

        if (!$tema) {
            return response()->json([
                'message' => 'Tema no encontrado'
            ], 404);
        }

        return response()->json($tema);
    }

    /**
     * Actualizar tema
     */
    public function update(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $tema = Tema::find($id);

        if (!$tema) {
            return response()->json([
                'message' => 'Tema no encontrado'
            ], 404);
        }

        $tema->update($request->all());

        return response()->json([
            'message' => 'Tema actualizado correctamente',
            'tema' => $tema
        ]);
    }

    /**
     * Eliminar tema
     */
    public function destroy(Request $request, string $id)
    {
        if ($respuesta = $this->verificarDocente($request)) {
            return $respuesta;
        }

        $tema = Tema::find($id);

        if (!$tema) {
            return response()->json([
                'message' => 'Tema no encontrado'
            ], 404);
        }

        $tema->delete();

        return response()->json([
            'message' => 'Tema eliminado correctamente'
        ]);
    }

    /**
     * Temas por unidad
     */
    public function porUnidad($unidadId)
    {
        $temas = Tema::where('unidad_id', $unidadId)
            ->orderBy('orden')
            ->get();

        return response()->json($temas);
    }
}
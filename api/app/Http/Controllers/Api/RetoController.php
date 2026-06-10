<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reto;
use Illuminate\Support\Facades\Storage;

class RetoController extends Controller
{
    /**
     * Listar retos por tema
     */
    public function index($tema_id)
    {
        $retos = Reto::where('tema_id', $tema_id)
            ->where('activo', true)
            ->latest()
            ->get();

        return response()->json($retos);
    }

    /**
     * Crear reto
     */
    public function store(Request $request)
    {
        $request->validate([
            'tema_id' => 'required|exists:temas,id',
            'titulo' => 'required|string|max:255',
            'tipo' => 'required|in:archivo,interactivo',
        ]);

        $reto = new Reto();

        $reto->tema_id = $request->tema_id;
        $reto->titulo = $request->titulo;
        $reto->descripcion = $request->descripcion;
        $reto->tipo = $request->tipo;
        $reto->mostrar_solucion = $request->mostrar_solucion ?? false;
        $reto->activo = true;

        if ($request->hasFile('archivo_reto')) {
            $reto->archivo_reto = $request->file('archivo_reto')
                ->store('retos', 'public');
        }

        if ($request->hasFile('archivo_solucion')) {
            $reto->archivo_solucion = $request->file('archivo_solucion')
                ->store('soluciones', 'public');
        }

        $reto->save();

        return response()->json([
            'message' => 'Reto creado correctamente',
            'reto' => $reto
        ], 201);
    }

    /**
     * Ver un reto
     */
    public function show($id)
    {
        $reto = Reto::with('tema')->find($id);

        if (!$reto) {
            return response()->json([
                'message' => 'Reto no encontrado'
            ], 404);
        }

        return response()->json($reto);
    }

    /**
     * Actualizar reto
     */
    public function update(Request $request, $id)
    {
        $reto = Reto::find($id);

        if (!$reto) {
            return response()->json([
                'message' => 'Reto no encontrado'
            ], 404);
        }

        $request->validate([
            'titulo' => 'sometimes|string|max:255',
            'tipo' => 'sometimes|in:archivo,interactivo',
        ]);

        if ($request->has('titulo')) {
            $reto->titulo = $request->titulo;
        }

        if ($request->has('descripcion')) {
            $reto->descripcion = $request->descripcion;
        }

        if ($request->has('tipo')) {
            $reto->tipo = $request->tipo;
        }

        if ($request->has('mostrar_solucion')) {
            $reto->mostrar_solucion = $request->mostrar_solucion;
        }

        if ($request->has('activo')) {
            $reto->activo = $request->activo;
        }

        if ($request->hasFile('archivo_reto')) {

            if ($reto->archivo_reto) {
                Storage::disk('public')
                    ->delete($reto->archivo_reto);
            }

            $reto->archivo_reto = $request->file('archivo_reto')
                ->store('retos', 'public');
        }

        if ($request->hasFile('archivo_solucion')) {

            if ($reto->archivo_solucion) {
                Storage::disk('public')
                    ->delete($reto->archivo_solucion);
            }

            $reto->archivo_solucion = $request->file('archivo_solucion')
                ->store('soluciones', 'public');
        }

        $reto->save();

        return response()->json([
            'message' => 'Reto actualizado correctamente',
            'reto' => $reto
        ]);
    }

    /**
     * Eliminar reto
     */
    public function destroy($id)
    {
        $reto = Reto::find($id);

        if (!$reto) {
            return response()->json([
                'message' => 'Reto no encontrado'
            ], 404);
        }

        if ($reto->archivo_reto) {
            Storage::disk('public')
                ->delete($reto->archivo_reto);
        }

        if ($reto->archivo_solucion) {
            Storage::disk('public')
                ->delete($reto->archivo_solucion);
        }

        $reto->delete();

        return response()->json([
            'message' => 'Reto eliminado correctamente'
        ]);
    }
}
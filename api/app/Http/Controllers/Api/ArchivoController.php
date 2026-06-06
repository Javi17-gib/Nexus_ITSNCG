<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Archivo;
use Illuminate\Support\Facades\Storage;

class ArchivoController extends Controller
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
     * Listar archivos
     */
    public function index()
    {
        return response()->json(
            Archivo::with('contenido')->get()
        );
    }

    /**
     * Crear archivo
     */
    public function store(Request $request)
    {
        if ($error = $this->verificarDocente($request)) {
            return $error;
        }

        $request->validate([
            'contenido_id' => 'required|exists:contenidos,id',
            'archivo' => 'required|file|max:20480',
            'tipo' => 'required|in:pdf,imagen,video,audio'
        ]);

        $file = $request->file('archivo');

        $ruta = $file->store('archivos', 'public');

        $archivo = Archivo::create([
            'contenido_id' => $request->contenido_id,
            'nombre' => $file->getClientOriginalName(),
            'ruta' => $ruta,
            'tipo' => $request->tipo
        ]);

        return response()->json([
            'message' => 'Archivo subido correctamente',
            'archivo' => $archivo
        ], 201);
    }

    /**
     * Ver archivo
     */
    public function show(string $id)
    {
        $archivo = Archivo::with('contenido')->find($id);

        if (!$archivo) {
            return response()->json([
                'message' => 'Archivo no encontrado'
            ], 404);
        }

        return response()->json($archivo);
    }

    /**
     * Actualizar archivo
     */
    public function update(Request $request, string $id)
    {
        if ($error = $this->verificarDocente($request)) {
            return $error;
        }

        $archivo = Archivo::find($id);

        if (!$archivo) {
            return response()->json([
                'message' => 'Archivo no encontrado'
            ], 404);
        }

        $request->validate([
            'nombre' => 'required|string|max:255',
            'tipo' => 'required|in:pdf,imagen,video,audio'
        ]);

        $archivo->update([
            'nombre' => $request->nombre,
            'tipo' => $request->tipo
        ]);

        return response()->json([
            'message' => 'Archivo actualizado correctamente',
            'archivo' => $archivo
        ]);
    }

    /**
     * Eliminar archivo
     */
    public function destroy(Request $request, string $id)
    {
        if ($error = $this->verificarDocente($request)) {
            return $error;
        }

        $archivo = Archivo::find($id);

        if (!$archivo) {
            return response()->json([
                'message' => 'Archivo no encontrado'
            ], 404);
        }

        Storage::disk('public')->delete($archivo->ruta);

        $archivo->delete();

        return response()->json([
            'message' => 'Archivo eliminado correctamente'
        ]);
    }

    /**
     * Archivos por contenido
     */
    public function porContenido($contenidoId)
    {
        $archivos = Archivo::where('contenido_id', $contenidoId)->get();

        return response()->json($archivos);
    }
}
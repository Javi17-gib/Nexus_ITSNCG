<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reto;
use App\Models\Tema;
use Illuminate\Support\Facades\Storage;

class RetoController extends Controller
{
    // 📌 LISTAR RETOS POR TEMA
    public function index($tema_id)
    {
        $retos = Reto::where('tema_id', $tema_id)
            ->where('activo', true)
            ->latest()
            ->get();

        return response()->json($retos);
    }

    // 📌 CREAR RETO
    public function store(Request $request)
    {
        $request->validate([
            'tema_id' => 'required|exists:temas,id',
            'titulo' => 'required',
            'tipo' => 'required|in:archivo,interactivo',
        ]);

        $reto = new Reto();
        $reto->tema_id = $request->tema_id;
        $reto->titulo = $request->titulo;
        $reto->descripcion = $request->descripcion;
        $reto->tipo = $request->tipo;
        $reto->mostrar_solucion = $request->mostrar_solucion ?? false;
        $reto->activo = true;

        // 📂 ARCHIVO RETO
        if ($request->hasFile('archivo_reto')) {
            $reto->archivo_reto = $request->file('archivo_reto')
                ->store('retos', 'public');
        }

        // 📂 ARCHIVO SOLUCIÓN
        if ($request->hasFile('archivo_solucion')) {
            $reto->archivo_solucion = $request->file('archivo_solucion')
                ->store('soluciones', 'public');
        }

        $reto->save();

        return response()->json([
            'message' => 'Reto creado correctamente',
            'reto' => $reto
        ]);
    }
}
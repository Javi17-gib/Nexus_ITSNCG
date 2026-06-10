<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Estadistica;
use Carbon\Carbon;

class EstadisticaController extends Controller
{
    /**
     * Registrar visita del alumno.
     */
    public function registrar(Request $request)
    {
        $request->validate([
            'materia_id' => 'required|exists:materias,id',
            'grupo_id' => 'required|exists:grupos,id'
        ]);

        $user = $request->user();

        $hoy = Carbon::today();

        $existe = Estadistica::where('user_id', $user->id)
            ->where('materia_id', $request->materia_id)
            ->where('grupo_id', $request->grupo_id)
            ->whereDate('fecha_ingreso', $hoy)
            ->exists();

        if (!$existe) {

            Estadistica::create([
                'user_id' => $user->id,
                'materia_id' => $request->materia_id,
                'grupo_id' => $request->grupo_id,
                'fecha_ingreso' => now()
            ]);
        }

        return response()->json([
            'message' => 'Visita registrada'
        ]);
    }
    public function visitasPorGrupo($grupoId)
{
    $total = Estadistica::where('grupo_id', $grupoId)
        ->count();

    return response()->json([
        'grupo_id' => $grupoId,
        'total_visitas' => $total
    ]);
}

public function visitasPorSemana($grupoId)
{
    $visitas = Estadistica::where('grupo_id', $grupoId)
        ->where('fecha_ingreso', '>=', now()->subDays(7))
        ->get()
        ->groupBy(function ($item) {
            return \Carbon\Carbon::parse(
                $item->fecha_ingreso
            )->format('Y-m-d');
        });

    return response()->json($visitas);
}

public function alumnosActivos($grupoId)
{
    $alumnos = Estadistica::where('grupo_id', $grupoId)
        ->distinct('user_id')
        ->count('user_id');

    return response()->json([
        'grupo_id' => $grupoId,
        'alumnos_activos' => $alumnos
    ]);
}

public function totalAlumnosGrupo($grupoId)
{
    $total = Estadistica::where('grupo_id', $grupoId)
        ->distinct('user_id')
        ->count('user_id');

    return response()->json([
        'grupo_id' => $grupoId,
        'total_alumnos' => $total
    ]);
}

public function visitasPorMateria($materiaId)
{
    $total = Estadistica::where(
        'materia_id',
        $materiaId
    )->count();

    return response()->json([
        'materia_id' => $materiaId,
        'total_visitas' => $total
    ]);
}

public function dashboardDocente(Request $request)
{
    $docente = $request->user();

    $grupos = \App\Models\Grupo::where(
        'docente_id',
        $docente->id
    )->pluck('id');

    $totalGrupos = $grupos->count();

    $totalVisitas = Estadistica::whereIn(
        'grupo_id',
        $grupos
    )->count();

    $alumnosActivos = Estadistica::whereIn(
        'grupo_id',
        $grupos
    )
    ->distinct('user_id')
    ->count('user_id');

    return response()->json([
        'grupos' => $totalGrupos,
        'visitas' => $totalVisitas,
        'alumnos_activos' => $alumnosActivos
    ]);
}
}
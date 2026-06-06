<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grupo;
use App\Models\GrupoUser;
use Illuminate\Support\Str;


class GrupoController extends Controller
{
    /**
     * Listar grupos (puedes usarlo después)
     */
    public function index()
    {
        $grupos = Grupo::all();

        return response()->json($grupos);
    }

    /**
     * Crear grupo (solo docente)
     */
    public function store(Request $request)
{
    // Solo docentes pueden crear grupos
    if (auth()->user()->rol !== 'docente') {
        return response()->json([
            'message' => 'Solo los docentes pueden crear grupos'
        ], 403);
    }

    $request->validate([
        'nombre' => 'required|string|max:255',
        'materia_id' => 'required|integer',
        'semestre' => 'required|string|max:50',
        'periodo' => 'required|string|max:100'
    ]);

    // Generar código único
    do {
        $codigo = Str::upper(Str::random(6));
    } while (Grupo::where('codigo_acceso', $codigo)->exists());

    $grupo = Grupo::create([
        'nombre' => $request->nombre,
        'materia_id' => $request->materia_id,
        'docente_id' => auth()->id(),
        'codigo_acceso' => $codigo,
        'semestre' => $request->semestre,
        'periodo' => $request->periodo
    ]);

    return response()->json([
        'message' => 'Grupo creado correctamente',
        'grupo' => $grupo
    ], 201);
}

    /**
     * Ver un grupo específico
     */
    public function show(string $id)
    {
        $grupo = Grupo::find($id);

        if (!$grupo) {
            return response()->json([
                'message' => 'Grupo no encontrado'
            ], 404);
        }

        return response()->json($grupo);
    }

    /**
     * Actualizar grupo
     */
    public function update(Request $request, string $id)
    {
        $grupo = Grupo::find($id);

        if (!$grupo) {
            return response()->json([
                'message' => 'Grupo no encontrado'
            ], 404);
        }

        $grupo->update($request->all());

        return response()->json([
            'message' => 'Grupo actualizado',
            'grupo' => $grupo
        ]);
    }

    /**
     * Eliminar grupo
     */
    public function destroy(string $id)
    {
        $grupo = Grupo::find($id);

        if (!$grupo) {
            return response()->json([
                'message' => 'Grupo no encontrado'
            ], 404);
        }

        $grupo->delete();

        return response()->json([
            'message' => 'Grupo eliminado'
        ]);
    }

    /**
     * ALUMNO: Unirse a grupo por código
     */
 public function unirsePorCodigo(Request $request)
{
    $request->validate([
        'codigo_acceso' => 'required|string'
    ]);

    $grupo = Grupo::where('codigo_acceso', $request->codigo_acceso)->first();

    if (!$grupo) {
        return response()->json([
            'message' => 'Grupo no encontrado'
        ], 404);
    }

    $user = $request->user();

    // evitar duplicados
    $existe = GrupoUser::where('grupo_id', $grupo->id)
        ->where('user_id', $user->id)
        ->first();

    if ($existe) {
        return response()->json([
            'message' => 'Ya estás en este grupo'
        ]);
    }

    GrupoUser::create([
        'grupo_id' => $grupo->id,
        'user_id' => $user->id,
        'estado' => 'pendiente'
    ]);

    return response()->json([
        'message' => 'Solicitud enviada correctamente',
        'grupo_id' => $grupo->id
    ]);
}

    public function pendientes($id)
{
    $solicitudes = GrupoUser::where('grupo_id', $id)
        ->where('estado', 'pendiente')
        ->with('user')
        ->get();

    return response()->json([
        'grupo_id' => $id,
        'solicitudes' => $solicitudes
    ]);
}
public function aceptarAlumno(Request $request, $grupoId, $userId)
{
    $grupo = Grupo::find($grupoId);

    if (!$grupo) {
        return response()->json([
            'message' => 'Grupo no encontrado'
        ], 404);
    }

    if ($grupo->docente_id != auth()->id()) {
        return response()->json([
            'message' => 'No tienes permisos sobre este grupo'
        ], 403);
    }

    $registro = GrupoUser::where('grupo_id', $grupoId)
        ->where('user_id', $userId)
        ->first();

    if (!$registro) {
        return response()->json([
            'message' => 'Solicitud no encontrada'
        ], 404);
    }

    $registro->estado = 'aceptado';
    $registro->save();

    return response()->json([
        'message' => 'Alumno aceptado correctamente'
    ]);
}
public function rechazarAlumno(Request $request, $grupoId, $userId)
{
    $grupo = Grupo::find($grupoId);

    if (!$grupo) {
        return response()->json([
            'message' => 'Grupo no encontrado'
        ], 404);
    }

    if ($grupo->docente_id != auth()->id()) {
        return response()->json([
            'message' => 'No tienes permisos sobre este grupo'
        ], 403);
    }

    $registro = GrupoUser::where('grupo_id', $grupoId)
        ->where('user_id', $userId)
        ->first();

    if (!$registro) {
        return response()->json([
            'message' => 'Solicitud no encontrada'
        ], 404);
    }

    $registro->estado = 'rechazado';
    $registro->save();

    return response()->json([
        'message' => 'Alumno rechazado correctamente'
    ]);
}
public function alumnos($id)
{
    $alumnos = \App\Models\GrupoUser::where('grupo_id', $id)
        ->where('estado', 'aceptado')
        ->with('user')
        ->get();

    return response()->json($alumnos);
}
public function misGrupos(Request $request)
{
    $grupos = GrupoUser::where('user_id', $request->user()->id)
        ->where('estado', 'aceptado')
        ->with('grupo')
        ->get()
        ->pluck('grupo');

    return response()->json($grupos);
}
}
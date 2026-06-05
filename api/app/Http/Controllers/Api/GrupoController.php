<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grupo;
use App\Models\GrupoUser;


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
        $request->validate([
            'nombre' => 'required',
            'materia_id' => 'required',
            'codigo_acceso' => 'required',
            'semestre' => 'required',
            'periodo' => 'required'
        ]);

        $grupo = Grupo::create([
            'nombre' => $request->nombre,
            'materia_id' => $request->materia_id,
            'docente_id' => auth()->id(), // docente logueado
            'codigo_acceso' => $request->codigo_acceso,
            'semestre' => $request->semestre,
            'periodo' => $request->periodo
        ]);

        return response()->json([
            'message' => 'Grupo creado correctamente',
            'grupo' => $grupo
        ]);
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
        'message' => 'Alumno rechazado'
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
}
<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Grupo;
use App\Models\GrupoUser;
use App\Models\Materia;
use Illuminate\Support\Str;

class GrupoController extends Controller
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
    | LISTAR GRUPOS
    |--------------------------------------------------------------------------
    |
    | DOCENTE:
    | Solo sus propios grupos.
    |
    | ALUMNO:
    | Por ahora sus grupos aceptados.
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

            $grupos = Grupo::with([
                'materia'
            ])
                ->where(
                    'docente_id',
                    $request->user()->id
                )
                ->orderBy('id', 'desc')
                ->get();

            return response()->json(
                $grupos
            );
        }


        /*
        |--------------------------------------------------------------------------
        | ALUMNO
        |--------------------------------------------------------------------------
        */

        $grupos = GrupoUser::where(
            'user_id',
            $request->user()->id
        )
            ->where(
                'estado',
                'aceptado'
            )
            ->with([
                'grupo.materia'
            ])
            ->get()
            ->pluck('grupo')
            ->values();


        return response()->json(
            $grupos
        );
    }


    /*
    |--------------------------------------------------------------------------
    | CREAR GRUPO
    |--------------------------------------------------------------------------
    */

    public function store(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTE
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

            'materia_id' =>
                'required|integer|exists:materias,id',

            'semestre' =>
                'required|string|max:50',

            'periodo' =>
                'required|string|max:100',

            'activo' =>
                'nullable|boolean',

        ]);


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR MATERIA
        |--------------------------------------------------------------------------
        |
        | La materia debe pertenecer al docente autenticado.
        |
        */

        $materia =
            Materia::where(
                'id',
                $request->materia_id
            )
            ->where(
                'docente_id',
                $request->user()->id
            )
            ->first();


        if (!$materia) {

            return response()->json([

                'message' =>
                    'La materia seleccionada no pertenece al docente autenticado',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | GENERAR CÓDIGO
        |--------------------------------------------------------------------------
        */

        do {

            $codigo =
                Str::upper(
                    Str::random(6)
                );

        } while (

            Grupo::where(
                'codigo_acceso',
                $codigo
            )->exists()

        );


        /*
        |--------------------------------------------------------------------------
        | CREAR GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo = Grupo::create([

            'materia_id' =>
                $materia->id,

            'docente_id' =>
                $request->user()->id,

            'nombre' =>
                $request->nombre,

            'codigo_acceso' =>
                $codigo,

            'semestre' =>
                $request->semestre,

            'periodo' =>
                $request->periodo,

            'activo' =>
                $request->has('activo')
                    ? $request->activo
                    : true,

        ]);


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' =>
                'Grupo creado correctamente',

            'grupo' =>
                $grupo->load('materia'),

        ], 201);
    }


    /*
    |--------------------------------------------------------------------------
    | VER GRUPO
    |--------------------------------------------------------------------------
    */

    public function show(
        Request $request,
        string $id
    ) {

        $grupo =
            Grupo::with([
                'materia'
            ])
            ->find($id);


        /*
        |--------------------------------------------------------------------------
        | NO EXISTE
        |--------------------------------------------------------------------------
        */

        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | DOCENTE
        |--------------------------------------------------------------------------
        */

        if (
            $request->user()->rol === 'docente' &&
            $grupo->docente_id !=
                $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permisos sobre este grupo',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | ALUMNO
        |--------------------------------------------------------------------------
        */

        if (
            $request->user()->rol === 'alumno'
        ) {

            $pertenece =
                GrupoUser::where(
                    'grupo_id',
                    $grupo->id
                )
                ->where(
                    'user_id',
                    $request->user()->id
                )
                ->where(
                    'estado',
                    'aceptado'
                )
                ->exists();


            if (!$pertenece) {

                return response()->json([

                    'message' =>
                        'No perteneces a este grupo',

                ], 403);

            }

        }


        return response()->json(
            $grupo
        );
    }


    /*
    |--------------------------------------------------------------------------
    | ACTUALIZAR GRUPO
    |--------------------------------------------------------------------------
    */

    public function update(
        Request $request,
        string $id
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTE
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
        | BUSCAR GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo =
            Grupo::find($id);


        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $grupo->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permisos sobre este grupo',

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

            'materia_id' =>
                'sometimes|required|integer|exists:materias,id',

            'semestre' =>
                'sometimes|required|string|max:50',

            'periodo' =>
                'sometimes|required|string|max:100',

            'activo' =>
                'sometimes|boolean',

        ]);


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR NUEVA MATERIA
        |--------------------------------------------------------------------------
        */

        if (
            $request->has(
                'materia_id'
            )
        ) {

            $materia =
                Materia::where(
                    'id',
                    $request->materia_id
                )
                ->where(
                    'docente_id',
                    $request->user()->id
                )
                ->first();


            if (!$materia) {

                return response()->json([

                    'message' =>
                        'La materia seleccionada no pertenece al docente autenticado',

                ], 403);

            }

        }


        /*
        |--------------------------------------------------------------------------
        | ACTUALIZAR SOLO CAMPOS PERMITIDOS
        |--------------------------------------------------------------------------
        */

        $datos = [];


        if (
            $request->has('nombre')
        ) {

            $datos['nombre'] =
                $request->nombre;

        }


        if (
            $request->has('materia_id')
        ) {

            $datos['materia_id'] =
                $request->materia_id;

        }


        if (
            $request->has('semestre')
        ) {

            $datos['semestre'] =
                $request->semestre;

        }


        if (
            $request->has('periodo')
        ) {

            $datos['periodo'] =
                $request->periodo;

        }


        if (
            $request->has('activo')
        ) {

            $datos['activo'] =
                $request->activo;

        }


        $grupo->update(
            $datos
        );


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' =>
                'Grupo actualizado correctamente',

            'grupo' =>
                $grupo->fresh()->load('materia'),

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ELIMINAR GRUPO
    |--------------------------------------------------------------------------
    */

    public function destroy(
        Request $request,
        string $id
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTE
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
        | BUSCAR GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo =
            Grupo::find($id);


        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $grupo->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permisos sobre este grupo',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR
        |--------------------------------------------------------------------------
        */

        $grupo->delete();


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' =>
                'Grupo eliminado correctamente',

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ALUMNO: UNIRSE POR CÓDIGO
    |--------------------------------------------------------------------------
    */

    public function unirsePorCodigo(
        Request $request
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO ALUMNOS
        |--------------------------------------------------------------------------
        */

        if (
            !$request->user()
        ) {

            return response()->json([

                'message' =>
                    'Usuario no autenticado',

            ], 401);

        }


        if (
            $request->user()->rol !==
            'alumno'
        ) {

            return response()->json([

                'message' =>
                    'Solo los alumnos pueden unirse a grupos',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | VALIDACIÓN
        |--------------------------------------------------------------------------
        */

        $request->validate([

            'codigo_acceso' =>
                'required|string|max:20',

        ]);


        /*
        |--------------------------------------------------------------------------
        | BUSCAR GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo =
            Grupo::where(
                'codigo_acceso',
                Str::upper(
                    trim(
                        $request->codigo_acceso
                    )
                )
            )
            ->first();


        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | VERIFICAR GRUPO ACTIVO
        |--------------------------------------------------------------------------
        */

        if (
            !$grupo->activo
        ) {

            return response()->json([

                'message' =>
                    'Este grupo no está activo',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | USUARIO
        |--------------------------------------------------------------------------
        */

        $user =
            $request->user();


        /*
        |--------------------------------------------------------------------------
        | EVITAR DUPLICADOS
        |--------------------------------------------------------------------------
        */

        $existe =
            GrupoUser::where(
                'grupo_id',
                $grupo->id
            )
            ->where(
                'user_id',
                $user->id
            )
            ->first();


        if ($existe) {

            if (
                $existe->estado ===
                'aceptado'
            ) {

                return response()->json([

                    'message' =>
                        'Ya perteneces a este grupo',

                ], 409);

            }


            if (
                $existe->estado ===
                'pendiente'
            ) {

                return response()->json([

                    'message' =>
                        'Ya tienes una solicitud pendiente para este grupo',

                ], 409);

            }


            /*
            |--------------------------------------------------------------
            | Si anteriormente fue rechazado, permitimos volver a solicitar
            |--------------------------------------------------------------
            */

            $existe->estado =
                'pendiente';

            $existe->save();


            return response()->json([

                'message' =>
                    'Solicitud enviada nuevamente',

                'grupo_id' =>
                    $grupo->id,

            ]);

        }


        /*
        |--------------------------------------------------------------------------
        | CREAR SOLICITUD
        |--------------------------------------------------------------------------
        */

        GrupoUser::create([

            'grupo_id' =>
                $grupo->id,

            'user_id' =>
                $user->id,

            'estado' =>
                'pendiente',

        ]);


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'message' =>
                'Solicitud enviada correctamente',

            'grupo_id' =>
                $grupo->id,

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | SOLICITUDES PENDIENTES
    |--------------------------------------------------------------------------
    */

    public function pendientes(
        Request $request,
        $id
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTE
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
        | BUSCAR GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo =
            Grupo::find($id);


        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $grupo->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permisos sobre este grupo',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | SOLICITUDES
        |--------------------------------------------------------------------------
        */

        $solicitudes =
            GrupoUser::where(
                'grupo_id',
                $id
            )
            ->where(
                'estado',
                'pendiente'
            )
            ->with('user')
            ->get();


        return response()->json([

            'grupo_id' =>
                $id,

            'solicitudes' =>
                $solicitudes,

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ACEPTAR ALUMNO
    |--------------------------------------------------------------------------
    */

    public function aceptarAlumno(
        Request $request,
        $grupoId,
        $userId
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTE
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
        | GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo =
            Grupo::find($grupoId);


        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $grupo->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permisos sobre este grupo',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | REGISTRO
        |--------------------------------------------------------------------------
        */

        $registro =
            GrupoUser::where(
                'grupo_id',
                $grupoId
            )
            ->where(
                'user_id',
                $userId
            )
            ->first();


        if (!$registro) {

            return response()->json([

                'message' =>
                    'Solicitud no encontrada',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | ACEPTAR
        |--------------------------------------------------------------------------
        */

        $registro->estado =
            'aceptado';

        $registro->save();


        return response()->json([

            'message' =>
                'Alumno aceptado correctamente',

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | RECHAZAR ALUMNO
    |--------------------------------------------------------------------------
    */

    public function rechazarAlumno(
        Request $request,
        $grupoId,
        $userId
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTE
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
        | GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo =
            Grupo::find($grupoId);


        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $grupo->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permisos sobre este grupo',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | REGISTRO
        |--------------------------------------------------------------------------
        */

        $registro =
            GrupoUser::where(
                'grupo_id',
                $grupoId
            )
            ->where(
                'user_id',
                $userId
            )
            ->first();


        if (!$registro) {

            return response()->json([

                'message' =>
                    'Solicitud no encontrada',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | RECHAZAR
        |--------------------------------------------------------------------------
        */

        $registro->estado =
            'rechazado';

        $registro->save();


        return response()->json([

            'message' =>
                'Alumno rechazado correctamente',

        ]);
    }


    /*
    |--------------------------------------------------------------------------
    | ALUMNOS DEL GRUPO
    |--------------------------------------------------------------------------
    */

    public function alumnos(
        Request $request,
        $id
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO DOCENTE
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
        | GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo =
            Grupo::find($id);


        if (!$grupo) {

            return response()->json([

                'message' =>
                    'Grupo no encontrado',

            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | PROPIETARIO
        |--------------------------------------------------------------------------
        */

        if (
            $grupo->docente_id !=
            $request->user()->id
        ) {

            return response()->json([

                'message' =>
                    'No tienes permisos sobre este grupo',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | ALUMNOS ACEPTADOS
        |--------------------------------------------------------------------------
        */

        $alumnos =
            GrupoUser::where(
                'grupo_id',
                $id
            )
            ->where(
                'estado',
                'aceptado'
            )
            ->with('user')
            ->get();


        return response()->json(
            $alumnos
        );
    }


    /*
    |--------------------------------------------------------------------------
    | MIS GRUPOS - ALUMNO
    |--------------------------------------------------------------------------
    */

    public function misGrupos(
        Request $request
    ) {

        /*
        |--------------------------------------------------------------------------
        | SOLO ALUMNOS
        |--------------------------------------------------------------------------
        */

        if (
            !$request->user()
        ) {

            return response()->json([

                'message' =>
                    'Usuario no autenticado',

            ], 401);

        }


        if (
            $request->user()->rol !==
            'alumno'
        ) {

            return response()->json([

                'message' =>
                    'Esta función es solamente para alumnos',

            ], 403);

        }


        /*
        |--------------------------------------------------------------------------
        | GRUPOS ACEPTADOS
        |--------------------------------------------------------------------------
        */

        $grupos =
            GrupoUser::where(
                'user_id',
                $request->user()->id
            )
            ->where(
                'estado',
                'aceptado'
            )
            ->with([
                'grupo.materia'
            ])
            ->get()
            ->pluck('grupo')
            ->values();


        return response()->json(
            $grupos
        );
    }
}
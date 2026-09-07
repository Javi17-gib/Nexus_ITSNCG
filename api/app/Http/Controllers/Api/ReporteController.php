<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Estadistica;
use App\Models\Grupo;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

class ReporteController extends Controller
{
    /**
     * =========================================================
     * OBTENER DATOS DEL REPORTE
     * =========================================================
     *
     * Este método devuelve JSON para mostrar las estadísticas
     * en el frontend React.
     */
    public function actividadGrupo(
        Request $request,
        $grupoId
    ) {

        /*
        |--------------------------------------------------------------------------
        | USUARIO ACTUAL
        |--------------------------------------------------------------------------
        */

        $docente = $request->user();


        /*
        |--------------------------------------------------------------------------
        | OBTENER GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo = Grupo::with([
            'materia',
            'docente',
            'alumnos' => function ($query) {

                $query->wherePivot(
                    'estado',
                    'aceptado'
                );

            }
        ])
        ->where(
            'id',
            $grupoId
        )
        ->where(
            'docente_id',
            $docente->id
        )
        ->first();


        /*
        |--------------------------------------------------------------------------
        | VALIDAR GRUPO
        |--------------------------------------------------------------------------
        */

        if (!$grupo) {

            return response()->json([
                'message' =>
                    'Grupo no encontrado o no tienes permiso.'
            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | OBTENER PERIODO
        |--------------------------------------------------------------------------
        */

        $periodo = $request->query(
            'periodo',
            '7dias'
        );


        /*
        |--------------------------------------------------------------------------
        | FECHAS
        |--------------------------------------------------------------------------
        */

        $fechaInicio = null;

        $fechaFin = Carbon::now();


        switch ($periodo) {

            /*
            --------------------------------------------------------------
            ÚLTIMOS 7 DÍAS
            --------------------------------------------------------------
            */

            case '7dias':

                $fechaInicio = Carbon::now()
                    ->subDays(6)
                    ->startOfDay();

                break;


            /*
            --------------------------------------------------------------
            ÚLTIMOS 30 DÍAS
            --------------------------------------------------------------
            */

            case '30dias':

                $fechaInicio = Carbon::now()
                    ->subDays(29)
                    ->startOfDay();

                break;


            /*
            --------------------------------------------------------------
            MES ACTUAL
            --------------------------------------------------------------
            */

            case 'mes':

                $fechaInicio = Carbon::now()
                    ->startOfMonth();

                break;


            /*
            --------------------------------------------------------------
            TODO EL HISTORIAL
            --------------------------------------------------------------
            */

            case 'todo':

                $fechaInicio = null;

                break;


            /*
            --------------------------------------------------------------
            DEFAULT
            --------------------------------------------------------------
            */

            default:

                $fechaInicio = Carbon::now()
                    ->subDays(6)
                    ->startOfDay();

                $periodo = '7dias';

                break;

        }


        /*
        |--------------------------------------------------------------------------
        | CONSULTA BASE
        |--------------------------------------------------------------------------
        */

        $estadisticasQuery = Estadistica::where(
            'grupo_id',
            $grupo->id
        );


        /*
        |--------------------------------------------------------------------------
        | FILTRAR POR FECHA
        |--------------------------------------------------------------------------
        */

        if ($fechaInicio) {

            $estadisticasQuery->where(
                'fecha_ingreso',
                '>=',
                $fechaInicio
            );

        }


        /*
        |--------------------------------------------------------------------------
        | OBTENER ESTADÍSTICAS
        |--------------------------------------------------------------------------
        */

        $estadisticas = $estadisticasQuery
            ->orderBy(
                'fecha_ingreso',
                'asc'
            )
            ->get();


        /*
        |--------------------------------------------------------------------------
        | TOTAL DE ALUMNOS
        |--------------------------------------------------------------------------
        */

        $totalAlumnos = $grupo
            ->alumnos
            ->count();


        /*
        |--------------------------------------------------------------------------
        | USUARIOS ACTIVOS
        |--------------------------------------------------------------------------
        */

        $usuariosActivos = $estadisticas
            ->pluck(
                'user_id'
            )
            ->unique();


        /*
        |--------------------------------------------------------------------------
        | ALUMNOS ACTIVOS
        |--------------------------------------------------------------------------
        */

        $alumnosActivos = $usuariosActivos
            ->count();


        /*
        |--------------------------------------------------------------------------
        | ALUMNOS SIN ACTIVIDAD
        |--------------------------------------------------------------------------
        */

        $alumnosSinActividad = max(
            0,
            $totalAlumnos -
            $alumnosActivos
        );


        /*
        |--------------------------------------------------------------------------
        | TOTAL VISITAS
        |--------------------------------------------------------------------------
        */

        $totalVisitas = $estadisticas
            ->count();


        /*
        |--------------------------------------------------------------------------
        | PROMEDIO DE VISITAS
        |--------------------------------------------------------------------------
        */

        $promedioVisitas = $totalAlumnos > 0

            ? round(
                $totalVisitas /
                $totalAlumnos,
                2
            )

            : 0;


        /*
        |--------------------------------------------------------------------------
        | ACTIVIDAD POR DÍA
        |--------------------------------------------------------------------------
        */

        $actividadPorDia = $estadisticas

            ->groupBy(function ($item) {

                return Carbon::parse(
                    $item->fecha_ingreso
                )->format(
                    'Y-m-d'
                );

            })

            ->map(function ($items) {

                return $items
                    ->count();

            })

            ->map(function (
                $total,
                $fecha
            ) {

                return [

                    'fecha' =>
                        $fecha,

                    'visitas' =>
                        $total

                ];

            })

            ->values();


        /*
        |--------------------------------------------------------------------------
        | INFORMACIÓN DE CADA ALUMNO
        |--------------------------------------------------------------------------
        */

        $alumnos = $grupo
            ->alumnos
            ->map(function (
                $alumno
            ) use (
                $estadisticas
            ) {

                /*
                ----------------------------------------------------------
                | VISITAS DEL ALUMNO
                ----------------------------------------------------------
                */

                $visitasAlumno = $estadisticas
                    ->where(
                        'user_id',
                        $alumno->id
                    );


                /*
                ----------------------------------------------------------
                | ÚLTIMA VISITA
                ----------------------------------------------------------
                */

                $ultimaVisita = $visitasAlumno

                    ->sortByDesc(
                        'fecha_ingreso'
                    )

                    ->first();


                /*
                ----------------------------------------------------------
                | RETORNAR DATOS
                ----------------------------------------------------------
                */

                return [

                    'id' =>
                        $alumno->id,


                    'nombre' => trim(

                        ($alumno->nombre ?? '') .

                        ' ' .

                        ($alumno->apellido_paterno ?? '') .

                        ' ' .

                        ($alumno->apellido_materno ?? '')

                    ),


                    'correo' =>
                        $alumno->correo ?? '',


                    /*
                    | IMPORTANTE:
                    | Antes se llamaba "visitas".
                    | Ahora coincide con el frontend.
                    */

                    'total_visitas' =>
                        $visitasAlumno
                            ->count(),


                    /*
                    | IMPORTANTE:
                    | Antes se llamaba "ultimo_ingreso".
                    | Ahora coincide con el frontend.
                    */

                    'ultima_visita' =>

    $ultimaVisita

        ? Carbon::parse(
            $ultimaVisita
                ->fecha_ingreso
        )
        ->timezone(
            'America/Chihuahua'
        )
        ->toIso8601String()

        : null,


                    'activo' =>

                        $visitasAlumno
                            ->count() > 0

                ];

            })
            ->values();


        /*
        |--------------------------------------------------------------------------
        | NOMBRE DEL PERIODO
        |--------------------------------------------------------------------------
        */

        $nombrePeriodo = match (
            $periodo
        ) {

            '7dias' =>
                'Últimos 7 días',

            '30dias' =>
                'Últimos 30 días',

            'mes' =>
                'Mes actual',

            'todo' =>
                'Todo el historial',

            default =>
                'Últimos 7 días'

        };


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA JSON
        |--------------------------------------------------------------------------
        */

        return response()->json([

            'grupo' => [

                'id' =>
                    $grupo->id,

                'nombre' =>
                    $grupo->nombre,

                'materia' =>
                    $grupo->materia
                        ? $grupo->materia->nombre
                        : 'Sin materia'

            ],


            'periodo' =>
                $periodo,


            'nombre_periodo' =>
                $nombrePeriodo,


            'fecha_inicio' =>

                $fechaInicio

                    ? $fechaInicio
                        ->format('Y-m-d')

                    : null,


            'fecha_fin' =>
                $fechaFin
                    ->format('Y-m-d'),


            /*
            ----------------------------------------------------------
            | RESUMEN
            ----------------------------------------------------------
            */

            'resumen' => [

                'total_alumnos' =>
                    $totalAlumnos,

                'alumnos_activos' =>
                    $alumnosActivos,

                'alumnos_sin_actividad' =>
                    $alumnosSinActividad,

                'total_visitas' =>
                    $totalVisitas,

                'promedio_visitas' =>
                    $promedioVisitas

            ],


            /*
            ----------------------------------------------------------
            | ACTIVIDAD
            ----------------------------------------------------------
            */

            'actividad_por_dia' =>
                $actividadPorDia,


            /*
            ----------------------------------------------------------
            | ALUMNOS
            ----------------------------------------------------------
            */

            'alumnos' =>
                $alumnos

        ]);

    }


    /**
     * =========================================================
     * GENERAR PDF DEL REPORTE
     * =========================================================
     */
    public function descargarPdf(
        Request $request,
        $grupoId
    ) {

        /*
        |--------------------------------------------------------------------------
        | USUARIO ACTUAL
        |--------------------------------------------------------------------------
        */

        $docente = $request->user();


        /*
        |--------------------------------------------------------------------------
        | OBTENER GRUPO
        |--------------------------------------------------------------------------
        */

        $grupo = Grupo::with([
            'materia',
            'docente',
            'alumnos' => function ($query) {

                $query->wherePivot(
                    'estado',
                    'aceptado'
                );

            }
        ])
        ->where(
            'id',
            $grupoId
        )
        ->where(
            'docente_id',
            $docente->id
        )
        ->first();


        /*
        |--------------------------------------------------------------------------
        | VALIDAR GRUPO
        |--------------------------------------------------------------------------
        */

        if (!$grupo) {

            return response()->json([
                'message' =>
                    'Grupo no encontrado o no tienes permiso.'
            ], 404);

        }


        /*
        |--------------------------------------------------------------------------
        | OBTENER PERIODO
        |--------------------------------------------------------------------------
        */

        $periodo = $request->query(
            'periodo',
            '7dias'
        );


        /*
        |--------------------------------------------------------------------------
        | FECHAS
        |--------------------------------------------------------------------------
        */

        $fechaInicio = null;

        $fechaFin = Carbon::now();


        switch ($periodo) {

            case '7dias':

                $fechaInicio = Carbon::now()
                    ->subDays(6)
                    ->startOfDay();

                break;


            case '30dias':

                $fechaInicio = Carbon::now()
                    ->subDays(29)
                    ->startOfDay();

                break;


            case 'mes':

                $fechaInicio = Carbon::now()
                    ->startOfMonth();

                break;


            case 'todo':

                $fechaInicio = null;

                break;


            default:

                $fechaInicio = Carbon::now()
                    ->subDays(6)
                    ->startOfDay();

                $periodo = '7dias';

                break;

        }


        /*
        |--------------------------------------------------------------------------
        | CONSULTA ESTADÍSTICAS
        |--------------------------------------------------------------------------
        */

        $estadisticasQuery = Estadistica::where(
            'grupo_id',
            $grupo->id
        );


        if ($fechaInicio) {

            $estadisticasQuery->where(
                'fecha_ingreso',
                '>=',
                $fechaInicio
            );

        }


        $estadisticas = $estadisticasQuery
            ->orderBy(
                'fecha_ingreso',
                'asc'
            )
            ->get();


        /*
        |--------------------------------------------------------------------------
        | TOTALES
        |--------------------------------------------------------------------------
        */

        $totalAlumnos = $grupo
            ->alumnos
            ->count();


        $usuariosActivos = $estadisticas
            ->pluck('user_id')
            ->unique();


        $alumnosActivos = $usuariosActivos
            ->count();


        $alumnosSinActividad = max(
            0,
            $totalAlumnos -
            $alumnosActivos
        );


        $totalVisitas = $estadisticas
            ->count();


        $promedioVisitas = $totalAlumnos > 0

            ? round(
                $totalVisitas /
                $totalAlumnos,
                2
            )

            : 0;


        /*
        |--------------------------------------------------------------------------
        | ACTIVIDAD POR DÍA
        |--------------------------------------------------------------------------
        */

        $actividadPorDia = $estadisticas

            ->groupBy(function ($item) {

                return Carbon::parse(
                    $item->fecha_ingreso
                )->format('Y-m-d');

            })

            ->map(function (
                $items,
                $fecha
            ) {

                return [

                    'fecha' =>
                        $fecha,

                    'visitas' =>
                        $items->count()

                ];

            })

            ->values();


        /*
        |--------------------------------------------------------------------------
        | ALUMNOS
        |--------------------------------------------------------------------------
        */

        $alumnos = $grupo
            ->alumnos
            ->map(function (
                $alumno
            ) use (
                $estadisticas
            ) {

                $visitasAlumno = $estadisticas
                    ->where(
                        'user_id',
                        $alumno->id
                    );


                $ultimaVisita = $visitasAlumno

                    ->sortByDesc(
                        'fecha_ingreso'
                    )

                    ->first();


                return [

                    'id' =>
                        $alumno->id,


                    'nombre' => trim(

                        ($alumno->nombre ?? '') .

                        ' ' .

                        ($alumno->apellido_paterno ?? '') .

                        ' ' .

                        ($alumno->apellido_materno ?? '')

                    ),


                    'correo' =>
                        $alumno->correo ?? '',


                    /*
                    | Nombres iguales que en el reporte React
                    */

                    'total_visitas' =>
                        $visitasAlumno
                            ->count(),


                    'ultima_visita' =>

    $ultimaVisita

        ? Carbon::parse(
            $ultimaVisita
                ->fecha_ingreso
        )
        ->timezone(
            'America/Chihuahua'
        )
        ->toIso8601String()

        : null,


                    'activo' =>

                        $visitasAlumno
                            ->count() > 0

                ];

            })
            ->values();


        /*
        |--------------------------------------------------------------------------
        | NOMBRE DEL PERIODO
        |--------------------------------------------------------------------------
        */

        $nombrePeriodo = match (
            $periodo
        ) {

            '7dias' =>
                'Últimos 7 días',

            '30dias' =>
                'Últimos 30 días',

            'mes' =>
                'Mes actual',

            'todo' =>
                'Todo el historial',

            default =>
                'Últimos 7 días'

        };


        /*
        |--------------------------------------------------------------------------
        | GENERAR PDF
        |--------------------------------------------------------------------------
        */

        $pdf = Pdf::loadView(
            'reportes.actividad-grupo',
            [

                'docente' =>
                    $docente,


                'grupo' =>
                    $grupo,


                'periodo' =>
                    $nombrePeriodo,


                'fechaInicio' =>
                    $fechaInicio,


                'fechaFin' =>
                    $fechaFin,


                'totalAlumnos' =>
                    $totalAlumnos,


                'alumnosActivos' =>
                    $alumnosActivos,


                'alumnosSinActividad' =>
                    $alumnosSinActividad,


                'totalVisitas' =>
                    $totalVisitas,


                'promedioVisitas' =>
                    $promedioVisitas,


                'actividadPorDia' =>
                    $actividadPorDia,


                'alumnos' =>
                    $alumnos

            ]
        );


        /*
        |--------------------------------------------------------------------------
        | CONFIGURAR PDF
        |--------------------------------------------------------------------------
        */

        $pdf->setPaper(
            'letter',
            'portrait'
        );


        /*
        |--------------------------------------------------------------------------
        | NOMBRE DEL ARCHIVO
        |--------------------------------------------------------------------------
        */

        $nombreArchivo =

            'Reporte_' .

            preg_replace(
                '/[^A-Za-z0-9_-]/',
                '_',
                $grupo->nombre
            ) .

            '_' .

            now()
                ->format(
                    'Y-m-d_H-i'
                ) .

            '.pdf';


        /*
        |--------------------------------------------------------------------------
        | DESCARGAR
        |--------------------------------------------------------------------------
        */

        return $pdf->download(
            $nombreArchivo
        );

    }

}
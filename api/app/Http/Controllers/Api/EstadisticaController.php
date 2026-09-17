<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Estadistica;
use Carbon\Carbon;

class EstadisticaController extends Controller
{
    /**
     * =========================================================
     * REGISTRAR VISITA DEL ALUMNO
     * =========================================================
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


    /**
     * =========================================================
     * VISITAS POR GRUPO
     * =========================================================
     */
    public function visitasPorGrupo($grupoId)
    {
        $total = Estadistica::where(
            'grupo_id',
            $grupoId
        )->count();

        return response()->json([
            'grupo_id' => $grupoId,
            'total_visitas' => $total
        ]);
    }


    /**
     * =========================================================
     * VISITAS POR SEMANA
     * =========================================================
     */
    public function visitasPorSemana($grupoId)
    {
        $visitas = Estadistica::where(
            'grupo_id',
            $grupoId
        )
        ->where(
            'fecha_ingreso',
            '>=',
            now()->subDays(7)
        )
        ->get()
        ->groupBy(function ($item) {

            return Carbon::parse(
                $item->fecha_ingreso
            )->format('Y-m-d');

        });

        return response()->json($visitas);
    }


    /**
     * =========================================================
     * ALUMNOS ACTIVOS
     * =========================================================
     */
    public function alumnosActivos($grupoId)
    {
        $alumnos = Estadistica::where(
            'grupo_id',
            $grupoId
        )
        ->distinct('user_id')
        ->count('user_id');

        return response()->json([
            'grupo_id' => $grupoId,
            'alumnos_activos' => $alumnos
        ]);
    }


    /**
     * =========================================================
     * TOTAL DE ALUMNOS DEL GRUPO
     * =========================================================
     */
    public function totalAlumnosGrupo($grupoId)
    {
        $total = Estadistica::where(
            'grupo_id',
            $grupoId
        )
        ->distinct('user_id')
        ->count('user_id');

        return response()->json([
            'grupo_id' => $grupoId,
            'total_alumnos' => $total
        ]);
    }


    /**
     * =========================================================
     * VISITAS POR MATERIA
     * =========================================================
     */
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


    /**
     * =========================================================
     * DASHBOARD DEL DOCENTE
     * =========================================================
     *
     * Devuelve:
     *
     * - Total de materias
     * - Total de grupos
     * - Total de contenidos
     * - Total de retos
     * - Total de visitas
     * - Alumnos activos
     * - Promedio de visitas
     * - Actividad de los últimos 7 días
     *
     */
    public function dashboardDocente(Request $request)
    {
        /*
        |--------------------------------------------------------------------------
        | DOCENTE ACTUAL
        |--------------------------------------------------------------------------
        */

        $docente = $request->user();


        /*
        |--------------------------------------------------------------------------
        | MATERIAS DEL DOCENTE
        |--------------------------------------------------------------------------
        */

        $materias = \App\Models\Materia::where(
            'docente_id',
            $docente->id
        )->get();

        $materiaIds = $materias->pluck('id');

        $totalMaterias = $materias->count();


        /*
        |--------------------------------------------------------------------------
        | GRUPOS DEL DOCENTE
        |--------------------------------------------------------------------------
        */

        $grupos = \App\Models\Grupo::where(
            'docente_id',
            $docente->id
        )->get();

        $grupoIds = $grupos->pluck('id');

        $totalGrupos = $grupos->count();


        /*
        |--------------------------------------------------------------------------
        | CONTENIDOS DEL DOCENTE
        |--------------------------------------------------------------------------
        |
        | Contenido
        |    ↓
        | Tema
        |    ↓
        | Unidad
        |    ↓
        | Materia
        |
        */

        $totalContenidos = \App\Models\Contenido::whereHas(
            'tema.unidad.materia',
            function ($query) use ($docente) {

                $query->where(
                    'docente_id',
                    $docente->id
                );

            }
        )->count();


        /*
        |--------------------------------------------------------------------------
        | RETOS DEL DOCENTE
        |--------------------------------------------------------------------------
        |
        | Reto
        |    ↓
        | Tema
        |    ↓
        | Unidad
        |    ↓
        | Materia
        |
        */

        $totalRetos = \App\Models\Reto::whereHas(
            'tema.unidad.materia',
            function ($query) use ($docente) {

                $query->where(
                    'docente_id',
                    $docente->id
                );

            }
        )->count();


        /*
        |--------------------------------------------------------------------------
        | ESTADÍSTICAS DEL DOCENTE
        |--------------------------------------------------------------------------
        */

        $estadisticas = Estadistica::whereIn(
            'grupo_id',
            $grupoIds
        )->get();


        /*
        |--------------------------------------------------------------------------
        | TOTAL DE VISITAS
        |--------------------------------------------------------------------------
        */

        $totalVisitas = $estadisticas->count();


        /*
        |--------------------------------------------------------------------------
        | ALUMNOS ACTIVOS
        |--------------------------------------------------------------------------
        |
        | Se cuentan usuarios únicos.
        |
        */

        $alumnosActivos = $estadisticas
            ->pluck('user_id')
            ->unique()
            ->count();


        /*
        |--------------------------------------------------------------------------
        | PROMEDIO DE VISITAS
        |--------------------------------------------------------------------------
        */

        $promedioVisitas = $alumnosActivos > 0
            ? round(
                $totalVisitas / $alumnosActivos,
                2
            )
            : 0;


        /*
        |--------------------------------------------------------------------------
        | ACTIVIDAD DE LOS ÚLTIMOS 7 DÍAS
        |--------------------------------------------------------------------------
        */

        $fechaInicio = Carbon::now()
            ->subDays(6)
            ->startOfDay();


        $estadisticasSemana = Estadistica::whereIn(
            'grupo_id',
            $grupoIds
        )
        ->where(
            'fecha_ingreso',
            '>=',
            $fechaInicio
        )
        ->get();


        /*
        |--------------------------------------------------------------------------
        | GENERAR LOS 7 DÍAS
        |--------------------------------------------------------------------------
        |
        | Aunque un día tenga 0 visitas,
        | lo enviamos al frontend.
        |
        */

        $actividad = collect();


        for ($i = 6; $i >= 0; $i--) {

            $fecha = Carbon::now()
                ->subDays($i)
                ->startOfDay();

            $fechaTexto = $fecha->format('Y-m-d');


            /*
            |--------------------------------------------------------------------------
            | VISITAS DEL DÍA
            |--------------------------------------------------------------------------
            */

            $visitas = $estadisticasSemana
                ->filter(function ($item) use ($fechaTexto) {

                    return Carbon::parse(
                        $item->fecha_ingreso
                    )->format('Y-m-d') === $fechaTexto;

                })
                ->count();


            /*
            |--------------------------------------------------------------------------
            | NOMBRE DEL DÍA
            |--------------------------------------------------------------------------
            */

            $dia = Carbon::parse($fechaTexto)
                ->locale('es')
                ->translatedFormat('D');


            /*
            |--------------------------------------------------------------------------
            | AGREGAR AL ARRAY
            |--------------------------------------------------------------------------
            */

            $actividad->push([

                'fecha' => $fechaTexto,

                'dia' => $dia,

                'visitas' => $visitas

            ]);
        }


        /*
        |--------------------------------------------------------------------------
        | RESPUESTA FINAL
        |--------------------------------------------------------------------------
        */

        return response()->json([

            /*
            |--------------------------------------------------------------------------
            | CONTADORES PRINCIPALES
            |--------------------------------------------------------------------------
            */

            'materias' => $totalMaterias,

            'grupos' => $totalGrupos,

            'contenidos' => $totalContenidos,

            'retos' => $totalRetos,


            /*
            |--------------------------------------------------------------------------
            | ESTADÍSTICAS
            |--------------------------------------------------------------------------
            */

            'visitas' => $totalVisitas,

            'alumnos_activos' => $alumnosActivos,

            'promedio_visitas' => $promedioVisitas,


            /*
            |--------------------------------------------------------------------------
            | GRÁFICA
            |--------------------------------------------------------------------------
            */

            'actividad' => $actividad->values()

        ]);
    }
}
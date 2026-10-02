<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">

    <title>
        Reporte académico -
        {{ $grupo->nombre ?? 'Grupo' }}
    </title>

    <style>

        @page {
            size: A4 portrait;
            margin: 7mm 8mm 7mm 8mm;
        }

        * {
            box-sizing: border-box;
        }

        html,
        body {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: DejaVu Sans, sans-serif;
            background: #ffffff;
            color: #24232a;
            font-size: 7px;
            line-height: 1.25;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        td,
        th {
            vertical-align: top;
        }

        /* =====================================================
           HEADER
        ===================================================== */

        .header {
            height: 58px;
            background: #11121a;
        }

        .header-logo {
            width: 58px;
            background: #6937d1;
            color: #ffffff;
            text-align: center;
            vertical-align: middle;
        }

        .header-logo-text {
            font-size: 21px;
            font-weight: bold;
            letter-spacing: -1.4px;
        }

        .header-content {
            padding: 8px 14px;
            vertical-align: middle;
        }

        .header-kicker {
            color: #bca7df;
            font-size: 5px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .header-title {
            color: #ffffff;
            font-size: 18px;
            font-weight: bold;
            line-height: 1;
            margin-top: 3px;
        }

        .header-subtitle {
            color: #a4a1ab;
            font-size: 5.1px;
            margin-top: 4px;
        }

        .header-period {
            width: 130px;
            padding: 8px 12px;
            text-align: right;
            vertical-align: middle;
        }

        .header-period-label {
            color: #77747f;
            font-size: 4.5px;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .header-period-value {
            color: #ffffff;
            font-size: 7px;
            font-weight: bold;
            margin-top: 3px;
        }

        /* =====================================================
           IDENTIDAD
        ===================================================== */

        .identity {
            margin-top: 7px;
            height: 61px;
            border: 1px solid #dedbe3;
            border-left: 4px solid #6937d1;
            background: #ffffff;
        }

        .identity-icon {
            width: 58px;
            text-align: center;
            vertical-align: middle;
        }

        .identity-icon-circle {
            width: 31px;
            height: 31px;
            margin: 0 auto;
            border: 1px solid #dfd3f4;
            background: #f7f3fd;
            color: #6937d1;
            font-size: 13px;
            font-weight: bold;
            text-align: center;
            line-height: 31px;
        }

        .identity-main {
            padding: 8px 5px;
            vertical-align: middle;
        }

        .identity-label {
            color: #6937d1;
            font-size: 4.8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .identity-group {
            color: #29272f;
            font-size: 11px;
            font-weight: bold;
            margin-top: 2px;
        }

        .identity-materia {
            color: #8e8a94;
            font-size: 5.3px;
            margin-top: 3px;
        }

        .identity-meta {
            width: 32%;
            border-left: 1px solid #ece9ef;
            padding: 7px 10px;
            vertical-align: middle;
        }

        .meta-block {
            margin-bottom: 5px;
        }

        .meta-block:last-child {
            margin-bottom: 0;
        }

        .meta-label {
            color: #99959f;
            font-size: 4.5px;
            text-transform: uppercase;
            letter-spacing: .5px;
        }

        .meta-value {
            color: #3d3942;
            font-size: 6px;
            font-weight: bold;
            margin-top: 2px;
        }

        /* =====================================================
           SECCIONES
        ===================================================== */

        .section {
            margin-top: 8px;
            margin-bottom: 5px;
        }

        .section-number {
            width: 27px;
            color: #6937d1;
            font-size: 5.5px;
            font-weight: bold;
        }

        .section-title {
            color: #2b2931;
            font-size: 8.8px;
            font-weight: bold;
        }

        .section-description {
            text-align: right;
            color: #aaa6af;
            font-size: 4.7px;
        }

        /* =====================================================
           KPI
        ===================================================== */

        .kpi-cell {
            width: 25%;
            padding-right: 5px;
        }

        .kpi-cell:last-child {
            padding-right: 0;
        }

        .kpi {
            height: 67px;
            border: 1px solid #dedbe3;
            background: #ffffff;
            padding: 8px 9px;
        }

        .kpi-line {
            width: 22px;
            height: 2px;
            background: #6937d1;
            margin-bottom: 7px;
        }

        .kpi-label {
            color: #99959f;
            font-size: 4.7px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: .65px;
        }

        .kpi-number {
            color: #29272f;
            font-size: 19px;
            font-weight: bold;
            line-height: 1;
            margin-top: 5px;
        }

        .kpi-note {
            color: #99959f;
            font-size: 4.8px;
            margin-top: 5px;
        }

        /* =====================================================
           ANALISIS
        ===================================================== */

        .analytics-left {
            width: 63%;
            padding-right: 4px;
        }

        .analytics-right {
            width: 37%;
            padding-left: 4px;
        }

        .panel {
            border: 1px solid #dedbe3;
            background: #ffffff;
        }

        .panel-header {
            padding: 7px 9px;
            background: #faf9fc;
            border-bottom: 1px solid #ebe8ee;
        }

        .panel-label {
            color: #6937d1;
            font-size: 4.6px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: .75px;
        }

        .panel-title {
            color: #2b2931;
            font-size: 7.4px;
            font-weight: bold;
            margin-top: 2px;
        }

        .panel-description {
            color: #9b97a0;
            font-size: 4.7px;
            margin-top: 2px;
        }

        /* =====================================================
           GRAFICA 7 DIAS
        ===================================================== */

        .activity-box {
            padding: 7px 9px 8px;
        }

        .activity-row td {
            height: 19px;
            border-bottom: 1px solid #f0eef2;
            vertical-align: middle;
        }

        .activity-row:last-child td {
            border-bottom: 0;
        }

        .activity-day {
            width: 62px;
            color: #68646d;
            font-size: 4.9px;
        }

        .activity-bar-cell {
            padding: 0 6px;
        }

        .activity-track {
            width: 100%;
            height: 6px;
            background: #eeeaf4;
        }

        .activity-bar {
            height: 6px;
            background: #6937d1;
        }

        .activity-value {
            width: 24px;
            text-align: right;
            color: #6937d1;
            font-size: 5.3px;
            font-weight: bold;
        }

        .activity-total {
            border-top: 1px solid #ece9ef;
            margin-top: 5px;
            padding-top: 6px;
            color: #8c8891;
            font-size: 4.7px;
        }

        .activity-total strong {
            color: #6937d1;
        }

        /* =====================================================
           PARTICIPACION
        ===================================================== */

        .participation-box {
            min-height: 158px;
            padding: 8px 9px;
        }

        .donut-wrap {
            height: 87px;
            text-align: center;
            vertical-align: middle;
        }

        .donut {
            width: 78px;
            height: 78px;
            margin: 0 auto;
            border-radius: 50%;
            position: relative;

            background:
                conic-gradient(
                    #6937d1 0deg,
                    #6937d1 calc(var(--percent) * 3.6deg),
                    #e9e6ed calc(var(--percent) * 3.6deg),
                    #e9e6ed 360deg
                );
        }

        .donut-inner {
            position: absolute;
            left: 9px;
            top: 9px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #ffffff;
            text-align: center;
            padding-top: 17px;
        }

        .donut-percent {
            color: #1d9c6d;
            font-size: 14px;
            font-weight: bold;
            line-height: 1;
        }

        .donut-label {
            color: #99959f;
            font-size: 4px;
            margin-top: 3px;
        }

        .participation-info {
            padding-top: 5px;
        }

        .participation-status {
            color: #35323a;
            font-size: 6.3px;
            font-weight: bold;
        }

        .participation-description {
            color: #8c8891;
            font-size: 4.8px;
            line-height: 1.35;
            margin-top: 3px;
        }

        .participation-progress {
            margin-top: 7px;
            height: 6px;
            background: #ebe8ef;
        }

        .participation-progress-fill {
            height: 6px;
            background: #1d9c6d;
        }

        .participation-foot {
            margin-top: 6px;
            padding-top: 6px;
            border-top: 1px solid #ece9ef;
            color: #77737c;
            font-size: 4.7px;
        }

        /* =====================================================
           INFORMACION CLAVE
        ===================================================== */

        .insight {
            margin-top: 7px;
            height: 51px;
            border: 1px solid #d3e8df;
            background: #f1faf7;
        }

        .insight-icon {
            width: 40px;
            text-align: center;
            vertical-align: middle;
            color: #1d9c6d;
            font-size: 14px;
            font-weight: bold;
        }

        .insight-main {
            padding: 7px 6px;
            vertical-align: middle;
        }

        .insight-label {
            color: #1d9c6d;
            font-size: 4.6px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: .65px;
        }

        .insight-title {
            color: #35534a;
            font-size: 6px;
            font-weight: bold;
            margin-top: 2px;
        }

        .insight-description {
            color: #697a74;
            font-size: 4.7px;
            margin-top: 2px;
        }

        .insight-result {
            width: 110px;
            border-left: 1px solid #d5e8e1;
            text-align: center;
            vertical-align: middle;
        }

        .insight-result-label {
            color: #99959f;
            font-size: 4.3px;
            text-transform: uppercase;
        }

        .insight-result-value {
            color: #1d9c6d;
            font-size: 7.5px;
            font-weight: bold;
            margin-top: 2px;
        }

        /* =====================================================
           PARTE INFERIOR
        ===================================================== */

        .bottom-left {
            width: 37%;
            padding-right: 4px;
        }

        .bottom-right {
            width: 63%;
            padding-left: 4px;
        }

        /* =====================================================
           RANKING
        ===================================================== */

        .ranking-panel {
            border: 1px solid #dedbe3;
        }

        .ranking-header {
            padding: 7px 9px;
            background: #faf9fc;
            border-bottom: 1px solid #ebe8ee;
        }

        .ranking-title {
            color: #29272f;
            font-size: 7.4px;
            font-weight: bold;
        }

        .ranking-subtitle {
            color: #9b97a0;
            font-size: 4.7px;
            margin-top: 2px;
        }

        .ranking-row td {
            height: 38px;
            border-bottom: 1px solid #eeeaf0;
            vertical-align: middle;
        }

        .ranking-row:last-child td {
            border-bottom: 0;
        }

        .rank-position {
            width: 31px;
            text-align: center;
            color: #6937d1;
            font-size: 5.5px;
            font-weight: bold;
        }

        .rank-name {
            color: #37343d;
            font-size: 5.5px;
            font-weight: bold;
        }

        .rank-role {
            color: #a09ca5;
            font-size: 4.1px;
            margin-top: 1px;
        }

        .rank-value {
            width: 38px;
            padding-right: 8px;
            text-align: right;
            color: #6937d1;
            font-size: 7px;
            font-weight: bold;
        }

        .rank-bar-track {
            width: 88%;
            height: 4px;
            margin-top: 4px;
            background: #eeeaf4;
        }

        .rank-bar {
            height: 4px;
            background: #6937d1;
        }

        /* =====================================================
           TABLA ALUMNOS
        ===================================================== */

        .students-panel {
            border: 1px solid #dedbe3;
        }

        .students-header {
            padding: 7px 9px;
            background: #faf9fc;
            border-bottom: 1px solid #ebe8ee;
        }

        .students-title {
            color: #29272f;
            font-size: 7.4px;
            font-weight: bold;
        }

        .students-subtitle {
            color: #9b97a0;
            font-size: 4.7px;
            margin-top: 2px;
        }

        .students-table {
            table-layout: fixed;
        }

        .students-table th {
            height: 22px;
            padding: 4px;
            background: #15131c;
            color: #ffffff;
            font-size: 4.1px;
            text-align: left;
            text-transform: uppercase;
            letter-spacing: .3px;
        }

        .students-table td {
            height: 38px;
            padding: 5px 4px;
            border-bottom: 1px solid #ece9ef;
            color: #5f5b64;
            font-size: 4.6px;
            vertical-align: middle;
        }

        .students-table tr:last-child td {
            border-bottom: 0;
        }

        .students-table th:nth-child(1),
        .students-table td:nth-child(1) {
            width: 5%;
            text-align: center;
        }

        .students-table th:nth-child(2),
        .students-table td:nth-child(2) {
            width: 27%;
        }

        .students-table th:nth-child(3),
        .students-table td:nth-child(3) {
            width: 19%;
        }

        .students-table th:nth-child(4),
        .students-table td:nth-child(4) {
            width: 9%;
            text-align: center;
        }

        .students-table th:nth-child(5),
        .students-table td:nth-child(5) {
            width: 24%;
        }

        .students-table th:nth-child(6),
        .students-table td:nth-child(6) {
            width: 16%;
            text-align: center;
        }

        .student-name {
            color: #35323a;
            font-size: 4.9px;
            font-weight: bold;
        }

        .student-role {
            color: #9d99a2;
            font-size: 4px;
            margin-top: 1px;
        }

        .student-visits {
            color: #6937d1;
            font-size: 6.3px;
            font-weight: bold;
        }

        .badge-active {
            display: inline-block;
            padding: 2px 4px;
            color: #16885e;
            background: #eaf7f1;
            border: 1px solid #cae8db;
            font-size: 3.8px;
            font-weight: bold;
        }

        .badge-inactive {
            display: inline-block;
            padding: 2px 4px;
            color: #77737c;
            background: #f0eff2;
            border: 1px solid #dedce2;
            font-size: 3.8px;
            font-weight: bold;
        }

        /* =====================================================
           FOOTER
        ===================================================== */

        .footer {
            margin-top: 6px;
            border-top: 1px solid #ddd9e1;
            padding-top: 4px;
        }

        .footer-left,
        .footer-right {
            color: #99959e;
            font-size: 4.3px;
        }

        .footer-right {
            text-align: right;
        }

    </style>

</head>

<body>
@php

    /*
    |--------------------------------------------------------------------------
    | ALUMNOS
    |--------------------------------------------------------------------------
    */

    $listaAlumnos = collect($alumnos ?? []);


    /*
    |--------------------------------------------------------------------------
    | TOTALES
    |--------------------------------------------------------------------------
    */

    $totalAlumnosFinal =
        $totalAlumnosFinal
        ?? $listaAlumnos->count();


    $alumnosActivosFinal =
        $alumnosActivosFinal
        ?? $listaAlumnos
            ->filter(function ($alumno) {

                return (int) (
                    $alumno['total_visitas']
                    ?? 0
                ) > 0;

            })
            ->count();


    $totalVisitasFinal =
        $totalVisitasFinal
        ?? $listaAlumnos->sum(function ($alumno) {

            return (int) (
                $alumno['total_visitas']
                ?? 0
            );

        });


    $promedioFinal =
        $promedioFinal
        ?? (
            $totalAlumnosFinal > 0
                ? round(
                    $totalVisitasFinal /
                    $totalAlumnosFinal,
                    1
                )
                : 0
        );


    $porcentajeActivos =
        $porcentajeActivos
        ?? (
            $totalAlumnosFinal > 0
                ? round(
                    (
                        $alumnosActivosFinal /
                        $totalAlumnosFinal
                    ) * 100
                )
                : 0
        );


    /*
    |--------------------------------------------------------------------------
    | NIVEL
    |--------------------------------------------------------------------------
    */

    if ($porcentajeActivos >= 80) {

        $nivelParticipacion = 'ALTO';

        $mensajeParticipacion =
            'El grupo presenta una participación elevada durante el periodo.';

    } elseif ($porcentajeActivos >= 60) {

        $nivelParticipacion = 'BUENO';

        $mensajeParticipacion =
            'La mayoría del grupo presenta actividad registrada.';

    } elseif ($porcentajeActivos >= 30) {

        $nivelParticipacion = 'MEDIO';

        $mensajeParticipacion =
            'Existe actividad, aunque puede reforzarse el seguimiento.';

    } else {

        $nivelParticipacion = 'BAJO';

        $mensajeParticipacion =
            'La actividad registrada del grupo es limitada.';

    }


    /*
    |--------------------------------------------------------------------------
    | ACTIVIDAD ORIGINAL
    |--------------------------------------------------------------------------
    */

    $actividadOriginal =
        collect($actividad ?? [])
            ->values()
            ->all();


    /*
    |--------------------------------------------------------------------------
    | CONSTRUIR ACTIVIDAD DE LOS ÚLTIMOS 7 DÍAS
    |--------------------------------------------------------------------------
    |
    | Creamos siete días aunque tengan cero actividad.
    | Si existe actividad original del backend, se intenta utilizarla.
    |
    */

    $diasSemana = [];

    for ($i = 6; $i >= 0; $i--) {

        $fecha =
            \Carbon\Carbon::now(
                'America/Chihuahua'
            )->subDays($i);

        $clave =
            $fecha->format('Y-m-d');

        $diasSemana[$clave] = [
            'fecha' =>
                $fecha->format('d/m'),

            'dia' =>
                $fecha->locale('es')
                    ->isoFormat('ddd'),

            'visitas' => 0,
        ];

    }


    /*
    |--------------------------------------------------------------------------
    | INTENTAR MAPEAR ACTIVIDAD DEL BACKEND
    |--------------------------------------------------------------------------
    */

    foreach (
        $actividadOriginal
        as $item
    ) {

        $visitas =
            (int) (
                $item['visitas']
                ?? 0
            );

        $fechaOriginal =
            $item['fecha']
            ?? null;


        if (!$fechaOriginal) {
            continue;
        }


        try {

            $fecha =
                \Carbon\Carbon::parse(
                    $fechaOriginal
                )->timezone(
                    'America/Chihuahua'
                );

            $clave =
                $fecha->format('Y-m-d');


            if (
                isset(
                    $diasSemana[$clave]
                )
            ) {

                $diasSemana[$clave]['visitas']
                    += $visitas;

            }

        } catch (\Exception $e) {

            /*
             * Si la fecha del backend no se puede interpretar,
             * no modificamos la estructura de los siete días.
             */

        }

    }


    /*
    |--------------------------------------------------------------------------
    | RESPALDO DESDE ULTIMA VISITA
    |--------------------------------------------------------------------------
    |
    | Si el backend no entregó actividad pero sí existen visitas,
    | usamos ultima_visita de los alumnos.
    |
    */

    if (
        $totalVisitasFinal > 0
        &&
        collect($diasSemana)
            ->sum('visitas') == 0
    ) {

        foreach (
            $listaAlumnos
            as $alumno
        ) {

            $visitasAlumno =
                (int) (
                    $alumno['total_visitas']
                    ?? 0
                );

            $ultimaVisita =
                $alumno['ultima_visita']
                ?? null;


            if (
                $visitasAlumno <= 0
                ||
                !$ultimaVisita
            ) {
                continue;
            }


            try {

                $fecha =
                    \Carbon\Carbon::parse(
                        $ultimaVisita
                    )->timezone(
                        'America/Chihuahua'
                    );

                $clave =
                    $fecha->format('Y-m-d');


                if (
                    isset(
                        $diasSemana[$clave]
                    )
                ) {

                    $diasSemana[$clave]['visitas']
                        += $visitasAlumno;

                }

            } catch (\Exception $e) {

                /*
                 * No se modifica nada si la fecha es inválida.
                 */

            }

        }

    }


    $actividadFinal =
        array_values(
            $diasSemana
        );


    /*
    |--------------------------------------------------------------------------
    | MÁXIMO DE LA GRÁFICA
    |--------------------------------------------------------------------------
    */

    $maxVisitasDia =
        max(
            1,
            collect(
                $actividadFinal
            )->max('visitas')
        );


    /*
    |--------------------------------------------------------------------------
    | RANKING
    |--------------------------------------------------------------------------
    */

    $rankingFinal =
        collect(
            $ranking
            ?? $listaAlumnos
                ->sortByDesc(function ($alumno) {

                    return (int) (
                        $alumno['total_visitas']
                        ?? 0
                    );

                })
                ->values()
                ->all()
        )
        ->sortByDesc(function ($alumno) {

            return (int) (
                $alumno['total_visitas']
                ?? 0
            );

        })
        ->values();


    /*
    |--------------------------------------------------------------------------
    | SOLO ALUMNOS EXISTENTES
    |--------------------------------------------------------------------------
    */

    $cantidadRanking =
        min(
            3,
            $rankingFinal->count()
        );


    /*
    |--------------------------------------------------------------------------
    | MAXIMO RANKING
    |--------------------------------------------------------------------------
    */

    $maxRanking =
        max(
            1,
            (int) $rankingFinal
                ->max(function ($alumno) {

                    return (int) (
                        $alumno['total_visitas']
                        ?? 0
                    );

                })
        );


    /*
    |--------------------------------------------------------------------------
    | FECHA
    |--------------------------------------------------------------------------
    */

    $formatearFechaFinal =
        function ($fecha) {

            if (!$fecha) {

                return 'Sin actividad';

            }


            try {

                return
                    \Carbon\Carbon::parse(
                        $fecha
                    )
                    ->timezone(
                        'America/Chihuahua'
                    )
                    ->format(
                        'd/m/Y H:i'
                    );

            } catch (\Exception $e) {

                return $fecha;

            }

        };


    /*
    |--------------------------------------------------------------------------
    | TENDENCIA
    |--------------------------------------------------------------------------
    */

    if ($porcentajeActivos >= 60) {

        $tendenciaGeneral = 'POSITIVA';

    } elseif ($porcentajeActivos >= 30) {

        $tendenciaGeneral = 'MODERADA';

    } else {

        $tendenciaGeneral = 'BAJA';

    }

@endphp
{{-- ==========================================================
     HEADER
========================================================== --}}

<table class="header">

    <tr>

        <td class="header-logo">

            <div class="header-logo-text">
                ITS
            </div>

        </td>


        <td class="header-content">

            <div class="header-kicker">
                Reporte académico institucional
            </div>

            <div class="header-title">
                Actividad del grupo
            </div>

            <div class="header-subtitle">
                Resumen de participación, accesos y seguimiento académico.
            </div>

        </td>


        <td class="header-period">

            <div class="header-period-label">
                Periodo consultado
            </div>

            <div class="header-period-value">
                {{ $periodo ?? 'Últimos 7 días' }}
            </div>

        </td>

    </tr>

</table>


{{-- ==========================================================
     IDENTIDAD
========================================================== --}}

<table class="identity">

    <tr>

        <td class="identity-icon">

            <div class="identity-icon-circle">
                ●
            </div>

        </td>


        <td class="identity-main">

            <div class="identity-label">
                Grupo académico
            </div>

            <div class="identity-group">
                {{ $grupo->nombre ?? 'Sin grupo' }}
            </div>

            <div class="identity-materia">

                {{
                    $grupo->materia->nombre
                    ?? 'Materia no especificada'
                }}

            </div>

        </td>


        <td class="identity-meta">

            <div class="meta-block">

                <div class="meta-label">
                    Docente
                </div>

                <div class="meta-value">

                    {{
                        trim(
                            ($docente->nombre ?? '')
                            . ' '
                            . ($docente->apellido_paterno ?? '')
                            . ' '
                            . ($docente->apellido_materno ?? '')
                        )
                        ?: 'No especificado'
                    }}

                </div>

            </div>


            <div class="meta-block">

                <div class="meta-label">
                    Periodo
                </div>

                <div class="meta-value">
                    {{ $periodo ?? 'Últimos 7 días' }}
                </div>

            </div>

        </td>

    </tr>

</table>


{{-- ==========================================================
     RESUMEN
========================================================== --}}

<table class="section">

    <tr>

        <td class="section-number">
            01
        </td>

        <td class="section-title">
            Resumen del grupo
        </td>

        <td class="section-description">
            Indicadores principales
        </td>

    </tr>

</table>


<table class="kpis">

    <tr>

        <td class="kpi-cell">

            <div class="kpi">

                <div class="kpi-line"></div>

                <div class="kpi-label">
                    Alumnos
                </div>

                <div class="kpi-number">
                    {{ $totalAlumnosFinal }}
                </div>

                <div class="kpi-note">
                    Integrantes registrados
                </div>

            </div>

        </td>


        <td class="kpi-cell">

            <div class="kpi">

                <div class="kpi-line"></div>

                <div class="kpi-label">
                    Con actividad
                </div>

                <div class="kpi-number">
                    {{ $alumnosActivosFinal }}
                </div>

                <div class="kpi-note">
                    {{ $porcentajeActivos }}% del grupo
                </div>

            </div>

        </td>


        <td class="kpi-cell">

            <div class="kpi">

                <div class="kpi-line"></div>

                <div class="kpi-label">
                    Visitas
                </div>

                <div class="kpi-number">
                    {{ $totalVisitasFinal }}
                </div>

                <div class="kpi-note">
                    Accesos registrados
                </div>

            </div>

        </td>


        <td class="kpi-cell">

            <div class="kpi">

                <div class="kpi-line"></div>

                <div class="kpi-label">
                    Promedio
                </div>

                <div class="kpi-number">
                    {{ $promedioFinal }}
                </div>

                <div class="kpi-note">
                    Visitas por alumno
                </div>

            </div>

        </td>

    </tr>

</table>


{{-- ==========================================================
     ACTIVIDAD
========================================================== --}}

<table class="section">

    <tr>

        <td class="section-number">
            02
        </td>

        <td class="section-title">
            Actividad y participación
        </td>

        <td class="section-description">
            Comportamiento de los últimos 7 días
        </td>

    </tr>

</table>


<table>

    <tr>


        {{-- ==================================================
             GRÁFICA
        =================================================== --}}

        <td class="analytics-left">

            <div class="panel">

                <div class="panel-header">

                    <div class="panel-label">
                        Actividad
                    </div>

                    <div class="panel-title">
                        Actividad por día
                    </div>

                    <div class="panel-description">
                        Distribución de accesos registrados.
                    </div>

                </div>


                <div class="activity-box">

                    <table>

                        @foreach(
                            $actividadFinal
                            as $dia
                        )

                            @php

                                $visitasDia =
                                    (int) (
                                        $dia['visitas']
                                        ?? 0
                                    );


                                $anchoBarra =
                                    $maxVisitasDia > 0
                                        ? (
                                            $visitasDia /
                                            $maxVisitasDia
                                        ) * 100
                                        : 0;

                            @endphp


                            <tr class="activity-row">

                                <td class="activity-day">

                                    <strong>
                                        {{
                                            strtoupper(
                                                $dia['dia']
                                                ?? ''
                                            )
                                        }}
                                    </strong>

                                    &nbsp;

                                    {{
                                        $dia['fecha']
                                        ?? ''
                                    }}

                                </td>


                                <td class="activity-bar-cell">

                                    <div class="activity-track">

                                        @if($visitasDia > 0)

                                            <div
                                                class="activity-bar"
                                                style="
                                                    width:
                                                    {{ $anchoBarra }}%;
                                                "
                                            ></div>

                                        @endif

                                    </div>

                                </td>


                                <td class="activity-value">
                                    {{ $visitasDia }}
                                </td>

                            </tr>

                        @endforeach

                    </table>


                    <div class="activity-total">

                        Total de actividad registrada:

                        <strong>
                            {{ $totalVisitasFinal }}
                            {{ $totalVisitasFinal == 1 ? 'visita' : 'visitas' }}
                        </strong>

                        &nbsp;·&nbsp;

                        {{ $alumnosActivosFinal }}
                        {{ $alumnosActivosFinal == 1 ? 'alumno activo' : 'alumnos activos' }}

                    </div>

                </div>

            </div>

        </td>


        {{-- ==================================================
             PARTICIPACIÓN
        =================================================== --}}

        <td class="analytics-right">

            <div class="panel">

                <div class="panel-header">

                    <div class="panel-label">
                        Participación
                    </div>

                    <div class="panel-title">
                        Participación del grupo
                    </div>

                </div>


                <div class="participation-box">

                    <table>

                        <tr>

                            <td class="donut-wrap">

                                <div
                                    class="donut"
                                    style="
                                        --percent:
                                        {{ $porcentajeActivos }};
                                    "
                                >

                                    <div class="donut-inner">

                                        <div class="donut-percent">
                                            {{ $porcentajeActivos }}%
                                        </div>

                                        <div class="donut-label">
                                            participación
                                        </div>

                                    </div>

                                </div>

                            </td>

                        </tr>

                    </table>


                    <div class="participation-info">

                        <div class="participation-status">

                            Nivel
                            {{ $nivelParticipacion }}

                        </div>


                        <div class="participation-description">

                            {{ $mensajeParticipacion }}

                        </div>


                        <div class="participation-progress">

                            <div
                                class="participation-progress-fill"
                                style="
                                    width:
                                    {{ $porcentajeActivos }}%;
                                "
                            ></div>

                        </div>


                        <div class="participation-foot">

                            <strong>
                                {{ $alumnosActivosFinal }}
                            </strong>

                            de

                            <strong>
                                {{ $totalAlumnosFinal }}
                            </strong>

                            alumnos activos.

                        </div>

                    </div>

                </div>

            </div>

        </td>

    </tr>

</table>


{{-- ==========================================================
     INFORMACIÓN CLAVE
========================================================== --}}

<table class="insight">

    <tr>

        <td class="insight-icon">
            ✓
        </td>


        <td class="insight-main">

            <div class="insight-label">
                Información clave
            </div>


            <div class="insight-title">

                @if($totalVisitasFinal > 0)

                    El grupo presenta actividad académica registrada.

                @else

                    No se registró actividad durante el periodo consultado.

                @endif

            </div>


            <div class="insight-description">

                Se registraron

                <strong>
                    {{ $totalVisitasFinal }}
                </strong>

                {{ $totalVisitasFinal == 1 ? 'visita' : 'visitas' }}

                entre

                <strong>
                    {{ $totalAlumnosFinal }}
                </strong>

                alumnos.

            </div>

        </td>


        <td class="insight-result">

            <div class="insight-result-label">
                Tendencia general
            </div>

            <div class="insight-result-value">
                {{ $tendenciaGeneral }}
            </div>

        </td>

    </tr>

</table>


{{-- ==========================================================
     RANKING + DETALLE
========================================================== --}}

<table style="margin-top:7px;">

    <tr>


        {{-- ==================================================
             RANKING
        =================================================== --}}

        <td class="bottom-left">

            <div class="ranking-panel">

                <div class="ranking-header">

                    <div class="ranking-title">
                        Ranking de participación
                    </div>

                    <div class="ranking-subtitle">
                        Alumnos con mayor número de visitas
                    </div>

                </div>


                <table>

                    @if($cantidadRanking > 0)

                        @for(
                            $i = 0;
                            $i < $cantidadRanking;
                            $i++
                        )

                            @php

                                $visitasRanking =
                                    (int) (
                                        $rankingFinal[$i]['total_visitas']
                                        ?? 0
                                    );


                                $anchoRanking =
                                    $maxRanking > 0
                                        ? (
                                            $visitasRanking /
                                            $maxRanking
                                        ) * 100
                                        : 0;

                            @endphp


                            <tr class="ranking-row">

                                <td class="rank-position">

                                    {{
                                        str_pad(
                                            $i + 1,
                                            2,
                                            '0',
                                            STR_PAD_LEFT
                                        )
                                    }}

                                </td>


                                <td>

                                    <div class="rank-name">

                                        {{
                                            $rankingFinal[$i]['nombre']
                                            ?? 'Sin nombre'
                                        }}

                                    </div>

                                    <div class="rank-role">
                                        Alumno
                                    </div>


                                    <div class="rank-bar-track">

                                        <div
                                            class="rank-bar"
                                            style="
                                                width:
                                                {{ $anchoRanking }}%;
                                            "
                                        ></div>

                                    </div>

                                </td>


                                <td class="rank-value">

                                    {{ $visitasRanking }}

                                </td>

                            </tr>

                        @endfor

                    @else

                        <tr class="ranking-row">

                            <td
                                colspan="3"
                                style="
                                    text-align:center;
                                    color:#99959f;
                                "
                            >

                                Sin alumnos registrados.

                            </td>

                        </tr>

                    @endif

                </table>

            </div>

        </td>


        {{-- ==================================================
             ALUMNOS
        =================================================== --}}

        <td class="bottom-right">

            <div class="students-panel">

                <div class="students-header">

                    <div class="students-title">
                        Detalle de los alumnos
                    </div>

                    <div class="students-subtitle">
                        Seguimiento individual del grupo
                    </div>

                </div>


                <table class="students-table">

                    <thead>

                        <tr>

                            <th>
                                #
                            </th>

                            <th>
                                Estudiante
                            </th>

                            <th>
                                Correo
                            </th>

                            <th>
                                Visitas
                            </th>

                            <th>
                                Último acceso
                            </th>

                            <th>
                                Estado
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        @forelse(
                            $listaAlumnos
                            as $index => $alumno
                        )

                            @php

                                $visitasAlumno =
                                    (int) (
                                        $alumno['total_visitas']
                                        ?? 0
                                    );


                                $activo =
                                    $visitasAlumno > 0;

                            @endphp


                            <tr>

                                <td>

                                    {{
                                        str_pad(
                                            $index + 1,
                                            2,
                                            '0',
                                            STR_PAD_LEFT
                                        )
                                    }}

                                </td>


                                <td>

                                    <div class="student-name">

                                        {{
                                            $alumno['nombre']
                                            ?? 'Sin nombre'
                                        }}

                                    </div>

                                    <div class="student-role">
                                        Alumno
                                    </div>

                                </td>


                                <td>

                                    {{
                                        $alumno['correo']
                                        ?? 'Sin correo'
                                    }}

                                </td>


                                <td>

                                    <span class="student-visits">
                                        {{ $visitasAlumno }}
                                    </span>

                                </td>


                                <td>

                                    {{
                                        $formatearFechaFinal(
                                            $alumno['ultima_visita']
                                            ?? null
                                        )
                                    }}

                                </td>


                                <td>

                                    @if($activo)

                                        <span class="badge-active">
                                            ACTIVO
                                        </span>

                                    @else

                                        <span class="badge-inactive">
                                            SIN ACTIVIDAD
                                        </span>

                                    @endif

                                </td>

                            </tr>

                        @empty

                            <tr>

                                <td
                                    colspan="6"
                                    style="
                                        height:70px;
                                        text-align:center;
                                        color:#99959f;
                                    "
                                >

                                    No hay alumnos registrados.

                                </td>

                            </tr>

                        @endforelse

                    </tbody>

                </table>

            </div>

        </td>

    </tr>

</table>


{{-- ==========================================================
     FOOTER
========================================================== --}}

<table class="footer">

    <tr>

        <td class="footer-left">

            <strong>
                NEXUS · ITSNCG
            </strong>

            · Reporte académico institucional

        </td>


        <td class="footer-right">

            Generado:

            {{
                now()
                    ->timezone('America/Chihuahua')
                    ->format('d/m/Y H:i')
            }}

        </td>

    </tr>

</table>


</body>

</html>
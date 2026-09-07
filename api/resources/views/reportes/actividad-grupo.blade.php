<!DOCTYPE html>

<html lang="es">

<head>

    <meta charset="UTF-8">


    <title>

        Reporte Ejecutivo de Actividad - ITS

    </title>


    <style>

        /*
        |--------------------------------------------------------------------------
        | CONFIGURACIÓN GENERAL
        |--------------------------------------------------------------------------
        */

        @page {

            margin:

                22px
                28px
                48px
                28px;

        }


        * {

            box-sizing: border-box;

        }


        body {

            margin: 0;

            padding: 0;

            font-family:
                DejaVu Sans,
                sans-serif;

            font-size: 9px;

            color: #27272a;

            background: #ffffff;

        }


        /*
        |--------------------------------------------------------------------------
        | COLORES
        |--------------------------------------------------------------------------
        */

        .purple {

            color: #6d28d9;

        }


        .muted {

            color: #71717a;

        }


        .green {

            color: #15803d;

        }


        .orange {

            color: #c2410c;

        }


        /*
        |--------------------------------------------------------------------------
        | HEADER PRINCIPAL
        |--------------------------------------------------------------------------
        */

        .header {

            width: 100%;

            border-bottom:

                3px solid
                #6d28d9;

            padding-bottom: 15px;

            margin-bottom: 18px;

        }


        .header-table {

            width: 100%;

            border-collapse: collapse;

        }


        .header-table td {

            border: none;

            vertical-align: middle;

        }


        /*
        |--------------------------------------------------------------------------
        | LOGO ITS
        |--------------------------------------------------------------------------
        */

        .logo-container {

            width: 80px;

        }


        .logo {

            width: 58px;

            height: 58px;

            border:

                2px solid
                #6d28d9;

            text-align: center;

            line-height: 58px;

            color: #6d28d9;

            font-size: 16px;

            font-weight: bold;

            letter-spacing: 1px;

        }


        /*
        |--------------------------------------------------------------------------
        | TÍTULO
        |--------------------------------------------------------------------------
        */

        .header-kicker {

            color: #7c3aed;

            font-size: 7px;

            text-transform: uppercase;

            letter-spacing: 1.5px;

            margin-bottom: 5px;

        }


        .header-title {

            font-size: 22px;

            font-weight: bold;

            color: #18181b;

            letter-spacing: .3px;

        }


        .header-subtitle {

            margin-top: 5px;

            font-size: 9px;

            color: #71717a;

        }


        /*
        |--------------------------------------------------------------------------
        | FECHA REPORTE
        |--------------------------------------------------------------------------
        */

        .report-date {

            width: 120px;

            text-align: right;

        }


        .report-date-label {

            font-size: 7px;

            text-transform: uppercase;

            color: #a1a1aa;

            letter-spacing: 1px;

        }


        .report-date-value {

            margin-top: 5px;

            color: #6d28d9;

            font-size: 10px;

            font-weight: bold;

        }


        /*
        |--------------------------------------------------------------------------
        | CONTEXTO
        |--------------------------------------------------------------------------
        */

        .context {

            width: 100%;

            border-collapse: collapse;

            margin-bottom: 20px;

            border:

                1px solid
                #e4e4e7;

        }


        .context td {

            width: 25%;

            padding:

                10px
                12px;

            border-right:

                1px solid
                #e4e4e7;

            vertical-align: top;

        }


        .context td:last-child {

            border-right: none;

        }


        .context-label {

            font-size: 7px;

            text-transform: uppercase;

            letter-spacing: .8px;

            color: #a1a1aa;

            margin-bottom: 5px;

        }


        .context-value {

            font-size: 9px;

            font-weight: bold;

            color: #27272a;

        }


        /*
        |--------------------------------------------------------------------------
        | SECCIONES
        |--------------------------------------------------------------------------
        */

        .section {

            margin-top: 18px;

            margin-bottom: 8px;

        }


        .section-table {

            width: 100%;

            border-collapse: collapse;

        }


        .section-table td {

            border: none;

            vertical-align: middle;

        }


        .section-number {

            width: 35px;

            color: #7c3aed;

            font-size: 8px;

            font-weight: bold;

        }


        .section-title {

            font-size: 14px;

            color: #18181b;

            font-weight: bold;

        }


        .section-description {

            text-align: right;

            color: #a1a1aa;

            font-size: 7px;

        }


        /*
        |--------------------------------------------------------------------------
        | KPI
        |--------------------------------------------------------------------------
        */

        .kpi-table {

            width: 100%;

            border-collapse: separate;

            border-spacing: 6px;

            margin-left: -6px;

            margin-right: -6px;

        }


        .kpi-table td {

            width: 25%;

            border:

                1px solid
                #e4e4e7;

            padding: 12px;

            vertical-align: top;

        }


        .kpi-label {

            font-size: 7px;

            color: #a1a1aa;

            text-transform: uppercase;

            letter-spacing: .7px;

        }


        .kpi-number {

            margin-top: 7px;

            font-size: 24px;

            font-weight: bold;

            color: #2e1065;

            line-height: 1;

        }


        .kpi-footer {

            margin-top: 9px;

            padding-top: 7px;

            border-top:

                1px solid
                #f4f4f5;

            font-size: 7px;

            color: #71717a;

        }


        /*
        |--------------------------------------------------------------------------
        | PARTICIPACIÓN
        |--------------------------------------------------------------------------
        */

        .participation {

            width: 100%;

            border-collapse: collapse;

            border:

                1px solid
                #e4e4e7;

            margin-top: 8px;

        }


        .participation td {

            border: none;

            vertical-align: top;

            padding: 14px;

        }


        .participation-left {

            width: 65%;

            border-right:

                1px solid
                #e4e4e7 !important;

        }


        .participation-title {

            font-size: 10px;

            font-weight: bold;

            color: #27272a;

        }


        .participation-text {

            margin-top: 4px;

            color: #71717a;

            font-size: 8px;

        }


        .progress-bg {

            width: 100%;

            height: 12px;

            margin-top: 12px;

            background: #ede9fe;

        }


        .progress-fill {

            height: 12px;

            background: #6d28d9;

        }


        .progress-info {

            margin-top: 7px;

            font-size: 7px;

            color: #71717a;

        }


        .participation-right {

            width: 35%;

            background: #fafafa;

            text-align: center;

        }


        .participation-percent {

            font-size: 30px;

            font-weight: bold;

            color: #6d28d9;

        }


        .participation-status {

            margin-top: 6px;

            font-size: 9px;

            font-weight: bold;

            color: #27272a;

        }


        /*
        |--------------------------------------------------------------------------
        | ACTIVIDAD POR DÍA
        |--------------------------------------------------------------------------
        */

        .activity-box {

            width: 100%;

            border:

                1px solid
                #e4e4e7;

        }


        .activity-header {

            padding: 10px 12px;

            background: #fafafa;

            border-bottom:

                1px solid
                #e4e4e7;

        }


        .activity-title {

            font-size: 10px;

            font-weight: bold;

            color: #27272a;

        }


        .activity-subtitle {

            margin-top: 3px;

            color: #a1a1aa;

            font-size: 7px;

        }


        .chart-table {

            width: 100%;

            border-collapse: collapse;

        }


        .chart-table td {

            border: none;

            padding:

                6px
                10px;

        }


        .chart-date {

            width: 100px;

            font-size: 7px;

            color: #52525b;

        }


        .chart-number {

            width: 45px;

            text-align: right;

            font-weight: bold;

            color: #6d28d9;

        }


        .bar-bg {

            width: 100%;

            height: 10px;

            background: #f4f4f5;

        }


        .bar-fill {

            height: 10px;

            background: #7c3aed;

        }


        /*
        |--------------------------------------------------------------------------
        | INSIGHT
        |--------------------------------------------------------------------------
        */

        .insight {

            margin-top: 10px;

            padding: 12px;

            border:

                1px solid
                #ddd6fe;

            background: #faf7ff;

        }


        .insight-label {

            color: #7c3aed;

            font-size: 7px;

            text-transform: uppercase;

            font-weight: bold;

            letter-spacing: 1px;

        }


        .insight-title {

            margin-top: 5px;

            color: #2e1065;

            font-size: 10px;

            font-weight: bold;

        }


        .insight-text {

            margin-top: 5px;

            color: #52525b;

            font-size: 8px;

            line-height: 1.5;

        }


        /*
        |--------------------------------------------------------------------------
        | RANKING
        |--------------------------------------------------------------------------
        */

        .ranking {

            width: 100%;

            border-collapse: separate;

            border-spacing: 6px;

            margin-left: -6px;

        }


        .ranking td {

            width: 33.33%;

            border:

                1px solid
                #e4e4e7;

            padding: 11px;

            vertical-align: top;

        }


        .ranking-position {

            font-size: 7px;

            font-weight: bold;

            color: #7c3aed;

        }


        .ranking-name {

            margin-top: 7px;

            font-size: 9px;

            font-weight: bold;

            color: #27272a;

        }


        .ranking-number {

            margin-top: 7px;

            font-size: 18px;

            font-weight: bold;

            color: #5b21b6;

        }


        .ranking-label {

            font-size: 7px;

            color: #a1a1aa;

        }


        /*
        |--------------------------------------------------------------------------
        | TABLA ALUMNOS
        |--------------------------------------------------------------------------
        */

        .students-table {

            width: 100%;

            border-collapse: collapse;

            margin-top: 8px;

            table-layout: fixed;

        }


        .students-table thead {

            display: table-header-group;

        }


        .students-table tbody {

            display: table-row-group;

        }


        .students-table tr {

            page-break-inside: avoid;

        }


        .students-table th {

            background: #2e1065;

            color: #ffffff;

            padding:

                8px
                5px;

            font-size: 6.5px;

            text-transform: uppercase;

            letter-spacing: .4px;

            text-align: left;

        }


        .students-table td {

            border-bottom:

                1px solid
                #e4e4e7;

            padding:

                7px
                5px;

            font-size: 7px;

            vertical-align: middle;

            line-height: 1.25;

            word-wrap: break-word;

        }


        .students-table tr:nth-child(even) {

            background: #fafafa;

        }


        .student-number {

            text-align: center;

            color: #7c3aed;

            font-weight: bold;

        }


        .student-name {

            font-size: 8px;

            font-weight: bold;

            color: #27272a;

        }


        .student-role {

            margin-top: 2px;

            font-size: 6px;

            color: #a1a1aa;

        }


        .center {

            text-align: center;

        }


        .visit-number {

            color: #6d28d9;

            font-size: 9px;

            font-weight: bold;

        }


        /*
        |--------------------------------------------------------------------------
        | BADGES
        |--------------------------------------------------------------------------
        */

        .badge-active {

            display: inline-block;

            padding:

                3px
                6px;

            font-size: 6px;

            font-weight: bold;

            color: #166534;

            background: #dcfce7;

        }


        .badge-inactive {

            display: inline-block;

            padding:

                3px
                6px;

            font-size: 6px;

            font-weight: bold;

            color: #71717a;

            background: #f4f4f5;

        }


        /*
        |--------------------------------------------------------------------------
        | EMPTY
        |--------------------------------------------------------------------------
        */

        .empty {

            padding: 15px !important;

            text-align: center;

            color: #a1a1aa;

            font-style: italic;

        }


        /*
        |--------------------------------------------------------------------------
        | FOOTER
        |--------------------------------------------------------------------------
        */

        .footer {

            position: fixed;

            bottom: -32px;

            left: 0;

            width: 100%;

            padding-top: 7px;

            border-top:

                1px solid
                #e4e4e7;

            font-size: 6.5px;

            color: #a1a1aa;

        }


        .footer-left {

            float: left;

        }


        .footer-right {

            float: right;

        }


        .footer strong {

            color: #6d28d9;

        }


        /*
        |--------------------------------------------------------------------------
        | CONTROL DE PAGINACIÓN
        |--------------------------------------------------------------------------
        */

        .keep-together {

            page-break-inside: avoid;

        }

    </style>

</head>


<body>


@php


    /*
    |--------------------------------------------------------------------------
    | DATOS GENERALES
    |--------------------------------------------------------------------------
    */

    $actividad =

        $actividadPorDia
        ?? [];


    $listaAlumnos =

        collect(
            $alumnos
            ?? []
        );


    $totalAlumnosFinal =

        $totalAlumnos
        ?? $listaAlumnos->count();


    $alumnosActivosFinal =

        $alumnosActivos
        ?? $listaAlumnos
            ->filter(
                function ($alumno) {

                    return
                        ($alumno['total_visitas'] ?? 0) > 0;

                }
            )
            ->count();


    $totalVisitasFinal =

        $totalVisitas
        ?? $listaAlumnos
            ->sum(
                'total_visitas'
            );


    /*
    |--------------------------------------------------------------------------
    | PROMEDIO
    |--------------------------------------------------------------------------
    */

    if (
        $totalAlumnosFinal > 0
    ) {

        $promedioFinal =

            round(
                $totalVisitasFinal
                /
                $totalAlumnosFinal,
                1
            );

    }

    else {

        $promedioFinal = 0;

    }


    /*
    |--------------------------------------------------------------------------
    | PORCENTAJE ACTIVOS
    |--------------------------------------------------------------------------
    */

    if (
        $totalAlumnosFinal > 0
    ) {

        $porcentajeActivos =

            round(
                (
                    $alumnosActivosFinal
                    /
                    $totalAlumnosFinal
                )
                *
                100
            );

    }

    else {

        $porcentajeActivos = 0;

    }


    /*
    |--------------------------------------------------------------------------
    | NIVEL PARTICIPACIÓN
    |--------------------------------------------------------------------------
    */

    if (
        $porcentajeActivos >= 80
    ) {

        $nivelParticipacion =
            'Excelente participación';

        $mensajeParticipacion =
            'El grupo presenta una participación académica sobresaliente.';


    }

    elseif (
        $porcentajeActivos >= 60
    ) {

        $nivelParticipacion =
            'Buena participación';

        $mensajeParticipacion =
            'La mayoría de los alumnos mantiene actividad académica.';


    }

    elseif (
        $porcentajeActivos >= 30
    ) {

        $nivelParticipacion =
            'Participación moderada';

        $mensajeParticipacion =
            'Existe actividad, aunque algunos alumnos requieren seguimiento.';


    }

    else {

        $nivelParticipacion =
            'Participación baja';

        $mensajeParticipacion =
            'Se recomienda reforzar el seguimiento académico del grupo.';

    }


    /*
    |--------------------------------------------------------------------------
    | ACTIVIDAD MÁS ALTA
    |--------------------------------------------------------------------------
    */

    $maxVisitasDia = 0;

    $fechaMayorActividad =
        null;


    foreach (
        $actividad
        as $item
    ) {


        $visitasItem =

            (int)
            (
                $item['visitas']
                ?? 0
            );


        if (
            $visitasItem
            >
            $maxVisitasDia
        ) {

            $maxVisitasDia =
                $visitasItem;


            $fechaMayorActividad =

                $item['fecha']
                ?? null;

        }


    }


    /*
    |--------------------------------------------------------------------------
    | RANKING
    |--------------------------------------------------------------------------
    */

    $ranking =

        $listaAlumnos
        ->sortByDesc(
            function ($alumno) {

                return
                    $alumno['total_visitas']
                    ?? 0;

            }
        )
        ->take(3)
        ->values();


    /*
    |--------------------------------------------------------------------------
    | FORMATEAR FECHA
    |--------------------------------------------------------------------------
    */

    $formatearFecha =

        function ($fecha) {


            if (
                empty($fecha)
            ) {

                return null;

            }


            try {


                $carbon =

                    \Carbon\Carbon::parse(
                        $fecha
                    )
                    ->timezone(
                        'America/Chihuahua'
                    );


                $meses = [

                    1 => 'ene',
                    2 => 'feb',
                    3 => 'mar',
                    4 => 'abr',
                    5 => 'may',
                    6 => 'jun',
                    7 => 'jul',
                    8 => 'ago',
                    9 => 'sep',
                    10 => 'oct',
                    11 => 'nov',
                    12 => 'dic',

                ];


                $hora =

                    $carbon
                    ->format(
                        'g:i'
                    );


                $periodoHora =

                    $carbon->hour >= 12
                        ? 'p.m.'
                        : 'a.m.';


                return

                    $carbon->day

                    . ' '

                    . $meses[
                        $carbon->month
                    ]

                    . ' '

                    . $carbon->year

                    . ', '

                    . $hora

                    . ' '

                    . $periodoHora;


            }

            catch (
                \Exception $e
            ) {

                return $fecha;

            }


        };


@endphp



<!-- =====================================================
     HEADER
===================================================== -->

<div class="header">


    <table class="header-table">

        <tr>


            <!-- LOGO -->

            <td
                class="logo-container"
            >

                <div class="logo">

                    ITS

                </div>

            </td>



            <!-- TITULO -->

            <td>


                <div class="header-kicker">

                    Instituto Tecnológico Superior

                </div>


                <div class="header-title">

                    Reporte Ejecutivo de Actividad

                </div>


                <div class="header-subtitle">

                    Análisis académico y participación estudiantil

                </div>


            </td>



            <!-- FECHA -->

            <td
                class="report-date"
            >


                <div
                    class="report-date-label"
                >

                    Reporte generado

                </div>


                <div
                    class="report-date-value"
                >

                    {{
                        now()
                        ->timezone(
                            'America/Chihuahua'
                        )
                        ->format(
                            'd/m/Y'
                        )
                    }}

                </div>


            </td>


        </tr>

    </table>


</div>



<!-- =====================================================
     INFORMACIÓN DEL GRUPO
===================================================== -->

<table class="context">

    <tr>


        <!-- GRUPO -->

        <td>


            <div class="context-label">

                Grupo

            </div>


            <div class="context-value">

                {{
                    $grupo->nombre
                    ?? 'Sin grupo'
                }}

            </div>


        </td>



        <!-- MATERIA -->

        <td>


            <div class="context-label">

                Materia

            </div>


            <div class="context-value">

                {{
                    $grupo->materia->nombre
                    ?? 'Sin materia'
                }}

            </div>


        </td>



        <!-- DOCENTE -->

        <td>


            <div class="context-label">

                Docente

            </div>


            <div class="context-value">

                {{
                    trim(

                        ($docente->nombre ?? '')

                        . ' '

                        . ($docente->apellido_paterno ?? '')

                        . ' '

                        . ($docente->apellido_materno ?? '')

                    )
                }}

            </div>


        </td>



        <!-- PERIODO -->

        <td>


            <div class="context-label">

                Periodo

            </div>


            <div class="context-value">

                {{
                    $periodo
                    ?? 'No especificado'
                }}

            </div>


        </td>


    </tr>

</table>



<!-- =====================================================
     SECCIÓN 01
===================================================== -->

<div class="section">


    <table class="section-table">

        <tr>


            <td class="section-number">

                01

            </td>


            <td class="section-title">

                Indicadores principales

            </td>


            <td class="section-description">

                Resumen general del grupo

            </td>


        </tr>

    </table>


</div>



<!-- =====================================================
     KPIS
===================================================== -->

<table class="kpi-table">

    <tr>


        <!-- TOTAL ALUMNOS -->

        <td>


            <div class="kpi-label">

                Comunidad

            </div>


            <div class="kpi-number">

                {{
                    $totalAlumnosFinal
                }}

            </div>


            <div class="kpi-footer">

                Alumnos registrados
                en el grupo

            </div>


        </td>



        <!-- ACTIVOS -->

        <td>


            <div class="kpi-label">

                Participación

            </div>


            <div class="kpi-number">

                {{
                    $alumnosActivosFinal
                }}

            </div>


            <div class="kpi-footer">

                {{
                    $porcentajeActivos
                }}%

                de alumnos
                con actividad

            </div>


        </td>



        <!-- VISITAS -->

        <td>


            <div class="kpi-label">

                Actividad

            </div>


            <div class="kpi-number">

                {{
                    $totalVisitasFinal
                }}

            </div>


            <div class="kpi-footer">

                Visitas totales
                registradas

            </div>


        </td>



        <!-- PROMEDIO -->

        <td>


            <div class="kpi-label">

                Promedio

            </div>


            <div class="kpi-number">

                {{
                    $promedioFinal
                }}

            </div>


            <div class="kpi-footer">

                Visitas promedio
                por alumno

            </div>


        </td>


    </tr>

</table>



<!-- =====================================================
     PARTICIPACIÓN
===================================================== -->

<table
    class="participation keep-together"
>

    <tr>


        <!-- IZQUIERDA -->

        <td
            class="participation-left"
        >


            <div class="participation-title">

                Nivel de participación académica

            </div>


            <div class="participation-text">

                Porcentaje de alumnos que han registrado
                al menos una visita dentro de la plataforma.

            </div>


            <div class="progress-bg">


                <div
                    class="progress-fill"
                    style="
                        width:
                        {{ $porcentajeActivos }}%;
                    "
                >

                </div>


            </div>


            <div class="progress-info">


                <strong>

                    {{
                        $alumnosActivosFinal
                    }}

                </strong>

                alumnos activos de

                <strong>

                    {{
                        $totalAlumnosFinal
                    }}

                </strong>

                registrados.


            </div>


        </td>



        <!-- DERECHA -->

        <td
            class="participation-right"
        >


            <div
                class="participation-percent"
            >

                {{
                    $porcentajeActivos
                }}%

            </div>


            <div
                class="participation-status"
            >

                {{
                    $nivelParticipacion
                }}

            </div>


            <div
                class="participation-text"
            >

                {{
                    $mensajeParticipacion
                }}

            </div>


        </td>


    </tr>

</table>



<!-- =====================================================
     SECCIÓN 02
===================================================== -->

<div class="section">


    <table class="section-table">

        <tr>


            <td class="section-number">

                02

            </td>


            <td class="section-title">

                Analítica de actividad

            </td>


            <td class="section-description">

                Comportamiento de visitas

            </td>


        </tr>

    </table>


</div>



<!-- =====================================================
     ACTIVIDAD
===================================================== -->

<div
    class="activity-box keep-together"
>


    <div class="activity-header">


        <div class="activity-title">

            Actividad por día

        </div>


        <div class="activity-subtitle">

            Distribución de las visitas
            registradas durante el periodo.

        </div>


    </div>



    @if(
        count($actividad) > 0
    )


        <table class="chart-table">


            @foreach(
                $actividad
                as $item
            )


                @php


                    $visitasActuales =

                        (int)
                        (
                            $item['visitas']
                            ?? 0
                        );


                    if (
                        $maxVisitasDia > 0
                    ) {

                        $porcentajeBarra =

                            round(
                                (
                                    $visitasActuales
                                    /
                                    $maxVisitasDia
                                )
                                *
                                100
                            );

                    }

                    else {

                        $porcentajeBarra = 0;

                    }


                @endphp



                <tr>


                    <!-- FECHA -->

                    <td class="chart-date">

                        {{
                            $item['fecha']
                            ?? 'Sin fecha'
                        }}

                    </td>



                    <!-- BARRA -->

                    <td>


                        <div class="bar-bg">


                            <div
                                class="bar-fill"
                                style="
                                    width:
                                    {{ $porcentajeBarra }}%;
                                "
                            >

                            </div>


                        </div>


                    </td>



                    <!-- NÚMERO -->

                    <td
                        class="chart-number"
                    >

                        {{
                            $visitasActuales
                        }}

                    </td>


                </tr>


            @endforeach


        </table>



    @else


        <div
            style="
                padding: 18px;
                text-align: center;
                color: #a1a1aa;
            "
        >

            Todavía no hay actividad registrada.

        </div>


    @endif


</div>



<!-- =====================================================
     INSIGHT
===================================================== -->

<div
    class="insight keep-together"
>


    <div class="insight-label">

        Insight académico

    </div>


    <div class="insight-title">

        Resumen inteligente del grupo

    </div>


    <div class="insight-text">


        El grupo ha generado

        <strong>

            {{
                $totalVisitasFinal
            }}

            visitas

        </strong>

        en total.


        @if(
            $maxVisitasDia > 0
        )


            El día con mayor actividad registró

            <strong>

                {{
                    $maxVisitasDia
                }}

                visitas

            </strong>


            @if(
                $fechaMayorActividad
            )

                el día

                <strong>

                    {{
                        $fechaMayorActividad
                    }}

                </strong>.

            @endif


        @endif


        Actualmente el grupo presenta

        <strong>

            {{
                strtolower(
                    $nivelParticipacion
                )
            }}

        </strong>.


    </div>


</div>



<!-- =====================================================
     SECCIÓN 03
===================================================== -->

<div class="section">


    <table class="section-table">

        <tr>


            <td class="section-number">

                03

            </td>


            <td class="section-title">

                Alumnos destacados

            </td>


            <td class="section-description">

                Mayor actividad registrada

            </td>


        </tr>

    </table>


</div>



<!-- =====================================================
     RANKING
===================================================== -->

<table
    class="ranking keep-together"
>

    <tr>


        @for(

            $i = 0;

            $i < 3;

            $i++

        )


            <td>


                <div
                    class="ranking-position"
                >


                    @if(
                        $i === 0
                    )

                        #01 · DESTACADO


                    @elseif(
                        $i === 1
                    )

                        #02 · SEGUNDO LUGAR


                    @else

                        #03 · TERCER LUGAR

                    @endif


                </div>



                @if(
                    isset(
                        $ranking[$i]
                    )
                )


                    <div
                        class="ranking-name"
                    >

                        {{
                            $ranking[$i]['nombre']
                            ?? 'Sin nombre'
                        }}

                    </div>


                    <div
                        class="ranking-number"
                    >

                        {{
                            $ranking[$i]['total_visitas']
                            ?? 0
                        }}

                    </div>


                    <div
                        class="ranking-label"
                    >

                        visitas registradas

                    </div>


                @else


                    <div
                        class="ranking-name"
                    >

                        Sin información

                    </div>


                    <div
                        class="ranking-label"
                    >

                        No hay suficientes
                        alumnos con actividad.

                    </div>


                @endif


            </td>


        @endfor


    </tr>

</table>



<!-- =====================================================
     SECCIÓN 04
===================================================== -->

<div class="section">


    <table class="section-table">

        <tr>


            <td class="section-number">

                04

            </td>


            <td class="section-title">

                Seguimiento individual

            </td>


            <td class="section-description">

                Actividad detallada por alumno

            </td>


        </tr>

    </table>


</div>



<!-- =====================================================
     TABLA ALUMNOS
===================================================== -->

<table class="students-table">


    <thead>

        <tr>


            <!-- # -->

            <th
                class="center"
                style="width: 5%;"
            >

                #

            </th>



            <!-- ALUMNO -->

            <th
                style="width: 23%;"
            >

                Alumno

            </th>



            <!-- CORREO -->

            <th
                style="width: 23%;"
            >

                Correo electrónico

            </th>



            <!-- VISITAS -->

            <th
                class="center"
                style="width: 10%;"
            >

                Visitas

            </th>



            <!-- ÚLTIMA ACTIVIDAD -->

            <th
                style="width: 24%;"
            >

                Última actividad

            </th>



            <!-- ESTADO -->

            <th
                class="center"
                style="width: 15%;"
            >

                Estado

            </th>


        </tr>

    </thead>



    <tbody>


        @forelse(

            $alumnos
            ?? []

            as $index => $alumno

        )


            <tr>


                <!-- NÚMERO -->

                <td
                    class="student-number"
                >

                    {{
                        $index + 1
                    }}

                </td>



                <!-- ALUMNO -->

                <td>


                    <div
                        class="student-name"
                    >

                        {{
                            $alumno['nombre']
                            ?? 'Sin nombre'
                        }}

                    </div>


                    <div
                        class="student-role"
                    >

                        Alumno

                    </div>


                </td>



                <!-- CORREO -->

                <td
                    class="muted"
                >

                    {{
                        $alumno['correo']
                        ?? 'Sin correo'
                    }}

                </td>



                <!-- VISITAS -->

                <td
                    class="center"
                >


                    <span
                        class="visit-number"
                    >

                        {{
                            $alumno['total_visitas']
                            ?? 0
                        }}

                    </span>


                </td>



                <!-- ÚLTIMA ACTIVIDAD -->

                <td>


                    @if(

                        !empty(
                            $alumno['ultima_visita']
                        )

                    )


                        {{
                            $formatearFecha(
                                $alumno['ultima_visita']
                            )
                        }}


                    @else


                        <span
                            class="muted"
                        >

                            Sin actividad

                        </span>


                    @endif


                </td>



                <!-- ESTADO -->

                <td
                    class="center"
                >


                    @php


                        $estaActivo =

                            !empty(
                                $alumno['activo']
                            )

                            ||

                            (
                                (
                                    $alumno['total_visitas']
                                    ?? 0
                                )
                                > 0
                            );


                    @endphp



                    @if(
                        $estaActivo
                    )


                        <span
                            class="badge-active"
                        >

                            Activo

                        </span>


                    @else


                        <span
                            class="badge-inactive"
                        >

                            Sin actividad

                        </span>


                    @endif


                </td>


            </tr>


        @empty


            <tr>


                <td
                    colspan="6"
                    class="empty"
                >

                    No hay alumnos registrados
                    en este grupo.

                </td>


            </tr>


        @endforelse


    </tbody>


</table>



<!-- =====================================================
     FOOTER
===================================================== -->

<div class="footer">


    <div class="footer-left">


        <strong>

            ITS

        </strong>

        · Instituto Tecnológico Superior


    </div>



    <div class="footer-right">


        Reporte académico generado automáticamente

        ·

        {{
            now()
            ->timezone(
                'America/Chihuahua'
            )
            ->format(
                'd/m/Y H:i'
            )
        }}


    </div>


</div>



</body>

</html>
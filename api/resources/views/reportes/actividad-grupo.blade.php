<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte académico - ITSNCG</title>

    <style>
        @page {
            size: A4;
            margin: 15mm 15mm 16mm 15mm;
        }

        * { box-sizing: border-box; }

        html, body { margin: 0; padding: 0; }

        body {
            font-family: DejaVu Sans, sans-serif;
            color: #202124;
            background: #fff;
            font-size: 8.5px;
            line-height: 1.35;
        }

        table { width: 100%; border-collapse: collapse; }
        td, th { vertical-align: top; }
        .muted { color: #8b8e96; }
        .purple { color: #6d35d4; }

        /* =============================
           ENCABEZADO
        ============================= */
        .header {
            border-bottom: 3px solid #6d35d4;
            padding-bottom: 9px;
        }

        .header-brand {
            width: 66px;
            vertical-align: middle;
        }

        .brand-box {
            display: inline-block;
            background: #17131f;
            color: #fff;
            padding: 8px 9px;
            font-size: 8px;
            font-weight: bold;
            letter-spacing: 1px;
        }

        .header-main {
            vertical-align: middle;
            padding-left: 3px;
        }

        .eyebrow {
            color: #6d35d4;
            font-size: 6.7px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1.2px;
        }

        .title {
            color: #17181b;
            font-size: 19px;
            font-weight: bold;
            line-height: 1.1;
            margin-top: 2px;
        }

        .subtitle {
            color: #777b84;
            font-size: 7.4px;
            margin-top: 3px;
        }

        .header-meta {
            width: 126px;
            text-align: right;
            vertical-align: middle;
        }

        .meta-label {
            color: #999ca3;
            font-size: 6px;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .meta-value {
            color: #25262a;
            font-size: 7.6px;
            font-weight: bold;
            margin-top: 2px;
        }

        .meta-gap { height: 5px; }

        /* =============================
           IDENTIDAD
        ============================= */
        .identity { margin-top: 12px; }

        .identity-main {
            width: 66%;
            padding-right: 15px;
        }

        .identity-side {
            width: 34%;
            border-left: 1px solid #dedfe4;
            padding-left: 13px;
        }

        .group-name {
            color: #17181b;
            font-size: 17px;
            font-weight: bold;
        }

        .subject {
            color: #6d35d4;
            font-size: 8.5px;
            font-weight: bold;
            margin-top: 2px;
        }

        .description {
            color: #777b84;
            font-size: 7px;
            margin-top: 5px;
        }

        .context-row + .context-row {
            border-top: 1px solid #eeeeef;
            margin-top: 5px;
            padding-top: 5px;
        }

        .context-label {
            color: #999ca3;
            font-size: 5.8px;
            text-transform: uppercase;
            letter-spacing: .65px;
        }

        .context-value {
            color: #303136;
            font-size: 7.6px;
            font-weight: bold;
            margin-top: 2px;
        }

        /* =============================
           SECCIONES
        ============================= */
        .section { margin-top: 13px; }

        .section-head {
            border-bottom: 1px solid #e2e3e7;
            padding-bottom: 5px;
            margin-bottom: 7px;
        }

        .section-number {
            width: 25px;
            color: #6d35d4;
            font-size: 7px;
            font-weight: bold;
        }

        .section-name {
            color: #202124;
            font-size: 11.5px;
            font-weight: bold;
        }

        .section-caption {
            text-align: right;
            color: #9699a1;
            font-size: 6.3px;
        }

        /* =============================
           MÉTRICAS
        ============================= */
        .metric-cell {
            width: 25%;
            padding-right: 6px;
        }

        .metric-cell:last-child { padding-right: 0; }

        .metric {
            min-height: 64px;
            background: #fafafb;
            border: 1px solid #e0e1e5;
            border-top: 2px solid #6d35d4;
            padding: 8px 9px;
        }

        .metric-label {
            color: #8e9199;
            font-size: 5.9px;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .metric-value {
            color: #17181b;
            font-size: 19px;
            font-weight: bold;
            line-height: 1;
            margin-top: 4px;
        }

        .metric-note {
            color: #858992;
            font-size: 6.2px;
            margin-top: 4px;
        }

        /* =============================
           ACTIVIDAD
        ============================= */
        .activity-main {
            width: 67%;
            padding-right: 7px;
        }

        .activity-side {
            width: 33%;
            padding-left: 7px;
        }

        .panel {
            border: 1px solid #dedfe4;
            background: #fff;
        }

        .panel-head {
            padding: 7px 9px;
            border-bottom: 1px solid #e8e8ea;
        }

        .panel-kicker {
            color: #6d35d4;
            font-size: 5.8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: .8px;
        }

        .panel-title {
            color: #25262a;
            font-size: 8px;
            font-weight: bold;
            margin-top: 2px;
        }

        .panel-body { padding: 7px 9px; }

        .activity-row td { padding: 3.5px 0; }

        .activity-date {
            width: 65px;
            color: #686b73;
            font-size: 6.5px;
        }

        .bar-cell {
            padding-left: 6px !important;
            padding-right: 6px !important;
        }

        .bar-bg {
            height: 6px;
            background: #eeeef1;
        }

        .bar-fill {
            height: 6px;
            background: #6d35d4;
        }

        .activity-number {
            width: 22px;
            text-align: right;
            color: #6d35d4;
            font-size: 7px;
            font-weight: bold;
        }

        .activity-empty {
            text-align: center;
            padding: 10px 5px 9px;
        }

        .empty-number {
            color: #d2c8e9;
            font-size: 17px;
            font-weight: bold;
            line-height: 1;
        }

        .empty-title {
            color: #52555c;
            font-size: 7px;
            font-weight: bold;
            margin-top: 3px;
        }

        .empty-text {
            color: #999ca3;
            font-size: 6.2px;
            margin-top: 2px;
        }

        /* PARTICIPACIÓN */
        .participation-value {
            color: #6d35d4;
            font-size: 28px;
            font-weight: bold;
            line-height: 1;
        }

        .participation-title {
            color: #303136;
            font-size: 7.5px;
            font-weight: bold;
            margin-top: 4px;
        }

        .participation-text {
            color: #777b84;
            font-size: 6.5px;
            margin-top: 3px;
        }

        .track {
            height: 7px;
            background: #ece8f8;
            margin-top: 9px;
        }

        .fill {
            height: 7px;
            background: #6d35d4;
        }

        .participation-foot {
            border-top: 1px solid #eeeeef;
            margin-top: 7px;
            padding-top: 6px;
            color: #777b84;
            font-size: 6px;
        }

        /* =============================
           LECTURA
        ============================= */
        .reading {
            margin-top: 7px;
            background: #f7f5fb;
            border-left: 3px solid #6d35d4;
            padding: 7px 9px;
        }

        .reading-label {
            color: #6d35d4;
            font-size: 5.8px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: .7px;
        }

        .reading-title {
            color: #303136;
            font-size: 7.5px;
            font-weight: bold;
            margin-top: 2px;
        }

        .reading-text {
            color: #656970;
            font-size: 6.5px;
            margin-top: 2px;
        }

        /* =============================
           RANKING
        ============================= */
        .ranking-table th {
            background: #17131f;
            color: #fff;
            padding: 6px 7px;
            text-align: left;
            font-size: 5.8px;
            text-transform: uppercase;
            letter-spacing: .45px;
        }

        .ranking-table td {
            border-bottom: 1px solid #e3e3e6;
            padding: 6px 7px;
            font-size: 6.8px;
        }

        .ranking-position {
            width: 42px;
            color: #6d35d4;
            font-weight: bold;
        }

        .ranking-name {
            color: #303136;
            font-weight: bold;
        }

        .ranking-visits {
            width: 70px;
            color: #6d35d4;
            font-weight: bold;
            text-align: right;
        }

        /* =============================
           DETALLE
        ============================= */
        .detail-summary td {
            width: 33.33%;
            border: 1px solid #dedfe4;
            padding: 6px 8px;
        }

        .detail-summary td + td { border-left: 0; }

        .detail-summary-label {
            color: #92959d;
            font-size: 5.8px;
            text-transform: uppercase;
            letter-spacing: .4px;
        }

        .detail-summary-value {
            color: #25262a;
            font-size: 9px;
            font-weight: bold;
            margin-top: 2px;
        }

        .students {
            margin-top: 7px;
            table-layout: fixed;
        }

        .students thead { display: table-header-group; }
        .students tr { page-break-inside: avoid; }

        .students th {
            background: #17131f;
            color: #fff;
            padding: 6px 5px;
            text-align: left;
            font-size: 5.5px;
            text-transform: uppercase;
            letter-spacing: .35px;
        }

        .students td {
            border-bottom: 1px solid #e2e3e6;
            padding: 6px 5px;
            color: #4d5057;
            font-size: 6.2px;
            vertical-align: middle;
            word-wrap: break-word;
        }

        .students tbody tr:nth-child(even) { background: #fafafb; }

        .col-num { width: 5%; text-align: center; }
        .col-student { width: 24%; }
        .col-mail { width: 24%; }
        .col-visits { width: 9%; text-align: center; }
        .col-last { width: 23%; }
        .col-status { width: 15%; text-align: center; }

        .student-name {
            color: #202124;
            font-weight: bold;
            font-size: 6.6px;
        }

        .student-role {
            color: #9699a1;
            font-size: 5.5px;
            margin-top: 1px;
        }

        .visit-value {
            color: #6d35d4;
            font-weight: bold;
            font-size: 8px;
        }

        .status {
            display: inline-block;
            padding: 2px 4px;
            font-size: 5.2px;
            font-weight: bold;
            border: 1px solid #dedfe4;
        }

        .status-active {
            background: #f0f8f3;
            color: #287247;
            border-color: #cfe6d7;
        }

        .status-none {
            background: #f5f5f6;
            color: #777b84;
        }

        .no-students {
            text-align: center;
            padding: 12px;
            color: #8c8f97;
        }

        /* =============================
           PIE
        ============================= */
        .footer {
            margin-top: 11px;
            padding-top: 5px;
            border-top: 1px solid #dedfe4;
            color: #9b9ea5;
            font-size: 5.5px;
        }

        .footer-left { float: left; }
        .footer-right { float: right; }
        .footer strong { color: #6d35d4; }
    </style>
</head>

<body>

@php
    $actividad = $actividadPorDia ?? [];
    $listaAlumnos = collect($alumnos ?? []);

    $totalAlumnosFinal = $totalAlumnos ?? $listaAlumnos->count();

    $alumnosActivosFinal = $alumnosActivos ?? $listaAlumnos
        ->filter(function ($alumno) {
            return (int) ($alumno['total_visitas'] ?? 0) > 0;
        })
        ->count();

    $totalVisitasFinal = $totalVisitas ?? $listaAlumnos->sum(function ($alumno) {
        return (int) ($alumno['total_visitas'] ?? 0);
    });

    $promedioFinal = $totalAlumnosFinal > 0
        ? round($totalVisitasFinal / $totalAlumnosFinal, 1)
        : 0;

    $porcentajeActivos = $totalAlumnosFinal > 0
        ? round(($alumnosActivosFinal / $totalAlumnosFinal) * 100)
        : 0;

    if ($porcentajeActivos >= 80) {
        $nivelParticipacion = 'Alta participación';
        $mensajeParticipacion = 'La mayoría del grupo presenta actividad.';
    } elseif ($porcentajeActivos >= 60) {
        $nivelParticipacion = 'Buena participación';
        $mensajeParticipacion = 'Una parte importante del grupo presenta actividad.';
    } elseif ($porcentajeActivos >= 30) {
        $nivelParticipacion = 'Participación moderada';
        $mensajeParticipacion = 'Existe actividad, aunque puede reforzarse.';
    } else {
        $nivelParticipacion = 'Sin actividad suficiente';
        $mensajeParticipacion = 'La actividad registrada es limitada.';
    }

    $maxVisitasDia = 0;
    foreach ($actividad as $item) {
        $visitasItem = (int) ($item['visitas'] ?? 0);
        if ($visitasItem > $maxVisitasDia) {
            $maxVisitasDia = $visitasItem;
        }
    }

    $ranking = $listaAlumnos
        ->sortByDesc(function ($alumno) {
            return (int) ($alumno['total_visitas'] ?? 0);
        })
        ->take(3)
        ->values();

    $formatearFecha = function ($fecha) {
        if (empty($fecha)) return null;

        try {
            $carbon = \Carbon\Carbon::parse($fecha)->timezone('America/Chihuahua');

            $meses = [
                1 => 'ene', 2 => 'feb', 3 => 'mar', 4 => 'abr',
                5 => 'may', 6 => 'jun', 7 => 'jul', 8 => 'ago',
                9 => 'sep', 10 => 'oct', 11 => 'nov', 12 => 'dic',
            ];

            $hora = $carbon->format('g:i');
            $periodoHora = $carbon->hour >= 12 ? 'p.m.' : 'a.m.';

            return $carbon->day . ' ' . $meses[$carbon->month] . ' ' . $carbon->year
                . ' · ' . $hora . ' ' . $periodoHora;
        } catch (\Exception $e) {
            return $fecha;
        }
    };
@endphp

<!-- ENCABEZADO -->
<table class="header">
    <tr>
        <td class="header-brand">
            <span class="brand-box">ITS</span>
        </td>

        <td class="header-main">
            <div class="eyebrow">ITSNCG · Reporte académico</div>
            <div class="title">Actividad del grupo</div>
            <div class="subtitle">Resumen de participación y accesos registrados en la plataforma.</div>
        </td>

        <td class="header-meta">
            <div class="meta-label">Generado</div>
            <div class="meta-value">{{ now()->timezone('America/Chihuahua')->format('d/m/Y') }}</div>
            <div class="meta-gap"></div>
            <div class="meta-label">Periodo</div>
            <div class="meta-value">{{ $periodo ?? 'No especificado' }}</div>
        </td>
    </tr>
</table>

<!-- IDENTIDAD -->
<table class="identity">
    <tr>
        <td class="identity-main">
            <div class="group-name">{{ $grupo->nombre ?? 'Sin grupo' }}</div>
            <div class="subject">{{ $grupo->materia->nombre ?? 'Sin materia' }}</div>
            <div class="description">
                Este reporte concentra la actividad registrada por los integrantes del grupo durante el periodo seleccionado.
            </div>
        </td>

        <td class="identity-side">
            <div class="context-row">
                <div class="context-label">Docente</div>
                <div class="context-value">
                    {{ trim(($docente->nombre ?? '') . ' ' . ($docente->apellido_paterno ?? '') . ' ' . ($docente->apellido_materno ?? '')) }}
                </div>
            </div>
            <div class="context-row">
                <div class="context-label">Periodo de consulta</div>
                <div class="context-value">{{ $periodo ?? 'No especificado' }}</div>
            </div>
        </td>
    </tr>
</table>

<!-- 01 RESUMEN -->
<div class="section">
    <table class="section-head">
        <tr>
            <td class="section-number">01</td>
            <td class="section-name">Resumen del grupo</td>
            <td class="section-caption">Indicadores principales</td>
        </tr>
    </table>

    <table>
        <tr>
            <td class="metric-cell">
                <div class="metric">
                    <div class="metric-label">Alumnos</div>
                    <div class="metric-value">{{ $totalAlumnosFinal }}</div>
                    <div class="metric-note">Integrantes registrados</div>
                </div>
            </td>
            <td class="metric-cell">
                <div class="metric">
                    <div class="metric-label">Con actividad</div>
                    <div class="metric-value">{{ $alumnosActivosFinal }}</div>
                    <div class="metric-note">{{ $porcentajeActivos }}% del grupo</div>
                </div>
            </td>
            <td class="metric-cell">
                <div class="metric">
                    <div class="metric-label">Visitas</div>
                    <div class="metric-value">{{ $totalVisitasFinal }}</div>
                    <div class="metric-note">Accesos registrados</div>
                </div>
            </td>
            <td class="metric-cell">
                <div class="metric">
                    <div class="metric-label">Promedio</div>
                    <div class="metric-value">{{ $promedioFinal }}</div>
                    <div class="metric-note">Visitas por alumno</div>
                </div>
            </td>
        </tr>
    </table>
</div>

<!-- 02 ACTIVIDAD -->
<div class="section">
    <table class="section-head">
        <tr>
            <td class="section-number">02</td>
            <td class="section-name">Actividad registrada</td>
            <td class="section-caption">Comportamiento durante el periodo</td>
        </tr>
    </table>

    <table>
        <tr>
            <td class="activity-main">
                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-kicker">Visitas</div>
                        <div class="panel-title">Distribución por día</div>
                    </div>

                    <div class="panel-body">
                        @if(count($actividad) > 0)
                            <table>
                                @foreach($actividad as $item)
                                    @php
                                        $visitasActuales = (int) ($item['visitas'] ?? 0);
                                        $porcentajeBarra = $maxVisitasDia > 0
                                            ? round(($visitasActuales / $maxVisitasDia) * 100)
                                            : 0;
                                    @endphp
                                    <tr class="activity-row">
                                        <td class="activity-date">{{ $item['fecha'] ?? 'Sin fecha' }}</td>
                                        <td class="bar-cell">
                                            <div class="bar-bg">
                                                <div class="bar-fill" style="width: {{ $porcentajeBarra }}%;"></div>
                                            </div>
                                        </td>
                                        <td class="activity-number">{{ $visitasActuales }}</td>
                                    </tr>
                                @endforeach
                            </table>
                        @else
                            <div class="activity-empty">
                                <div class="empty-number">0</div>
                                <div class="empty-title">Sin visitas registradas</div>
                                <div class="empty-text">No se encontraron accesos durante el periodo consultado.</div>
                            </div>
                        @endif
                    </div>
                </div>
            </td>

            <td class="activity-side">
                <div class="panel">
                    <div class="panel-head">
                        <div class="panel-kicker">Participación</div>
                        <div class="panel-title">Alumnos con actividad</div>
                    </div>

                    <div class="panel-body">
                        <div class="participation-value">{{ $porcentajeActivos }}%</div>
                        <div class="participation-title">{{ $nivelParticipacion }}</div>
                        <div class="participation-text">{{ $mensajeParticipacion }}</div>

                        <div class="track">
                            <div class="fill" style="width: {{ min(100, max(0, $porcentajeActivos)) }}%;"></div>
                        </div>

                        <div class="participation-foot">
                            {{ $alumnosActivosFinal }} de {{ $totalAlumnosFinal }} alumnos con actividad registrada.
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>

    <div class="reading">
        <div class="reading-label">Lectura del periodo</div>
        @if($totalVisitasFinal > 0 && $alumnosActivosFinal > 0)
            <div class="reading-title">Actividad registrada durante el periodo.</div>
        @else
            <div class="reading-title">Sin actividad registrada durante el periodo.</div>
        @endif
        <div class="reading-text">
            Se registraron <strong>{{ $totalVisitasFinal }}</strong> visitas y
            <strong>{{ $alumnosActivosFinal }}</strong> alumnos presentaron actividad.
            @if($maxVisitasDia > 0)
                El máximo registrado en un día fue de <strong>{{ $maxVisitasDia }}</strong> visitas.
            @endif
        </div>
    </div>
</div>

<!-- 03 MAYOR ACTIVIDAD -->
<div class="section">
    <table class="section-head">
        <tr>
            <td class="section-number">03</td>
            <td class="section-name">Mayor actividad</td>
            <td class="section-caption">Alumnos con más visitas registradas</td>
        </tr>
    </table>

    <table class="ranking-table">
        <thead>
            <tr>
                <th style="width:10%;">Pos.</th>
                <th>Alumno</th>
                <th style="width:22%; text-align:right;">Visitas</th>
            </tr>
        </thead>
        <tbody>
            @forelse($ranking as $i => $alumno)
                <tr>
                    <td class="ranking-position">{{ $i + 1 }}</td>
                    <td class="ranking-name">{{ $alumno['nombre'] ?? 'Sin nombre' }}</td>
                    <td class="ranking-visits">{{ (int) ($alumno['total_visitas'] ?? 0) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="3" class="muted" style="text-align:center;">No hay alumnos registrados.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<!-- 04 DETALLE -->
<div class="section">
    <table class="section-head">
        <tr>
            <td class="section-number">04</td>
            <td class="section-name">Seguimiento individual</td>
            <td class="section-caption">Detalle de actividad por alumno</td>
        </tr>
    </table>

    <table class="detail-summary">
        <tr>
            <td>
                <div class="detail-summary-label">Alumnos registrados</div>
                <div class="detail-summary-value">{{ $totalAlumnosFinal }}</div>
            </td>
            <td>
                <div class="detail-summary-label">Con actividad</div>
                <div class="detail-summary-value">{{ $alumnosActivosFinal }} · {{ $porcentajeActivos }}%</div>
            </td>
            <td>
                <div class="detail-summary-label">Total de visitas</div>
                <div class="detail-summary-value">{{ $totalVisitasFinal }}</div>
            </td>
        </tr>
    </table>

    <table class="students">
        <thead>
            <tr>
                <th class="col-num">#</th>
                <th class="col-student">Alumno</th>
                <th class="col-mail">Correo electrónico</th>
                <th class="col-visits">Visitas</th>
                <th class="col-last">Última actividad</th>
                <th class="col-status">Estado</th>
            </tr>
        </thead>

        <tbody>
            @forelse($alumnos ?? [] as $index => $alumno)
                @php
                    $visitasAlumno = (int) ($alumno['total_visitas'] ?? 0);
                    $estaActivo = !empty($alumno['activo']) || $visitasAlumno > 0;
                @endphp

                <tr>
                    <td class="col-num purple">{{ $index + 1 }}</td>
                    <td class="col-student">
                        <div class="student-name">{{ $alumno['nombre'] ?? 'Sin nombre' }}</div>
                        <div class="student-role">Alumno</div>
                    </td>
                    <td class="col-mail">{{ $alumno['correo'] ?? 'Sin correo' }}</td>
                    <td class="col-visits"><span class="visit-value">{{ $visitasAlumno }}</span></td>
                    <td class="col-last">
                        @if(!empty($alumno['ultima_visita']))
                            {{ $formatearFecha($alumno['ultima_visita']) }}
                        @else
                            <span class="muted">Sin actividad</span>
                        @endif
                    </td>
                    <td class="col-status">
                        @if($estaActivo)
                            <span class="status status-active">ACTIVO</span>
                        @else
                            <span class="status status-none">SIN ACTIVIDAD</span>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="no-students">No hay alumnos registrados en este grupo.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</div>

<div class="footer">
    <div class="footer-left">· ITSNCG</div>
    <div class="footer-right">
        Reporte académico · {{ now()->timezone('America/Chihuahua')->format('d/m/Y H:i') }}
    </div>
</div>

</body>
</html>

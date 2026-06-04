<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgresoAlumno extends Model
{
    protected $table = 'progreso_alumno';

    protected $fillable = [
        'user_id',
        'tema_id',
        'completado',
        'fecha_completado'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function tema()
    {
        return $this->belongsTo(Tema::class);
    }
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ejercicio extends Model
{
    protected $fillable = [
        'tema_id',
        'pregunta',
        'opcion_a',
        'opcion_b',
        'opcion_c',
        'opcion_d',
        'respuesta_correcta',
        'explicacion'
    ];

    public function tema()
    {
        return $this->belongsTo(Tema::class);
    }
}
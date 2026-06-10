<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estadistica extends Model
{
    protected $fillable = [
        'user_id',
        'materia_id',
        'grupo_id',
        'fecha_ingreso'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class);
    }
}
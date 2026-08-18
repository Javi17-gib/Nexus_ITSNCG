<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Materia extends Model
{
    protected $fillable = [
        'docente_id',
        'nombre',
        'descripcion',
        'color',
        'icono',
        'portada',
        'activa'
    ];

    public function docente()
    {
        return $this->belongsTo(User::class, 'docente_id');
    }

    public function grupos()
    {
        return $this->hasMany(Grupo::class);
    }

    public function unidades()
    {
        return $this->hasMany(Unidad::class);
    }

    public function estadisticas()
    {
        return $this->hasMany(Estadistica::class);
    }
}
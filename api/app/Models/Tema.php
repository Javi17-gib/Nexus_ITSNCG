<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tema extends Model
{
    protected $fillable = [
        'unidad_id',
        'nombre',
        'descripcion',
        'orden'
    ];

    public function unidad()
    {
        return $this->belongsTo(Unidad::class);
    }

    public function contenidos()
    {
        return $this->hasMany(Contenido::class);
    }

    public function ejercicios()
    {
        return $this->hasMany(Ejercicio::class);
    }

    public function comentarios()
    {
        return $this->hasMany(Comentario::class);
    }

    public function progreso()
    {
        return $this->hasMany(ProgresoAlumno::class);
    }

    public function retos()
    {
        return $this->hasMany(Reto::class);
    }
}
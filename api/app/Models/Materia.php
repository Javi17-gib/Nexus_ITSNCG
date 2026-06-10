<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Materia extends Model
{
    protected $fillable = [
        'nombre',
        'descripcion',
        'color',
        'icono',
        'portada',
        'activa'
    ];

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
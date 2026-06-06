<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $fillable = [
    'contenido_id',
    'nombre',
    'ruta',
    'tipo',
    'tamano'
];

    public function contenido()
    {
        return $this->belongsTo(Contenido::class);
    }
}
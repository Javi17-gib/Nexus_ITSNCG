<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contenido extends Model
{
   protected $fillable = [
    'tema_id',
    'titulo',
    'contenido',
    'tipo'
];

    public function tema()
    {
        return $this->belongsTo(Tema::class);
    }

    public function archivos()
    {
        return $this->hasMany(Archivo::class);
    }
}
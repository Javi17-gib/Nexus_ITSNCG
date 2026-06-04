<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unidad extends Model
{
    protected $table = 'unidades';

    protected $fillable = [
        'materia_id',
        'nombre',
        'descripcion',
        'orden'
    ];

    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    public function temas()
    {
        return $this->hasMany(Tema::class);
    }
}
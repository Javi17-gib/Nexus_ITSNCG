<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reto extends Model
{
    use HasFactory;

    protected $fillable = [
        'tema_id',
        'titulo',
        'descripcion',
        'tipo',
        'archivo_reto',
        'archivo_solucion',
        'mostrar_solucion',
        'activo'
    ];

    // 🔗 Relación: un reto pertenece a un tema
    public function tema()
    {
        return $this->belongsTo(Tema::class);
    }
}
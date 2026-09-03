<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reto extends Model
{
    use HasFactory;


    /*
    |--------------------------------------------------------------------------
    | CAMPOS ASIGNABLES
    |--------------------------------------------------------------------------
    */

    protected $fillable = [

        'tema_id',

        'titulo',

        'descripcion',

        'imagen_reto',

        'solucion',

        'imagen_solucion',

        'mostrar_solucion',

        'activo',

    ];


    /*
    |--------------------------------------------------------------------------
    | CONVERSIONES
    |--------------------------------------------------------------------------
    */

    protected $casts = [

        'mostrar_solucion' => 'boolean',

        'activo' => 'boolean',

    ];


    /*
    |--------------------------------------------------------------------------
    | RELACIÓN CON TEMA
    |--------------------------------------------------------------------------
    */

    public function tema()
    {
        return $this->belongsTo(
            Tema::class
        );
    }
}
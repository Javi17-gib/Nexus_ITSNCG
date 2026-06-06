<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $fillable = [
        'materia_id',
        'docente_id',
        'nombre',
        'codigo_acceso',
        'semestre',
        'periodo',
        'activo'
    ];

    public function materia()
    {
        return $this->belongsTo(Materia::class);
    }

    public function docente()
    {
        return $this->belongsTo(
            User::class,
            'docente_id'
        );
    }

    public function alumnos()
    {
        return $this->belongsToMany(
            User::class,
            'grupo_user'
        )->withPivot('estado')
         ->withTimestamps();
    }

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'grupo_user')
            ->withPivot('estado')
            ->withTimestamps();
    }
}
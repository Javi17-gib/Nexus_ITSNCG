<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

use App\Models\Grupo;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'correo',
        'password',
        'rol',
        'foto_perfil'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    /**
     * Grupos donde está inscrito el alumno.
     */
    public function grupos()
    {
        return $this->belongsToMany(
            Grupo::class,
            'grupo_user'
        )->withPivot('estado')
         ->withTimestamps();
    }

    /**
     * Grupos que administra como docente.
     */
    public function gruposDocente()
    {
        return $this->hasMany(
            Grupo::class,
            'docente_id'
        );
    }

    /**
     * Estadísticas del usuario.
     */
    public function estadisticas()
    {
        return $this->hasMany(
            Estadistica::class
        );
    }
}
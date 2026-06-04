<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    protected $fillable = [
        'tema_id',
        'user_id',
        'comentario',
        'resuelto'
    ];

    public function tema()
    {
        return $this->belongsTo(Tema::class);
    }

    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
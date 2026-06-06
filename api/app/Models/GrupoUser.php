<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Grupo;

class GrupoUser extends Model
{
    use HasFactory;

    protected $table = 'grupo_user';

    protected $fillable = [
        'grupo_id',
        'user_id',
        'estado'
    ];
    public function user()
{
    return $this->belongsTo(User::class);
}

public function grupo()
{
    return $this->belongsTo(Grupo::class);
}


}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

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
}
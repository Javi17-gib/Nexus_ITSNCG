<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:255',
            'apellido_paterno' => 'required|string|max:255',
            'apellido_materno' => 'required|string|max:255',

            'correo' => 'required|email|unique:users,correo',

            'password' => 'required|min:8|confirmed',

            'rol' => 'required|in:alumno,docente',

            'pin' => 'nullable|string'
        ];
    }
}
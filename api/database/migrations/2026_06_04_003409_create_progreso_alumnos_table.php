<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('progreso_alumno', function (Blueprint $table) {

    $table->id();

    $table->foreignId('user_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('tema_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->boolean('completado')
        ->default(false);

    $table->timestamp('fecha_completado')
        ->nullable();

    $table->timestamps();

    $table->unique([
        'user_id',
        'tema_id'
    ]);
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('progreso_alumnos');
    }
};

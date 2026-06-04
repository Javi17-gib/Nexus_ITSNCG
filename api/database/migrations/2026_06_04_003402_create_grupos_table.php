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
        Schema::create('grupos', function (Blueprint $table) {

    $table->id();

    $table->foreignId('materia_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->foreignId('docente_id')
        ->constrained('users')
        ->cascadeOnDelete();

    $table->string('nombre');

    $table->string('codigo_acceso')
        ->unique();

    $table->string('semestre');

    $table->string('periodo');

    $table->boolean('activo')
        ->default(true);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupos');
    }
};

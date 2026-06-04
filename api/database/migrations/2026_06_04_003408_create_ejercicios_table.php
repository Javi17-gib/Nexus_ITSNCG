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
       Schema::create('ejercicios', function (Blueprint $table) {

    $table->id();

    $table->foreignId('tema_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->text('pregunta');

    $table->text('opcion_a')->nullable();
    $table->text('opcion_b')->nullable();
    $table->text('opcion_c')->nullable();
    $table->text('opcion_d')->nullable();

    $table->string('respuesta_correcta')
        ->nullable();

    $table->longText('explicacion')
        ->nullable();

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ejercicios');
    }
};

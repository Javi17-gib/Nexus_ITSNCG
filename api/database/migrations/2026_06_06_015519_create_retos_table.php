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
        Schema::create('retos', function (Blueprint $table) {

            $table->id();

            $table->foreignId('tema_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('titulo');

            $table->text('descripcion')
                ->nullable();

            $table->enum('tipo', [
                'archivo',
                'interactivo'
            ])->default('archivo');

            $table->string('archivo_reto')
                ->nullable();

            $table->string('archivo_solucion')
                ->nullable();

            $table->boolean('mostrar_solucion')
                ->default(false);

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
        Schema::dropIfExists('retos');
    }
};
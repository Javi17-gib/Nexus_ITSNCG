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
       Schema::create('archivos', function (Blueprint $table) {

    $table->id();

    $table->foreignId('contenido_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('nombre');

    $table->string('ruta');

    $table->enum('tipo', [
        'pdf',
        'imagen',
        'video',
        'audio'
    ]);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivos');
    }
};

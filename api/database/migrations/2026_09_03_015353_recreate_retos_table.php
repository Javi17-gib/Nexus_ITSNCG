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
        /*
        |--------------------------------------------------------------------------
        | ELIMINAR TABLA ANTERIOR
        |--------------------------------------------------------------------------
        |
        | La tabla actual está vacía, por lo que podemos reconstruirla
        | completamente con la nueva estructura de Retos.
        |
        */

        Schema::dropIfExists('retos');


        /*
        |--------------------------------------------------------------------------
        | CREAR NUEVA TABLA
        |--------------------------------------------------------------------------
        */

        Schema::create('retos', function (Blueprint $table) {

            $table->id();


            /*
            |--------------------------------------------------------------------------
            | TEMA
            |--------------------------------------------------------------------------
            */

            $table->foreignId('tema_id')
                ->constrained('temas')
                ->cascadeOnDelete();


            /*
            |--------------------------------------------------------------------------
            | INFORMACIÓN DEL RETO
            |--------------------------------------------------------------------------
            */

            $table->string('titulo');

            $table->longText('descripcion')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | IMAGEN DEL RETO
            |--------------------------------------------------------------------------
            |
            | Guarda únicamente la ruta de la imagen.
            |
            */

            $table->string('imagen_reto')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | SOLUCIÓN
            |--------------------------------------------------------------------------
            |
            | Aquí guardaremos el contenido HTML generado por
            | el RichTextEditor.
            |
            */

            $table->longText('solucion')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | IMAGEN DE LA SOLUCIÓN
            |--------------------------------------------------------------------------
            */

            $table->string('imagen_solucion')
                ->nullable();


            /*
            |--------------------------------------------------------------------------
            | VISIBILIDAD DE LA SOLUCIÓN
            |--------------------------------------------------------------------------
            |
            | false = solución oculta
            | true  = solución visible
            |
            */

            $table->boolean('mostrar_solucion')
                ->default(false);


            /*
            |--------------------------------------------------------------------------
            | ESTADO DEL RETO
            |--------------------------------------------------------------------------
            */

            $table->boolean('activo')
                ->default(true);


            /*
            |--------------------------------------------------------------------------
            | FECHAS
            |--------------------------------------------------------------------------
            */

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
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
        |--------------------------------------------------------------------------
        | AGREGAR "archivo" AL TIPO
        |--------------------------------------------------------------------------
        */

        DB::statement("
            ALTER TABLE archivos
            MODIFY COLUMN tipo
            ENUM(
                'pdf',
                'imagen',
                'video',
                'audio',
                'archivo'
            )
            NOT NULL
        ");


        /*
        |--------------------------------------------------------------------------
        | AGREGAR TAMAÑO SI NO EXISTE
        |--------------------------------------------------------------------------
        */

        if (!Schema::hasColumn('archivos', 'tamano')) {

            Schema::table('archivos', function (Blueprint $table) {

                $table->unsignedBigInteger(
                    'tamano'
                )
                ->nullable()
                ->after('tipo');

            });

        }
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        /*
        |--------------------------------------------------------------------------
        | REGRESAR ENUM AL ESTADO ANTERIOR
        |--------------------------------------------------------------------------
        */

        DB::statement("
            ALTER TABLE archivos
            MODIFY COLUMN tipo
            ENUM(
                'pdf',
                'imagen',
                'video',
                'audio'
            )
            NOT NULL
        ");


        /*
        |--------------------------------------------------------------------------
        | ELIMINAR TAMAÑO
        |--------------------------------------------------------------------------
        */

        if (Schema::hasColumn('archivos', 'tamano')) {

            Schema::table('archivos', function (Blueprint $table) {

                $table->dropColumn(
                    'tamano'
                );

            });

        }
    }
};
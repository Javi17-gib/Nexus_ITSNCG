<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contenidos', function (Blueprint $table) {

            $table->enum('tipo', [
                'texto',
                'pdf',
                'imagen',
                'youtube',
                'video',
                'archivo'
            ])->default('texto');

        });
    }

    public function down(): void
    {
        Schema::table('contenidos', function (Blueprint $table) {

            $table->dropColumn('tipo');

        });
    }
};
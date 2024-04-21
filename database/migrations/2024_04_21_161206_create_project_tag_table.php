<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id');
            $table->foreignId('tag_id');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_tag');
    }
};

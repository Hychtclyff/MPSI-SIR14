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
        Schema::create('report_guests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->boolean('cek_out')->default(false);                // Untuk menyimpan nama
                         // Untuk menyimpan nama
            $table->string('response')->nullable();                // Untuk menyimpan nama
            $table->string('nama');                // Untuk menyimpan nama
            $table->string('asal');                // Untuk menyimpan asal
            $table->string('handphone');
            $table->boolean('status')->default(false);
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']); // Untuk jenis kelamin
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            // Untuk timestamps created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_guests');
    }
};

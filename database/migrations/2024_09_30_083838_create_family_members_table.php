<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('family_members', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');      // Relasi ke tabel users
            $table->string('nik', 16)->unique();           // NIK (Nomor Induk Kependudukan), panjang 16 karakter
            $table->string('nama');                        // Nama
            $table->string('tempat_lahir');                // Tempat Lahir
            $table->date('tanggal_lahir');                 // Tanggal Lahir dalam format YYYY-MM-DD
            $table->enum('jenis_kelamin', ['Laki-Laki', 'Perempuan']);     // Jenis Kelamin, L: Laki-laki, P: Perempuan
            $table->enum('status_perkawinan', ['Kawin', 'Belum Kawin', 'Cerai Hidup', 'Cerai Mati']); // Status Perkawinan
            $table->string('status_dalam_keluarga');       // Status Dalam Keluarga
            $table->string('kewarganegaraan');             // Kewarganegaraan
            $table->string('agama');                       // Agama
            $table->string('pekerjaan');                   // Pekerjaan
            $table->timestamps();

            // Tambahkan foreign key ke user_id
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('family_members');
    }
};

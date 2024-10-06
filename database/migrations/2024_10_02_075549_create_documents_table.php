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
        Schema::create('documents', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('link')->default(''); // Link untuk surat
            $table->string('no_surat')->unique(); // Nomor surat unik
            $table->boolean('status')->default(false); // Status surat
            $table->unsignedBigInteger('user_id'); // Foreign key untuk user

            $table->string('nama'); // Nama warga
            $table->string('tempat_lahir'); // Nama warga
            $table->date('tanggal_lahir'); // Tanggal lahir
            $table->enum('jenis_kelamin', ['Laki-Laki', 'Perempuan']); // Jenis kelamin (Laki-laki atau Perempuan)
            $table->enum('status_pernikahan', ['Belum Menikah', 'Menikah', 'Cerai']); // Status pernikahan
            $table->string('nik', 16)->unique(); // Nomor Induk Kependudukan, dengan panjang 16 karakter
            $table->string('kewarganegaraan')->default('Indonesia'); // Kewarganegaraan, default 'Indonesia'
            $table->string('agama'); // Agama
            $table->string('pekerjaan');
            // belum di migration `
            $table->text('response')->nullable();
            $table->boolean('edit')->default(false); // Status surat
            // Pekerjaan
            $table->text('alamat'); // Alamat
            $table->text('keperluan'); // Keperluan pembuatan surat
            $table->string('email'); // Email warga (opsional)
            $table->timestamps(); // Timestamps untuk created_at dan updated_at

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('documents');
    }
};

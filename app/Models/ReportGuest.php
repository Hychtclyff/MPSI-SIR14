<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportGuest extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama',
        'asal',
        'handphone',
        'jenis_kelamin',
        'user_id',
        'status',
        'response',
        'cek_out',
    ];
}

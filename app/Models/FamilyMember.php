<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FamilyMember extends Model
{
    use HasFactory;
    protected $fillable = [
        'nik',
        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'status_perkawinan',
        'status_dalam_keluarga',
        'kewarganegaraan',
        'agama',
        'pekerjaan',
        'user_id'

    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

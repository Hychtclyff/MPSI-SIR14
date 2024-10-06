<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    use HasFactory;
    protected $fillable = [
        'link',
        'no_surat',
        'status',
        'user_id',

        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'status_pernikahan',
        'nik',
        'kewarganegaraan',
        'agama',
        'pekerjaan',
        'alamat',
        'keperluan',
        'email',
        'edit',
        'response'
    ];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

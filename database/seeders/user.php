<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class user extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('fluctlight03'), // Hash untuk password
            'role' => 'admin',  // Role admin
            'email_verified_at' => now(),
            'remember_token' => str::random(10),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

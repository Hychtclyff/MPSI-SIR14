<?php

use App\Http\Controllers\Rt\AnnouncementController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\RoleMiddleware;
use App\Models\Announcement;
use App\Models\Criticism;
use App\Models\Documents;
use App\Models\FamilyMember;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route untuk halaman utama
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'saran' => Criticism::all(),
        'announcements' => Announcement::all(),
    ]);
})->name('welcome');

// Route untuk dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'user_id' => Auth::user()->id,
        'family_member' => Auth::user()->familyMembers,
        'reqDoc' => Auth::user()->reqDoc,
        'repGuest' => Auth::user()->repGuest,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Route untuk saran dan kritik
Route::get('/saran-kritik', function () {
    return Inertia::render('Service/Saran');
})->middleware(['auth', 'verified'])->name('saran-kritik');

// Route untuk laporan
Route::get('/lapor', function () {
    return Inertia::render('Service/Lapor');
})->middleware(['auth', 'verified'])->name('lapor');

// Route untuk surat pengantar
Route::get('/surat-pengantar', function () {
    return Inertia::render('Service/Surat-pengantar', [
        'documents' => Documents::all(),
    ]);
})->middleware(['auth', 'verified'])->name('surat-pengantar');

// Route untuk edit surat pengantar
Route::get('/surat-pengantar/edit/id={id}', function ($id) {
    return Inertia::render('Service/Surat-pengantar-edit', [
        'documents' => Documents::findOrFail($id),
    ]);
})->middleware(['auth', 'verified'])->name('surat-pengantar-edit');

// Route untuk edit profil anggota
Route::get('/dashboard/profile-edit/member-id={id}', function ($id) {
    return Inertia::render('Profile/ProfileEdit', [
        'data' => FamilyMember::find($id),
    ]);
})->middleware(['auth', 'verified'])->name('profile-edit');

// Route untuk detail profil anggota
Route::get('/dashboard/profile-detail/id={id}', function ($id) {
    return Inertia::render('Profile/ProfileDetail', [
        'data' => FamilyMember::find($id),
    ]);
})->middleware(['auth', 'verified'])->name('profile-detail');

// Route untuk anggota baru
Route::get('/dashboard/new-member', function () {
    return Inertia::render('Profile/NewMember');
})->middleware(['auth', 'verified'])->name('new-member');

// Route untuk ruang kerja
Route::get('/ruang-kerja', function () {
    return Inertia::render('Rt/Dashboard', [
        'user_id' => Auth::user()->id,
        'reqDoc' => DB::table('documents')
            ->join('users', 'users.id', '=', 'documents.user_id')
            ->where(function ($query) {
                $query->where('documents.link', '=', '')
                    ->orWhere('documents.status', false);
            })
            ->where('documents.user_id', Auth::id())
            ->select('documents.*', 'users.name as user_name')
            ->get()
            ->toArray(),
        'repGuest' => DB::table('report_guests')
            ->join('users', 'users.id', '=', 'report_guests.user_id')
            ->where('report_guests.status', '=', false)
            ->where('report_guests.user_id', Auth::id())
            ->select('report_guests.*', 'users.name as user_name')
            ->get()
            ->toArray(),
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':rt'])->name('workshop');

// Route untuk ruang kerja admin
Route::get('/ruang-kerja/admin', function () {
    return Inertia::render('Admin/Dashboard', [
        'user_id' => Auth::user()->id,
        'reqDoc' => DB::table('documents')
            ->join('users', 'users.id', '=', 'documents.user_id')
            ->where(function ($query) {
                $query->where('documents.link', '=', '')
                    ->orWhere('documents.status', false);
            })
            ->where('documents.user_id', Auth::id())
            ->select('documents.*', 'users.name as user_name')
            ->get()
            ->toArray(),
        'repGuest' => DB::table('report_guests')
            ->join('users', 'users.id', '=', 'report_guests.user_id')
            ->where('report_guests.status', '=', false)
            ->where('report_guests.user_id', Auth::id())
            ->select('report_guests.*', 'users.name as user_name')
            ->get()
            ->toArray(),
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->name('workshop-admin');

// Route untuk Data Saran Kritik
Route::get('/ruang-kerja/admin/saran-kritik/', function () {
    return Inertia::render('Admin/Criticism', [
        'Criticism' => Criticism::all(),
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->name('criticism.index');

Route::get('/ruang-kerja/admin/data-user/', function () {
    return Inertia::render('Admin/DataUser', [
        'user' => User::all(),
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':admin'])->name('DataUser.index');


// Route untuk detail surat
Route::get('/ruang-kerja/surat/id', function () {
    return Inertia::render('Service/Surat-pengantar');
})->middleware(['auth', 'verified'])->name('detail-surat');

// Route untuk pengumuman
Route::get('/ruang-kerja/pengumuman/', [AnnouncementController::class, 'index'])
    ->middleware(['auth', 'verified', RoleMiddleware::class . ':rt|admin'])
    ->name('announcement.index');

// Route untuk data warga
Route::get('/ruang-kerja/data-warga/', function () {
    return Inertia::render('Rt/DataWarga', [
        'civils' => FamilyMember::all(),
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':rt|admin'])->name('data.index');

// Route untuk profil pengguna
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});




// Require file autentikasi
require __DIR__ . '/auth.php';

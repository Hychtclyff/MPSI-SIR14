<?php

use App\Http\Controllers\ProfileController;
use App\Http\Middleware\RoleMiddleware;
use App\Models\Criticism;
use App\Models\Documents;
use App\Models\FamilyMember;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'saran' => Criticism::all()
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/dashboard', function () {

    return Inertia::render('Dashboard', [
        'user_id' => Auth::user()->id,
        'family_member' =>  Auth::user()->familyMembers,
        'reqDoc' => Auth::user()->reqDoc,
        'repGuest' => Auth::User()->repGuest,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');


Route::get('/saran-kritik', function () {
    return Inertia::render('Service/Saran');
})->middleware(['auth', 'verified'])->name('saran-kritik');

Route::get('/lapor', function () {
    return Inertia::render('Service/Lapor');
})->middleware(['auth', 'verified'])->name('lapor');

Route::get('/surat-pengantar', function () {
    return Inertia::render('Service/Surat-pengantar', [
        'documents' => Documents::all(),
    ]);
})->middleware(['auth', 'verified'])->name('surat-pengantar');

Route::get('/dashboard/profile-edit/member-id={id}', function ($id) {
    return Inertia::render('Profile/ProfileEdit', ['data' => FamilyMember::find($id)]);
})->middleware(['auth', 'verified'])->name('profile-edit');

Route::get('/dashboard/profile-detail/id={id}', function ($id) {
    return Inertia::render('Profile/ProfileDetail', ['data' => FamilyMember::find($id)]);
})->middleware(['auth', 'verified'])->name('profile-detail');

Route::get('/dashboard/new-member', function () {
    return Inertia::render('Profile/NewMember');
})->middleware(['auth', 'verified'])->name('new-member');

Route::get('/ruang-kerja', function () {
    return Inertia::render('Rt/Dashboard', [
        'user_id' => Auth::user()->id,
        'reqDoc' =>  DB::table('documents')
            ->join('users', 'users.id', '=', 'documents.user_id') // Join dengan tabel users
            ->where(function ($query) {
                $query->where('documents.link', '=', '') // Link tidak kosong
                    ->orWhere('documents.status', false); // Status false
            })
            ->where('documents.user_id', Auth::id()) // Ambil reqDocs milik user yang login
            ->select('documents.*', 'users.name as user_name') // Pilih kolom req_docs dan nama user
            ->get()
            ->toArray(),
        'repGuest' => Auth::User()->repGuest,
    ]);
})->middleware(['auth', 'verified', RoleMiddleware::class . ':rt'])->name('workshop');

Route::get('/ruang-kerja/surat/id', function () {
    return Inertia::render('Service/Surat-pengantar');
})->middleware(['auth', 'verified'])->name('detail-surat');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

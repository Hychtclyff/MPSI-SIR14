<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\FamilyMemberController;
use App\Http\Controllers\Rt\AnnouncementController;
use App\Http\Controllers\Service\CriticismController;
use App\Http\Controllers\Service\DocumentController;
use App\Http\Controllers\Service\ReportGuestController;
use App\Http\Controllers\UserController;
use App\Models\Criticism;
use Illuminate\Support\Facades\Route;

// Route untuk pengguna tamu
Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

// Route untuk pengguna terautentikasi
Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');

    // Route untuk surat pengantar
    Route::post('surat-pengantar', [DocumentController::class, 'store'])->name('surat-pengantar.store');
    Route::put('surat-pengantar/edit/id={id}', [DocumentController::class, 'updateData'])->name('surat-pengantar.updateData');
    Route::delete('surat-pengantar/destroye/id={id}', [DocumentController::class, 'destroy'])->name('surat-pengantar.destroy');
    Route::put('/ruang-kerja/konfirmasi/surat/id={id}', [DocumentController::class, 'update'])->name('document.update');

    // Route untuk saran dan kritik
    Route::post('saran-kritik', [CriticismController::class, 'store'])->name('saran-kritik.store');

    // Route untuk laporan tamu
    Route::post('lapor', [ReportGuestController::class, 'store'])->name('lapor.store');

    // Route untuk anggota keluarga
    Route::post('new-member', [FamilyMemberController::class, 'store'])->name('new-member.store');
    Route::post('/dashboard/profile-edit/member-id={id}', [FamilyMemberController::class, 'update'])->name('edit-member.update');
    Route::get('/dashboard/new-member/user={user_id}', [FamilyMemberController::class, 'index'])->name('new-member.index');
    Route::delete('data-warga/delete/id={id}', [FamilyMemberController::class, 'destroy'])->name('data-warga.destroy');

    // Route untuk laporan tamu
    Route::put('/ruang-kerja/konfirmasi/guest/id={id}', [ReportGuestController::class, 'update'])->name('report-guest.update');
    Route::put('/dashboar/cek-out/guest/id={id}', [ReportGuestController::class, 'cekOut'])->name('report-guest.cekOut');

    // Route untuk pengumuman
    Route::post('announcement/create', [AnnouncementController::class, 'store'])->name('announcement.store');
    Route::put('announcement/update/id={id}', [AnnouncementController::class, 'update'])->name('announcement.update');
    Route::delete('announcement/delete/id={id}', [AnnouncementController::class, 'destroy'])->name('announcement.destroy');

    Route::delete('criticism/delete/id={id}', [CriticismController::class, 'destroy'])->name('criticism.destroy');

    Route::put('/users/update/id/{id}', [UserController::class, 'update',])->name('user.update');
    Route::delete('/users/delete/id/{id}', [UserController::class, 'destroy',])->name('user.destroy');
});

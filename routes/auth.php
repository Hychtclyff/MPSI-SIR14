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
use App\Http\Controllers\Service\CriticismController;
use App\Http\Controllers\Service\DocumentController;
use App\Http\Controllers\Service\ReportGuestController;
use Illuminate\Support\Facades\Route;

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


    Route::post('surat-pengantar', [DocumentController::class, 'store'])->name('surat-pengantar.store');
    Route::post('saran-kritik', [CriticismController::class, 'store'])->name('saran-kritik.store');
    Route::post('lapor', [ReportGuestController::class, 'store'])->name('lapor.store');

    Route::post('new-member', [FamilyMemberController::class, 'store'])->name('new-member.store');

    Route::post('/dashboard/profile-edit/member-id={id}', [FamilyMemberController::class, 'update'])->name('edit-member.update');


    Route::get('/dashboard/new-member/user={user_id}', [FamilyMemberController::class, 'index'])->name('new-member.index');


    Route::put('/ruang-kerja/konfirmasi/surat/id={id}', [DocumentController::class, 'update'])->name('document.update');
});

















// Route::post('saran-kritik', [ 'store']);

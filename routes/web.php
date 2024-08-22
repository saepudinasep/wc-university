<?php

use App\Http\Controllers\LeasonMaterialController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\SchoolClassController;
use App\Http\Controllers\StudentClassController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudyGroupController;
use App\Http\Controllers\StudyGroupMemberController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', fn() => Inertia::render('Dashboard'))->name('dashboard');

    Route::resource('teacher', TeacherController::class);
    Route::resource('student', StudentController::class);
    Route::resource('subject', SubjectController::class);
    Route::resource('class', SchoolClassController::class);
    Route::resource('schedule', ScheduleController::class);
    Route::resource('study_group', StudyGroupController::class);
    Route::resource('study_group_member', StudyGroupMemberController::class);
    Route::resource('leason_material', LeasonMaterialController::class);
    Route::resource('student_class', StudentClassController::class);
    Route::resource('user', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

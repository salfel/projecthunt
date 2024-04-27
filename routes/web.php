<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ShowProjectsController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)
    ->name('home');

Route::resource('projects', ProjectController::class)
    ->except('show')
    ->middleware(['create' => 'auth']);

Route::prefix('projects/{project}')->group(function () {
    Route::get('/', [ShowProjectsController::class, 'home'])
        ->name('projects.show');

    Route::get('features', [ShowProjectsController::class, 'features'])
        ->name('projects.features');
});

Route::get('projects/user/{user}', [ProjectController::class, 'user'])
    ->name('projects.user');

Route::post('projects/{project}/star', [ProjectController::class, 'star'])
    ->middleware('auth')
    ->name('projects.star');

Route::prefix('profile')->middleware('auth')->group(function () {
    Route::get('/', [ProfileController::class, 'edit'])
        ->name('profile.edit');

    Route::put('/', [ProfileController::class, 'update'])
        ->name('profile.update');

    Route::delete('/', [ProfileController::class, 'destroy'])
        ->name('profile.destroy');
});

require __DIR__ . '/auth.php';

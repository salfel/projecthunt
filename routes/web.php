<?php

use App\Http\Controllers\FeatureController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)
    ->name('home');

Route::resource('projects', ProjectController::class);

Route::resource('projects.features', FeatureController::class);

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

require __DIR__.'/auth.php';

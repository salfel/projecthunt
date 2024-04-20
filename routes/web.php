<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)
    ->name('home');

Route::prefix('project')->group(function () {
    Route::get('create', [ProjectController::class, 'create'])
        ->middleware('auth')
        ->name('project.create');

    Route::post('create', [ProjectController::class, 'store'])
        ->middleware('auth')
        ->name('project.store');

    Route::get('/{project}', [ProjectController::class, 'show'])
        ->name('project.show');
});

require __DIR__.'/auth.php';

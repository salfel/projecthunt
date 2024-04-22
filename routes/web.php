<?php

use App\Http\Controllers\FileController;
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

    Route::get('/{project}/dir/{path?}', [FileController::class, 'index'])
        ->where('path', '.*')
        ->name('files.index');

    Route::get('/{project}/file/{path?}', [FileController::class, 'show'])
        ->where('path', '.*')
        ->name('files.show');

    Route::get('/{id}', [ProjectController::class, 'show'])
        ->name('project.show');

    Route::post('{project}/star', [ProjectController::class, 'star'])
        ->middleware('auth')
        ->name('project.star');
});

require __DIR__.'/auth.php';

<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)
    ->name('home');

Route::resource('project', ProjectController::class)
    ->middleware(['create' => 'auth']);

Route::post('project/{project}/star', [ProjectController::class, 'star'])
    ->middleware('auth')
    ->name('project.star');

require __DIR__.'/auth.php';

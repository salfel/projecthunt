<?php

namespace App\Http\Controllers;

use App\Models\Project;
use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Support\Facades\Log;

class FileController extends Controller
{
    public function index(Project $project, ?string $path = null)
    {
        $user = explode('/', $project->full_name)[0];

        return GitHub::repo()->contents()->show($user, $project->name, $path);
    }

    public function show(Project $project, ?string $path = null)
    {
        $user = explode('/', $project->full_name)[0];

        Log::info('file', [$path]);

        return GitHub::repo()->contents()->download($user, $project->name, $path);
    }
}

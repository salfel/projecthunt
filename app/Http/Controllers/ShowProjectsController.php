<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class ShowProjectsController extends Controller
{
    public function home(Project $project): Response
    {
        $project->load('user');

        return Inertia::render('Project/Show/Home', [
            'project' => $project,
            'starred' => Auth::check() && $project->isStarred(Auth::id()),
        ]);
    }

    public function features(Project $project): Response
    {
        return Inertia::render('Project/Show/Features', [
            'project' => $project,
        ]);
    }
}

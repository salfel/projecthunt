<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class FeatureController extends Controller
{
    public function index(Project $project)
    {
        $project->load('features');

        return Inertia::render('Project/Feature/Index', [
            'project' => $project,
        ]);
    }
}

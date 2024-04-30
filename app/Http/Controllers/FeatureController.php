<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeatureRequest;
use App\Models\Feature;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class FeatureController extends Controller
{
    public function index(Project $project): Response
    {
        $project->load(['features', 'user']);

        return Inertia::render('Project/Feature/Index', [
            'project' => $project,
        ]);
    }

    public function create(Project $project): Response
    {
        Gate::authorize('create', [Feature::class, $project]);

        return Inertia::render('Project/Feature/Create', [
            'project' => $project,
        ]);
    }

    public function store(Project $project, FeatureRequest $request): RedirectResponse
    {
        Log::info('project', $project->toArray());
        // Gate::authorize('create', [Feature::class, $project]);

        Feature::create([
            ...$request->validated(),
            'project_id' => $project->id,
        ]);

        return redirect()->route('projects.features.index', [$project->id]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Github\Exception\RuntimeException;
use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::all();
    }

    public function create(): Response
    {
        Gate::authorize('create', Project::class);

        $user = Auth::user();
        $repos = Github::user()->repositories($user->githubUsername());
        $repos = array_map(fn (array $repo) => $repo['name'], $repos);

        return Inertia::render('Project/Create', [
            'repos' => $repos,
        ]);
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        Gate::authorize('create', Project::class);

        $user = Auth::user();
        $repo = null;

        try {
            $repo = GitHub::repo()->show($user->github()['login'], $request->repo);
        } catch (RuntimeException $e) {
            return redirect()->route('project.create');
        }

        $project = Project::create([
            ...$request->validated(),
            'user_id' => $user->id,
            'full_name' => $repo['full_name'],
        ]);

        return redirect()->route('project.show', [$project->id]);
    }

    public function show(int $id)
    {
        $project = Project::with('user')->findOrFail($id);

        return Inertia::render('Project/Show', [
            'project' => $project,
        ]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $project->update($request->validated());

        return $project;
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json();
    }
}

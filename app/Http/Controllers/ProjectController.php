<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\User;
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
        return Inertia::render('Project/Index');
    }

    public function user(User $user)
    {
        $projects = $user->projects()->with(['user'])->withCount('starred')->paginate(12);

        return Inertia::render('Project/User', [
            'projects' => $projects,
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Project::class);

        /** @var User $user */
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

        /** @var User $user */
        $user = Auth::user();

        try {
            $repo = GitHub::repo()->show($user->github()['login'], $request->name);
        } catch (RuntimeException) {
            return redirect()->route('projects.create');
        }

        $project = Project::create([
            ...$request->validated(),
            'user_id' => $user->id,
            'full_name' => $repo['full_name'],
        ]);

        return redirect()->route('projects.show', [$project->id]);
    }

    public function Show(Project $project): Response
    {
        $project->load('user');

        return Inertia::render('Project/Show', [
            'project' => $project,
            'starred' => Auth::check() && $project->isStarred(Auth::id()),
        ]);
    }

    public function star(Project $project): RedirectResponse
    {
        $starred = $project->isStarred(Auth::id());

        if ($starred) {
            $project->starred()->detach(Auth::id());
        } else {
            $project->starred()->attach(Auth::id());
        }

        return redirect()->route('projects.show', [$project->id]);
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

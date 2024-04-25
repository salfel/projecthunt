<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use App\Models\Tag;
use Github\Exception\RuntimeException;
use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Project/Index');
    }

    public function create(): Response
    {
        Gate::authorize('create', Project::class);

        $user = Auth::user();
        $repos = Github::user()->repositories($user->githubUsername());
        $repos = array_map(fn (array $repo) => $repo['name'], $repos);

        return Inertia::render('Project/Create', [
            'repos' => $repos,
            'tags' => config('tags'),
        ]);
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        Gate::authorize('create', Project::class);

        $user = Auth::user();

        try {
            $repo = GitHub::repo()->show($user->github()['login'], $request->name);
        } catch (RuntimeException $e) {
            return redirect()->route('projects.create');
        }

        $data = [
            ...$request->validated(),
            'user_id' => $user->id,
            'full_name' => $repo['full_name'],
        ];

        if ($request->useGithubDesc) {
            if ($repo['description'] === null || strlen($repo['description']) <= 16) {
                return redirect()->route('projects.create')->withErrors([
                    'description' => 'Please provide a description as the repository does not contain a valid description',
                ]);
            }
            $data['description'] = $repo['description'];
        }

        $project = Project::create($data);

        $tags = Tag::whereIn('name', $request->tags)->get();
        $project->tags()->attach($tags);

        $project->refresh()->searchable();

        return redirect()->route('projects.show', [$project->id]);
    }

    public function show(int $id): Response
    {
        $project = Project::with(['user', 'tags'])->findOrFail($id);

        return Inertia::render('Project/Show', [
            'project' => $project,
            'starred' => $project->isStarred(Auth::id()),
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

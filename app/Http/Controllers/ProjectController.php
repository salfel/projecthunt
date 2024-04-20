<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::all();
    }

    public function store(ProjectRequest $request)
    {
        return Project::create($request->validated());
    }

    public function show(Project $project)
    {
        return $project;
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

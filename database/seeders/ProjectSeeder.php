<?php

namespace Database\Seeders;

use App\Models\Feature;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        Project::factory(10)->has(Feature::factory()->count(5))->create([
            'user_id' => fn () => $users->random()->id,
        ]);
    }
}

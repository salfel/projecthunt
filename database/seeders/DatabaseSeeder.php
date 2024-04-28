<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Felix Salcher',
            'email' => 'felix.salcher@gmail.com',
            'password' => bcrypt('password'),
        ]);

        User::factory(5)->create();

        $this->call(ProjectSeeder::class);
    }
}

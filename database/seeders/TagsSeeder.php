<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagsSeeder extends Seeder
{
    public function run(): void
    {
        foreach (config('tags') as $tag) {
            Tag::firstOrCreate(['name' => $tag]);
        }
    }
}

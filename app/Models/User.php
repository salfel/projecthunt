<?php

namespace App\Models;

use GrahamCampbell\GitHub\Facades\GitHub;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_url',
        'github_id',
        'github_token',
        'github_refresh_token',
        'is_github_username',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function github(): array
    {
        return GitHub::user()->showById($this->github_id);
    }

    public function githubUsername(): string
    {
        return $this->is_github_username ? $this->name : $this->github()['login'];
    }

    /**
     * @return HasMany<Project>
     */
    public function projects(): HasMany
    {
        return $this->hasMany(Project::class);
    }

    /**
     * @return BelongsToMany<Project>
     */
    public function starred(): BelongsToMany
    {
        return $this->belongsToMany(Project::class, 'stars');
    }
}

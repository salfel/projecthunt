<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Scout\Searchable;

class Project extends Model
{
    use HasFactory, Searchable;

    protected $fillable = [
        'name',
        'description',
        'demo',
        'user_id',
        'full_name',
        'tags',
    ];

    protected $casts = [
        'tags' => 'array',
    ];

    public function searchableAs(): string
    {
        return 'projects';
    }

    public function toSearchableArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'user' => $this->user->toArray(),
            'tags' => $this->tags,
            'starred_count' => $this->starred_count,
        ];
    }

    /**
     * @return BelongsTo<User>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return HasMany<Feature>
     */
    public function features(): HasMany
    {
        return $this->hasMany(Feature::class);
    }

    /**
     * @return BelongsToMany<User>
     */
    public function starred(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'stars');
    }

    public function isStarred(int $userId): bool
    {
        return $this->starred()->where('user_id', $userId)->exists();
    }
}

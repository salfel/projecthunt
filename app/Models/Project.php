<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Laravel\Scout\Searchable;

class Project extends Model
{
    use Searchable;

    protected $fillable = [
        'name',
        'description',
        'user_id',
        'full_name',
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
            'owner' => $this->user->toArray(),
            'tags' => $this->tags->pluck('name')->toArray(),
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
     * @return BelongsToMany<Tag>
     */
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
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

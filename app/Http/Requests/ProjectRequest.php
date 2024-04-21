<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'repo' => ['required'],
            'tags' => ['required', 'array', Rule::in(config('tags'))],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}

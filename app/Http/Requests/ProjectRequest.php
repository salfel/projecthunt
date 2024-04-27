<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'demo' => ['url', 'nullable'],
            'description' => ['required', 'string', 'min:16'],
            'tags' => ['required', 'array'],
        ];
    }

    public function authorize(): bool
    {
        return true;
    }
}

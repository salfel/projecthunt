<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
{
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string'],
            'demo' => ['url', 'nullable'],
            'useGithubDesc' => ['boolean'],
            'tags' => ['required', 'array'],
        ];

        if ($this->input('useGithubDesc')) {
            $rules['description'] = ['nullable', 'string'];
        } else {
            $rules['description'] = ['required', 'string', 'min:16'];
        }

        return $rules;
    }

    public function authorize(): bool
    {
        return true;
    }
}

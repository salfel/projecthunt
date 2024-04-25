<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GithubController extends Controller
{
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('github')
            ->scopes(['read:user', 'public_repo'])
            ->redirect();
    }

    public function callback(): RedirectResponse
    {
        $githubUser = Socialite::driver('github')
            ->user();

        $user = User::updateOrCreate([
            'github_id' => $githubUser->id,
        ], [
            'name' => $githubUser->name,
            'email' => $githubUser->email,
            'avatar_url' => $githubUser->user['avatar_url'],
            'github_token' => $githubUser->token,
            'github_refresh_token' => $githubUser->refreshToken,
        ]);

        Auth::login($user, true);

        return redirect()->route('home');
    }
}

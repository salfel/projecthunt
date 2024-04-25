<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Laravel\Socialite\Facades\Socialite;

class GithubController extends Controller
{
    public function redirect(Request $request): RedirectResponse
    {
        Session::put('url.intended', $request->query('intended', route('home')));

        return Socialite::driver('github')
            ->scopes(['read:user', 'public_repo'])
            ->redirect();
    }

    public function callback(): RedirectResponse
    {
        $githubUser = Socialite::driver('github')
            ->user();

        if (Auth::check()) {
            if (User::where('github_id', $githubUser->id)->exists()) {
                Session::flash('toast', ['type' => 'destructive', 'title' => 'This Github account is already in use', 'description' => 'Please use another Github account']);

                return redirect()->intended(route('home'));
            }

            Auth::user()->update([
                'avatar_url' => $githubUser->user['avatar_url'],
                'github_id' => $githubUser->id,
                'github_token' => $githubUser->token,
                'github_refresh_token' => $githubUser->refreshToken,
            ]);

            return redirect()->intended(route('home'));
        }

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

        return redirect()->intended(route('home'));
    }
}

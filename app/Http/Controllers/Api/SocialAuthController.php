<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\SocialAccount;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite; 

class SocialAuthController extends Controller
{
    public function redirectToProvider($provider){
        $url = Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();

        return response()->json([
            'url' => $url
        ]);
    }

    public function handleProviderCallback($provider){
        $user = Socialite::driver($provider)->stateless()->user();
        if (!$user->token){
            //return json
            return response()->json([
                "success" => false,
                "message" => "Failed to Login"
            ],401);
            dd('failed');
        }

        $appUser = User::whereEmail($user->email)->first();

        if (!$appUser){
            //create user and add provider
            $appUser = User::create([
                'name'=>$user->name,
                'password'=>Hash::make(Str::random(8)),
                'email'=>$user->email,
                'profile'=>'https://drive.google.com/uc?export=view&id=1JjCSRF2ddW72bQGveCg-tZPRLupnTbbx',
            ]);

            Role::create([
                'user_id' => $appUser->id,
                'role' => 'user'
            ]);

            $socialAccount = SocialAccount::create([
                'provider' => $provider,
                'provider_user_id' => $user->id,
                'user_id' => $appUser->id
            ]);
        }else{
            //means that we have already this user
            $socialAccount = $appUser->socialAccounts()->where('provider',$provider)->first();
            if (!$socialAccount){
                //create social account
                $socialAccount = SocialAccount::create([
                    'provider' => $provider,
                    'provider_user_id' => $user->id,
                    'user_id' => $appUser->id
                ]);
            }

        }

        // login our user and get the token
        $passportToken = $appUser->createToken('Login Token')->accessToken;
        if(!$appUser->hasVerifiedEmail()){
            $appUser->sendEmailVerificationNotification();
        }

        return response()->json(['data'=> ['token'=>$passportToken,'user'=>$appUser],'status'=>200,'success'=>true]);

        dd($user,$appUser,$passportToken);
        // $user->token
    }
}

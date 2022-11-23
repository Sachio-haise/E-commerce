<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class EmailVerificationController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api')->except(['verify']);
    }

    
    public function sendVerificationEmail(Request $request){
        
   

       $request->user()->sendEmailVerificationNotification();
       return response()->json(['message'=> 'emai sent!']);
       // return response()->json(['message'=> 'emai sent!']);
     }

     public function verify($user_id, Request $request) {
        if (!$request->hasValidSignature()) {
            return abort(403);
        }
    
        $user = User::findOrFail($user_id);
    
       
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }
       
        return redirect()->to('/');
    }
}

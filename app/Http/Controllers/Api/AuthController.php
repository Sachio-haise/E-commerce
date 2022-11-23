<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\ResetMail;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{

    protected $client;
    protected $folder_id = '1GiJjjVwvPJJPKNhVbOBDx7jP_2UonFfX';
    protected $service;
    protected $ClientId     = '634912878135-cjk2vuishghi1bo0dqtu9m67d6g8gfv4.apps.googleusercontent.com';
    protected $ClientSecret = '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';
    protected $refreshToken = '1//04lx4sUOWAdMQCgYIARAAGAQSNwF-L9IraKyf2PbNh0sLUGc8SGERYNjM00_apiLUvDlVZNF1blZ0-rPJOJsqDYJfKTU2GknEuik';

    public function __construct()
    {
        $this->client = new \Google_Client();
        $this->client->setClientId($this->ClientId);
        $this->client->setClientSecret($this->ClientSecret);
        $this->client->refreshToken($this->refreshToken);

        $this->service = new \Google_Service_Drive($this->client);

       
    }



    public function Login(Request $request){

        $user = User::where('email',$request->email)->first();
        if($user){
           if(!Hash::check($request->password,$user->password)){
              return response()->json(['data'=> 'Wrong Password!','status'=>500,'success'=>false]);
           }else{
              $token = $user->createToken($user->email . '_' . now(),[$user->role()->first()->role]);
              if(!$user->hasVerifiedEmail()){
                $user->sendEmailVerificationNotification();
               }
              return response()->json(['data'=> ['token'=>$token->accessToken,$user->role,'role'=>$user->role()->first()->role,'user'=>$user],'status'=>200,'success'=>true]);
           }
        }else{
          return response()->json(['data'=> 'User Doesn\'t Exist!','status'=>500,'success'=>false]);
        }

    }

    public function Register(Request $request) {
        $validate = Validator::make($request->all(),[
             'name'=>'required',
             'password'=>'required|min:8',
             'email'=>'required|unique:users',
         ]);

         if($validate->fails()){
             return response()->json(['data'=> $validate->errors(),'status'=>500,'success'=>false]);
         }

         if($request->hasFile('profile')){
              $validate = Validator::make($request->all(),[
                 'profile'=>'image|mimes:png,jpg'
             ]);
             if($validate->fails()){
                 return response()->json(['data'=> $validate->errors(),'status'=>500,'success'=>false]);
             }

             $file = $request->file('profile');
             $folderName = Str::slug($request->name,'_'). '-' . date('mdg');
             $destination = 'images/profile/' . $folderName;
             if(Storage::exists($destination)){
                 Storage::deleteDirectory($destination);
             }
             $fileName =Str::slug($request->name,'_'). $file->getClientOriginalName();
             $request->file('profile')->move(public_path($destination),$fileName);


            $file = new \Google_Service_Drive_DriveFile(array(
                            'name' => $fileName,
                            'parents' => array($this->folder_id)
                        ));
            $result = $this->service->files->create($file, array(
              'data' => file_get_contents(public_path($destination . '/' .$fileName)),
              'mimeType' => 'application/octet-stream',
              'uploadType' => 'media'
            ));



             $user = User::create([
                 'name'=>$request->name,
                 'password'=>Hash::make($request->password),
                 'email'=>$request->email,
                 'profile'=>"https://drive.google.com/uc?export=view&id=" . $result->id
             ]);
             Role::create([
                 'user_id'=>$user->id,
                 'role'=> 'user',
             ]);
             $token = $user->createToken($user->email . '_' . now(),[$user->role()->first()->role]);
             if(!$user->hasVerifiedEmail()){
                $user->sendEmailVerificationNotification();
               }

             return response()->json(['success'=>true,'status'=>201,'data'=>['user'=> $user,'token'=>$token->accessToken,$user->role,'role'=>$user->role()->first()->role]]);

         }else{
             $user = User::create([
                 'name'=>$request->name,
                 'password'=>Hash::make($request->password),
                 'email'=>$request->email,
                 'profile'=>'https://drive.google.com/uc?export=view&id=1JjCSRF2ddW72bQGveCg-tZPRLupnTbbx'
             ]);
             Role::create([
                 'user_id'=>$user->id,
                 'role'=> 'user',
             ]);

             $token = $user->createToken($user->email . '_' . now(),[$user->role()->first()->role]);
             if(!$user->hasVerifiedEmail()){
                $user->sendEmailVerificationNotification();
               }
             return response()->json(['success'=>true,'status'=>201,'data'=>['user'=> $user,'token'=>$token->accessToken,$user->role,'role'=>$user->role()->first()->role]]);
            }
}
    


    public function forgotPassword(Request $request){
       $user = User::where('email','=',$request->email)->first();
       if($user){
           $ramdom = random_int(100000, 999999);
           $token = $user->createToken($user->email . '_' . now(),[$user->role()->first()->role])->accessToken;
           $encrypt = Crypt::encryptString($user->email);
           $data = [
               'random'=>$ramdom,
               'name' => $user->name,
               'email' => $user->email,
               'encrypt' => $encrypt,
               'token' => $token
           ];
           $user->update([
               'forgot_password_code'=>$ramdom
           ]);
           Mail::to($user->email)->send(new ResetMail($data));
          return response()->json(['data'=> ['message' => 'Email Successfully Sent!','data' => $encrypt],'status'=>200,'success'=>true]);
       }else{
          return response()->json(['data'=> 'User Doesn\'t Exist!','status'=>500,'success'=>false]);
       }
    }

    public function checkCode(Request $request){
        $validate = Validator::make($request->all(),[
           'code'=> 'required|integer|digits_between:6,6'
        ],[
            'code.digits_between'=> 'You entered ramdom numbers. Please check your code and try again.'
        ]);
        if($validate->fails()){
            return response()->json(['data'=> $validate->errors(),'status'=>500,'success'=>false]);
        }
        $user =  User::where('email',$request->email)->first();
       $user_code = $user->forgot_password_code;
       if($request->code === $user_code){
          return response()->json(['data'=> $user,'status'=>200,'success'=>true]);
       }else{
          return response()->json(['data'=> ['code'=>['The number you entered doesn\'t match your code. Please try again.']],'status'=>500,'success'=>false]);

       }
    }

    public function resetPassword(Request $request){
        $validate = Validator::make($request->all(),[
            'password'=> 'required|min:8'
         ]);
         if($validate->fails()){
             return response()->json(['data'=> $validate->errors(),'status'=>500,'success'=>false]);
         }
         $user = User::where('email',$request->email)->update([
             'password'=>Hash::make($request->password),
             'forgot_password_code'=>null
         ]);

         if($user){
            return response()->json(['data'=> 'Password Successfully Recovered!','status'=>200,'success'=>true]);
         }

    }

}

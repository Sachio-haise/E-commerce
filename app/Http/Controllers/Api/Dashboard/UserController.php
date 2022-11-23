<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderUser;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
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

    public function getUsers(){
        return User::with('role')->latest('id')->paginate(10);
    }

    public function getUser(User $user){
        return $user->with('orders')->load('role');
    }

    public function EditUsersRole(Request $request,User $user){
         $validator = Validator::make($request->all(),[
            'role'=>'required'
        ]);
        if($validator->fails()) return response()->json(['data'=>$validator->errors(),'success'=>false]);
        $user->role()->update([
            'role' => $request->role,
            'user_id'=>$user->id
        ]);
        return response()->json(['data'=>$user->load('role'),'success'=>true]);

    }
     public function deleteUser(User $user){
        $User = $user->delete();

       if($User){
             return response()->json(['data'=>$User,'success'=>true]);
       }

       
    }

    public function UpdateAdminProfile(Request $request,User $user){
         $validator = Validator::make($request->all(),[
            'role'=>'required',
            'name'=>'required',
            'email' => 'required',
        ]);
        if($validator->fails()) return response()->json(['data'=>$validator->errors(),'success'=>false]);

      
        if($request->hasFile('profile')){
              $validate = Validator::make($request->all(),[
                 'profile'=>'image|mimes:png,jpg'
             ]);
             if($validate->fails()){
                 return response()->json(['data'=> $validate->errors(),'status'=>500,'success'=>false]);
             }

             $file = $request->file('profile');
             $folderName = Str::slug($request->name,'_'). '-' . date('mdg');
             $destination = '/images/profile/' . $folderName;
             $fileName =Str::slug($request->name,'_'). $file->getClientOriginalName();
            //  if(File::exists(public_path($destination.'/'.$fileName))){
            //      unlink(public_path($destination.'/'.$fileName));
            //  }
            if(File::exists(public_path($destination))){
                 File::deleteDirectory($destination);
             }


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
             $password = '';
             if($request->password){
                $password = Hash::make($request->password);
             }else{
                 $password = $user->password;
             }
              $user->update([
                 'name'=>$request->name,
                 'password'=>$password,
                 'email'=>$request->email,
                 'profile'=>"https://drive.google.com/uc?export=view&id=" . $result->id
             ]);
             $user->role()->update([
                 'role'=>$request->role
             ]);
             $token = $user->createToken($user->email . '_' . now(),[$user->role()->first()->role]);
             if(!$user->hasVerifiedEmail()){
                $user->sendEmailVerificationNotification();
               }

             return response()->json(['success'=>true,'status'=>201,'data'=>['user'=> $user,'token'=>$token->accessToken]]);

       }else{
           $password = '';
             if($request->password){
                $password = Hash::make($request->password);
             }else{
                 $password = $user->password;
             }
            $user->update([
                 'name'=>$request->name,
                 'password'=>$password,
                 'email'=>$request->email,
                 'profile'=>$user->profile
             ]);
               $user->role()->update([
                 'role'=>$request->role
             ]);
             $token = $user->createToken($user->email . '_' . now(),[$user->role()->first()->role]);
             if(!$user->hasVerifiedEmail()){
                $user->sendEmailVerificationNotification();
               }
             return response()->json(['success'=>true,'status'=>201,'data'=>['user'=> $user,'token'=>$token->accessToken]]);
         }
       }

       public function getOrders(){
           $orderUsers  = OrderUser::with('orders.products')->get();
           $orders =Order::with('products')->latest('id')->get();
           return response()->json(['success'=>true,'status'=>201,'data'=>['orders'=> $orderUsers]]);

       }

       public function Count(){
           $user_count = User::count();
           $product_count = Product::count();
           $order_count = Order::count();
           return response()->json(['success'=>true,'status'=>201,'data'=>['order_count'=>$order_count,'product_count'=>$product_count,'user_count'=>$user_count]]);

       }
}

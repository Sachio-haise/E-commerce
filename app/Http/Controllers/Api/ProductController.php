<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Like;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $client;
    protected $file_id;
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

    public function index(Request $request){
        $products = Product::with(['comments.likes','category:id,name,slug'])->get();
       if($request->user_id){
             foreach($products as $key => $value){
            $products[$key]->like_count = $this->likeDetailsAuth($value->id,$request->user_id)[0];
            $products[$key]->is_like = $this->likeDetailsAuth($value->id,$request->user_id)[1];
            $products[$key]->comment_count = $this->commentCount($value->id);
            $products[$key]->order_count = $this->orderCount($value->id);
        }
        return $products;
       }else{
           foreach($products as $key => $value){
            $products[$key]->like_count =  $this->likeDetails($value->id);
            $products[$key]->is_like =  null;
            $products[$key]->comment_count = $this->commentCount($value->id);
            $products[$key]->order_count = $this->orderCount($value->id);
        }

        return $products;
       }
    }

    public function paginateProducts(Request $request){
        $products = Product::with(['comments.likes','category:id,name,slug'])->latest('id')->paginate(8);
       if($request->user_id){
             foreach($products as $key => $value){
            $products[$key]->like_count = $this->likeDetailsAuth($value->id,$request->user_id)[0];
            $products[$key]->is_like = $this->likeDetailsAuth($value->id,$request->user_id)[1];
            $products[$key]->comment_count = $this->commentCount($value->id);
            $products[$key]->order_count = $this->orderCount($value->id);
        }
        return $products;
       }else{
           foreach($products as $key => $value){
            $products[$key]->like_count =  $this->likeDetails($value->id);
            $products[$key]->is_like =  null;
            $products[$key]->comment_count = $this->commentCount($value->id);
            $products[$key]->order_count = $this->orderCount($value->id);
        }

        return $products;
       }
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            "name" => "required|min:5|max:200",
            "description" => "required|min:5",
            "category_id" => "required|numeric",
            "price" => "required|numeric",
            "quantity" => "required|numeric",
        ]);

        if ($validator->fails()){
            return response()->json(['data' => $validator->errors(),'success' => false]);
        }

        if($request->hasFile('image')){
            $validate = Validator::make($request->all(),[
               'image'=>'mimetypes:image/jpeg,image/png|file|max:2500'
           ]);
           if($validate->fails()){
               return response()->json(['data'=> $validate->errors(),'status'=>500,'success'=>false]);
           }

           $file = $request->file('image');
           $destination = 'images/product/';
           $fileName =Str::slug($request->name,'_').uniqid(). $file->getClientOriginalName();
           $request->file('image')->move(public_path($destination),$fileName);

           $file = new \Google_Service_Drive_DriveFile(array(
                            'name' => $fileName,
                            'parents' => array($this->folder_id)
                        ));
            $result = $this->service->files->create($file, array(
              'data' => file_get_contents(public_path($destination  .$fileName)),
              'mimeType' => 'application/octet-stream',
              'uploadType' => 'media'
            ));

            $this->file_id = $result->id;

        }

        $product = new Product();
        $product->name = $request->name;
        $product->slug = Str::slug($request->name);
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->price = ($request->price * 100);
        $product->inventory = $request->quantity;
        if($request->hasFile('image')){
            $product->images ="https://drive.google.com/uc?export=view&id=" . $this->file_id;
        }
        $product->save();

        return response()->json(['data' => 'Product created successfully!','success' => true]);
    }

    public function destroy(Product $product){
        if (isset($product->images)) {
            $dir = "images/";
            unlink(public_path($dir . $product->images));
        }
        $product->delete();
        return response()->json(["success" => true]);
    }

    public function update(Request $request,Product $product){
        // return $request->file('image');
        $validator = Validator::make($request->all(),[
            "name" => "required|min:5|max:200",
            "description" => "required|min:5",
            "category_id" => "required|numeric",
            "price" => "required|numeric",
            "quantity" => "required|numeric",
        ]);

        if ($validator->fails()){
            return response()->json(['data' => $validator->errors(),'success' => false]);
        }

        if($request->hasFile('image')){
            $validate = Validator::make($request->all(),[
               'image'=>'mimetypes:image/jpeg,image/png'
           ]);
           if($validate->fails()){
               return response()->json(['data'=> $validate->errors(),'status'=>500,'success'=>false]);
           }

           if($product->images){
                if(File::exists(public_path('/images'.$product->images))){
                    unlink(public_path('/images'.$product->images));
                }
           }
           
           $file = $request->file('image');
           $destination = 'images/product/';
           $fileName =Str::slug($request->name,'_').uniqid(). $file->getClientOriginalName();
           $request->file('image')->move(public_path($destination),$fileName);

            $file = new \Google_Service_Drive_DriveFile(array(
                            'name' => $fileName,
                            'parents' => array($this->folder_id)
                        ));
            $result = $this->service->files->create($file, array(
              'data' => file_get_contents(public_path($destination  .$fileName)),
              'mimeType' => 'application/octet-stream',
              'uploadType' => 'media'
            ));

          $this->file_id = $result->id;

        }

        $product->name = $request->name;
        $product->slug = Str::slug($request->name);
        $product->description = $request->description;
        $product->category_id = $request->category_id;
        $product->price = ($request->price * 100);
        $product->inventory = $request->quantity;
        if($request->hasFile('image')){
            $product->images = "https://drive.google.com/uc?export=view&id=" . $this->file_id; 
        }
        $product->update();

        return response()->json(['data' => 'Product updated successfully!','success' => true]);
    }

    public function likeProduct(Request $request){
        $like = Like::where('user_id',$request->user_id)->where('product_id',$request->product_id);
        if($like->first()){
            $like->delete();
        }else{
            Like::create([
                'user_id'=>$request->user_id,
                'product_id'=>$request->product_id
            ]);
        }
        $products = Product::with(['comments','category:id,name,slug'])->latest('id')->paginate(10);
        foreach($products as $key => $value){
            $products[$key]->like_count = $this->likeDetailsAuth($value->id,$request->user_id)[0];
            $products[$key]->is_like =  $this->likeDetailsAuth($value->id,$request->user_id)[1];
            $products[$key]->comment_count = $this->commentCount($value->id);

        }
        return $products;

    }

    public function likeDetailsAuth($product_id,$user_id){
        $like_count = Like::where('product_id',$product_id)->count();
        $user_id = Like::where('product_id',$product_id)->where('user_id',$user_id)->first();
        if($user_id){
            $is_like = true;
        }else{
            $is_like = false;
        }
        return [$like_count,$is_like];
    }

    public function likeDetails($product_id){
        $like_count = Like::where('product_id',$product_id)->count();
        return $like_count;
    }

    public function commentCount($product_id){
        $comment_count = Comment::where('product_id',$product_id)->count();
        return $comment_count;
    }

    public function orderCount($product_id){
        $order = DB::table('order_product');
        $order_count = $order->where('product_id',$product_id)->count();
        return $order_count;
    }
}

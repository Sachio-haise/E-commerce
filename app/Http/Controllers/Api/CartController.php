<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderUser;
use App\Models\User;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function getAllCarts(Request $request){
      $carts = Cart::where('user_id',$request->user_id)->with('product')->latest()->get();
      $cart_count = Cart::where('user_id',$request->user_id)->count();
      return response()->json(['data'=>$carts,'count'=>$cart_count,'status'=>200,'success'=>true]); 
    }

    public function addCart(Request $request){
        $isInCart = Cart::where('user_id',$request->user_id)->where('product_id',$request->product_id);
        if($isInCart->first()){
              $isInCart->update([
                'user_id'=> $request->user_id,
                'product_id'=>$request->product_id,
                'quantity' => $request->quantity,
                'size'=> $request->size
              ]);
            $cartCount = Cart::where('user_id',$request->user_id)->count();  
           $carts = Cart::where('user_id',$request->user_id)->with('product')->latest()->get();
            return response()->json(['data'=>$carts,'status'=>200,'success'=>true,'count'=>$cartCount]);
         
        }else{
            Cart::create([
                'user_id'=> $request->user_id,
                'product_id'=>$request->product_id,
                'quantity' => $request->quantity,
                'size'=> $request->size
              ]);
            $cartCount = Cart::where('user_id',$request->user_id)->count();  
           $carts = Cart::where('user_id',$request->user_id)->with('product')->latest()->get();
            return response()->json(['data'=>$carts,'status'=>200,'success'=>true,'count'=>$cartCount]);

        }
       
    }

    public function RemoveCart(Request $request){
       $delete =Cart::where('user_id',$request->user_id)->where('product_id',$request->product_id)->delete();
      if($delete){
        $cartCount = Cart::where('user_id',$request->user_id)->count();  
        $carts = Cart::where('user_id',$request->user_id)->with('product')->latest()->get();
       return response()->json(['data'=>$carts,'status'=>200,'success'=>true,'count'=>$cartCount]);
      }
    }

    public function History(Request $request){
      $user = User::where('email',$request->email)->first();
      $orderUser = OrderUser::where('user_id',$user->id)->first();
      $history = Order::where('order_user_id',$orderUser->id)->with('products')->get();
      return response()->json(['data'=>$history,'status'=>200,'success'=>true]);

    }
}

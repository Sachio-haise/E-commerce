<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderUser;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function purchase(Request $request){
        $validator = Validator::make($request->all(),[
            "first_name" => "required",
            "last_name" => "required",
            "phone" => "required|numeric",
            "email" => "required|email",
            "address" => "required",
            "city" => "required",
            "state" => "required",
            "zip_code" => "required",
        ]);

        if($validator->fails()){
            return response()->json(["error" => $validator->errors(),"success" => false]);      
        }

        $user = OrderUser::firstOrCreate(
            [
                'user_id' => $request->input('user_id'),
            ],
            [
                'email' => $request->input('email'),
                'phone_number' => $request->input('phone'), 
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'address' => $request->input('address'),
                'city' => $request->input('city'),
                'state' => $request->input('state'),
                'zip_code' => $request->input('zip_code')
            ]
        );

        try {
            $payment = $user->charge(
                $request->input('amount'),
                $request->input('payment_method_id')
            );

            $payment = $payment->asStripePaymentIntent();

            $order = $user->orders()
                ->create([
                    'transaction_id' => $payment->charges->data[0]->id,
                    'total' => $payment->charges->data[0]->amount
                ]);

                foreach (json_decode($request->input('cart'), true) as $item) {
                    $order->products()
                        ->attach($item['product_id'], ['quantity' => $item['quantity']]);
                    $product = Product::where('id',$item['product_id']);
                    $inventory = $product->first()->inventory;
                    $quantity = $inventory - $item['quantity'];
                    $product->update(['inventory' => $quantity]);
                    
                }
             $order->load('products');
            return response()->json(['data' => $order,'success' => true]);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}

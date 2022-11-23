<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OrderUser;
use Illuminate\Http\Request;

class OrderUserController extends Controller
{
    public function index(){
        return OrderUser::with('orders')->get();
    }
}

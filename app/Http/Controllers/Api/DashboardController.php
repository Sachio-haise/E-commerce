<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getProducts(){
        return Product::with("category:id,name,slug")->latest("id")->paginate(10);
    }

    
}

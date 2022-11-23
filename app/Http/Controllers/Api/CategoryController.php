<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index(){
        return Category::all();
    }

    public function show(Category $category){
        $category->load('products');
        return $category;
    }

    
}

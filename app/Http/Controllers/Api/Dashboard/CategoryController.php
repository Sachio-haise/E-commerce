<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Prophecy\Doubler\Generator\Node\ReturnTypeNode;

class CategoryController extends Controller
{
    public function getCategories(){
     return Category::latest('id')->paginate(10);
    }

    public function create(Request $request){
        $validator = Validator::make($request->all(),[
            'name'=>'required'
        ]);
        if($validator->fails()) return response()->json(['data'=>$validator->errors(),'success'=>false]);
        $category = Category::create([
            'name'=>$request->name,
            'slug'=> Str::slug($request->name,'-')
        ]);
        return response()->json(['data'=>$request->name.' created successfully!','success'=>true]);
    }

    public function getCategory(Category $category){
        return $category;
    }

    public function editCategory(Request $request,Category $category){
        $validator = Validator::make($request->all(),[
            'name'=>'required'
        ]);
    if($validator->fails()) return response()->json(['data'=>$validator->errors(),'success'=>false]);

     $category->update([
            'name'=>$request->name,
            'slug'=>Str::slug($request->name,'-')
        ]);
        return response()->json(['data'=>$request->name.' updated successfully!','success'=>true]);

    }

    public function deleteCategory($category){
        $Cat = Category::where('id',$category)->first();
        $product = Product::where('category_id',$Cat->id)->delete();
        Category::where('id',$category)->delete();
        return response()->json(['data'=>$product,'success'=>true]);
    }
}

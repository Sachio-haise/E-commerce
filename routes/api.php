<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\Dashboard\CategoryController as DashboardCategoryController;
use App\Http\Controllers\Api\Dashboard\UserController as DashboardUserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\EmailVerificationController;
use App\Http\Controllers\Api\OrderUserController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SocialAuthController;
use App\Http\Controllers\Api\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



//Products
Route::controller(ProductController::class)->group(function(){
    Route::get('/products','index');
    Route::get('/products/paginate','paginateProducts');
    Route::post('/products/paginate','paginateProducts');
    Route::post('/products/store','store');
    Route::delete('/products/delete/{product}','destroy');
    Route::post('/products', 'index');
    Route::any('/products/update/{product}','update');
});

Route::middleware(['auth:api'])->group(function(){
  Route::middleware(['verified'])->group(function(){
    Route::post('/product-like',[ProductController::class,'likeProduct']);
  });
});

//Comment
Route::middleware(['auth:api'])->group(function(){
  Route::middleware(['verified'])->group(function(){
    Route::post('/comment',[CommentController::class,'addComment']);
    Route::post('/comment/{id}',[CommentController::class,'updateComment']);
    Route::delete('/comment/{id}',[CommentController::class,'deleteComment']);
    Route::post('/comment-like',[CommentController::class,'likeComment']);
  });
});


//Category
Route::get('/categories',[CategoryController::class, 'index']);
Route::get('/categories/{category}',[CategoryController::class, 'show']);


//Purchase
Route::post('/purchase',[UserController::class , 'purchase']);

//Auth
Route::controller(AuthController::class)->group(function(){
    Route::post('/login','Login');
    Route::post('/register','Register');
    Route::post('/forgot-password','forgotPassword');
    Route::post('/check-code','checkCode');
    Route::post('/reset-password','resetPassword');

 });



//SocialAuth
Route::controller(SocialAuthController::class)->group(function(){
    Route::get('/authorize/{provider}','redirectToProvider');
    Route::get('/authorize/{provider}/callback','handleProviderCallback');
});

 //Email Verification
 Route::controller(EmailVerificationController::class)->group(function(){
  Route::middleware(['api'])->group(function(){
  Route::get('/email/verification-notification','sendVerificationEmail');
  Route::get('/verify/{id}/{hash}','verify')->name('verification.verify');
  });

});

//check user in verify
Route::middleware(['auth:api'])->group(function(){
    Route::get('/me',function(Request $request){
      $token = $request->user()->createToken($request->user()->email . '_' . now(),[$request->user()->role()->first()->role]);
      if ($request->user()->hasVerifiedEmail()) {
        return response()->json(['data'=>['user'=> auth()->user(),'token'=>$token->accessToken,'role'=>$request->user()->role()->first()->role],'verify'=>true]);
    }else{
      return response()->json(['data'=>['user'=> auth()->user(),'token'=>$token->accessToken,'role'=>$request->user()->role()->first()->role],'verify'=>false]);
    }
    });
});

//Cart
Route::middleware(['auth:api'])->group(function(){
  Route::middleware(['verified'])->group(function(){
    Route::controller(CartController::class)->group(function() {
       Route::post('/carts','getAllCarts');
       Route::post('/add-to-cart','addCart');
       Route::post('/delete-cart','RemoveCart');
       Route::post('/history','History');
    });
    Route::get('/users',function(){
      $users = User::all();
      return response()->json($users);
    });
  });
});

//Dashboard
Route::controller(DashboardController::class)->prefix('/dashboard')->group(function (){
    Route::get('/products','getProducts');
});


//Category Dashboard
Route::middleware(['auth:api'])->group(function(){
  Route::middleware(['verified'])->group(function(){
    Route::controller(DashboardCategoryController::class)->prefix('/dashboard')->group(function(){
    Route::get('/categories','getCategories');
    Route::get('/category/{category}','getCategory');
    Route::post('/category/edit/{category}','editCategory');
    Route::any('/category/delete/{category}','deleteCategory');
    Route::post('/category/store','create');
    });
  });
});

//Users Dashboard

Route::middleware(['auth:api'])->group(function(){
  Route::middleware(['verified'])->group(function(){
    Route::controller(DashboardUserController::class)->prefix('/dashboard')->group(function(){
    Route::get('/users','getUsers');
    Route::get('/user/{user}','getUser');
    Route::post('/user/edit/{user}','EditUsersRole');
    Route::any('/user/delete/{user}','deleteUser');
    Route::get('/orders','getOrders');
    //Change Admin Profile
    Route::post('/admin/{user}','UpdateAdminProfile');
    Route::get('/count','Count');
    });
  });
});

//Purchase
Route::post('/purchase',[UserController::class , 'purchase']);

//Order
Route::get('/order-user',[OrderUserController::class, 'index']);



<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\commentLike;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function addComment(Request $request){
        $user_id = $request->user_id;
        $product_id = $request->product_id;
        $parent_id = $request->parent_id;
        $body = $request->body;
   
            Comment::create([
              'user_id'=>$user_id,
              'parent_id'=>$parent_id,
              'product_id'=>$product_id,
              'body'=>$body
            ]);
    }
     public function updateComment(Request $request,$id){
        $user_id = $request->user_id;
        $product_id = $request->product_id;
        $parent_id = $request->parent_id;
        $body = $request->body;
       
            Comment::where('id',$id)->update([
              'body'=>$body
            ]);
    
    }
     public function deleteComment(Request $request,$id){
      Comment::where('id',$id)->delete();
    }


    
    public function likeComment(Request $request){
        $like = commentLike::where('user_id',$request->user_id)->where('comment_id',$request->comment_id);
        if($like->first()){
            $like->delete();
        }else{
            commentLike::create([
                'user_id'=>$request->user_id,
                'comment_id'=>$request->comment_id
            ]);
        }
        $comments = Comment::all();
        foreach($comments as $key => $value){
             $this->likeDetailsAuth($value->id,$request->user_id);
             $this->likeDetailsAuth($value->id,$request->user_id);
        }
       
         
    }

    public function likeDetailsAuth($comment_id,$user_id){
        $like_count = commentLike::where('comment_id',$comment_id)->count();
        $user_id = commentLike::where('comment_id',$comment_id)->where('user_id',$user_id);
        if($user_id->first()){
              $user_id->update([
              'is_like'=>true,
              'like_count'=>$like_count
            ]);
        }else{
           $user_id->update([
              'is_like'=>false,
              'like_count'=>$like_count

            ]);
        }
      
    }

   

}

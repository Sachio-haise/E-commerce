<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class Comment extends Model
{
    use HasFactory;
    protected $with = ['replies','user','likes'];

   protected $appends = ['date','likecount'];

    protected $fillable = [
         'user_id',
         'product_id',
         'parent_id',
         'body'

    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function replies(){
        return $this->hasMany(Comment::class,'parent_id');
    }

    public function getDateAttribute(){
        $c = new Carbon($this->created_at);
        return $c->diffForHumans();
    }
     public function getLikeCountAttribute(){
        $c = $this->hasMany(commentLike::class)->latest();
        return $c->first();
    }
   public function likes(){
       return $this->hasMany(commentLike::class)->latest();
   }
    

}

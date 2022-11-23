<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Cashier\Billable;

class OrderUser extends Model
{
    use HasFactory , Billable;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'address',
        'city',
        'state',
        'zip_code',
    ];

    public function user(){
        return $this->BelongsTo(User::class);
    }

    public function orders(){
        return $this->hasMany(Order::class);
    }

}

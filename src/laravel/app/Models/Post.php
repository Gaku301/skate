<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['skater_id', 'category_id', 'product_name', 'product_introduction', 'product_img'];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    protected $fillable = ['category_id', 'feature_name'];

    public function category()
    {
        return $this->belongsTo('App\Models\Category');
    }
}

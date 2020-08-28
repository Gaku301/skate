<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skater extends Model
{
    protected $fillable = ['name', 'country_id', 'instagram', 'twitter', 'facebook', 'youtube', 'thumbnail'];

    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }
}

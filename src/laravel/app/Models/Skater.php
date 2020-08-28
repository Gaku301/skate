<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skater extends Model
{
    protected $fillable = ['name', 'country_id'];

    public function country()
    {
        return $this->belongsTo('App\Models\Country');
    }
}

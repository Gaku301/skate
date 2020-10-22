<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = ['country_name'];

    public function skaters()
    {
        return $this->hasMany('App\Models\Skater');
    }
}

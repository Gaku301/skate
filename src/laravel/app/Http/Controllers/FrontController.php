<?php

namespace App\Http\Controllers;

use App\Models\Skater;

class FrontController extends Controller
{
    public function index()
    {
        $skaters = Skater::paginate(16);

        return view('front.index',['skaters' => $skaters]);
    }
}

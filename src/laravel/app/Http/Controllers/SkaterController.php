<?php

namespace App\Http\Controllers;

class SkaterController extends Controller
{
    public function index()
    {
        return view('skater.admin');
    }
}

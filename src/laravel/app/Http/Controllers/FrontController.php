<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Skater;

class FrontController extends Controller
{
    public function index()
    {
        $skaters = Skater::paginate(16);

        return view('front.index', ['skaters' => $skaters]);
    }

    public function show(Skater $skater)
    {
        $skater = Skater::find($skater->id);
        $posts = Post::where('skater_id', $skater->id)->paginate(16);

        return view('front.show', ['skater' => $skater, 'posts' => $posts]);
    }
}

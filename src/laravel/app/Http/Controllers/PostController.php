<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Skater;

class PostController extends Controller
{
    public function index(Skater $skater)
    {
        $skater = Skater::find($skater->id);
        $posts = Post::paginate();

        return view('post.index', ['skater' => $skater, 'posts' => $posts]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
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

    public function store(CreatePostRequest $request)
    {
        // dd($request);
        $post = new Post($request->except(['_token']));
        $post->save();

        return redirect()->back()->with('msg_success', '記事を追加しました。');
    }

    public function show(Skater $skater, Post $post)
    {
        $skater = Skater::find($skater->id);
        $post = Post::find($post->id);

        return view('post.show', ['skater' => $skater, 'post' => $post]);
    }
}

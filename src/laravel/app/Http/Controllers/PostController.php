<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreatePostRequest;
use App\Http\Requests\UpdatePostRequest;
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

    public function update(Skater $skater, Post $post, UpdatePostRequest $request)
    {
        $post = Post::find($request->id);
        $post->fill($request->except(['_token']))->update();

        return redirect()->back()->with('msg_success', '記事を変更しました。');
    }

    public function destroy(Skater $skater, Post $post)
    {
        Post::destroy($post->id);

        return redirect()->route('post.index', ['skater' => $skater])->with('msg_warning', '記事を削除しました。');
    }
}

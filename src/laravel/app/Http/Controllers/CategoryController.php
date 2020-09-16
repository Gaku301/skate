<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        return view('category.index');
    }

    public function store(Request $request)
    {
        $category = new Category($request->except(['_token']));
        $category->save();

        return redirect()->back()->with('msg_success', 'カテゴリを追加しました。');
    }
}

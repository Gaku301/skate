<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCategoryReques;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::paginate();

        return view('category.index', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $category = new Category($request->except(['_token']));
        $category->save();

        return redirect()->back()->with('msg_success', 'カテゴリを追加しました。');
    }

    public function update(UpdateCategoryReques $request)
    {
        $category = Category::find($request->id);
        $category->fill($request->except(['_token']))->update();

        return redirect()->back()->with('msg_success', 'カテゴリを変更しました。');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateFeatureRequest;
use App\Http\Requests\UpdateFeatureRequest;
use App\Models\Feature;

class FeatureController extends Controller
{
    public function index()
    {
        $features = Feature::paginate();

        return view('feature.index', ['features' => $features]);
    }

    public function store(CreateFeatureRequest $request)
    {
        $feature = new Feature($request->except(['_token']));
        $feature->save();

        return redirect()->back()->with('msg_success', 'フィーチャーを追加しました。');
    }

    public function update(UpdateFeatureRequest $request)
    {
        $feature = Feature::find($request->id);
        $feature->fill($request->except(['_token']))->update();

        return redirect()->back()->with('msg_success', 'フィーチャーを変更しました。');
    }
}

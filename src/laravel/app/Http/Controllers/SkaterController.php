<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSkaterRequest;
use App\Http\Requests\UpdateSkaterRequest;
use App\Models\Skater;

class SkaterController extends Controller
{
    public function index()
    {
        $skaters = Skater::paginate();

        return view('skater.admin', ['skaters' => $skaters]);
    }

    public function store(CreateSkaterRequest $request)
    {
        $skater = new Skater($request->except(['_token', 'thumbnail']));
        if ($request->has('thumbnail')) {
            $file_name = $request->file('thumbnail')->store('public/thumbnail');
            $skater->thumbnail = basename($file_name);
        }
        $skater->save();

        return redirect()->back()->with('msg_success', 'スケーターを追加しました。');
    }

    public function show(Skater $skater)
    {
        $skater = Skater::find($skater->id);

        return view('skater.show', ['skater' => $skater]);
    }

    public function update(UpdateSkaterRequest $request, Skater $skater)
    {
        $skater = Skater::find($request->id);
        $skater->fill($request->except(['_token']))->update();
        if ($request->has('thumbnail')) {
            $file_name = $request->file('thumbnail')->store('public/thumbnail');
            $skater->thumbnail = basename($file_name);
        }

        return redirect()->back()->with('msg_success', 'スケーター情報を変更しました。');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSkaterRequest;
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
        $file_name = $request->file('thumbnail')->store('public/thumbnail');
        $skater->thumbnail = basename($file_name);
        $skater->save();

        return redirect()->back()->with('msg_success', 'スケーターを追加しました。');
    }

    public function show(Skater $skater)
    {
        $skater = Skater::find($skater->id);

        return view('skater.show', ['skater' => $skater]);
    }
}

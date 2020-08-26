<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        return view('country.index');
    }

    public function store(Request $request)
    {
        $country = new Country($request->except(['_token']));
        $country->save();

        return redirect()->back()->with('msg_success', '国を追加しました。');
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\CountryUpdateRequest;
use App\Models\Country;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::all();

        return view('country.index', ['countries' => $countries]);
    }

    public function store(Request $request)
    {
        $country = new Country($request->except(['_token']));
        $country->save();

        return redirect()->back()->with('msg_success', '国を追加しました。');
    }

    public function update(CountryUpdateRequest $request)
    {
        $country = Country::find($request->id);
        $country->fill($request->except(['_token']))->update();

        return redirect()->back()->with('msg_success', '国を変更しました。');
    }

    public function destroy(Request $request)
    {
        Country::destroy($request->id);

        return redirect()->back()->with('msg_warning', '国を削除しました。');
    }
}

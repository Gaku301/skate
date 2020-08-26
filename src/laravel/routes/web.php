<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'FrontController@index')->name('front.index');

//管理者のみ
Route::group(['middleware' => ['auth']], function () {
    Route::get('/admin', 'SkaterController@index')->name('skater.admin');
    // 国管理
    Route::get('/admin/country', 'CountryController@index')->name('country.index');
    Route::post('/admin/country', 'CountryController@store')->name('country.store');
    Route::patch('/admin/country', 'CountryController@update')->name('country.update');
});

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

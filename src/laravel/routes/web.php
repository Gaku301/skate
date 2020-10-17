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
    // スケーター管理
    Route::get('/admin', 'SkaterController@index')->name('skater.admin');
    Route::post('/admin', 'SkaterController@store')->name('skater.store');
    Route::get('/admin/show/{skater}', 'SkaterController@show')->name('skater.show');
    Route::patch('/admin/show/{skater}', 'SkaterController@update')->name('skater.update');
    Route::delete('/admin/show/{skater}', 'SkaterController@destroy')->name('skater.destroy');

    // 国管理
    Route::get('/admin/country', 'CountryController@index')->name('country.index');
    Route::post('/admin/country', 'CountryController@store')->name('country.store');
    Route::patch('/admin/country', 'CountryController@update')->name('country.update');
    Route::delete('/admin/country', 'CountryController@destroy')->name('country.destroy');

    // カテゴリ
    Route::get('/admin/category', 'CategoryController@index')->name('category.index');
    Route::post('/admin/category', 'CategoryController@store')->name('category.store');
    Route::patch('/admin/category', 'CategoryController@update')->name('category.update');
    Route::delete('/admin/category', 'CategoryController@destroy')->name('category.destroy');

    // 記事
    Route::get('/admin/post/{skater}', 'PostController@index')->name('post.index');
    Route::post('/admin/post/{skater}', 'PostController@store')->name('post.store');
    Route::get('/admin/post/{skater}/{post}', 'PostController@show')->name('post.show');

});

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

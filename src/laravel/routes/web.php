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

// 共通
Route::get('/', 'FrontController@index')->name('front.index');
Route::get('/skater/{skater}', 'FrontController@show')->name('front.show');

// only admin
Route::group(['middleware' => ['auth'], 'prefix' => 'admin'], function () {
    // skater
    Route::group(['as' => 'skater.'], function () {
        Route::get('', 'SkaterController@index')->name('admin');
        Route::post('', 'SkaterController@store')->name('store');
        Route::get('/show/{skater}', 'SkaterController@show')->name('show');
        Route::patch('/show/{skater}', 'SkaterController@update')->name('update');
        Route::delete('/show/{skater}', 'SkaterController@destroy')->name('destroy');
    });
    // country
    Route::group(['prefix' => 'country', 'as' => 'country.'], function () {
        Route::get('', 'CountryController@index')->name('index');
        Route::post('', 'CountryController@store')->name('store');
        Route::patch('', 'CountryController@update')->name('update');
        Route::delete('', 'CountryController@destroy')->name('destroy');
    });
    // category
    Route::group(['prefix' => 'category', 'as' => 'category.'], function () {
        Route::get('', 'CategoryController@index')->name('index');
        Route::post('', 'CategoryController@store')->name('store');
        Route::patch('', 'CategoryController@update')->name('update');
        Route::delete('', 'CategoryController@destroy')->name('destroy');
    });
    // feature
    Route::group(['prefix' => 'feature', 'as' => 'feature.'], function () {
        Route::get('', 'FeatureController@index')->name('index');
        Route::post('', 'FeatureController@store')->name('store');
        Route::patch('', 'FeatureController@update')->name('update');
        // Route::delete('', 'FeatureController@destroy')->name('destroy');
    });
    // post
    Route::group(['prefix' => 'post/{skater}', 'as' => 'post.'], function () {
        Route::get('', 'PostController@index')->name('index');
        Route::post('', 'PostController@store')->name('store');
        Route::get('/{post}', 'PostController@show')->name('show');
        Route::patch('/{post}', 'PostController@update')->name('update');
        Route::delete('/{post}', 'PostController@destroy')->name('destroy');
    });
});

Route::get('/home', 'HomeController@index')->name('home');

Auth::routes();

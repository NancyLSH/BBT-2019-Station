<?php
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
Route::group(['middleware' => ['web']], function () {
    //Route::any('station/index', ['uses' => 'StationController@index']);
    Route::post('station/save', ['uses' => 'StationController@save']);
    //Route::any('station/success', ['uses' => 'StationController@success']);
    //Route::any('station/draw', ['uses' => 'StationController@draw']);
    //Route::any('station/ticket', ['uses' => 'StationController@ticket']);
    //Route::any('station/portal', ['uses' => 'StationController@portal']);
    //Route::any('station/update', ['uses' => 'StationController@update']);
    Route::post('station/modify', ['uses' => 'StationController@modify']);
    Route::post('station/ticket', ['uses' => 'StationController@ticket']);
    Route::post('station/update', ['uses' => 'StationController@update']);
    Route::post('station/checkTime', ['uses' => 'StationController@checkTime']);
    Route::get('station/checkOpenid', ['uses' => 'StationController@checkOpenid']);
    Route::post('station/getStationName', ['uses' => 'StationController@getStationName']);
    Route::post('station/returnStationName', ['uses' => 'StationController@returnStationName']);
    Route::any('station/img', ['uses' => 'StationController@returnImg']);
    Route::post('station/draw', ['uses' => 'StationController@draw']);
});
Route::get('/', function () {
    return view('welcome');
});

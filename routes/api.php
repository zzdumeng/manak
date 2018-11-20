<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/book/all', function(Request $req) {
    return response()->json([
        ["title" => "佳人", "author" => "杜甫" ],
        ["title" => "感遇其一", "author" => "张九龄" ],
        ["title" => "月下独酌", "author" => "李白" ],
        ["title" => "梦李白其二", "author" => "杜甫" ],

    ]);

});

Route::post('/book/{title}', function($title) {
    // read content
    $title = urldecode($title);
    $file = storage_path("app/public/$title.txt");
    $handler = fopen($file, 'r');
    if(!$handler) {
        // not exist
        return response()->json(["error" => "$title not exists."]);
    }
    $content = fread($handler, filesize($file));
    fclose($handler);
    return response()->json(["content" => $content]);
});

<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class StationController extends Controller
{
    public function save(Request $request)
    {
        session()->put('openid', 'wxlj');
        $timezone = 'Asia/Shanghai';
        date_default_timezone_set($timezone);
        $passenger1 = $request->input('passenger1');
        $passenger2 = $request->input('passenger2');
        $passenger3 = $request->input('passenger3');
        $destination = $request->input('destination');
        $comment = $request->input('comment');
        $key = DB::table('station')->insertGetId(['openid' => session()->get('openid'), 'passenger1' => $passenger1, 'passenger2' => $passenger2, 'passenger3' => $passenger3,
        'destination' => $destination, 'comment' => $comment, 'created_at' => now(), ]);
        session()->put('id', $key);

        return response()->json([
            'errcode' => 0,
        ]);
    }

    public function modify(Request $request)
    {
        $timezone = 'Asia/Shanghai';
        date_default_timezone_set($timezone);
        $passenger1 = $request->input('passenger1');
        $passenger2 = $request->input('passenger2');
        $passenger3 = $request->input('passenger3');
        $destination = $request->input('destination');
        $comment = $request->input('comment');
        DB::table('station')->where('id', session()->get('id'))->update(
            ['openid' => session()->get('openid'), 'passenger1' => $passenger1, 'passenger2' => $passenger2, 'passenger3' => $passenger3, 'destination' => $destination, 'comment' => $comment, 'updated_at' => now()]
        );

        return response()->json([
            'errcode' => 0,
        ]);
    }

    public function ticket(Request $request)
    {
        $station = DB::table('station')->where('id', session()->get('id'))->first();
        $passenger1 = $station->passenger1;
        $passenger2 = $station->passenger2;
        $passenger3 = $station->passenger3;
        $destination = $station->destination;
        $comment = $station->comment;

        return response()->json([
            'errcode' => 0,
            'passenger1' => $passenger1,
            'passenger2' => $passenger2,
            'passenger3' => $passenger3,
            'destination' => $destination,
            'comment' => $comment,
            'num' => session()->get('id'),
        ]);
    }

    public function update(Request $request)
    {
        $station = DB::table('station')->where('id', session()->get('id'))->first();
        $passenger1 = $station->passenger1;
        $passenger2 = $station->passenger2;
        $passenger3 = $station->passenger3;
        $destination = $station->destination;
        $comment = $station->comment;

        return response()->json([
            'errcode' => 0,
            'passenger1' => $passenger1,
            'passenger2' => $passenger2,
            'passenger3' => $passenger3,
            'destination' => $destination,
            'comment' => $comment,
        ]);
    }

    public function checkTime(Request $request)
    {
        $timezone = 'Asia/Shanghai';
        date_default_timezone_set($timezone);
        $nowTime = now();
        $startTime = '2019-05-29 00:00:00';
        $closeTime = '2019-06-01 00:00:00';
        if ($nowTime < $startTime) {
            return response()->json([
                'errcode' => 440,
                'errmsg' => '活动还未开始',
            ]);
        }
        if ($nowTime > $closeTime) {
            return response()->json([
                'errcode' => 441,
                'errmsg' => '活动已结束',
            ]);
        }
    }

    public function checkOpenid(Request $request)
    {
        $params = $request->all();
        $token = $params['token'];
        $sign = $params['sign'];
        $origin_token = $token;
        $token = json_decode(base64_decode($token), true);
        if (md5(sha1($origin_token.'afnweof!@#@#$sdf1334dcsS')) !== $sign || empty($token['openid'])) {
            return redirect('http://182.254.161.213/BBT-2019-Station/Frontend/html/index.html');
        }
        $request->session()->put('openid', $token['openid']);

        return redirect('http://182.254.161.213/BBT-2019-Station/Frontend/html/index.html');
    }

    public function getStationName(Request $request)
    {
        session()->put('code', $request->input('code'));
        if (session()->has('code')) {
            return response()->json([
            'errcode' => 0,
        ]);
        } else {
            return response()->json([
            'errcode' => 1,
        ]);
        }
    }

    public function returnStationName(Request $request)
    {
        return response()->json([
            'code' => session()->get('code'),
        ]);
    }

    public function returnImg(Request $request)
    {
        $stations = array('秀发号', '满绩号', '暴富号', '超越号', '脱单号', '暴瘦号', '吃鸡号');

        $station = DB::table('station')->where('id', session()->get('id'))->first();
        $passenger1 = $station->passenger1;
        $passenger2 = $station->passenger2;
        $passenger3 = $station->passenger3;
        $destination = $station->destination;
        $comment = $station->comment;
        $img = Image::make(base_path().'/public/initial.png');

        $len = strlen($comment);

        $img->text('恭喜你成为第'.session()->get('id').'位搭上列车的乘客', 50, 390, function ($font) {
            $font->file(base_path().'/public/FZHTJW.ttf');

            $font->size(20);

            $font->valign('top');

            $font->color('#D98247');
        });
        $img->text($passenger1.'  '.$passenger2, 155, 563, function ($font) {
            $font->file(base_path().'/public/FZHTJW.ttf');

            $font->size(25);

            $font->valign('top');

            $font->color('#FFFFFF');
        });
        $img->text($passenger3, 155, 597, function ($font) {
            $font->file(base_path().'/public/FZHTJW.ttf');

            $font->size(25);

            $font->valign('top');

            $font->color('#FFFFFF');
        });
        // $img->text($passenger2, 220, 610, function ($font) {
        //     $font->file(base_path().'/public/FZHTJW.ttf');

        //     $font->size(30);

        //     $font->valign('top');

        //     $font->color('#FFFFFF');
        // });
        // $img->text($passenger3, 270, 610, function ($font) {
        //     $font->file(base_path().'/public/FZHTJW.ttf');

        //     $font->size(30);

        //     $font->valign('top');

        //     $font->color('#FFFFFF');
        // });
        $img->text($destination, 365, 445, function ($font) {
            $font->file(base_path().'/public/FZHTJW.ttf');

            $font->size(30);

            $font->valign('top');

            $font->color('#FFFFFF');
        });
        if ($len < 24) {
            $img->text($comment, 155, 630, function ($font) {
                $font->file(base_path().'/public/FZHTJW.ttf');

                $font->size(25);

                $font->valign('top');

                $font->color('#FFFFFF');
            });
        } else {
            $array = str_split($comment, 24);
            for ($i = 0; $i < count($array); ++$i) {
                $img->text($array[$i], 155, 630 + $i * 30, function ($font) {
                    $font->file(base_path().'/public/FZHTJW.ttf');

                    $font->size(25);

                    $font->valign('top');

                    $font->color('#FFFFFF');
                });
            }
        }
        $img->text($stations[session()->get('code')], 252, 440, function ($font) {
            $font->file(base_path().'/public/FZHTJW.ttf');

            $font->size(25);

            $font->valign('top');

            $font->color('#FFFFFF');
        });

        return $img->response('png');
    }

    public function draw(Request $request)
    {
        return response()->json([
            'errcode' => 0,
        ]);
    }
}

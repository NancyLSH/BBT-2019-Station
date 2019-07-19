<?php

require_once 'src/autoloader.php';
use Grafika\Grafika; // Import package
use Grafika\Color;

header('Content-Type: text/html; charset=utf-8');
// 制定允许其他域名访问
header('Access-Control-Allow-Origin:http://134.175.124.192');
header('Access-Control-Allow-Headers:Origin, Content-Type, Cookie, X-CSRF-TOKEN, Accept, Authorization, X-XSRF-TOKEN');
header('Access-Control-Expose-Headers:Authorization, authenticated');
header('Access-Control-Allow-Methods:GET, POST, PATCH, PUT, OPTIONS');
header('Access-Control-Allow-Credentials:true');
$host = '';
$user = '';
$pass = '';
$link = mysqli_connect($host, $user, $pass);
mysqli_select_db($link, '123');
mysqli_query($link, 'SET names UTF8');
$timezone = 'Asia/Shanghai';
date_default_timezone_set($timezone);
session_start();
$query = mysqli_query($link, 'SELECT * FROM `station` WHERE id='.$_SESSION['id']);
$result = mysqli_fetch_array($query);
//var_dump($result['passenger1']);
$editor = Grafika::createEditor(); // Create the best available editor
$station = array('秀发号', '满绩号', '暴富号', '超越号', '脱单号', '暴瘦号', '吃鸡号');
$editor->open($image, 'initial.png');
$editor->text($image, '恭喜你成为第'.$_SESSION['id'].'位搭上列车的乘客', 18, 42, 400, new Color('#D98247'), '', 0);
$editor->text($image, $result['passenger1'], 25, 150, 560, new Color('#FFFFFF'), '', 0);
$editor->text($image, $result['passenger2'], 25, 200, 560, new Color('#FFFFFF'), '', 0);
$editor->text($image, $result['passenger3'], 25, 250, 560, new Color('#FFFFFF'), '', 0);
$editor->text($image, $result['destination'], 31, 355, 445, new Color('#FFFFFF'), '', 0);
$editor->text($image, $result['comment'], 25, 150, 620, new Color('#FFFFFF'), '', 0);
$editor->text($image, $station[$_SESSION['code']], 20, 245, 446, new Color('#FFFFFF'), '', 0);
header('Content-type: image/png');
$image->blob('png');

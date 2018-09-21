<?php

use application\core\Router;
use application\lib\Db;

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header("Content-type: text/html; charset=utf-8");
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

session_start();

spl_autoload_register(function ($class){
    $path = str_replace('\\', '/',  $class . '.php');
    if (file_exists($path)) {
        require $path;
    }
});

$router = new Router;
$router->run();



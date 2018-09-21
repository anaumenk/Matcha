<?php

namespace application\core;
session_start();
abstract class Controller {

    public $route;
    public $acl;

    public function __construct($route) {
        $this->route = $route;
        $this->model = $this->loadModel($route['controller']);
    }

    public function loadModel($name) {
        $path = 'application\models\\'. ucfirst($name);
        if (class_exists($path)) {
            return new $path;
        }
    }
}
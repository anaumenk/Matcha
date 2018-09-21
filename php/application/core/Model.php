<?php

namespace application\core;

use application\lib\Db;
session_start();
abstract class Model {

    public $db;

    public function __construct() {
        $this->db = new Db;
    }
}
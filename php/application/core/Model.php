<?php

namespace application\core;

use application\lib\Db;

abstract class Model {

    public $db;

    public function __construct() {
        $this->db = new Db;
        $connection = $_REQUEST['connection'];
        $userId = $_REQUEST['userId'];
        if ($userId) {
            $this->db->query("UPDATE `users` SET `connection` = '$connection' WHERE `userId` = '$userId'");
        }
    }
}
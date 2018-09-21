<?php

namespace application\models;

use application\core\Model;
session_start();
class Account extends Model{

    public function getUser($login) {
        $params = [
            'login' => $login,
        ];
        $result = $this->db->row("SELECT * FROM users WHERE login = :login", $params);
        return $result;
    }
}
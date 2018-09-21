<?php

namespace application\models;

use application\core\Model;

class Profile extends Model{

    public function getUser() {
        $result = $this->db->row("SELECT firstName, lastName, login FROM users WHERE userId = 2");
        return $result;
    }
}
<?php

namespace application\models;

use application\core\Model;
session_start();
class Account extends Model{

    public function getUserLogin($login) {
        $params = [
            'login' => $login,
        ];
        $result = $this->db->row("SELECT * FROM users WHERE login = :login", $params);
        return $result;
    }

    public function getUserId($userId) {
        $params = [
            'userId' => $userId,
        ];
        $result = $this->db->row("SELECT * FROM users WHERE userId = :userId", $params);
        return $result;
    }

    public function getUserPhoto($userId) {
        $params = [
            'userId' => $userId,
        ];
        $result = $this->db->row("SELECT * FROM photos WHERE userId = :userId", $params);
        return $result;
    }

    public function createUser($firstName, $lastName, $email, $login, $password, $gender) {
        $password = hash('whirlpool', $password);
//        $params = [
//            'firstName' => $firstName,
//            'lastName' => $lastName,
//            'login' => $login,
//            'email' => $email,
//            'password' => $password,
//            'gender' => $gender,
//            'occupation' => '',
//            'biography' => '',
//            'latitude' => '',
//            'longitude' => '',
//            'tags' => '',
//        ];
//        $this->db->query("INSERT INTO `users` (`firstName`, `lastName`, `login`, `email`, `password`,
//                                               `gender`, `occupation`, `biography`, `latitude`,
//                                               `longitude`, `tags`)
//                          VALUES (:firstName, :lastName, :login, :email, :password, :gender,
//                                  :occupation, :biography, :latitude, :longitude, :tags)", $params);
        $this->db->query("INSERT INTO `users` (`firstName`, `lastName`, `login`, `email`, `password`,
                                                `gender`, `occupation`, `biography`, `latitude`,
                                                `longitude`, `tags`)
                          VALUES ('$firstName', '$lastName', '$login', '$email', '$password',
                                  '$gender', '', '', '', '', '')");
    }
}
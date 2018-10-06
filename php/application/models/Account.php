<?php

namespace application\models;

use application\core\Model;

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

    public function createUser($firstName, $lastName, $email, $login, $password, $gender, $token) {
        $password = hash('whirlpool', $password);
        $this->db->query("INSERT INTO `users` (`firstName`, `lastName`, `login`, `email`, `password`,
                                                `gender`, `occupation`, `biography`, `latitude`,
                                                `longitude`, `tags`, `token`)
                          VALUES ('$firstName', '$lastName', '$login', '$email', '$password',
                                  '$gender', '', '', '', '', '', '$token')");
    }

    public function createPhoto($userId) {
        $this->db->query("INSERT INTO `photos` (`userId`, `1`, `2`, `3`, `4`, `5`)
                          VALUES ('$userId', '', '', '', '', '')");
    }

    public function getUserLikesViews($userId, $action) {
        $params = [
            'userId' => $userId,
        ];
        $result = ($action === 'likes')
            ? $this->db->row("SELECT users.userId, users.login, photos.1 AS photo FROM users
                              INNER JOIN photos ON users.userId = photos.userId
                              INNER JOIN likes ON users.userId = likes.userWho
                              WHERE likes.userWhom = :userId", $params)
            : $this->db->row("SELECT users.userId, users.login, photos.1 AS photo FROM users
                              INNER JOIN photos ON users.userId = photos.userId
                              INNER JOIN views ON users.userId = views.userWho
                              WHERE views.userWhom = :userId", $params);
        return $result;
    }

    public function activateAccount($token) {
        $this->db->query("UPDATE `users`
                          SET `token` = ''
                         WHERE `token` = '$token'");
    }
}


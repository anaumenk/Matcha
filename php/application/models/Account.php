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

    public function getUserBlocked($userId) {
        $blocked = $this->db->row("SELECT idWhom AS blocked
                                        FROM block
                                        WHERE idWho = '$userId'");
        return $blocked;
    }

    public function getUserLiked($userId) {
        $liked = $this->db->row("SELECT userWhom AS liked
                                      FROM likes
                                      WHERE userWho = '$userId'");
        return $liked;
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

    public function activateAccount($token, $login) {
        $sql = $this->db->row("SELECT * FROM users 
                                    WHERE login = '$login'");
        if ($sql) {
            if ($sql[0]['token'] != '') {
                $this->db->query("UPDATE `users`
                                       SET `token` = ''
                                       WHERE `token` = '$token'");
                $response = 'Congratulations!';
            }
            else {
                $response = 'You already confirmed your account.';
            }
        }
        else {
            $response = 'Wrong login!';
        }
        return $response;
    }

    public function changePass($password, $login, $email) {
        $this->db->query("UPDATE users 
                               SET `password` = '$password' 
                               WHERE `login` = '$login'
                               AND `email` = '$email'");
    }
}


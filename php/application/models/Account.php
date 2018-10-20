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

    public function createUser($firstName, $lastName, $email, $login, $password, $gender, $token, $latitude, $longitude) {
        $password = hash('whirlpool', $password);
        $this->db->query("INSERT INTO `users` (`firstName`, `lastName`, `login`, `email`, `password`,
                                                `gender`, `occupation`, `biography`, `latitude`,
                                                `longitude`, `token`, `locationChecked`, `connection`)
                               VALUES ('$firstName', '$lastName', '$login', '$email', '$password',
                               '$gender', '', '', '$latitude', '$longitude', '$token', '1', '')");
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
                              WHERE likes.userWhom = :userId
                              AND users.userId
                              NOT IN (SELECT block.idWhom FROM block WHERE block.idWho = :userId)", $params)
            : $this->db->row("SELECT users.userId, users.login, photos.1 AS photo FROM users
                              INNER JOIN photos ON users.userId = photos.userId
                              INNER JOIN views ON users.userId = views.userWho
                              WHERE views.userWhom = :userId
                              AND users.userId
                              NOT IN (SELECT block.idWhom FROM block WHERE block.idWho = :userId)", $params);
        return $result;
    }

    public function activateAccount($token) {
        $this->db->query("UPDATE `users`
                               SET `token` = ''
                               WHERE `token` = '$token'");
    }

    public function changePass($password, $login, $email) {
        $this->db->query("UPDATE users 
                               SET `password` = '$password' 
                               WHERE `login` = '$login'
                               AND `email` = '$email'");
    }

    public function getUserTags($userId) {
        $tags = $this->db->row("SELECT * FROM `tags` WHERE `userId` = '$userId'");
        return $tags;
    }

    public function changeConnection($userId, $connection) {
        $this->db->query("UPDATE `users`
                               SET `connection` = '$connection'
                               WHERE `userId` = '$userId'");
    }

    public function lastConnection($date1) {
        if ($date1 != '') {
            date_default_timezone_set("Europe/Kiev");

            $date2 = date("Y-m-d H:i:s");

            $diff = abs(strtotime($date1) - strtotime($date2));

            $years = floor($diff / (365*60*60*24));
            $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
            $days = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));
            $hours = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24) / (60*60));
            $minutes = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24 - $days*60*60*24 - $hours*60*60) / 60);

            return [$years, $months, $days, $hours, $minutes];
        }
        else {
            return ['', '', '', '', ''];
        }
    }

}


<?php

namespace application\models;

use application\core\Model;

class Profile extends Model{

    public function editUser($userId, $firstName, $lastName, $email, $gender, $orientation, $occupation,
                             $biography, $birthDay, $birthMonth, $birthYear) {
        $this->db->query("UPDATE `users` SET `firstName` = '$firstName', `lastName` = '$lastName',
                                            `email` = '$email', `gender` = '$gender',
                                            `orientation` = '$orientation', `occupation` = '$occupation',
                                            `biography` = '$biography', `birthDay` = '$birthDay',
                                            `birthMonth` = '$birthMonth', `birthYear` = '$birthYear'
                          WHERE `userId` = '$userId'");
    }

    public function editPhoto($userId, $one, $two, $three, $four, $five) {
        $this->db->query("UPDATE `photos` SET `1` = '$one', `2` = '$two', `3` = '$three', `4` = '$four',
                                              `5` = '$five' WHERE `userId` = '$userId'");
    }

    public function addPhoto($userId, $name, $photoId) {
        $sql= $this->db->row("SELECT * FROM `photos` WHERE `userId` = '$userId'");
        if (!$sql) {
            $this->db->query("INSERT INTO `photos` (`userId`, `1`, `2`, `3`, `4`, `5`)
                          VALUES ('$userId', '$name', '', '', '', '')");
        }
        else {
            $this->db->query("UPDATE `photos` SET `$photoId` = '$name' WHERE `userId` = '$userId'");
        }
    }

}
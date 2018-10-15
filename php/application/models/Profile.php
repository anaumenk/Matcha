<?php

namespace application\models;

use application\core\Model;

class Profile extends Model{

    public function editUser($userId, $firstName, $lastName, $email, $gender, $orientation, $occupation,
                             $biography, $birth, $siteColor, $latitude, $longitude, $locationChecked) {
        $this->db->query("UPDATE `users`
                               SET `firstName` = '$firstName', `lastName` = '$lastName',
                                    `email` = '$email', `gender` = '$gender',
                                    `orientation` = '$orientation', `occupation` = '$occupation',
                                    `biography` = '$biography', `birth` = '$birth',
                                    `siteColor` = '$siteColor',
                                    `latitude` = '$latitude', `longitude` = '$longitude', 
                                    `locationChecked` = '$locationChecked'
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

    public function fakeUser($who, $whom) {
        $sql = $this->db->row("SELECT * FROM `fake` 
                                    WHERE `idWho` = '$who' 
                                    AND `idWhom` = '$whom'");
        $response = [];
        if (!$sql) {
            $this->db->query("INSERT INTO `fake` (`idWho`, `idWhom`) 
                                              VALUES ('$who', '$whom')");
            $count_sql = row("SELECT COUNT(*) FROM `fake` 
                                              WHERE `idWhom` = '$whom'");
            if ($count_sql[0]['COUNT(*)'] >= 5) {
                $this->db->query("UPDATE `users` SET `rating` = `rating` - 50 
                                       WHERE `userId` = '$whom'");
            }
            $sql= $this->db->row("SELECT * FROM `friend` 
                                       WHERE (`user1` = '$who' AND `user2` = '$whom') 
                                       OR (`user2` = '$who' AND `user1` = '$whom')");
            if ($sql) {
                $this->db->query("DELETE FROM `friend` 
                                       WHERE (`user1` = '$who' AND `user2` = '$whom') 
                                       OR (`user2` = '$who' AND `user1` = '$whom');
                                       
                                       INSERT INTO `notifications` (`idWho`, `idWhom`, `notification`) 
                                       VALUES ('$who', '$whom', 'not your friend anymore');
                                       
                                       UPDATE `users` SET `rating` = `rating` - 10 
                                       WHERE `userId` = '$whom'");
            }
        }
        else {
            $response = ['error' => true];
        }
        return $response;
    }

    public function blockUser($who, $whom) {
        $this->db->query( "INSERT INTO `block` (`idWho`, `idWhom`) 
                                       VALUES ('$who', '$whom');
                                       
                                       UPDATE `users` 
                                       SET `rating` = `rating` - 20 
                                       WHERE `userId` = '$whom'");
        $sql = $this->db->row( "SELECT * FROM `friend` 
                                       WHERE (`user1` = '$who' AND `user2` = '$whom') 
                                       OR (`user2` = '$who' AND `user1` = '$whom')");
        if ($sql) {
            $this->db->query("DELETE FROM `friend` 
                                   WHERE (`user1` = '$who' AND `user2` = '$whom') 
                                   OR (`user2` = '$who' AND `user1` = '$whom');
                                   
                                   INSERT INTO `notifications` (`idWho`, `idWhom`, `notification`) 
                                   VALUES ('$who', '$whom', 'not your friend anymore');
                                   
                                   UPDATE `users` SET `rating` = `rating` - 10 
                                   WHERE `userId` = '$whom'");
        }
    }

    public function likeUser($who, $whom) {
        $this->db->query( "INSERT INTO `likes` (`userWho`, `userWhom`) 
                                VALUES ('$who', '$whom');
                                
                                UPDATE `users` SET `rating` = `rating` + 10 
                                WHERE `userId` = '$whom'");
        $blocked = $this->db->row("SELECT * FROM `block` 
                                        WHERE `userWhom` = '$who' 
                                        AND `userWho` = '$whom'");
        if (!$blocked) {
            $this->db->query("INSERT INTO `notifications` (`idWho`, `idWhom`, `notification`) 
                                VALUES ('$who', '$whom', 'liked your profile')");
        }
        $count_sql = $this->db->row("SELECT COUNT(*) AS `count` FROM `likes` 
                                          WHERE (`userWho` = '$who' AND `userWhom` = '$whom') 
                                          OR (`userWhom` = '$who' AND `userWho` = '$whom')");
        if ($count_sql[0]['count'] == 2) {
            $this->db->query("INSERT INTO `friend` (`user1`, `user2`)
                                   VALUES ('$who', '$whom');
                                   
                                   INSERT INTO `notifications` (`idWho`, `idWhom`, `notification`) 
                                   VALUES ('$who', '$whom', 'your new friend');
                                   
                                   UPDATE `users` SET `rating` = `rating` + 10 
                                   WHERE `userId` = '$whom'
                                   AND `userId` = '$who'");
        }
    }

    public function unLikeUser($who, $whom) {
        $this->db->query( "DELETE FROM `likes` 
                                       WHERE (`userWho` = '$who' AND `userWhom` = '$whom');
                                       
                                       UPDATE `users` SET `rating` = `rating` - 10 
                                       WHERE `userId` = '$whom'");
        $sql = $this->db->row("SELECT * FROM `friend` 
                                       WHERE (`user1` = '$who' AND `user2` = '$whom') 
                                       OR (`user2` = '$who' AND `user1` = '$whom')");
        if ($sql) {
            $this->db->query("DELETE FROM `friend`
                                   WHERE (`user1` = '$who' AND `user2` = '$whom')
                                   OR (`user2` = '$who' AND `user1` = '$whom');

                                   INSERT INTO `notifications` (`idWho`, `idWhom`, `notification`)
                                   VALUES ('$who', '$whom', 'not your friend anymore');

                                   UPDATE `users` SET `rating` = `rating` - 10
                                   WHERE `userId` = '$whom'");
        }
    }

    public function getNotifications($userId) {
        $sql = $this->db->row( "SELECT notifications.id, notifications.idWho, notifications.notification AS text, users.firstName, users.lastName, photos.1 AS photo 
                                       FROM `notifications`
                                       INNER JOIN `photos`
                                       ON notifications.idWho = photos.userId
                                       INNER JOIN `users`
                                       ON notifications.idWho = users.userId
                                       WHERE notifications.idWhom = '$userId'");
        return $sql;
    }

    public function clearNotifications($userId) {
        $this->db->query( "DELETE FROM `notifications` 
                                WHERE `idWhom` = '$userId'");
    }

    public function addNewTag($userId, $newTag) {
        $sql = $this->db->row("SELECT * FROM `tags` WHERE userId = '$userId' AND `text` = '$newTag'");
        if (!$sql) {
            $this->db->query( "INSERT INTO `tags` (`userId`, `text`)
                                   VALUES ('$userId', '$newTag')");
        }
    }

    public function delTag($userId, $tagForDel) {
        $this->db->query( "DELETE FROM `tags` 
                                WHERE `userId` = '$userId' AND `text` = '$tagForDel'");
    }
}
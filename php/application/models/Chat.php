<?php

namespace application\models;

use application\core\Model;

class Chat extends Model{

    public function getFriends($userId) {
        $params = [
            'userId' => $userId,
        ];
        $result = $this->db->row("SELECT users.userId, users.firstName, users.lastName, photos.1 AS photo 
                                  FROM users
                                  INNER JOIN photos ON users.userId = photos.userId
                                  INNER JOIN friend ON users.userId = friend.user1 OR users.userId = friend.user2
                                  WHERE (friend.user1 = :userId OR friend.user2 = :userId)
                                  AND users.userId != :userId", $params);
        return $result;
    }

    public function getMessages($userId, $friendId) {
        $params = [
            'userId' => $userId,
            'friendId' => $friendId,
        ];
        $result = $this->db->row("SELECT id, sender AS senderId, `user` AS userId, messages AS text
                                  FROM chat
                                  WHERE (chat.sender = :userId OR chat.sender = :friendId)
                                  AND (chat.user = :userId OR chat.user = :friendId)
                                  ORDER BY id DESC", $params);
        return $result;
    }

    public function sendMessage($userId, $friendId, $message) {
        $this->db->query("INSERT INTO `chat` (sender, `user`, messages) 
                             VALUES ('$userId', '$friendId', '$message')");
        $block = $this->db->row("SELECT * FROM `block`
                                      WHERE `idWho` = '$friendId' AND `idWhom` = '$userId'");
        if (!$block) {
            $this->db->query("INSERT INTO `notifications` (`idWho`, `idWhom`, `notification`) 
                             VALUES ('$userId', '$friendId', 'send you a message')");
        }
    }
}

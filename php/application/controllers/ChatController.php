<?php

namespace application\controllers;

use application\core\Controller;

class ChatController extends Controller {

    public function friendsListAction() {
        $userId = trim($_REQUEST['userId']);

        $sql = $this->model->getFriends($userId);
        echo json_encode($sql);
    }

    public function selectChatAction() {
        $userId = trim($_REQUEST['userId']);
        $friendId = trim($_REQUEST['friendId']);
        $sql = $this->model->getMessages($userId, $friendId);
        echo json_encode($sql);
    }

    public function sendMessageAction() {
        $userId = trim($_REQUEST['userId']);
        $friendId = trim($_REQUEST['friendId']);
        $message = trim($_REQUEST['message']);
        $this->model->sendMessage($userId, $friendId, $message);
    }

}
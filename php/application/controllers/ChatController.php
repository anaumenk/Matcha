<?php

namespace application\controllers;

use application\core\Controller;

class ChatController extends Controller {

    public function friendsListAction() {
        $userId = $_REQUEST['userId'];

        $sql = $this->model->getFriends($userId);
        echo json_encode($sql);
    }

    public function selectChatAction() {
        $userId = $_REQUEST['userId'];
        $friendId = $_REQUEST['friendId'];
        $sql = $this->model->getMessages($userId, $friendId);
        echo json_encode($sql);
    }

    public function sendMessageAction() {
        $userId = $_REQUEST['userId'];
        $friendId = $_REQUEST['friendId'];
        $message = addslashes($_REQUEST['message']);
        $this->model->sendMessage($userId, $friendId, $message);
    }

}
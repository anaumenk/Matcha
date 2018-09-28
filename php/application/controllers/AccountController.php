<?php


namespace application\controllers;

use application\core\Controller;
use application\lib\Db;

class AccountController extends Controller {

    public function loginAction() {
        $login = $_REQUEST['login'];
        $password = $_REQUEST['password'];
        $sql = $this->model->getUserLogin($login);
        if ($sql) {
            foreach ($sql as $data) {
                if ($data['password'] === hash("whirlpool", $password)) {
                    $response = $sql;
                }
                else {
                    $response = ["fieldName" => "password", "error" => true];
                }
            }
        } else {
            $response = $response = ["fieldName" => "login", "error" => true];
        }
        echo json_encode($response);
    }

    public function userAction() {
        $userId = $_REQUEST['userId'];
        $sql = $this->model->getUserId($userId);
        echo json_encode($sql);
    }

    public function photoAction() {
        $userId = $_REQUEST['userId'];
        $sql = $this->model->getUserPhoto($userId);
        if (!$sql) {
            $this->model->createPhoto($userId);
            $this->photoAction();
            return ;
        }
        echo json_encode($sql);
    }


    public function registerAction() {
        $firstName = trim($_REQUEST['firstName']);
        $lastName = trim($_REQUEST['lastName']);
        $email = trim($_REQUEST['email']);
        $login = trim($_REQUEST['login']);
        $password = trim($_REQUEST['password']);
        $gender = trim($_REQUEST['gender']);

        $sql = $this->model->getUserLogin($login);
        if ($sql) {
            $response = ['fieldName' => 'qlogin', 'error' => 'true'];
        }
        else {
            $this->model->createUser($firstName, $lastName, $email, $login, $password, $gender);
            $response = ['error' => 'false'];
        }
        echo json_encode($response);
    }

    public function viewsAction() {
        $userId = $_REQUEST['userId'];
        $sql = $this->model->getUserViews($userId);
        $response = [];
        if ($sql) {
//            foreach ($sql as $data) {
//                $login = $data['login'];
//
//            }
//            $response = ['userId' => $userId, 'login' => $login, 'photo' => $photo];
        }


//        echo json_encode();
    }
}
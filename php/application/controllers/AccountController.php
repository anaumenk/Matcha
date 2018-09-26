<?php


namespace application\controllers;

use application\core\Controller;

use application\lib\Db;
session_start();

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
        echo json_encode($sql);
    }

    public function registerAction() {
        $firstName = $_REQUEST['firstName'];
        $lastName = $_REQUEST['lastName'];
        $email = $_REQUEST['email'];
        $login = $_REQUEST['login'];
        $password = $_REQUEST['password'];
        $gender = $_REQUEST['gender'];

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

    public function logoutAction() {
        $_SESSION['user'] = '';
    }

}
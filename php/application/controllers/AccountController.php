<?php


namespace application\controllers;

use application\core\Controller;

use application\lib\Db;
session_start();

class AccountController extends Controller {
    public function loginAction() {
        $login = $_REQUEST['login'];
        $password = $_REQUEST['password'];
        $sql = $this->model->getUser($login);
        if ($sql) {
            foreach ($sql as $data) {
                if ($data['password'] == hash("whirlpool", $password)) {
                    $_SESSION['user'] = $login;
                    $response = $sql;
                }
                else {
                    $response = ['fieldName' => 'password', 'error' => true];
                }
            }
        } else {
            $response = ['fieldName' => 'login', 'error' => true];
        }
        echo json_encode($response);
    }

    public function registerAction() {
        $result = $this->model->getUser();
        var_dump($result);
        echo '<p>Register</p>';
    }

    public function authenticatedAction() {
        session_start();
        $bool = $_SESSION['user'] ? 'true' : 'false';
        echo json_encode(['isAuthenticated' => $bool]);
    }

    public function logoutAction() {
        $_SESSION['user'] = '';
    }

}
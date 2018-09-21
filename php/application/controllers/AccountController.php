<?php

namespace application\controllers;

use application\core\Controller;

use application\lib\Db;

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
         if ($_SESSION['user'] == '') {
             echo 'false';
//             $response = ['isAuthenticated' => 'false'];
         }
         else {
             echo 'true';
//             $response = ['isAuthenticated' => 'true'];
         }
//        echo json_encode($response);
    }

}
<?php


namespace application\controllers;

use application\core\Controller;

class AccountController extends Controller {

    public function loginAction() {
        $login = $_REQUEST['login'];
        $password = $_REQUEST['password'];
        $sql = $this->model->getUserLogin($login);
        if ($sql) {
            foreach ($sql as $data) {
                if ($data['token'] === '') {
                    $response = ($data['password'] === hash("whirlpool", $password))
                        ? $sql
                        : ["fieldName" => "password", "error" => true];
                }
                else {
                    $response = ["fieldName" => "account", "error" => true];
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
            $token = hash('whirlpool', $email.time());

            $this->model->createUser($firstName, $lastName, $email, $login, $password, $gender, $token);
            $response = ['error' => 'false'];

            $message = "<p>Hello, $lastName $firstName!</p><p>You need to confirm your email address to complete your Matcha account.</p><p>It's easy — just click <a href='http://localhost:8080/php/activateAccount?token=$token'>HERE</a>.</p>";
            $subject = "Matcha";
            $subject_preferences = array(
                "input-charset" => "utf-8",
                "output-charset" => "utf-8",
                "line-length" => 76,
                "line-break-chars" => "\r\n"
            );
            $header = "Content-type: text/html; charset='utf-8'. \r\n";
            $header .= "From: Matcha <matcha@unit.ua> \r\n";
            $header .= "MIME-Version: 1.0 \r\n";
            $header .= "Content-Transfer-Encoding: 8bit \r\n";
            $header .= "Date: ".date("r (T)")." \r\n";
            $header .= iconv_mime_encode("Subject", $subject, $subject_preferences);
            mail("$email", "$subject", "$message", $header);
        }
        echo json_encode($response);
    }


    public function likesViewsAction() {
        $userId = trim($_REQUEST['userId']);
        $action = trim($_REQUEST['action']);
        $sql = $this->model->getUserLikesViews($userId, $action);
        echo json_encode($sql);
    }

    public function activateAccountAction() {
        $token = trim($_REQUEST['token']);
        $this->model->activateAccount($token);
        header("Location: http://localhost:3000/");
    }

    public function prewUserAction() {
        $userId = trim($_REQUEST['userId']);
        $user = $this->model->getUserId($userId);
        $photo = $this->model->getUserPhoto($userId);
        $result = array_merge($user, $photo);
        echo json_encode($result);
    }
}
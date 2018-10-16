<?php


namespace application\controllers;

use application\core\Controller;

class AccountController extends Controller {

    public function loginAction() {
        $login = $_REQUEST['login'];
        $password = $_REQUEST['password'];
        $sql = $this->model->getUserLogin($login);
        if ($sql) {
            if ($sql[0]['token'] === '') {
                $response = ($sql[0]['password'] === hash("whirlpool", $password))
                    ? $sql
                    : ["fieldName" => "password", "error" => true];
            }
            else {
                $response = ["fieldName" => "account", "error" => true];
            }
        }
        else {
            $response = ["fieldName" => "login", "error" => true];
        }
        echo json_encode($response);
    }

    public function userAction() {
        $userId = $_REQUEST['userId'];
        $user = $this->model->getUserId($userId);
        $blocked = $this->model->getUserBlocked($userId);
        $liked = $this->model->getUserLiked($userId);
        $tags = $this->model->getUserTags($userId);
        array_push($user, $blocked, $liked, $tags);
        echo json_encode($user);
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
        $firstName = $_REQUEST['firstName'];
        $lastName = $_REQUEST['lastName'];
        $email = $_REQUEST['email'];

        $login = $_REQUEST['login'];
        $password = $_REQUEST['password'];
        $gender = $_REQUEST['gender'];
        $latitude = $_REQUEST['latitude'];
        $longitude = $_REQUEST['longitude'];
        $hostname = $_REQUEST['hostname'];

        $sql = $this->model->getUserLogin($login);
        if ($sql) {
            $response = ['fieldName' => 'qlogin', 'error' => 'true'];
        }
        else {
            $token = hash('whirlpool', $email.time());

            $this->model->createUser($firstName, $lastName, $email, $login, $password, $gender, $token, $latitude, $longitude);
            $response = ['error' => 'false'];

            $message = "<p>Hello, $lastName $firstName!</p><p>You need to confirm your email address to complete your Matcha account.</p><p>It's easy — just click <a href='http://$hostname:8080/php/activateAccount?token=$token&hostname=$hostname'>HERE</a>.</p>";
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
        $userId = $_REQUEST['userId'];
        $action = $_REQUEST['action'];
        $sql = $this->model->getUserLikesViews($userId, $action);
        echo json_encode($sql);
    }

    public function activateAccountAction() {
        $token = $_REQUEST['token'];
        $hostname = $_REQUEST['hostname'];
        $this->model->activateAccount($token);
        header("Location: http://$hostname:3000/");
    }

    public function prewUserAction() {
        $idWho = $_REQUEST['idWho'];
        $idWhom = $_REQUEST['idWhom'];
        $user = $this->model->getUserId($idWhom);
        if ($user[0]['connection'] != 'online') {
            $user[0]['connection'] = $this->model->lastConnection($user[0]['connection']);
        }
        $photo = $this->model->getUserPhoto($idWhom);
        $tags = $this->model->getUserTags($idWhom);
        $this->model->getViewed($idWho, $idWhom);
        array_push($user, $photo, $tags);
        echo json_encode($user);
    }

    public function forgotPassAction() {
        $login = $_REQUEST['login'];
        $email = $_REQUEST['email'];
        $sql = $this->model->getUserLogin($login);
        if ($sql) {
            $firstName = $sql[0]['firstName'];
            $lastName = $sql[0]['lastName'];
            if ($sql[0]['email'] === $email) {
                $new_password = time();
                $message = "<p>Hello, $lastName $firstName!</p><p>Your new password on Matcha is <b>".$new_password."</b>.</p>";
                $password = hash('whirlpool', $new_password);
                $this->model->changePass($password, $login, $email);
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
                $response = ["error" => false];
            }
            else {
                $response = ["fieldName" => "email", "error" => true];
            }
        }
        else {
            $response = ["fieldName" => "login", "error" => true];
        }
        echo json_encode($response);
    }

    public function changeConnectionAction() {
        $userId = $_REQUEST['userId'];
        $connection = $_REQUEST['connection'];

        $this->model->changeConnection($userId, $connection);
    }
}
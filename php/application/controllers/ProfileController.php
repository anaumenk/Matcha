<?php

namespace application\controllers;

use application\core\Controller;

class ProfileController extends Controller {

    public function editInfoAction() {
        $userId = trim($_REQUEST['userId']);
        $firstName = trim($_REQUEST['firstName']);
        $lastName = trim($_REQUEST['lastName']);
        $email = trim($_REQUEST['email']);
        $gender = trim($_REQUEST['gender']);
        $orientation = trim($_REQUEST['orientation']);
        $occupation = trim($_REQUEST['occupation']);
        $biography = trim($_REQUEST['biography']);
        $birth = trim($_REQUEST['birth']);
        $siteColor = trim($_REQUEST['siteColor']);
        $tags = trim($_REQUEST['tags']);

        $this->model->editUser($userId, $firstName, $lastName, $email, $gender, $orientation, $occupation,
            $biography, $birth, $siteColor, $tags);
    }

    public function editPhotosAction() {
        $userId = trim($_REQUEST['userId']);
        $one = trim($_REQUEST['1']);
        $two = trim($_REQUEST['2']);
        $three = trim($_REQUEST['3']);
        $four = trim($_REQUEST['4']);
        $five = trim($_REQUEST['5']);

        $this->model->editPhoto($userId, $one, $two, $three, $four, $five);
    }

    public function addPhotoAction() {
        $userId = trim($_REQUEST['userId']);
        $newPhoto = trim($_REQUEST['newPhoto']);
        $photoId = trim($_REQUEST['photoId']);

        $newPhoto = preg_replace("/^.+base64,/", "", $newPhoto);
        $newPhoto = str_replace(' ','+', $newPhoto);
        $image_data = base64_decode($newPhoto);

        $name = "images/photo".$_SERVER['REQUEST_TIME'].".png";
        $fullName = "../app/src/".$name;

        file_put_contents($fullName, $image_data);

        $this->model->addPhoto($userId, $name, $photoId);
    }
}
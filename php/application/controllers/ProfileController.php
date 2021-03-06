<?php

namespace application\controllers;

use application\core\Controller;

class ProfileController extends Controller {

    public function editInfoAction() {
        $userId = $_REQUEST['userId'];
        $firstName = $_REQUEST['firstName'];
        $lastName = $_REQUEST['lastName'];
        $email = $_REQUEST['email'];
        $gender = $_REQUEST['gender'];
        $orientation = $_REQUEST['orientation'];
        $occupation = $_REQUEST['occupation'];
        $biography = addslashes($_REQUEST['biography']);
        $birth = $_REQUEST['birth'];
        $latitude = $_REQUEST['latitude'];
        $longitude = $_REQUEST['longitude'];
        $locationChecked = $_REQUEST['locationChecked'];
        $this->model->editUser($userId, $firstName, $lastName, $email, $gender, $orientation, $occupation,
            $biography, $birth, $latitude, $longitude, $locationChecked);
    }

    public function editPhotosAction() {
        $userId = $_REQUEST['userId'];
        $one = $_REQUEST['1'];
        $two = $_REQUEST['2'];
        $three = $_REQUEST['3'];
        $four = $_REQUEST['4'];
        $five = $_REQUEST['5'];

        $this->model->editPhoto($userId, $one, $two, $three, $four, $five);
    }

    public function addPhotoAction() {
        $userId = $_REQUEST['userId'];
        $newPhoto = $_REQUEST['newPhoto'];

        $photoId = $_REQUEST['photoId'];
        $newPhoto = preg_replace("/^.+base64,/", "", $newPhoto);
        $newPhoto = str_replace(' ','+', $newPhoto);
        $image_data = base64_decode($newPhoto);
        $name = "images/photo".$_SERVER['REQUEST_TIME'].".png";
        $fullName = "../app/src/".$name;
        file_put_contents($fullName, $image_data);
        $this->model->addPhoto($userId, $name, $photoId);;
    }

    public function fakeUserAction() {
        $who = $_REQUEST['who'];
        $whom = $_REQUEST['whom'];

        $response = $this->model->fakeUser($who, $whom);
        echo json_encode($response);
    }

    public function blockUserAction() {
        $who = $_REQUEST['who'];
        $whom = $_REQUEST['whom'];

        $this->model->blockUser($who, $whom);
    }

    public function likeUserAction() {
        $who = $_REQUEST['who'];
        $whom = $_REQUEST['whom'];

        $this->model->likeUser($who, $whom);
    }

    public function unLikeUserAction() {
        $who = $_REQUEST['who'];
        $whom = $_REQUEST['whom'];

        $this->model->unLikeUser($who, $whom);
    }

    public function notificationAction() {
        $userId = $_REQUEST['userId'];

        $response = $this->model->getNotifications($userId);
        echo json_encode($response);
    }

    public function clearNotificationAction() {
        $userId = $_REQUEST['userId'];
        $this->model->clearNotifications($userId);
    }

    public function newTagAction() {
        $userId = $_REQUEST['userId'];
        $newTag = $_REQUEST['newTag'];

        $response = $this->model->addNewTag($userId, $newTag);
        echo json_encode($response);
    }

    public function delTagAction() {
        $userId = $_REQUEST['userId'];
        $tagForDel = $_REQUEST['tagForDel'];

        $this->model->delTag($userId, $tagForDel);
    }

    public function getViewedAction() {
        $idWho = $_REQUEST['userId'];
        $idWhom = $_REQUEST['idWhom'];

        $this->model->getViewed($idWho, $idWhom);
    }
}
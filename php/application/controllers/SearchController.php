<?php

namespace application\controllers;

use application\core\Controller;

class SearchController extends Controller {

    public function searchAction() {
        $userId = $_REQUEST['userId'];
        $sortBy = $_REQUEST['sortBy'];
        $AgeStart = $_REQUEST['AgeStart'];
        $AgeEnd = $_REQUEST['AgeEnd'];
        $DistanceStart = $_REQUEST['DistanceStart'];
        $DistanceEnd = $_REQUEST['DistanceEnd'];
        $RatingStart = $_REQUEST['RatingStart'];
        $RatingEnd = $_REQUEST['RatingEnd'];
        $tags = $_REQUEST['tags'];
        $latitude = $_REQUEST['latitude'];
        $longitude = $_REQUEST['longitude'];

        $response = $this->model->doSeach($userId, $sortBy, $AgeStart, $AgeEnd, $DistanceStart, $DistanceEnd, $RatingStart,
            $RatingEnd, $tags, $latitude, $longitude);

        echo json_encode($response);
    }

    public function findMatchesAction() {
        $userId = $_REQUEST['userId'];
        $sortBy = $_REQUEST['sortBy'];
        $AgeStart = $_REQUEST['AgeStart'];
        $AgeEnd = $_REQUEST['AgeEnd'];
        $DistanceStart = $_REQUEST['DistanceStart'];
        $DistanceEnd = $_REQUEST['DistanceEnd'];
        $RatingStart = $_REQUEST['RatingStart'];
        $RatingEnd = $_REQUEST['RatingEnd'];
        $tags = $_REQUEST['tags'];
        $gender = $_REQUEST['gender'];
        $orientation = $_REQUEST['orientation'];
        $latitude = $_REQUEST['latitude'];
        $longitude = $_REQUEST['longitude'];

        $response = $this->model->dofindMatches($userId, $sortBy, $AgeStart, $AgeEnd, $DistanceStart, $DistanceEnd, $RatingStart,
            $RatingEnd, $gender, $orientation, $tags, $latitude, $longitude);

        echo json_encode($response);
    }

}
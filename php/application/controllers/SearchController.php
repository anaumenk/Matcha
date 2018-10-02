<?php

namespace application\controllers;

use application\core\Controller;

class SearchController extends Controller {

    public function searchAction() {
        $userId = trim($_REQUEST['userId']);
        $sortBy = trim($_REQUEST['sortBy']);
        $AgeStart = trim($_REQUEST['AgeStart']);
        $AgeEnd = trim($_REQUEST['AgeEnd']);
        $DistanceStart = trim($_REQUEST['DistanceStart']);
        $DistanceEnd = trim($_REQUEST['DistanceEnd']);
        $RatingStart = trim($_REQUEST['RatingStart']);
        $RatingEnd = trim($_REQUEST['RatingEnd']);
        $tags = trim($_REQUEST['tags']);
        $search = trim($_REQUEST['search']);

        $response = $this->model->doSeach($userId, $sortBy, $AgeStart, $AgeEnd, $DistanceStart, $DistanceEnd, $RatingStart,
            $RatingEnd, $tags, $search);

        echo json_encode($response);
    }

}
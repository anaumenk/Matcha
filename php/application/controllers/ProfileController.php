<?php

namespace application\controllers;

use application\core\Controller;

use application\lib\Db;

class ProfileController extends Controller {

    public function editAction() {
        $result = $this->model->getUser();
        var_dump($result);
        echo '<p>Edit Profile</p>';
    }
}
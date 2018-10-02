<?php

namespace application\models;

use application\core\Model;

class Search extends Model{

    public function doSeach($userId, $sortBy, $AgeStart, $AgeEnd, $DistanceStart, $DistanceEnd, $RatingStart,
                            $RatingEnd, $tags, $search) {
        $age = "((YEAR(CURRENT_DATE) - YEAR(birth)) -
            (DATE_FORMAT(CURRENT_DATE, '%m%d') < DATE_FORMAT(birth, '%m%d')))";
        $sql = $this->db->row("SELECT users.userId, users.firstName, users.birth, users.lastName, photos.1 AS photo,". $age ." AS age  
                               FROM users
                               INNER JOIN photos ON users.userId = photos.userId 
                               WHERE users.userId != '$userId'
                               AND ".$age." >= '$AgeStart'
                               AND ".$age." <= '$AgeEnd'
                               AND users.rating >= '$RatingStart'
                               AND users.rating <= '$RatingEnd'
                               ");
        return $sql;
    }

}
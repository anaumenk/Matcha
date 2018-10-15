<?php

namespace application\models;

use application\core\Model;

class Search extends Model{

    public function doSeach($userId, $sortBy, $AgeStart, $AgeEnd, $DistanceStart, $DistanceEnd, $RatingStart,
                            $RatingEnd, $tags, $latitude, $longitude) {
        $sort = ($sortBy == 'Age') ? 'users.birth DESC' : (($sortBy == 'Rating') ? 'users.rating DESC' : 'km ASC');
        $age = "((YEAR(CURRENT_DATE) - YEAR(birth)) -
            (DATE_FORMAT(CURRENT_DATE, '%m%d') < DATE_FORMAT(birth, '%m%d')))";
        $km = "DEGREES(ACOS(SIN(RADIANS('$latitude')) * SIN(RADIANS(users.latitude)) + COS(RADIANS('$latitude')) * COS(RADIANS(users.latitude)) * COS(RADIANS('$longitude' - users.longitude)))) * 60 * 1.1515 * 1.609344";
        $sql = $tags != '' ? $this->db->row("SELECT users.userId, users.firstName, users.gender, users.orientation, users.birth, users.lastName, photos.1 AS photo,". $age ." AS age,
        ".$km." AS km  
                               FROM users
                               INNER JOIN photos ON users.userId = photos.userId 
                               INNER JOIN tags ON tags.userId = users.userId
                               WHERE users.userId != '$userId'
                               AND (".$km." BETWEEN '$DistanceStart' AND '$DistanceEnd')
                               AND tags.text IN ('$tags')
                               AND (".$age." BETWEEN '$AgeStart' AND '$AgeEnd')
                               AND (users.rating BETWEEN '$RatingStart' AND '$RatingEnd')
                               ORDER BY ".$sort)
            : $this->db->row("SELECT users.userId, users.firstName, users.gender, 
            users.orientation, users.birth, users.lastName, photos.1 AS photo,". $age ." AS age, ".$km." AS km 
                               FROM users
                               INNER JOIN photos ON users.userId = photos.userId 
                               WHERE users.userId != '$userId'
                               AND (".$km." BETWEEN '$DistanceStart' AND '$DistanceEnd')
                               AND (".$age." BETWEEN '$AgeStart' AND '$AgeEnd')
                               AND (users.rating BETWEEN '$RatingStart' AND '$RatingEnd')
                               ORDER BY ".$sort);
        return $sql;
    }

    public function dofindMatches($userId, $sortBy, $AgeStart, $AgeEnd, $DistanceStart, $DistanceEnd, $RatingStart,
                            $RatingEnd, $userGender, $userOrientation, $tags, $latitude, $longitude) {
        if (($userGender == 'woman' || $userGender == 'man') && $userOrientation == 'straight') {
            $gender = $userGender == 'woman' ? 'man' : 'woman' ;
            $orientation = 'straight\' OR users.orientation = \'bisexual';
        }
        else if (($userGender == 'woman' || $userGender == 'man') && $userOrientation == 'gay') {
            $gender = $userGender;
            $orientation = 'gay\' OR users.orientation = \'bisexual';
        }
        $sort = ($sortBy == 'Age') ? 'users.birth DESC' : (($sortBy == 'Rating') ? 'users.rating DESC' : 'users.rating ASC');
        $km = "DEGREES(ACOS(SIN(RADIANS('$latitude')) * SIN(RADIANS(users.latitude)) + COS(RADIANS('$latitude')) * COS(RADIANS(users.latitude)) * COS(RADIANS('$longitude' - users.longitude)))) * 60 * 1.1515 * 1.609344";

        $age = "((YEAR(CURRENT_DATE) - YEAR(birth)) -
            (DATE_FORMAT(CURRENT_DATE, '%m%d') < DATE_FORMAT(birth, '%m%d')))";
        if (($userGender == 'woman' || $userGender == 'man') && $userOrientation == 'bisexual') {
            $sql = $tags != '' ? $this->db->row("SELECT users.userId, users.firstName, users.gender, users.orientation, users.birth, users.lastName, photos.1 AS photo,". $age ." AS age,
            ".$km." AS km   
                               FROM users
                               INNER JOIN photos ON users.userId = photos.userId 
                               INNER JOIN tags ON users.userId = tags.userId
                               WHERE users.userId 
                               NOT IN (SELECT friend.user1 FROM friend WHERE friend.user2 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT friend.user2 FROM friend WHERE friend.user1 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT block.idWhom FROM block WHERE block.idWho = '$userId')
                               AND users.userId 
                               NOT IN (SELECT fake.idWhom FROM fake WHERE fake.idWho = '$userId')
                               AND users.userId != '$userId'
                               AND (".$km." BETWEEN '$DistanceStart' AND '$DistanceEnd')
                               AND tags.text IN ('$tags')
                               AND (".$age." BETWEEN '$AgeStart' AND '$AgeEnd')
                               AND (users.rating BETWEEN '$RatingStart' AND '$RatingEnd')
                               AND (users.orientation = 'bisexual' OR (users.gender = '$userGender' AND users.orientation = 'gay'))
                               ORDER BY ".$sort)
                : $this->db->row("SELECT users.userId, users.firstName, users.gender, users.orientation, users.birth, users.lastName, photos.1 AS photo,". $age ." AS age,
                ".$km." AS km  
                               FROM users
                               INNER JOIN photos ON users.userId = photos.userId 
                               WHERE users.userId 
                               NOT IN (SELECT friend.user1 FROM friend WHERE friend.user2 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT friend.user2 FROM friend WHERE friend.user1 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT block.idWhom FROM block WHERE block.idWho = '$userId')
                               AND users.userId 
                               NOT IN (SELECT fake.idWhom FROM fake WHERE fake.idWho = '$userId')
                               AND users.userId != '$userId'
                               AND (".$km." BETWEEN '$DistanceStart' AND '$DistanceEnd')
                               AND (".$age." BETWEEN '$AgeStart' AND '$AgeEnd')
                               AND (users.rating BETWEEN '$RatingStart' AND '$RatingEnd')
                               AND (users.orientation = 'bisexual' OR (users.gender = '$userGender' AND users.orientation = 'gay'))
                               ORDER BY ".$sort);
        }
        else {
            $sql = $tags != '' ? $this->db->row("SELECT users.userId, users.firstName, users.gender, users.orientation, users.birth, users.lastName, photos.1 AS photo,". $age ." AS age,
            ".$km." AS km  
                               FROM users
                               INNER JOIN photos ON users.userId = photos.userId 
                               INNER JOIN tags ON users.userId = tags.userId
                               WHERE users.userId 
                               NOT IN (SELECT friend.user1 FROM friend WHERE friend.user2 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT friend.user2 FROM friend WHERE friend.user1 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT block.idWhom FROM block WHERE block.idWho = '$userId')
                               AND users.userId 
                               NOT IN (SELECT fake.idWhom FROM fake WHERE fake.idWho = '$userId')
                               AND users.userId != '$userId'
                               AND (".$km." BETWEEN '$DistanceStart' AND '$DistanceEnd')
                               AND tags.text IN ('$tags')
                               AND (".$age." BETWEEN '$AgeStart' AND '$AgeEnd')
                               AND (users.rating BETWEEN '$RatingStart' AND '$RatingEnd')
                               AND (users.gender = '$gender')
                               AND (users.orientation = '$orientation')
                               ORDER BY ".$sort)
            : $this->db->row("SELECT users.userId, users.firstName, users.gender, users.orientation, users.birth, users.lastName, photos.1 AS photo,". $age ." AS age,
            ".$km." AS km  
                               FROM users
                               INNER JOIN photos ON users.userId = photos.userId 
                               WHERE users.userId 
                               NOT IN (SELECT friend.user1 FROM friend WHERE friend.user2 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT friend.user2 FROM friend WHERE friend.user1 = '$userId')
                               AND users.userId 
                               NOT IN (SELECT block.idWhom FROM block WHERE block.idWho = '$userId')
                               AND users.userId 
                               NOT IN (SELECT fake.idWhom FROM fake WHERE fake.idWho = '$userId')
                               AND users.userId != '$userId'
                               AND (".$km." BETWEEN '$DistanceStart' AND '$DistanceEnd')
                               AND (".$age." BETWEEN '$AgeStart' AND '$AgeEnd')
                               AND (users.rating BETWEEN '$RatingStart' AND '$RatingEnd')
                               AND (users.gender = '$gender')
                               AND (users.orientation = '$orientation')
                               ORDER BY ".$sort);
        }
        return $sql;
    }
}
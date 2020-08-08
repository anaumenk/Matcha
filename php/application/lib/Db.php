<?php

namespace application\lib;
use PDOException;
use PDO;

class Db {
    protected $db;

    public function __construct() {
        $config = require 'application/config/db.php';

        try{
            $this->db = new PDO("mysql:host=$config[host];dbname=$config[dbname]", $config['user'], $config['password']);
        } catch (PDOException $e) {
            echo 'Database connection failed: ' . $e->getMessage();
        }
    }

    public function query($sql, $params = []) {
        $stmt = $this->db->prepare($sql);
        if (!empty($params)) {
            foreach ($params as $key => $val) {
                $stmt->bindValue(':' . $key, $val);
            }
        }
        $stmt->execute();
        return $stmt;
    }

    public function row($sql, $params = []) {
        $result = $this->query($sql, $params);
        return $result->fetchAll(PDO::FETCH_ASSOC);
    }

    public function column($sql, $params = []) {
        $result = $this->query($sql, $params);
        return $result->fetchColumn();
    }
}

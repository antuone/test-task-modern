<?php

class Catalog
{
    private $host = '127.0.0.1';
    private $user = 'root';
    private $password = 'root';
    private $dbname = 'Catalog';
    private $port = '3306';
    private $socket = '';
    private $connect;

    public function __construct() {
        $this->connect = new mysqli($this->host, $this->user, $this->password, $this->dbname, $this->port, $this->socket) or die ('Could not connect to the database server' . mysqli_connect_error());
    }
    
    public function echo_get() {
        $DATA = [];
        
        $stmt = $this->connect->prepare("SELECT * FROM Category");
        $stmt->execute();
        $result = $stmt->get_result();
        $results = [];
        while ($row = $result->fetch_assoc()) {
            $results[] = $row;
        }
        $DATA['category'] = $results;

        $stmt = $this->connect->prepare("SELECT * FROM FoodProduct");
        $stmt->execute();
        $result = $stmt->get_result();
        $results = [];
        while ($row = $result->fetch_assoc()) {
            $results[] = $row;
        }
        $DATA['FoodProduct'] = $results;
        
        $stmt = $this->connect->prepare("SELECT * FROM NotFoodProduct");
        $stmt->execute();
        $result = $stmt->get_result();
        $results = [];
        while ($row = $result->fetch_assoc()) {
            $results[] = $row;
        }
        $stmt->close();
        $DATA['NotFoodProduct'] = $results;

        header("Content-Type: application/json");
        echo json_encode($DATA, JSON_UNESCAPED_UNICODE | JSON_FORCE_OBJECT);

    }

    public function ChangeCategoryName($id, $name) {
        $stmt = $this->connect->prepare("UPDATE Category SET name=? WHERE id=?");
        $stmt->bind_param("si", $name, $id);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function ChangeCategoryRootID($id_sub_category, $id_category) {
        $stmt = $this->connect->prepare("UPDATE Category SET id_sub_category=? WHERE id=?");
        $stmt->bind_param("ii", $id_sub_category, $id_category);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function ChangeFoodRootID($id_sub_category, $id_category) {
        $stmt = $this->connect->prepare("UPDATE FoodProduct SET id_category=? WHERE id=?");
        $stmt->bind_param("ii", $id_sub_category, $id_category);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function ChangeNotFoodRootID($id_sub_category, $id_category) {
        $stmt = $this->connect->prepare("UPDATE NotFoodProduct SET id_category=? WHERE id=?");
        $stmt->bind_param("ii", $id_sub_category, $id_category);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function ChangeFoodProduct($name, $price, $id) {
        $stmt = $this->connect->prepare("UPDATE FoodProduct SET name=?, price=? WHERE id=?");
        $stmt->bind_param("sii", $name, $price, $id);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function ChangeNotFoodProduct($name, $url, $id_color, $price, $id) {
        $stmt = $this->connect->prepare("UPDATE NotFoodProduct SET name=?, URL=?, id_color=?, price=? WHERE id=?");
        $stmt->bind_param("ssiii", $name, $url, $id_color, $price, $id);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function NewCategory($id, $name) {
        $stmt = $this->connect->prepare("INSERT INTO Category (id_sub_category, name) VALUES (?, ?)");
        $stmt->bind_param("is", $id, $name);
        if ($stmt->execute()) {
            echo $stmt->insert_id;
        }
        $stmt->close();
    }

    public function NewFoodProduct($id, $name, $price) {
        $stmt = $this->connect->prepare("INSERT INTO FoodProduct (id_category, name, price) VALUES (?, ?, ?)");
        $stmt->bind_param("isi", $id, $name, $price);
        if ($stmt->execute()) {
            echo $stmt->insert_id;
        }
        $stmt->close();
    }

    public function NewNotFoodProduct($id, $name, $price, $color, $url) {
        $stmt = $this->connect->prepare("INSERT INTO NotFoodProduct (id_category, name, price, id_color, URL) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("isiis", $id, $name, $price, $color, $url);
        if ($stmt->execute()) {
            echo $stmt->insert_id;
        }
        $stmt->close();
    }

    public function RemoveNotFoodProduct($id) {
        $stmt = $this->connect->prepare("DELETE FROM NotFoodProduct WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function RemoveFoodProduct($id) {
        $stmt = $this->connect->prepare("DELETE FROM FoodProduct WHERE id=?");
        $stmt->bind_param("i", $id);
        if ($stmt->execute()) {
            echo 'ok';
        } else {
            echo $stmt->error;
        }
        $stmt->close();
    }

    public function RemoveCategory($id) {
        $stmt1 = $this->connect->prepare("DELETE FROM FoodProduct WHERE id_category=?");
        $stmt1->bind_param("i", $id);
        
        $stmt2 = $this->connect->prepare("DELETE FROM NotFoodProduct WHERE id_category=?");
        $stmt2->bind_param("i", $id);

        $stmt3 = $this->connect->prepare("DELETE FROM Category WHERE id=? or id_sub_category=?");
        $stmt3->bind_param("ii", $id, $id);
        if ($stmt1->execute() && $stmt2->execute() && $stmt3->execute()) {
            echo 'ok';
        } else {
            echo 'Remove Category Error';
        }
        $stmt1->close();$stmt2->close();$stmt3->close();
    }
}

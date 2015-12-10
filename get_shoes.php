<?php

ini_set("default_charset", "utf-8");

header("Content-Type: application/json; charset=utf-8");

$pass = rtrim(file_get_contents("sql_pass.txt"));

$con = mysqli_connect("mysql513.loopia.se", "98anve32@k132604", $pass, "kodlabb_se_db_6_db_7_db_2_db_13");

mysqli_set_charset($con, "utf8mb4");

if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

if ($_POST) {
    if ($_POST['search']) {
        $searchVars = $_POST['search'];
        $query = "SELECT * FROM shoes"

        if ($searchVars['gender']) {
            $query = $query . " WHERE Gender = " . $searchVars['gender'];
        }

        if ($searchVars['maxPrice']) {
            $query = $query . " AND Price <= " . $searchVars['maxPrice'];
        }

        if ($searchVars['type']) {
            $query = $query . " AND Type = " . $searchVars['type'];
        }

        if ($searchVars['color']) {
            $query = $query . " AND Color = " . $searchVars['color'];
        }
    }
    else {
        $query = "SELECT * FROM shoes";
    }

    $results = [];

    if ($result = mysqli_query($con, $query)) {
        $i = 0;
        while ($object = mysqli_fetch_object($result)) {
            $results[$i] = new stdClass();

            $results[$i]->Name = $object->Name;
            $results[$i]->Brand = $object->Brand;
            $results[$i]->Color = $object->Color;
            $results[$i]->Type = $object->Type;
            $results[$i]->MinSize = $object->MinSize;
            $results[$i]->MaxSize = $object->MaxSize;
            $results[$i]->Gender = $object->Gender;
            $results[$i]->Image = $object->Image;
            $results[$i]->Price = $object->Price;

            $i += 1;
        }

        mysqli_free_result($result);
    }

    echo json_encode($results);
}

mysqli_close($con);

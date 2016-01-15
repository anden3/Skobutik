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
    $query = $_POST['query'];

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

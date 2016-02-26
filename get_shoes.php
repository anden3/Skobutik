<?php

// Set the default charset to UTF-8
ini_set("default_charset", "utf-8");

// Set the content header.
header("Content-Type: application/json; charset=utf-8");

// Get the password from the password file.
$pass = rtrim(file_get_contents("sql_pass.txt"));

// Connect to the database.
$con = mysqli_connect("mysql513.loopia.se", "98anve32@k132604", $pass, "kodlabb_se_db_6_db_7_db_2_db_13");

// Set the MySQLi charset to UTF-8mb4
mysqli_set_charset($con, "utf8mb4");

// If MySQLi fails to connect.
if (mysqli_connect_errno()) {
    // Echo the error.
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// If the script receives a POST-request.
if ($_POST) {
    // Set the $query to the POST-variable received.
    $query = $_POST['query'];

    // Set $results to an empty array.
    $results = [];

    // If MySQLi can execute the query, bind it to the $result variable.
    if ($result = mysqli_query($con, $query)) {
        // Set the index variable to 0.
        $i = 0;

        // Iterate over the rows in the $result.
        while ($object = mysqli_fetch_object($result)) {
            // Add an object to the array at the index position.
            $results[$i] = new stdClass();

            // Add all the values received to the object.
            $results[$i]->Name = $object->Name;
            $results[$i]->Brand = $object->Brand;
            $results[$i]->Description = $object->Description;
            $results[$i]->Color = $object->Color;
            $results[$i]->Type = $object->Type;
            $results[$i]->MinSize = $object->MinSize;
            $results[$i]->MaxSize = $object->MaxSize;
            $results[$i]->Gender = $object->Gender;
            $results[$i]->Image = $object->Image;
            $results[$i]->Price = $object->Price;

            // Increment the index variable by one.
            $i += 1;
        }

        // Free the result from memory.
        mysqli_free_result($result);
    }

    // Return the JSON-encoded object to the JS-script.
    echo json_encode($results);
}

// Close the MySQLi connection.
mysqli_close($con);

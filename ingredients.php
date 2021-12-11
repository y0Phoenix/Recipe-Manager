<?php

$conn = mysqli_connect('localhost', 'root', 'aaron', 'recipes');

if (isset($_GET)) {
    $query = 'SELECT * FROM ingredients';

    $result = mysqli_query($conn, $query);

    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);

    echo json_encode($data);
}

if (isset($_POST['ingredient'])) {
    echo 'Request Acknowledged Proccessing New Ingredient';

    $data = mysqli_real_escape_string($conn, $_POST['ingredient']);

    $query = "INSERT INTO ingredients(ingredients) VALUES('$data')";

    if (mysqli_query($conn, $query)) {
        echo 'New Recipe Sent To The DB';
    }
    else {
        echo mysqli_errno($conn);
    }
}

?>
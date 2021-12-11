<?php

$conn = mysqli_connect('localhost', 'root', 'aaron', 'recipes');

if (isset($_POST['username'])) {
    echo 'Proccessing Data ';

    $name = mysqli_real_escape_string($conn, $_POST['username']);
    $data= mysqli_real_escape_string($conn, $_POST['data']);

    echo 'Request Acknowledged '. $_POST['username'] .' ';
    echo 'Recipe Data '. $_POST['data']. ' ';

    $query = "INSERT INTO recipes(name, recipes) VALUES('$name', '$data')";

    if (mysqli_query($conn, $query)) {
        echo 'Data Sent';
    }
    else {
        echo 'ERROR: '. mysqli_errno($conn);
    }
}

?>
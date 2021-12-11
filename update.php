<?php

$conn = mysqli_connect('localhost', 'root', 'aaron', 'recipes');

global $data;

if (isset($_POST['username'])) {
    echo 'Proccessing Updated Data ';

    $name = mysqli_real_escape_string($conn, $_POST['username']);
    $data = mysqli_real_escape_string($conn, $_POST['data']);

    echo 'Request Acknowledged '. $_POST['username'] .' ';
    echo ' '. $_POST['data']. ' ';

    $query = "UPDATE recipes SET recipes='$data' WHERE name='$name'";

    if (mysqli_query($conn, $query)) {
        echo 'Updated Data Sent For '. $_POST['username'];
    }
    else {
        echo 'ERROR: '. mysqli_errno($conn);
    }
}

?> 
<?php
//connect
$conn = mysqli_connect('localhost', 'root', 'aaron', 'recipes');
// create search query
$query = 'SELECT * FROM recipes';
// get result
$result = mysqli_query($conn, $query);
// get data
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
// send data to js file
echo json_encode($data);

?>
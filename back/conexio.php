<?php

$servername = "localhost"; 
$username = "root"; 
$password = "root"; 
$dbname = "preguntas"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("La conexión asdfalló: " . $conn->connect_error);
}



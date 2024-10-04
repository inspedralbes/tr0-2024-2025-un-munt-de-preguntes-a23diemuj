<?php


// BASE DE DATOS SERVIDOR


$servername = "localhost"; 
$username = "a23diemujper_root"; 
$password = "D1egomujic@"; 
$dbname = "a23diemujper_preguntas"; 


// BASE DE DATOS LOCAL

/*
$servername = "localhost"; 
$username = "root"; 
$password = "root"; 
$dbname = "preguntas"; 
*/



$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("La conexión asdfalló: " . $conn->connect_error);
}



?>

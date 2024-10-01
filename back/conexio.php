<?php

$servername = "localhost"; 
$username = "a23diemujper_root"; 
$password = "D1egomujic@"; 
$dbname = "a23diemujper_preguntas"; 


include "datos.php";
$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("La conexión asdfalló: " . $conn->connect_error);
}else{

    echo "hola";
}


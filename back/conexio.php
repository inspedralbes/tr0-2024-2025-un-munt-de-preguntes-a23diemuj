<?php

$servername = "localhost"; 
$username = "a23diemujper_root"; 
$password = "D1egomujic@"; 
$dbname = "a23diemujper_preguntas"; 


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("La conexión asdfalló: " . $conn->connect_error);
}


$sql = "SELECT * FROM preguntas";

$result = $conn->query($sql);


if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"]. " - Pregunta: " . $row["pregunta"]. " - Respuesta 1: " . $row["resposta_1"]. "<br>";
    }
} else {
    echo "0 resultados";
}

<?php
include("../conexio.php");
echo"hola";
if ($_SERVER["REQUEST_METHOD"] == "POST"){
    echo "hola";
    $datosRecibidos= file_get_contents('php://input');
    $respuestas=json_decode($datosRecibidos);
    print_r($respuestas);
    
}



$conn->close();
?>
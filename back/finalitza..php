<?php

session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $datosRecibidos= file_get_contents('php://input');;
    $respuestas= json_decode($datosRecibidos,true);
    comprobarRespuesta($respuestas);
 
    





}



function comprobarRespuesta($datos){
$correctas=0;
$totales=count($datos);

foreach ($datos as $key => $value) {
    if($_SESSION["preguntas"][$key]==$value[$key]["id"] ){
     $correctas++;   

    } 
} 

//echo '{"correctas":'.$correctas.',"totales":'.$totales.' }';




}




?>
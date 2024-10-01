<?php

session_start();


if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $datosRecibidos= file_get_contents('php://input');
    $respuestas=json_decode($datosRecibidos,true);
    comprobarRespuesta($respuestas);
    
}


function comprobarRespuesta($datos){
    $correctas=0;
    $totales = count($datos);
   
    
    
   foreach ($datos as $key => $value) {
        if($_SESSION["respuestas"][$key]==$value["id"] ){
         $correctas++;   
    
        } 
       
       
    } 
    
    $obj = new stdClass();
    $obj->correctas = $correctas;
    $obj->totales = $totales;
    
   
    print_r(json_encode($obj));
    

    
    
    
    }

session_destroy();
?>
<?php
 
 
include("../../conexio.php");

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    
    $datosRecibidos= file_get_contents('php://input');
    $respuestas=json_decode($datosRecibidos,true);

    $pregunta=$respuestas["pregunta"];
    $resposta_0=$respuestas["resposta_0"];
    $resposta_1=$respuestas["resposta_1"];
    $resposta_2= $respuestas["resposta_2"];
    $resposta_3= $respuestas["resposta_3"];
    $resposta_correcta=$respuestas["resposta_correcta"];
    $imatge=$respuestas["imatge"];
   
  $sql = "INSERT INTO preguntas (pregunta, resposta_0, resposta_1, resposta_2, resposta_3, resposta_correcta, imatge)
     VALUES ('$pregunta','$resposta_0','$resposta_1','$resposta_2','$resposta_3','$resposta_correcta','$imatge')";

$res;



if ($conn->query($sql) === TRUE) {
    $res="Nuevo registro insertado correctamente";
    

} else {
    $res="Error";
    
}

print_r(json_encode($res));

}


$conn->close();



?>
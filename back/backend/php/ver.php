<?php

include("../../conexio.php");

$sql = "SELECT * FROM preguntas;" ;

$result = $conn->query($sql);
$arr=[];



if ($result->num_rows > 0) {
   while($row = $result->fetch_assoc()) {
      $obj = new stdClass();
      $obj->id = $row["id"];
      $obj->pregunta = $row["pregunta"];
      $obj->imagen = $row["imagen"];
      $obj->resposta_0 = $row["resposta_0"];
      $obj->resposta_1 = $row["resposta_1"];
      $obj->resposta_2 = $row["resposta_2"];
      $obj->resposta_3 = $row["resposta_3"];
      $obj->resposta_correcta = $row["resposta_correcta"];
      array_push( $arr,$obj);
   }

   echo json_encode( $arr );


}




?>


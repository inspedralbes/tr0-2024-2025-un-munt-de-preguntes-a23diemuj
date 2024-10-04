<?php
include("../../conexio.php");




$sql="DELETE FROM `preguntas` WHERE `id` = $_GET[id]";


if ($conn->query($sql) === TRUE) {
    $res="Registro eliminado correctamente";
    

} else {
    $res="Error";
    
}

print_r(json_encode($res));



$conn->close();
?>
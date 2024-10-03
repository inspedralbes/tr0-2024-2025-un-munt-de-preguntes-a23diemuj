<?php
 
 
include("../../conexio.php");



if ($_SERVER["REQUEST_METHOD"] == "GET"){

if (isset($_GET["select"])){

    $sql="SELECT * FROM `preguntas` WHERE `id` = $_GET[select]";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $obj = new stdClass();
        while($row = $result->fetch_assoc()) {
           
           $obj->id = $row["id"];
           $obj->pregunta = $row["pregunta"];
           $obj->imatge = $row["imatge"];
           $obj->resposta_0 = $row["resposta_0"];
           $obj->resposta_1 = $row["resposta_1"];
           $obj->resposta_2 = $row["resposta_2"];
           $obj->resposta_3 = $row["resposta_3"];
           $obj->resposta_correcta = $row["resposta_correcta"];
           
        }
     
        echo json_encode( $obj );
     
     
     }
     
     
    


}
if (isset($_GET["update"])){


    $sql="UPDATE `preguntas` SET `pregunta` ='". $_GET["pregunta"]."',`resposta_0` = '$_GET[resposta_0]',`resposta_1` = '$_GET[resposta_1]',`resposta_2` = '$_GET[resposta_2]',`resposta_3` = '$_GET[resposta_3]',`resposta_correcta` = '$_GET[resposta_correcta]',`imatge` = '$_GET[imatge]' WHERE `id` = $_GET[update] ";
    


    if($conn->query($sql)){
        $res="Registro editado correctamente";

    }else{
        $res= "Error";

    }

    print_r(json_encode($res));


}
}


$conn->close();

?>
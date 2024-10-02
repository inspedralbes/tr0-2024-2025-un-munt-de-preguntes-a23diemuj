<?php
// cargar datos
include("conexio.php");


session_start();

// generar aleatoriamente las preguntas
$_SESSION["datos"] = json_decode($datos,true);
$_SESSION["preguntas"]=[];
$_SESSION["respuestas"]=[];




for ($i=0; $i < 10; $i++) { 
    
    $num=rand(0, 19);  
    $verificar=null;

    foreach ($_SESSION["preguntas"] as $key) {
        
        if($key == $num){
           $verificar=true;
       
          $i--;
          break;

        }
        else{
            $verificar=false;

        }
        
    }



    if($verificar==false){
        array_push($_SESSION["preguntas"],$num);

        
        
        
    }

}
$arr =[];
$obj = new stdClass();


$sql = "SELECT * FROM preguntas ORDER BY RAND() LIMIT 10;" ;

$result = $conn->query($sql);


if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $aux=0;
        $objAux = new stdClass();
        $objAux->id = $row["id"];
        $objAux->pregunta =$row["pregunta"];
        $objAux->respostes = [];
        
        for ($i=0; $i < 4; $i++) { 
            $objAuxi= new stdClass();
            $objAuxi->id = $i;
            $objAuxi->etiqueta = $row["resposta_".strval($i)];
            array_push($objAux->respostes, $objAuxi);
        }
        
        array_push($_SESSION["respuestas"],$row["resposta_correcta"]);
        $objAux->imatge =$row["imatge"];
        array_push($arr,$objAux);
    }
    $obj->preguntes= $arr;

} else {
    echo "0 resultados";
}


/*
foreach ($_SESSION["preguntas"] as $final => $indice) {
   
$objAux = new stdClass();

$objAux->id = $_SESSION["datos"]["preguntes"][$indice]["id"];
$objAux->pregunta =$_SESSION["datos"]["preguntes"][$indice]["pregunta"];
$objAux->respostes = [];

foreach ($_SESSION["datos"]["preguntes"][$indice]["respostes"] as $auxindice => $auxvalor) {

    $objAuxi= new stdClass();
    $objAuxi->id = $auxindice;
    $objAuxi->etiqueta = $auxvalor["etiqueta"];
    array_push($objAux->respostes, $objAuxi);
}
$objAux->imatge =$_SESSION["datos"]["preguntes"][$indice]["imatge"];
array_push($_SESSION["respuestas"],$_SESSION["datos"]["preguntes"][$indice]["resposta_correcta"]  );
array_push($arr,$objAux);
}

$obj->preguntes= $arr;

*/

$obj=json_encode($obj);

print_r($obj);



?>
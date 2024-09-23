<?php
// cargar datos
$datos = file_get_contents("./data.json");


session_start();

// generar aleatoriamente las preguntas
$_SESSION["datos"] = json_decode($datos,true);
$_SESSION["preguntas"]=[];




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

array_push($arr,$objAux);
}

$obj->preguntes= $arr;

$obj=json_encode($obj);

print_r($obj);



?>
<?php
// cargar datos
$datos = file_get_contents("./data.json");


session_start();

// generar aleatoriamente las preguntas, guardarla en una variable y muestra la primera pregunta
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


echo "[";
foreach ($_SESSION["preguntas"] as $final => $indice) {
    echo '{

    "id": "'.$_SESSION["datos"]["preguntes"][$indice]["id"].'",
    "imagen": "'.$_SESSION["datos"]["preguntes"][$indice]["imatge"].'",
    "pregunta": "'.$_SESSION["datos"]["preguntes"][$indice]["pregunta"].'",
    "opciones":[   '; 

foreach ($_SESSION["datos"]["preguntes"][$indice]["respostes"] as $auxindice => $auxvalor) {

 echo '    
        {
        "'.($auxindice+1).'": "'.$auxvalor["etiqueta"].'"
        }
       ';

       if( count( $_SESSION["datos"]["preguntes"][$indice]["respostes"])  > $auxindice +1){
echo ",";

       }


}
echo ']}';
if( count( $_SESSION["preguntas"])  > $final +1){
    echo ",";
    
           }


}
echo "]";


?>
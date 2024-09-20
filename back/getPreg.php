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


echo '{"preguntes" : [';
foreach ($_SESSION["preguntas"] as $final => $indice) {
    echo '{

    "id": "'.$_SESSION["datos"]["preguntes"][$indice]["id"].'",
    "pregunta": "'.$_SESSION["datos"]["preguntes"][$indice]["pregunta"].'",
    "respostes":[   '; 

foreach ($_SESSION["datos"]["preguntes"][$indice]["respostes"] as $auxindice => $auxvalor) {

 echo '    
        {
        "id": "'.$auxindice.'",
        "etiqueta": "'.$auxvalor["etiqueta"].'"
        }
       ';

       if( count( $_SESSION["datos"]["preguntes"][$indice]["respostes"])  > $auxindice +1){
echo ",";

       }
}


echo '], "imatge":"'.$_SESSION["datos"]["preguntes"][$indice]["imatge"].'"}';
if( count( $_SESSION["preguntas"])  > $final +1){
    echo ",";
    
           }


}

echo "]}";


?>
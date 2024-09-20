<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TEST</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    
</body>
</html>

<?php


// cargar datos
$datos = file_get_contents("./data.json");


session_start();

// mostar una a una las demas preguntas

if($_SERVER['REQUEST_METHOD']=== 'POST'){

    

    if(isset($_POST['indice']) && $_SESSION["aux"] < 10 ){
        array_push($_SESSION["respuestas"],$_POST['respuesta']);
        $aux=$_POST['indice'];
        echo "<br><img src='".$_SESSION["datos"]['preguntes'][$aux]['imatge']."' width='25%'>";
        echo "<br>";
        echo $_SESSION["datos"]['preguntes'][$aux]['pregunta'];
        
    
    
    }else{
        array_push($_SESSION["respuestas"],$_POST['respuesta']);
        header("Location: ./resultados.php");
        exit();
        
    }


    
    }
    
else{
       
// generar aleatoriamente las preguntas, guardarla en una variable y muestra la primera pregunta
$_SESSION["datos"] = json_decode($datos,true);

$repetir=[];


for ($i=0; $i < 10; $i++) { 
    
    $num=rand(0, 19);  
    $verificar=null;

    foreach ($repetir as $key) {
        
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
        array_push($repetir,$num);

        
        
        
    }

}
$_SESSION["aux"]=0;
$_SESSION["preguntas"]=$repetir;
$_SESSION["indice"]=$_SESSION["preguntas"][$_SESSION["aux"]];
$_SESSION["respuestas"]=[];
 

$aux=$_SESSION["indice"];
echo "<img src='".$_SESSION["datos"]['preguntes'][$aux]['imatge']."' width='25%'>";
echo "<br>"; 
echo $_SESSION["datos"]['preguntes'][$aux]['pregunta'];
    
}


 // muestra los botones
echo "<br>";
$_SESSION["aux"]++;
$_SESSION["indice"]=$_SESSION["preguntas"][$_SESSION["aux"]];


foreach ($_SESSION["datos"]['preguntes'][$aux]['respostes'] as $index => $key) {
       
    echo "<form action='./' method='post'>";        
    echo "<input type='hidden' id='indice' name='indice' value='".$_SESSION["indice"]."'>";
    echo "<input type='hidden' id='respuesta' name='respuesta' value='".$index."'>";
    echo "<button type='submit'>".$key['etiqueta']."</button>";
    echo "</form>";
    
    
}


     

   
  
   

?>



<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    session_destroy();
    header("Location: ./");
    exit();
}


$puntaje=0;
$preguntas=0;
foreach($_SESSION["preguntas"] as $index => $key ){

    if($_SESSION["datos"]["preguntes"][$key]["resposta_correcta"]==$_SESSION["respuestas"][$index]+1 ){
        $puntaje++;

    }
    $preguntas=$index+1;

}


echo $puntaje."/".$preguntas;


?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css">
</head>
<body>
    
<form action="./resultados.php" method="post">
        <button type="submit">JUGAR DE NUEVO</button>
    </form>


</body>
</html>
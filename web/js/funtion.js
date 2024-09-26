let data;
let arRespuestas=[];
let htmlEstat=[];


fetch('../back/getPreg.php')
  .then(response => response.json())
  .then(data => pintarPreguntas(data));



 

  


function pintarPreguntas(data){

let htmlString="";


for (let index = 0; index < data.preguntes.length; index++) {
   htmlString+="<div id='pregunta"+index+"' class='ocultar'>  </div>";   
}

document.getElementById("prueba").innerHTML=htmlString;
htmlString="";



for (let index = 0; index < data.preguntes.length; index++) {
   
   htmlString+= `<img src="${data.preguntes[index].imatge}" width='25%'> `;
   htmlString+=`<br><br>`;
   htmlString+=`${data.preguntes[index].pregunta}<br>`;
   
   
   for (let index1 = 0; index1 < data.preguntes[index].respostes.length; index1++) {
      let aux= data.preguntes[index].respostes[index1].etiqueta ;

      htmlString+=`<button onclick="reaccion(${index},${index1})"> ${aux} </button>`;
     
      if(index1%2!=0){
         htmlString+=`<br>`;
      }
      
   }
   htmlString+=`<br><br><br>`;
 
  document.getElementById("pregunta"+index).innerHTML=htmlString;;
   
   htmlString="";
  
   
}


   for (let index = 0; index < data.preguntes.length; index++) {
      arRespuestas.push(-1);
      htmlEstat.push("-");
      
   }
   document.getElementById("respuestas").innerHTML= htmlEstat;

   
}



function reaccion(pregunta, respuesta){
   
   if(htmlEstat[pregunta]=="*"){
      arRespuestas[pregunta]=-1;
      htmlEstat[pregunta]="-"; 

   }else{
      arRespuestas[pregunta]=respuesta;
      htmlEstat[pregunta]="*"; 


   }
   



   const estat=document.getElementById("respuestas");
   estat.innerHTML=htmlEstat;

  }


let contador=0;

function PasarPreguntas(){



if (contador==0){
document.getElementById("empezar").classList.add("ocultar");
document.getElementById("siguiente").classList.replace("ocultar","mostrar");
document.getElementById("anterior").classList.replace("ocultar","mostrar");
}else{
   document.getElementById("anterior").classList.replace("ocultar","mostrar");
   document.getElementById("pregunta"+(contador-1)).classList.replace("mostrar","ocultar");
}

document.getElementById("pregunta"+contador).classList.replace("ocultar","mostrar");

if(contador>htmlEstat.length-2){
   document.getElementById("siguiente").classList.replace("mostrar","ocultar");
   document.getElementById("enviar").classList.replace("ocultar","mostrar");
   contador++;
   console.log(contador)
}else{

   contador++;
}
}

function RegregarPreguntas(){
   contador--;
 
   if(contador>htmlEstat.length-2){
      document.getElementById("siguiente").classList.replace("ocultar","mostrar");
      document.getElementById("enviar").classList.replace("mostrar","ocultar");
   }

   if(contador==1){
   document.getElementById("anterior").classList.replace("mostrar","ocultar");
   }



   document.getElementById("pregunta"+contador).classList.replace("mostrar","ocultar");
   document.getElementById("pregunta"+(contador-1)).classList.replace("ocultar","mostrar");
   
}



function enviarRespuestas(){
   let data= [];
   arRespuestas.forEach(element =>  {
      obj = {};
      obj.id = element;
      data.push(obj)
   });



   console.log(data)

   fetch('../back/finalitza.php', {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Indicamos que los datos son en formato JSON
      },
      body: JSON.stringify(data) // Convertimos los datos a JSON antes de enviarlos
    }).then(respuesta => respuesta.json()).then( datos => console.log(datos))



}  



  


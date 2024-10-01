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
   
   htmlString+= `<img src="${data.preguntes[index].imatge}" width='50%'> `;
   htmlString+=`<br><br>`;
   htmlString+=`<p>${data.preguntes[index].pregunta}</p><br>`;
   
   
   for (let index1 = 0; index1 < data.preguntes[index].respostes.length; index1++) {
      let aux= data.preguntes[index].respostes[index1].etiqueta ;

      htmlString+=`<button id="${index}${index1}" class="btn" data-idpregunta="${index}" data-idrespuesta="${index1}"> ${aux} </button>`;
     
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
      htmlEstat.push(" ");
      
   }
document.getElementById("empezar").addEventListener("click", PasarPreguntas); 
document.getElementById("enviar").addEventListener("click", enviarRespuestas);   
document.getElementById("siguiente").addEventListener("click", PasarPreguntas);
document.getElementById("anterior").addEventListener("click", RegregarPreguntas);
document.getElementById("reiniciar").addEventListener("click", aux => location.reload());
  
   const buttones = document.querySelectorAll('.btn');

   buttones.forEach(botones => {
      
     botones.addEventListener('click', function() {
     
       const idRespuesta = this.getAttribute('data-idrespuesta');
       const idPregunta = this.getAttribute('data-idpregunta');
       
      reaccion(parseInt(idPregunta),parseInt(idRespuesta) );
       
     });
   });  


}


function iniciarTemporizador(params) {



      let tiempoRestante = 30;
      let intervalo; 
        if (intervalo) return;

        intervalo = setInterval(() => {
            if (tiempoRestante > 0) {
                tiempoRestante--; 
                Progreso(false);
            } else {
                clearInterval(intervalo); 
                alert("¡Tiempo terminado!");
                intervalo = null; 
                enviarRespuestas();

            }
        }, 1000); 
    }



let auxReaccion;
function reaccion(pregunta, respuesta){
   
   if(auxReaccion === pregunta.toString()+respuesta.toString()){

      if(!(document.getElementById(pregunta.toString()+respuesta.toString()).classList.contains("presionado"))){
      document.getElementById(pregunta.toString()+respuesta.toString()).classList.add("presionado");
      arRespuestas[pregunta]=respuesta;
      htmlEstat[pregunta]="*";
     

      }else{

      document.getElementById(pregunta.toString()+respuesta.toString()).classList.remove("presionado");
      arRespuestas[pregunta]=-1;
      htmlEstat[pregunta]="-"; 
     
   }

   }else{
      for (let index = 0; index < 4; index++) {
         
         if(document.getElementById(pregunta.toString()+index.toString()).classList.contains("presionado")){
            document.getElementById(pregunta.toString()+index.toString()).classList.remove("presionado");
            
         }

         
      }

      document.getElementById(pregunta.toString()+respuesta.toString()).classList.add("presionado");
      arRespuestas[pregunta]=respuesta;
      htmlEstat[pregunta]="*"; 
    
   }

 
   
  
   auxReaccion=pregunta.toString()+respuesta.toString();
   const estat=document.getElementById("respuestas");
   estat.innerHTML=htmlEstat;
   

  }

function Progreso(params) {
   const aux=document.getElementById("barra")
   let valor=parseInt(aux.value, 10);

   if(params){
      if(valor<100 ){
         aux.value+=10;

      }
   }else{
      if(valor>0){
         aux.value-=1;
      }

   }

}



let contador=0;

function PasarPreguntas(){



if (contador==0){
document.getElementById("respuestas").innerHTML= htmlEstat;
document.getElementById("empezar").classList.add("ocultar");
document.getElementById("titulo").classList.replace("titulo","ocultar");
document.getElementById("siguiente").classList.replace("ocultar","mostrar");
document.getElementById("barra").classList.replace("ocultar","mostrar");
iniciarTemporizador();

}else{
   document.getElementById("anterior").classList.replace("ocultar","mostrar");
   document.getElementById("pregunta"+(contador-1)).classList.replace("mostrar","ocultar");
}

document.getElementById("pregunta"+contador).classList.replace("ocultar","mostrar");

if(contador>htmlEstat.length-2){
   document.getElementById("siguiente").classList.replace("mostrar","ocultar");
   document.getElementById("enviar").classList.replace("ocultar","mostrar");
   contador++;
  
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

function ocultarTodo() {

   document.getElementById("enviar").classList.replace("mostrar","ocultar");
   document.getElementById("anterior").classList.replace("mostrar","ocultar");
   document.getElementById("siguiente").classList.replace("mostrar","ocultar");
   document.getElementById("pregunta"+(contador-1)).classList.replace("mostrar","ocultar");
   document.getElementById("barra").classList.add("ocultar");

}



function pantallaFinal(params) {
   correctas=params.correctas;
   totales=params.totales;
   html="";
  
  html+=`<h1 class="titulo"> Resultados </h1> <br>`; 
  html+=`<p>Preguntas Correctas: ${correctas}</p> <br>`;
  html+=`<p>Preguntas Totales: ${totales}</p>`;
  document.getElementById("pantallaFinal").innerHTML=html;
  document.getElementById("reiniciar").classList.replace("ocultar","mostrar")

}

function enviarRespuestas(){
   ocultarTodo();
   let data= [];
   arRespuestas.forEach(element =>  {
      obj = {};
      obj.id = element;
      data.push(obj)
   });



  

   fetch('../back/finalitza.php', {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Indicamos que los datos son en formato JSON
      },
      body: JSON.stringify(data) // Convertimos los datos a JSON antes de enviarlos
    }).then(respuesta => respuesta.json()).then( datos => pantallaFinal(datos))



}  



  


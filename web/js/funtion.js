let data;
let arRespuestas=[];
let htmlEstat=[];


fetch('../back/getPreg.php')
  .then(response => response.json())
  .then(data => pintarPreguntas(data));



 

  


function pintarPreguntas(data){

let htmlString="";


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
  
  
   
}


const divPartida= document.getElementById("partida");
   divPartida.innerHTML=htmlString;
   for (let index = 0; index < data.preguntes.length; index++) {
      arRespuestas.push(-1);
      htmlEstat.push("-");
   }

}
   
function reaccion(pregunta, respuesta){
   
   arRespuestas[pregunta]=respuesta;
   htmlEstat[pregunta]="*"; 
   const estat=document.getElementById("respuestas");
   estat.innerHTML=htmlEstat;

  }


function enviarRespuestas(){
   let data="[";

   arRespuestas.forEach((element,index) =>  {
     data+= '{"id":"'+element+'"}'; 

      if(arRespuestas.length>index+1){
         data+= ",";
      }

   });

   data+="]"

   console.log(data)

   fetch('../back/finalitza..php', {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Indicamos que los datos son en formato JSON
      },
      body: JSON.stringify(data) // Convertimos los datos a JSON antes de enviarlos
    }).then(respuesta => respuesta.json()).then( datos => console.log(datos))



}  



  


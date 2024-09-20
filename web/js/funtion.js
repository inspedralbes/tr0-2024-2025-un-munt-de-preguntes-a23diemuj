let data;

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

      htmlString+=`<button onclick="reaccion(${index},${index1} )"> ${aux} </button>`;
     
      if(index1%2!=0){
         htmlString+=`<br>`;
      }
      
   }
   htmlString+=`<br><br><br>`;
  
  
   
}




const divPartida= document.getElementById("partida");
   divPartida.innerHTML=htmlString;


}
   
function reaccion (pregunta, respuesta){
   
   alert("Has presionado la opcion "+(respuesta+1)+" de la pregunta "+(pregunta+1));
  
  }


inicio();

function inicio(){
fetch('./php/ver.php')
    .then(response => response.json())
    .then(data => verPreg(data));

    
    function verPreg(data){
            
        document.getElementById("tabla").innerHTML="";

        tabla=`<tr>
               <th></th>
               <th></th>
                <th>ID</th>
                <th>Pregunta</th>
                <th>Respuesta 0</th>
                <th>Respuesta 1</th>
                <th>Respuesta 2</th>
                <th>Respuesta 3</th>
                <th>Respuesta Correcta</th>
                <th>Imagen</th>

                
            </tr>`;

            document.getElementById("tabla").innerHTML=tabla;   

        data.forEach(valor => {
            
           
            tr="<tr>";   
            tr+=`<td><button id="editar" value="${valor.id}"> Editar</button></td>`;
            tr+=`<td><button id="eliminar" value="${valor.id}"> Eliminar</button></td>`;
            tr+=`<td>${valor.id} </td>`;
            tr+=`<td>${valor.pregunta} </td>`;
            tr+=`<td>${valor.resposta_0} </td>`;
            tr+=`<td>${valor.resposta_1} </td>`;
            tr+=`<td>${valor.resposta_2} </td>`;
            tr+=`<td>${valor.resposta_3} </td>`;
            tr+=`<td>${valor.resposta_correcta} </td>`;
            tr+=`<td>${valor.imagen} </td>`;
            tr+=`</tr>`;
            document.getElementById("tabla").innerHTML+=tr;

        });  
      


    }

}


document.getElementById("add").addEventListener("click", () =>{

    document.getElementById("adddiv").classList.replace("ocultar", "mostrar");  
    document.getElementById("alldiv").classList.replace("mostrar", "ocultar");  
    document.getElementById("add").classList.replace( "mostrar","ocultar");  
    document.getElementById("all").classList.replace("ocultar", "mostrar");  



});



document.getElementById("all").addEventListener("click", () => 
    {document.getElementById("alldiv").classList.replace("ocultar", "mostrar");
        document.getElementById("all").classList.replace("mostrar", "ocultar");  
        document.getElementById("add").classList.replace( "ocultar","mostrar"); 
        document.getElementById("adddiv").classList.replace("mostrar", "ocultar"); 

 });


 

 document.getElementById("Enviar").addEventListener("click", enviar);

function reiniciar() {
    inicio(); 
    
    document.getElementById("alldiv").classList.replace("ocultar", "mostrar");
    document.getElementById("all").classList.replace("mostrar", "ocultar");  
    document.getElementById("add").classList.replace( "ocultar","mostrar"); 
    document.getElementById("adddiv").classList.replace("mostrar", "ocultar");     
    document.getElementById("pregunta").value = "";
    document.getElementById("resposta_0").value = "";
    document.getElementById("resposta_1").value = "";
    document.getElementById("resposta_2").value = "";
    document.getElementById("resposta_3").value = "";
    document.getElementById("resposta_correcta").value = "";
    document.getElementById("imatge").value = "";



}




function enviar(){
        
   

    const datos = {
       
        pregunta: document.getElementById("pregunta").value,
        resposta_0: document.getElementById("resposta_0").value,
        resposta_1:document.getElementById("resposta_1").value,
        resposta_2:document.getElementById("resposta_2").value,
        resposta_3:document.getElementById("resposta_3").value,
        resposta_correcta: document.getElementById("resposta_correcta").value,
        imatge: document.getElementById("imatge").value


    }

    if(Object.values(datos).some(vacio)){

        alert("Rellena todos los campos");
    }else{

        fetch('./php/add.php',{
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(datos)
    
        })
        .then(response => response.json())
        .then(data => {alert(data), reiniciar()});

    }


   
  


function vacio(valor) {
    return valor === "" || valor === null || valor === undefined;

}


}
/*
editPreg(){


}



remPreg(){

}
*/
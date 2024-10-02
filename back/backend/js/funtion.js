document.getElementById("edit");
document.getElementById("all").addEventListener("click", allPreg);
document.getElementById("add").addEventListener("click", addPreg);;
document.getElementById("rem");
function enviar() {
    
}

function allPreg(){
    
    fetch('./php/ver.php')
    .then(response => response.json())
    .then(data => verPreg(data));

    
    function verPreg(data){
            


        data.forEach(valor => {
            tr="<tr>";    
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
        ocultarTodo();
        document.getElementById("alldiv").classList.replace("ocultar", "mostrar");    
      


    }

}

function ocultarTodo(){
    document.getElementById("alldiv").classList.replace( "mostrar","ocultar");  
    document.getElementById("adddiv").classList.replace( "mostrar","ocultar");  
    

}


function addPreg(){
    ocultarTodo();
    document.getElementById("adddiv").classList.replace("ocultar", "mostrar");  
    document.getElementById("Enviar").addEventListener("click", enviar);


    
   

  


}


function enviar(){
        
   

    const datos = {
       
        pregunta: document.getElementById("pregunta").value,
        resposta_0: document.getElementById("resposta_0").value,
        resposta_1:document.getElementById("resposta_1").value,
        resposta_2:document.getElementById("resposta_2").value,
        resposta_3:document.getElementById("resposta_3").value,
        resposta_correcta: document.getElementById("resposta_correcta").value,
        imagen: document.getElementById("imagen").value


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
        .then(data =>console.log(data));

    }


    console.log(datos);
  


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
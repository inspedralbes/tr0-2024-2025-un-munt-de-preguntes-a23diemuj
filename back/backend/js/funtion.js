inicio();

function inicio(){
reiniciar();
document.getElementById("alldiv").classList.replace("ocultar", "mostrar");
        document.getElementById("all").classList.replace("mostrar", "ocultar");  
        document.getElementById("add").classList.replace( "ocultar","mostrar"); 
        document.getElementById("adddiv").classList.replace("mostrar", "ocultar"); 
        
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

        data.forEach(valor =>  {
            
           
            tr=`<tr">`;   
            tr+=`<td><button name="edit" value="${valor.id}"> Editar</button></td>`;
            tr+=`<td><button name="rem" value="${valor.id}"> Eliminar</button>
             <div id="${valor.id}" class="ocultar">
            <button name="confir" value="${valor.id}">Confirmar</button> 
            <button name="cancel" >Cancelar</button></div> 
            </td> `;       
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
        
        document.getElementsByName("edit").forEach(element => {
            element.addEventListener("click", edit)
        });
      
        document.getElementsByName("rem").forEach(element => {
            element.addEventListener("click", borrar)
        });

        document.getElementsByName("confir").forEach(element => {
            element.addEventListener("click", confimar)
        });

        document.getElementsByName("cancel").forEach(element => {
            element.addEventListener("click", inicio)
        });
       

    }

}

function edit() {
    
    fetch('./php/edit.php?select='+this.value)
    .then(response => response.json())
    .then(data =>{ 

    document.getElementById("pregunta").value = data.pregunta;
    document.getElementById("resposta_0").value = data.resposta_0;
    document.getElementById("resposta_1").value = data.resposta_1;
    document.getElementById("resposta_2").value = data.resposta_2;
    document.getElementById("resposta_3").value = data.resposta_3;
    document.getElementById("resposta_correcta").value = data.resposta_correcta;
    document.getElementById("imatge").value = data.imatge;
    document.getElementById("adddiv").classList.replace("ocultar", "mostrar"); 
    document.getElementById("Editar").classList.replace("ocultar", "mostrar");   
    document.getElementById("Enviar").classList.add("ocultar");  
    document.getElementById("alldiv").classList.replace("mostrar", "ocultar");     
    document.getElementById("Editar").value=this.value;    



    } );


}


document.getElementById("Editar").addEventListener("click", editar);

function editar(){
    let pregunta = document.getElementById("pregunta").value;
    let resposta_0 = document.getElementById("resposta_0").value;
    let resposta_1 = document.getElementById("resposta_1").value;
    let resposta_2 = document.getElementById("resposta_2").value;
    let resposta_3 = document.getElementById("resposta_3").value;
    let resposta_correcta = document.getElementById("resposta_correcta").value;
    let imatge = document.getElementById("imatge").value;
    
    fetch('./php/edit.php?update='+this.value+'&pregunta=' + pregunta +'&resposta_0=' + resposta_0 +'&resposta_1=' + resposta_1 +
        '&resposta_2=' + resposta_2 +
        '&resposta_3=' + resposta_3 +
        '&resposta_correcta=' + resposta_correcta +
        '&imatge=' + imatge)
    .then(response => response.json())
    .then(data =>{alert(data), inicio()} );
    



}

function reiniciarForm(){




}


document.getElementById("add").addEventListener("click", () =>{
    document.getElementById("Editar").classList.replace("mostrar", "ocultar");  
    document.getElementById("Enviar").classList.replace("ocultar", "mostrar");  
    document.getElementById("adddiv").classList.replace("ocultar", "mostrar");  
    document.getElementById("alldiv").classList.replace("mostrar", "ocultar");  
    document.getElementById("add").classList.replace( "mostrar","ocultar");  
    document.getElementById("all").classList.replace("ocultar", "mostrar");  
    reiniciar();
    


});

document.getElementById("")




function confimar() {
    
    fetch('./php/rem.php?id='+this.value)
    .then(response => response.json())
    .then(data =>{ alert(data),inicio()} );
    
}

function borrar() {

this.classList.add("ocultar");
document.getElementById(this.value).classList.replace("ocultar", "mostrar");  

}






document.getElementById("all").addEventListener("click", () => 
    {document.getElementById("alldiv").classList.replace("ocultar", "mostrar");
        document.getElementById("all").classList.replace("mostrar", "ocultar");  
        document.getElementById("add").classList.replace( "ocultar","mostrar"); 
        document.getElementById("adddiv").classList.replace("mostrar", "ocultar"); 
        
 });


 

 document.getElementById("Enviar").addEventListener("click", enviar);

function reiniciar() {
   
    
     
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
        .then(data => {alert(data), inicio()});

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
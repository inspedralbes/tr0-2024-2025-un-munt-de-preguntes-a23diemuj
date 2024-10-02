document.getElementById("edit");
document.getElementById("enviar").addEventListener("click", aux => document.write("hola"));
document.getElementById("all").addEventListener("click", allPreg);
document.getElementById("add").addEventListener("click", addPreg);;
document.getElementById("rem");



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

        document.getElementById("alldiv").classList.replace("ocultar", "mostrar");    
        document.getElementById("all").classList.add("ocultar");


    }

}

function addPreg(){

    fetch('./php/ver.php')
    .then(response => response.json())
    .then(data => verPreg(data));


    
    document.getElementById("adddiv").classList.replace("ocultar", "mostrar");  


}
/*
editPreg(){


}



remPreg(){

}
*/
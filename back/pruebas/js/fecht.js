
function info(){
    let data;

    

    fetch('http://localhost/ProyectoTEST_Server/getPreg.php')
      .then(response => response.json())
      .then(data => {
        
        
       
       
        document.write(data);
    

      })

      


}


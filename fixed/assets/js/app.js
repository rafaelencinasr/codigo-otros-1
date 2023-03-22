/* 
  Descripcion del funcionamiento del programa:

  Este programa lo que hace es realizar un llamado fetch a la API REST de Github.
  Especificamente busca obtener el "blog" y la "location" de un usuario.
  En caso de recibir un error en el fetch, (con catch) se muestra un error en consola y en el DOM,
  y en caso de recibir una respuesta 404 "Not Found" tambien se muestra un error.

  Si el usuario existe, se recibe su "blog" y "location", y se muestra en el DOM. 

*/

// 
const baseEndpoint = 'https://api.github.com';
const usersEndpoint = `${baseEndpoint}/users`;
// Hay que utilizar mejor nombre de variables
// El query selector de username le hacia falta el "." que indica que es una clase
const usernameDOMLocation = document.querySelector('.username');
// EL query selector de blog estaba escrito como si fuera un id ("#"), en lugar de una clase
const blog = document.querySelector('.blog');
const userGPS = document.querySelector('.location');


// Funcion asincrona para obtener nombre, blog, y location de un usuario de github
 async function displayUser(username) {
  // Desplegar "cargando..." por mientras se recibe la respuesta de la API
  usernameDOMLocation.textContent = 'cargando...';
  await fetch(`${usersEndpoint}/${username}`)
  //Aunque recibamos un 404, fetch esta aceptando esta respuesta como correcta, hay que mostrar un error en este caso especifico
    .then(res=>res.json())
    .then(data=>{
      // Si se recibe un json con un mensaje de "Not Found" mostramos un error en consola y en el DOM
      if(data.message="Not Found"){
        console.error("Error 404: Usuario no encontrado.");
        usernameDOMLocation.textContent = `Error 404: Usuario "${username}" no encontrado.`;
      } else{
        // Si no se recibe este mensaje de error en el JSON, se procede a asignar el texto a los elementos
      usernameDOMLocation.textContent = data.name;
      blog.textContent = data.blog;
      userGPS.textContent = data.location;
      }
    })
    // Si el fetch no obtuvo alguna respuesta, se genera este error, se muestra en consola y en el dom por medio de la funcion "handleError"
    .catch((err)=>{
      console.log(err);
      handleError(err);
    });
} 

//Funcion que se llama en caso de no recibir alguna respuesta por parte de la API
function handleError(err) {
  console.log('Algo salio mal con el fetch a la API');
  console.log(err);
  usernameDOMLocation.textContent = `Algo salió mal: ${err}`;
} 

displayUser('rafaelesadncinasr');





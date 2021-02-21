//Variables
const formulario = document.getElementById('formulario');
const listado = document.getElementById('lista-tweets');
let tweets = [];

//Event Listeners
const eventListeners = () =>{
    //Cuando carga el documento.
    document.addEventListener('DOMContentLoaded', () =>{
        //Si hay elementos los parsea y si no lo hace vacío, es para evitar el null
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })

    //Cuando el usuario crea un tweet
    formulario.addEventListener('submit', agregarTweet);
}

//Funciones
const agregarTweet = (e) =>{
    e.preventDefault();

    //El textArea
    const tweet = document.getElementById('tweetT').value;
    
    if(tweet === ''){
        mostrarError('Tweet vacío');
    }else{
        const tweetObj = {
            id: Date.now(),
            tweet   //Poner tweet : tweet, como es el mismo nombre, con ponerlo solo así ya esta. 
        }
        tweets.push(tweetObj);
    }
    formulario.reset();
    crearHTML();
}

const mostrarError = (error) =>{
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    const contenido = document.getElementById('contenido');
    contenido.appendChild(mensajeError);

    //A los 3 segundos el mensaje de error se borra.
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

//Crea el HTML del listado
const crearHTML = () =>{
    limpiarHTML();
    console.log(tweets);
    if(tweets.length !== 0){
        tweets.forEach( tweet =>{
            const li = document.createElement('li');
            li.textContent = tweet.tweet;
            //O li.innerText = tweet.tweet;

            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText='X'; 

            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            li.appendChild(btnEliminar);
            listado.appendChild(li);
        });
    }
    sincronizarLocalStorage();
}

const borrarTweet = (id) =>{
    tweets = tweets.filter(tweet => tweet.id !== id); //FIltra todos metos el que coincide.
    crearHTML();
}

const limpiarHTML = () =>{  //Para que no se repita el arreglo, ya que appendChild no borra lo anterior y se repite. 
    while (listado.firstChild){     //Mientras el listado tenga algun elemento.
        listado.removeChild(listado.firstChild);
    }
}

//Agrega los tweets al LS
const sincronizarLocalStorage = () =>{
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

eventListeners();




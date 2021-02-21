const btnEnviarQs = document.querySelector('#enviar');

//Variables. Guardamos el elemento según su id. 
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');                 //Para el mensaje de error 'p'.
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');


const eventListeners = () =>{
    /*Cuando la app arranca */
    document.addEventListener('DOMContentLoaded', iniciarApp);             //Cuando el documento este totalmente cargado se dipara iniciarApp
    
    /*Campos del formulario*/
    email.addEventListener('blur', validarFormulario);                     //el event blur se dipara cuento un elenento pierde su foco, por ejemplo, cuando escribis el email en un input y vas a otro, ahí salta. (tiempo real)
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', resetearFormulario);
}


const iniciarApp = () =>{
    console.log('Welcome!!!');
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');            //Son clases, están también en el html (cosa que me parece mejor), pero también se le puede agregar de esta manera. 
}


const mostrarError = (mensaje)=>{
    console.log('Error');
    const mensajeError = document.createElement('p');                       //Creamos un parrafo para mostrar el error
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('errorText', 'error');
    const errores = document.querySelectorAll('.error');                    //Si ya ha alguna clase error (esto es para que el mensaje 'p' de error no salga multiples veces)
    console.log(errores);
    if(errores.length === 1){
       formulario.appendChild(mensajeError);                                 //Agrega el mensaje al HTML
    }
}


/*Esta afuera ya que al ser const afecta el scope (alcance que determina la accesibilidad de las variables en cada parte de nuestro código)  */
const expresionRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const validarFormulario = (e) =>{
    console.log('Validando');

    if(e.target.value.length > 0){                                                     
        console.log(e.target.value);                                        //Muestra lo que el usuario escribe en el input
        e.target.classList.remove('error');
        e.target.classList.add('success'); 
    }else{
        //e.target.style.borderBottomColor = "red";                         //Si entra al input y sale sin escribir el borde se hará rojo. 
        e.target.classList.remove('success');
        e.target.classList.add('error');                                    //Se le agrega la clase, es mejor. 
        mostrarError('Todos los campos son obligatorios.');
      //  console.log(e.target);
    }

    if(e.target.type === 'email'){
        if (expresionRegular.test(e.target.value)){                         //Expresión regular, .test
            console.log('Email valido');     
            e.target.classList.add('success');
        }else{
            e.target.classList.remove('success');
            e.target.classList.add('error');     
      //      mostrarError('Email no valido');
        }
    }
    

    if(asunto.value !== '' && mensaje.value !== "" && (expresionRegular.test(email.value))){
        console.log('OK');
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');

    }
}



const resetearFormulario = (e) => {
    e.preventDefault();
    formulario.reset();
    email.classList.remove('success');
    email.classList.remove('error');
    asunto.classList.remove('success');
    asunto.classList.remove('error');
    mensaje.classList.remove('success');
    mensaje.classList.remove('error');
    const errores = document.querySelector('p.error');                  //Elimina todas las clases de error                                
    if(errores){
        errores.remove();
    }
}


const enviarEmail = (e) =>{
    e.preventDefault();
    const spinner = document.getElementById('spinner');    //Muestra el spinner que tiene como atributo display:none; para ocultarlo hasta que sea el momento
    console.log('Enviando email...');
    //spinner.classList.add('spinner');    
    console.log('Mostrando spinner'); 
    spinner.style.display = 'flex';
    
    setTimeout(() => {
        console.log('Finalizando spinner'); 
        spinner.style.display = 'none';
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El email se ha enviado correctamente';
        parrafo.classList.add('text-center');
        formulario.insertBefore(parrafo, spinner);
        
        setTimeout(() => {
            parrafo.remove();
            resetearFormulario();
        }, 3000);

    }, 3000);
}


eventListeners(); 

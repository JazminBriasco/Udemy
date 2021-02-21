const formulario = document.getElementById('cotizar-seguro');

//Constructiores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Protptypes Seguro
Seguro.prototype.cotizarSeguro = function(){
    /*
        1 = Ammericano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35 
    */
    let cantidad = 0;
    let base = 2000;

    switch(parseInt(this.marca)){
        case 1: cantidad = base * 1.15;
            break;
        case 2: cantidad = base * 1.05;
            break;
        case 3: cantidad = base * 1.35;
            break;
        default: 
            break;
    }
    
    //Cada año el costo se reduce un 3 %
    const diferencia = new Date().getFullYear() - this.year;
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    
    //El seguro basico multiplica 30% mas, si es completo 50% mas
    if(this.tipo === 'basico')
        cantidad *= 1.30;
    else
        cantidad *= 1.50;
    
    return cantidad;
}

//Prototypes UI
function UI(){} //Objeto de la interfaz de usuario


// Llena las opciones de los años
UI.prototype.llenarOpciones = () =>{        //Se puede usar arrow porque no va a usar this.
    
    const max = new Date().getFullYear();
    const min = max - 20;
    const selectYear = document.getElementById('year');
    for( let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}


//Mensaje
UI.prototype.mostrarMensaje = (mensaje, tipo) =>{        //UI no tiene this.
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje','mt-10');   //Así toma estos 2 valores independientemente del error o correcto
    div.textContent = mensaje;
    formulario.insertBefore(div, document.getElementById('resultado'));

    setTimeout(()=>{
        div.remove();
    },3000)
    
}

//Resultado
UI.prototype.mostrarResultado = (seguro, total) =>{
    const{marca, year, tipo} = seguro;
    let textoMarca = '';

    switch(parseInt(marca)){
        case 1: textoMarca ='Americano';
            break;
        case 2: textoMarca ='Asiatico';
            break;
        case 3: textoMarca ='Europeo';
            break;
        default:
            break;
    }

    console.log(seguro, total);
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML = `
        <p class = header> Tu Resumen: </p>
        <p class = 'font-bold'> Total: <span class = "font-normal"> $ ${total} </span></p>
        <p class = 'font-bold'> Marca: <span class = "font-normal"> ${textoMarca} </span></p>
        <p class = 'font-bold'> Año: <span class = "font-normal"> ${year} </span></p>
        <p class = 'font-bold'> Seguro: <span class = "font-normal capitalize"> ${tipo} </span></p>

    `
    const resultado = document.getElementById('resultado');
    const spinner = document.getElementById('cargando');
    
    spinner.style.display = 'block';

    setTimeout(()=>{
        spinner.style.display = 'none';
        resultado.appendChild(div);
        
    }, 3000) ;
}

//Instancia del UI
const ui = new UI();
console.log(ui);


document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones();
})





function cotizarSeguro(e){
    e.preventDefault();

    //Leer marca, anio y tipo de seguro
    const marca = document.getElementById('marca').value;
    const year = document.getElementById('year').value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;                                                             //Funciona como un else, pero con menos codigo
    }

    ui.mostrarMensaje('Cotizando...', 'correcto');

    //Instancia del seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    ui.mostrarResultado(seguro, total);

    //Ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');    //Quiero el div que esta dentro del id=resultado 
    if(resultados != null){
        resultados.remove();
    }

}


eventListeners();
function eventListeners(){
    
    formulario.addEventListener('submit', cotizarSeguro);
}











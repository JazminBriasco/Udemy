console.log(autos);                                           //Arreglo de autos en el script del HTML que se puede usar acá

const resultado = document.getElementById('resultado');

const marca = document.getElementById('marca');
const year = document.getElementById('year');
const max = new Date().getFullYear();
const min = max -10;

const minimo = document.getElementById('minimo');
const maximo = document.getElementById('maximo');
const puertas = document.getElementById('puertas');
const transmision = document.getElementById('transmision');
const color = document.getElementById('color');


const datosBusqueda = {                                     //Objeto de la busqueda, guardamos todos los datos que va a buscar. 
    marca: '',
    year: '', 
    maximo: '', 
    minimo: '', 
    puertas: '', 
    color: '', 
    transmision: '',
}


const limpiarHTML = () =>{                                  //Para actualizar el HTML, el appendChild no elimina, solo agrega. 
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

const mostrarAutos = (autos) =>{
    limpiarHTML();
    autos.forEach( auto =>{
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        const autoHTML = document.createElement('p');
        autoHTML.textContent = ` 
            ${marca} - ${modelo} - ${year} - ${precio} - ${puertas} - ${color} - Transmision: ${transmision}
        `;
        resultado.appendChild(autoHTML);
    })
}

const llenarSelectAnios = () =>{
    for (let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}


document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos);                                                         //Resultado
    llenarSelectAnios();    
})



const filtrarAuto = () =>{                                                  //filter según marca a tiempo real.
    //const res = autos.filter(( auto ) => { })
    const res = autos.filter( filtrarMarca ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );         //Se puede filtrar luego de otro filtrado
    if(res.length){
        mostrarAutos(res);
    }else{
        noResultado();
    }
}

const noResultado = () =>{
    limpiarHTML();
    const noRes = document.createElement('p');
    noRes.classList.add('error', 'alerta');
    noRes.textContent= 'No hay resultados, Intenta con otras opciones';
    resultado.appendChild(noRes);
}

const filtrarMarca = (auto) =>{                                             //auto sería como la variable donde se guarda cada objeto.
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

const filtrarYear = (auto) =>{                                              //auto sería como la variable donde se guarda cada objeto. (versión iterada)
    if(datosBusqueda.year){
        return auto.year === parseInt(datosBusqueda.year);
    }
    return auto;
}

const filtrarMinimo = (auto) => {
    if(datosBusqueda.minimo){
        return parseInt(auto.precio) >= datosBusqueda.minimo;
    }
    return auto;
}

const filtrarMaximo = (auto) => {
    if(datosBusqueda.maximo){
        return parseInt(auto.precio) <= datosBusqueda.maximo;
    }
    return auto;
}

const filtrarPuertas = (auto) =>{
    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}

const filtrarTransmision = (auto) =>{
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

const filtrarColor = (auto) =>{
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}

marca.addEventListener('change', e => {                                     //'change' para los select, al cambiar el option salta. 
    //console.log(e.target.value);
    datosBusqueda.marca = e.target.value;
    filtrarAuto();
})

year.addEventListener('change', e => {                         
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})

minimo.addEventListener('change', e => {                         
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change', e => {                         
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change', e => {                         
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change', e => {                         
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change', e => {                         
    datosBusqueda.color = e.target.value;
    filtrarAuto();
})
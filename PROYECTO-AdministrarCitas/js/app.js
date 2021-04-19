/**Campos*/
const petName = document.getElementById('mascota');
const ownerName = document.getElementById('propietario');
const number = document.getElementById('telefono');
const date = document.getElementById('fecha');
const hour = document.getElementById('hora');
const sign = document.getElementById('sintomas');

/**UI */
const form = document.getElementById('nueva-cita');
const contentCita = document.getElementById('citas');

/**Submit */
const btnSend = document.getElementById('ok');

let editando = false;

/**Clases */
class Citas {
    constructor() {
        this.citas = [];
    } 

    agregarCita(cita){
        this.citas = [...this.citas, cita];
    }

    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id); 
    }

    editarCita(citaActualizada){
        console.log('a editar');
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }
}

class UI{

    
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-succes');
        }

        divMensaje.textContent = mensaje;
        document.getElementById('contenido').insertBefore(divMensaje, document.getElementById('agregar-cita'));

        setTimeout(() =>{
            divMensaje.remove();
        }, 5000) 
    }

    imprimirCitas({citas}){
        this.limpiarHTML();
        citas.forEach(cita => {
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            /**Cita */
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-wieght-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
            <span class="font-weight-bolder"> Propietario: </span> ${propietario}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder"> Telefono: </span> ${telefono}`;
            
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder"> fecha: </span> ${fecha}`;
        
            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder"> hora: </span> ${hora}`;
            
            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
            <span class="font-weight-bolder"> sintomas: </span> ${sintomas}`;
            
            
            /**Btn para eliminar cita */
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = "Eliminar ";
            btnEliminar.onclick = () => eliminarCita(id);

            /**Btn para editar cita */
            const btnModificar = document.createElement('button');
            btnModificar.classList.add('btn', 'btn-info', 'mr-2');
            btnModificar.innerHTML = "Modificar";
            btnModificar.onclick = () => modificarCita(cita);


            /**Agregar al HTML */
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnModificar);

            contentCita.appendChild(divCita);
        })
    }

    limpiarHTML(){
        while(contentCita.firstChild){
            contentCita.removeChild(contentCita.firstChild);
        }
    }


}

const ui = new UI();
const administrarCitas = new Citas();

/**Objects */
const citaObj = {
    mascota : '',
    propietario : '',
    telefono : '',
    fecha : '',
    hora : '',
    sintomas : ''
}


/**Functions */
eventListeners();
function eventListeners(){
    /**Se van cargando al objeto */
    petName.addEventListener('input', datosCita);
    ownerName.addEventListener('input', datosCita);
    number.addEventListener('input', datosCita);
    date.addEventListener('input', datosCita);
    hour.addEventListener('input', datosCita);
    sign.addEventListener('input', datosCita);

    /**Submit */
    form.addEventListener('submit', nuevaCita);
}

/**Carga el objeto */
function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

/**Crea una nueva cita, agrega y valida a la clase*/
function nuevaCita(e){
    e.preventDefault();

    //Extrae la info del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    if(mascota === '' ||  propietario === '' ||  telefono === '' ||  fecha === '' ||  hora === '' ||  sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        
        ui.imprimirAlerta('Editado correctamente');
        administrarCitas.editarCita({...citaObj});
        btnSend.textContent = "Crear cita";
        editando = false;
        
    }else{
        
        citaObj.id = Date.now();
        administrarCitas.agregarCita({...citaObj});
        ui.imprimirAlerta('Agregado correctamente');
    }

    form.reset();
    reinicarObj();
    ui.imprimirCitas(administrarCitas);
}

function reinicarObj(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id){
    administrarCitas.eliminarCita(id);
    ui.imprimirAlerta('Cita eliminada');
    ui.imprimirCitas(administrarCitas);
}

function modificarCita(cita){
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;    
    petName.value = mascota;
    ownerName.value = propietario;
    number.value = telefono;
    date.value = fecha;
    hour.value = hora;
    sign.value = sintomas;

    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    btnSend.textContent = "Guardar cambios";
    editando = true;
}
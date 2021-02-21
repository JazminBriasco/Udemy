//Guardar datos
localStorage.setItem('1', 'Jaz');

const objeto = {
    nombre: 'Jazmin',
    apellido: 'Briasco'
}

const obj1 = JSON.stringify(objeto);
localStorage.setItem('2', obj1);

const meses = ['Enero', 'Febrero'];

localStorage.setItem('3', JSON.stringify(meses));


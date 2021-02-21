//Modificar datos en Local Storage
const ls = JSON.parse(localStorage.getItem('3'));
console.log('Item = ' + ls);
ls.push('Marzo');
console.log(ls);

//Se actualiza:
localStorage.setItem('3', JSON.stringify(ls));


//Eliminar datos
localStorage.removeItem('1');

//Borrar todo el formulario
//localStorage.clear();

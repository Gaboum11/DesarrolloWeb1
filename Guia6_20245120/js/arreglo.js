const containerArreglo = document.querySelector("#idContainerArreglo");
const containerArregloOrdenado = document.querySelector(
    "#idContainerArregloOrdenado"
);

//Accedemos a cada boton por medio de la API DOM
const btnAgregar = document.querySelector("#idBtnAgregar");
const btnOrdenar = document.querySelector("#idBtnOrdenar");

//Agregamos el evento click a los botones, adicionalmente
//se le asigna la funcion que realizara la operacion
btnAgregar.addEventListener("click", agregarElemento);
btnOrdenar.addEventListener("click", ordenarElementos);

let arreglo = new Array();

function agregarElemento() {
    const numero = parseInt(document.querySelector("#inputNumero").value);
    //verificando que sea un numero
    if (isNaN(numero)) {
        alert("Debe ingresar un numero válido");
    } else {
        //Agregamos un nuevo elemento al arreglo
        arreglo.push(numero);

        //utilizaremos la API DOM para crear un elemento html
        //<div></div>//creamos un elemento div
        let caja = document.createElement("div"); //<div></div>
        caja.className = "col-md-1 colum"; //agregamos una clase al elemento <div></div> //asignamos un texto <h3>numero</h3>
        let valor = document.createElement("h3"); //<h3></h3>
        valor.textContent = numero; //<h3>numero</h3>
        caja.appendChild(valor); //asi retorna este hijo a la etiqueta <div></div> a nuestro div <div><h3>numero</h3></div>

        //Insertamos los nuevos elementos en el contenedor
        //se utiliza beforeend para insertar el nuevo
        //elemento al final de la etiqueta de mi hijo
        containerArreglo.insertAdjacentElement("beforeend", caja);
    }
}

function ordenarElementos() {
    //Utilizaremos for...of para recorrer el arreglo
    //y su vez utilizara .sort() para ordenarlo
    for (let i of arreglo.sort((a, b) => a - b)) {
        let caja = document.createElement("div");
        caja.className = "col-md-1 colum-green";
        let valor = document.createElement("h3");
        valor.textContent = i;
        caja.appendChild(valor);
        containerArregloOrdenado.insertAdjacentElement("beforeend", caja);
    }
}
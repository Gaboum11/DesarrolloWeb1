// Otra forma de acceder a un elemento HTML es utililizando el getElementById del DOM
// Notese que al campo se le antepone el caracter #
const campo = document.getElementById("idTxtNumero");

//definimos una funcion anonima que permita validar en tiempo real el ingreso de un numero
const validarNumero = function (e) {
    //creamos una expresion regular que valida que sean numeros
    let validar = /^\d+$/g;
    let tecla = e.key;

    /*
    .test valida que la expresion regular coincida con el valor ingresado
    podra observar que al intentar teclear un letra u otro caracter diferente
    a un numero este no se escribe en el campo
    */
    if (!(validar.test(tecla) && e.preventDefault()));
};

//definimos el evento keypress para el
//campo de texto
campo.addEventListener("keypress", validarNumero);

//Trabajando con el boton Calcular
const boton = document.getElementById("idBtnCalcular");

//Definiendo una funcion anonima para calcular el factorial de un numero
function calcularFactorial(numero) {
    return numero < 2 ? 1 : numero * calcularFactorial(numero - 1);
}

//Definimos una funcion de tipo flecha para imprimir el resultado del factorial
const imprimirResultado = (numero, resultado) => {
    const contenedor = document.getElementById("idDivResultado");
    contenedor.innerHTML = `El factorial de ${numero} es ${resultado}`;
};

//definiendo una funcion tradicional
function calcular() {
    let numero = document.getElementById("idTxtNumero").value;
    if (numero != "") {
        //llamamos a la funcion anonima para que calcule el factorial
        let resultado = calcularFactorial(numero);
        //Invocando la funcion de tipo flecha
        imprimirResultado(numero, resultado);
    } else {
        alert("Debe ingresar un número válido");
    }
}

//definiendo el evento click para el boton
boton.addEventListener("click", calcular);

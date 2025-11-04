// Generamos un número aleatorio que se encuentre en el rango del 1 al 25
const numeroAleatorio = Math.floor(Math.random() * 25) + 1;
// Guardamos el valor del numero de intentos que tendra el usuario
const numeroIntentos = 3;
// Guardamos el numero de intentos que ya ha realizado el usuario
let intentos = 1;

function generarNumeroAleatorio() {
    // Definimos una variable para impresión de mensajes
    let mensaje;
    // Utilizamos el dom para acceder al parrafo creado
    const parrafo = document.querySelector("#idParrafo");

    // Verificamos en que intento esta el usuario
    if (intentos <= numeroIntentos) {
        let numero = prompt(
            "¿Que numero se ha generado (Intento " + intentos + ")?"
        );

        // Verificamos el número aleatorio con el ingresado por el usuario
        if (numero == numeroAleatorio) {
            mensaje = `Es sorprendente, pudiste adivinar el número oculto (${numeroAleatorio}). Refresque la página para volver a jugar.`;
        } else if (intentos == numeroIntentos) {
            mensaje = `Su numero de intentos ha terminado. El numero oculto era: ${numeroAleatorio}. Refresque la página para volver a jugar.`;
        } else {
            let pista = "";
            if (numero < numeroAleatorio) {
                pista = "El número que buscas es más alto.";
            } else {
                pista = "El número que buscas es más bajo.";
            }
            mensaje = `Vuelve a intentarlo. Quedan ${numeroIntentos - intentos} intentos. ${pista}`;
        }
    }

    // aumentamos el valor de los intentos
    intentos++;

    parrafo.innerHTML = mensaje;
}

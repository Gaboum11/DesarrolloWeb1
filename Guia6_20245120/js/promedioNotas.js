//Accedemos al contenedor donde se mostrara los estudiantes
const containerEstudiantes = document.querySelector("#idContainerEstudiantes");

//Accedemos a cada boton por medio de la API DOM
const btnPromedio = document.querySelector("#idBtnPromedio");

//Agregamos el evento click a los botones, adicionalmente
//se le asigna la funcion que realizara la operacion
btnPromedio.addEventListener("click", generarEstudiantes);


function generarEstudiantes() {
    //utilizaremos un arreglo para guardar la informacion del estudiante
    let arrayEstudiante = new Array();

    let totalEstudiantes = document.querySelector(
        "#inputNumeroEstudiantes"
    ).value;
    let contador = 1;

    // utilizaremos un while para recorrer el total de estudiantes
    let estudiante,
        calificacion,
        convertir = 0;
    while (contador <= totalEstudiantes) {
        estudiante = prompt(`Ingrese el nombre del estudiante ${contador}`);

        do {
            calificacion = prompt(
                `Ingrese la calificacion del estudiante ${contador}`
            );
            convertir = parseFloat(calificacion);
        } while (isNaN(convertir) || convertir < 0 || convertir > 10);
arrayEstudiante[contador - 1] = new Array(estudiante, parseFloat(calificacion).toFixed(2));
        contador++;
    }

    //Recorremos el arreglo con for...of
    //Verificaremos cual es el promedio de las calificaciones
    // y cual de los estudiantes posee la calificacion mas alta
    let calificacionAlta = 0,
        posicion = 0;
    let promedio = 0;

    let listado = "<h3>Listado de estudiantes registrados</h3>";
    listado += "<ol>";
    let contadorIndice = 0;
    for (let indice of arrayEstudiante) {
        let nombre = indice[0];
        let nota = parseFloat(indice[1]);
        //imprimiendo lista de estudiantes
        listado += `<li><b>Nombre:</b> ${nombre} - <b>Calificación:</b> ${nota}</li>`;
        //verificacion de calificacion mas alta
        if (nota > calificacionAlta) {
            calificacionAlta = nota;
            posicion = contadorIndice;
        }

        promedio += nota;
        contadorIndice++;
    }

    listado += "</ol>";
    promedio = parseFloat(promedio / arrayEstudiante.length).toFixed(2);
    listado += `<p><b>Promedio de calificaciones:</b> ${promedio}</p>`;
    listado += `<p><b>Estudiante con mejor calificación:</b> ${arrayEstudiante[posicion][0]}</p>`;

    //Imprimiendo resultado
    containerEstudiantes.innerHTML = listado;
}
// Creación de la tabla utilizando concatenación de cadenas
let table = "<table>";
table += "<thead>";
table += "<tr>";
table += "<th scope='col'>#</th>";
table += "<th scope='col'>Nombre</th>";
table += "<th scope='col'>Apellido</th>";
table += "<th scope='col'>Correo electronico</th>";
table += "</tr>";
table += "</thead>";
table += "<tbody>";

// Datos de los alumnos
const alumnos = [
    { id: 1, nombre: "Marcos Antonio", apellido: "Alas", correo: "marcos.alas@estudiante.esen.edu.sv" },
    { id: 2, nombre: "Ana Paola", apellido: "Rivas Polanco", correo: "paola.rivas@estudiante.esen.edu.sv" },
    { id: 3, nombre: "Alexis Armando", apellido: "Quintanilla Peña", correo: "alexis.quintanilla@estudiante.esen.edu.sv" },
    { id: 4, nombre: "Vanessa Alejandra", apellido: "Bermudez Urquilla", correo: "vanessa.bermudez@estudiante.esen.edu.sv" },
    { id: 5, nombre: "Oscar Armando", apellido: "López Rodriguez", correo: "oscar.lopez@estudiante.esen.edu.sv" }
];

// Agregar filas con los datos al cuerpo de la tabla
alumnos.forEach(alumno => {
    table += "<tr>";
    table += `<td scope='row'>${alumno.id}</td>`;
    table += `<td>${alumno.nombre}</td>`;
    table += `<td>${alumno.apellido}</td>`;
    table += `<td>${alumno.correo}</td>`;
    table += "</tr>";
});

table += "</tbody>";
table += "</table>";
// Agregar la tabla al contenedor
const contenedor = document.querySelector("#idContenedor");
// Mostrando la tabla en el contenedor
contenedor.innerHTML = table;

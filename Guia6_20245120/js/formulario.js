//ACCEDIENDO A LOS ELEMENTOS HTML
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnRegistrar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
//Componenete de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];
let indexPacienteEditando = -1; // Variable para saber si estamos editando

/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione
el boton limpiar del formulario
*/
const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombre.focus();
    indexPacienteEditando = -1;
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar datos';
};

/*
Funcion para validar el ingreso del paciente
*/
const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
        inputRdMasculino.checked == true
            ? "Hombre"
            : inputRdFemenino.checked == true
            ? "Mujer"
            : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
        nombre != "" &&
        apellido != "" &&
        fechaNacimiento != "" &&
        sexo != "" &&
        pais != 0 &&
        direccion != ""
    ) {
        if (indexPacienteEditando === -1) {
            // Agregar nuevo paciente
            arrayPaciente.push(
                new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
            );
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            // Actualizar paciente existente
            arrayPaciente[indexPacienteEditando] = [nombre, apellido, fechaNacimiento, sexo, labelPais, direccion];
            mensaje.innerHTML = "Se ha actualizado el paciente correctamente";
            indexPacienteEditando = -1;
            buttonAgregarPaciente.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar datos';
        }

        //Llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();
        
        //Actualizar tabla si está visible
        if (document.getElementById("idTablaPacientes").innerHTML !== "Ninguno") {
            imprimirPacientes();
        }
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element, index) => {
        $fila += "<tr>";
        $fila += `<td scope="row" class="text-center fw-bold">${contador}</td>`;
        $fila += `<td>${element[0]}</td>`;
        $fila += `<td>${element[1]}</td>`;
        $fila += `<td>${element[2]}</td>`;
        $fila += `<td>${element[3]}</td>`;
        $fila += `<td>${element[4]}</td>`;
        $fila += `<td>${element[5]}</td>`;
        $fila += "<td>";
        $fila += `<button onclick="editarPaciente(${index})" type="button" class="btn btn-primary btn-sm" title="Editar">`;
        $fila += `<i class="bi bi-pencil-square"></i>`;
        $fila += `</button> `;
        $fila += `<button onclick="eliminarPaciente(${index})" type="button" class="btn btn-danger btn-sm" title="Eliminar">`;
        $fila += `<i class="bi bi-trash3-fill"></i>`;
        $fila += `</button>`;
        $fila += "</td>";
        $fila += "</tr>";
        contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $tabla = `<div class="table-responsive">
        <table class="table table-striped table-hover table-bordered">
            <tr>
                <th scope="col" class="text-center" style="width:5%">#</th>
                <th scope="col" class="text-center" style="width:15%">Nombre</th>
                <th scope="col" class="text-center" style="width:15%">Apellido</th>
                <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                <th scope="col" class="text-center" style="width:10%">Sexo</th>
                <th scope="col" class="text-center" style="width:10%">Pais</th>
                <th scope="col" class="text-center" style="width:25%">Direccion</th>
                <th scope="col" class="text-center" style="width:10%">Opciones</th>
            </tr>
            ${imprimirFilas()}
        </table>
    </div>
    `;

    document.getElementById("idTablaPacientes").innerHTML = $tabla;
};

// Contador global de los option correspondiente
// al select (cmb) pais
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Pais agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

//Función para editar un paciente
function editarPaciente(index) {
    let paciente = arrayPaciente[index];
    
    // Llenar el formulario con los datos del paciente
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    
    // Seleccionar el sexo
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else {
        inputRdFemenino.checked = true;
    }
    
    // Seleccionar el país
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
            cmbPais.value = cmbPais.options[i].value;
            break;
        }
    }
    
    inputDireccion.value = paciente[5];
    
    // Cambiar el texto del botón
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar datos';
    
    // Guardar el índice del paciente que estamos editando
    indexPacienteEditando = index;
    
    // Hacer scroll hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
    inputNombre.focus();
}

//Función para eliminar un paciente
function eliminarPaciente(index) {
    let paciente = arrayPaciente[index];
    let confirmar = confirm(`¿Está seguro de eliminar al paciente ${paciente[0]} ${paciente[1]}?`);
    
    if (confirmar) {
        // Eliminar del arreglo
        arrayPaciente.splice(index, 1);
        
        // Mostrar notificación
        mensaje.innerHTML = "Paciente eliminado correctamente";
        toast.show();
        
        // Actualizar la tabla
        imprimirPacientes();
        
        // Si no hay pacientes, mostrar mensaje
        if (arrayPaciente.length === 0) {
            document.getElementById("idTablaPacientes").innerHTML = "Ninguno";
        }
    }
}

//Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();

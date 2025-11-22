// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Función para validar el formulario
const validarFormulario = function () {
    let errores = [];
    
    // Obtener valores de los campos
    const nombre = document.getElementById("idNombre").value.trim();
    const apellidos = document.getElementById("idApellidos").value.trim();
    const fechaNac = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value.trim();
    const password = document.getElementById("idPassword").value;
    const passwordRepetir = document.getElementById("idPasswordRepetir").value;
    
    // a. Validar que los campos no estén vacíos
    if (nombre === "") errores.push("- El campo Nombres es obligatorio");
    if (apellidos === "") errores.push("- El campo Apellidos es obligatorio");
    if (fechaNac === "") errores.push("- El campo Fecha de nacimiento es obligatorio");
    if (correo === "") errores.push("- El campo Correo electrónico es obligatorio");
    if (password === "") errores.push("- El campo Contraseña es obligatorio");
    if (passwordRepetir === "") errores.push("- El campo Repetir Contraseña es obligatorio");
    
    // b. Validar que la fecha de nacimiento no supere la fecha actual
    if (fechaNac !== "") {
        const fechaActual = new Date();
        const fechaIngresada = new Date(fechaNac);
        if (fechaIngresada > fechaActual) {
            errores.push("- La fecha de nacimiento no puede ser mayor a la fecha actual");
        }
    }
    
    // c. Utilice expresiones regulares para validar el campo correo electrónico
    if (correo !== "") {
        const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexCorreo.test(correo)) {
            errores.push("- El correo electrónico no tiene un formato válido");
        }
    }
    
    // d. Validar que los campos contraseña y repetir contraseña sean iguales
    if (password !== "" && passwordRepetir !== "") {
        if (password !== passwordRepetir) {
            errores.push("- Las contraseñas no coinciden");
        }
    }
    
    // e. Verificar que esté seleccionada al menos una opción para "algunos intereses"
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    let algunoSeleccionado = false;
    checkboxes.forEach(check => {
        if (check.checked) algunoSeleccionado = true;
    });
    if (!algunoSeleccionado) {
        errores.push("- Debe seleccionar al menos una opción en 'Algunos intereses'");
    }
    
    // f. Verificar que el usuario seleccione una carrera
    const radios = document.querySelectorAll('input[name="idRdCarrera"]');
    let carreraSeleccionada = false;
    radios.forEach(radio => {
        if (radio.checked) carreraSeleccionada = true;
    });
    if (!carreraSeleccionada) {
        errores.push("- Debe seleccionar una carrera");
    }
    
    // g. Verificar que sea seleccionado un país de origen
    const pais = document.getElementById("idCmPais").value;
    if (pais === "Seleccione una opcion" || pais === "") {
        errores.push("- Debe seleccionar un país de origen");
    }
    
    return errores;
};

// Función para mostrar los datos en una tabla
const mostrarDatosEnTabla = function () {
    // Validar el formulario primero
    const errores = validarFormulario();
    
    if (errores.length > 0) {
        // Mostrar errores en el modal
        let mensajeErrores = "<h5 class='text-danger'>Errores encontrados:</h5><ul class='text-start'>";
        errores.forEach(error => {
            mensajeErrores += `<li>${error}</li>`;
        });
        mensajeErrores += "</ul>";
        bodyModal.innerHTML = mensajeErrores;
        modal.show();
        return;
    }
    
    // Si no hay errores, crear la tabla con los datos
    const nombre = document.getElementById("idNombre").value;
    const apellidos = document.getElementById("idApellidos").value;
    const fechaNac = document.getElementById("idFechaNac").value;
    const correo = document.getElementById("idCorreo").value;
    
    // Obtener intereses seleccionados
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    let intereses = [];
    checkboxes.forEach(check => {
        intereses.push(check.nextElementSibling.textContent);
    });
    
    // Obtener carrera seleccionada
    const radioSeleccionado = document.querySelector('input[name="idRdCarrera"]:checked');
    const carrera = radioSeleccionado ? radioSeleccionado.nextElementSibling.textContent : "";
    
    // Obtener país
    const paisSelect = document.getElementById("idCmPais");
    const pais = paisSelect.options[paisSelect.selectedIndex].text;
    
    // Crear tabla con DOM
    let tabla = `
        <h5 class='text-success mb-3'>Formulario validado correctamente</h5>
        <table class='table table-striped table-bordered'>
            <thead class='table-dark'>
                <tr>
                    <th>Campo</th>
                    <th>Valor</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Nombres</strong></td>
                    <td>${nombre}</td>
                </tr>
                <tr>
                    <td><strong>Apellidos</strong></td>
                    <td>${apellidos}</td>
                </tr>
                <tr>
                    <td><strong>Fecha de Nacimiento</strong></td>
                    <td>${fechaNac}</td>
                </tr>
                <tr>
                    <td><strong>Correo Electrónico</strong></td>
                    <td>${correo}</td>
                </tr>
                <tr>
                    <td><strong>Intereses</strong></td>
                    <td>${intereses.join(", ")}</td>
                </tr>
                <tr>
                    <td><strong>Carrera</strong></td>
                    <td>${carrera}</td>
                </tr>
                <tr>
                    <td><strong>País de Origen</strong></td>
                    <td>${pais}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    bodyModal.innerHTML = tabla;
    modal.show();
};

// agregando eventos a los botones
button.onclick = () => {
    mostrarDatosEnTabla();
};
//Accediendo a los elementos del formulario
const inputCarnet = document.getElementById("idCarnet");
const inputNombre = document.getElementById("idNombre");
const inputDUI = document.getElementById("idDUI");
const inputNIT = document.getElementById("idNIT");
const inputFechaNacimiento = document.getElementById("idFechaNacimiento");
const inputEmail = document.getElementById("idEmail");
const inputEdad = document.getElementById("idEdad");

const btnValidar = document.getElementById("idBtnValidar");
const btnLimpiar = document.getElementById("idBtnLimpiar");
const resultado = document.getElementById("idResultado");

//Expresiones regulares para validación
const regexCarnet = /^[A-Z]{2}\d{3}$/;
const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexDUI = /^\d{8}-\d{1}$/;
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
const regexFecha = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const regexEdad = /^\d+$/;

//Función para validar un campo individual
function validarCampo(valor, regex, nombreCampo) {
    if (valor.trim() === "") {
        return { valido: false, mensaje: `${nombreCampo} está vacío` };
    }
    if (!regex.test(valor)) {
        return { valido: false, mensaje: `${nombreCampo} no tiene el formato correcto` };
    }
    return { valido: true, mensaje: `${nombreCampo} es válido` };
}

//Función para validar la fecha adicionalemente
function validarFechaCompleta(fecha) {
    if (!regexFecha.test(fecha)) {
        return false;
    }
    
    const partes = fecha.split("/");
    const dia = parseInt(partes[0]);
    const mes = parseInt(partes[1]);
    const anio = parseInt(partes[2]);
    
    //Validar que el mes esté entre 1 y 12
    if (mes < 1 || mes > 12) return false;
    
    //Días por mes
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    //Verificar año bisiesto
    if (mes === 2 && ((anio % 4 === 0 && anio % 100 !== 0) || anio % 400 === 0)) {
        diasPorMes[1] = 29;
    }
    
    //Validar que el día esté en el rango del mes
    if (dia < 1 || dia > diasPorMes[mes - 1]) return false;
    
    return true;
}

//Función principal de validación
function validarFormulario() {
    let errores = [];
    let exitos = [];
    
    //Validar Carnet
    let validacionCarnet = validarCampo(inputCarnet.value.toUpperCase(), regexCarnet, "Carnet");
    if (validacionCarnet.valido) {
        exitos.push(validacionCarnet.mensaje);
        inputCarnet.classList.remove("is-invalid");
        inputCarnet.classList.add("is-valid");
    } else {
        errores.push(validacionCarnet.mensaje);
        inputCarnet.classList.remove("is-valid");
        inputCarnet.classList.add("is-invalid");
    }
    
    //Validar Nombre
    let validacionNombre = validarCampo(inputNombre.value, regexNombre, "Nombre completo");
    if (validacionNombre.valido) {
        exitos.push(validacionNombre.mensaje);
        inputNombre.classList.remove("is-invalid");
        inputNombre.classList.add("is-valid");
    } else {
        errores.push(validacionNombre.mensaje);
        inputNombre.classList.remove("is-valid");
        inputNombre.classList.add("is-invalid");
    }
    
    //Validar DUI
    let validacionDUI = validarCampo(inputDUI.value, regexDUI, "DUI");
    if (validacionDUI.valido) {
        exitos.push(validacionDUI.mensaje);
        inputDUI.classList.remove("is-invalid");
        inputDUI.classList.add("is-valid");
    } else {
        errores.push(validacionDUI.mensaje);
        inputDUI.classList.remove("is-valid");
        inputDUI.classList.add("is-invalid");
    }
    
    //Validar NIT
    let validacionNIT = validarCampo(inputNIT.value, regexNIT, "NIT");
    if (validacionNIT.valido) {
        exitos.push(validacionNIT.mensaje);
        inputNIT.classList.remove("is-invalid");
        inputNIT.classList.add("is-valid");
    } else {
        errores.push(validacionNIT.mensaje);
        inputNIT.classList.remove("is-valid");
        inputNIT.classList.add("is-invalid");
    }
    
    //Validar Fecha
    if (inputFechaNacimiento.value.trim() === "") {
        errores.push("Fecha de nacimiento está vacía");
        inputFechaNacimiento.classList.remove("is-valid");
        inputFechaNacimiento.classList.add("is-invalid");
    } else if (!validarFechaCompleta(inputFechaNacimiento.value)) {
        errores.push("Fecha de nacimiento no tiene el formato correcto o la fecha no es válida");
        inputFechaNacimiento.classList.remove("is-valid");
        inputFechaNacimiento.classList.add("is-invalid");
    } else {
        exitos.push("Fecha de nacimiento es válida");
        inputFechaNacimiento.classList.remove("is-invalid");
        inputFechaNacimiento.classList.add("is-valid");
    }
    
    //Validar Email
    let validacionEmail = validarCampo(inputEmail.value, regexEmail, "Correo electrónico");
    if (validacionEmail.valido) {
        exitos.push(validacionEmail.mensaje);
        inputEmail.classList.remove("is-invalid");
        inputEmail.classList.add("is-valid");
    } else {
        errores.push(validacionEmail.mensaje);
        inputEmail.classList.remove("is-valid");
        inputEmail.classList.add("is-invalid");
    }
    
    //Validar Edad
    let validacionEdad = validarCampo(inputEdad.value, regexEdad, "Edad");
    if (validacionEdad.valido) {
        let edad = parseInt(inputEdad.value);
        if (edad < 0 || edad > 120) {
            errores.push("Edad debe estar entre 0 y 120 años");
            inputEdad.classList.remove("is-valid");
            inputEdad.classList.add("is-invalid");
        } else {
            exitos.push(validacionEdad.mensaje);
            inputEdad.classList.remove("is-invalid");
            inputEdad.classList.add("is-valid");
        }
    } else {
        errores.push(validacionEdad.mensaje);
        inputEdad.classList.remove("is-valid");
        inputEdad.classList.add("is-invalid");
    }
    
    //Mostrar resultado
    if (errores.length === 0) {
        resultado.className = "alert alert-success";
        resultado.innerHTML = "<h5><i class='bi bi-check-circle-fill'></i> ¡Todos los campos son válidos!</h5>";
        resultado.innerHTML += "<ul>";
        exitos.forEach(exito => {
            resultado.innerHTML += `<li>${exito}</li>`;
        });
        resultado.innerHTML += "</ul>";
    } else {
        resultado.className = "alert alert-danger";
        resultado.innerHTML = "<h5><i class='bi bi-x-circle-fill'></i> Se encontraron errores:</h5>";
        resultado.innerHTML += "<ul>";
        errores.forEach(error => {
            resultado.innerHTML += `<li>${error}</li>`;
        });
        resultado.innerHTML += "</ul>";
        
        if (exitos.length > 0) {
            resultado.innerHTML += "<h6 class='mt-3'>Campos válidos:</h6><ul>";
            exitos.forEach(exito => {
                resultado.innerHTML += `<li>${exito}</li>`;
            });
            resultado.innerHTML += "</ul>";
        }
    }
}

//Función para limpiar el formulario
function limpiarFormulario() {
    inputCarnet.value = "";
    inputNombre.value = "";
    inputDUI.value = "";
    inputNIT.value = "";
    inputFechaNacimiento.value = "";
    inputEmail.value = "";
    inputEdad.value = "";
    
    //Remover clases de validación
    [inputCarnet, inputNombre, inputDUI, inputNIT, inputFechaNacimiento, inputEmail, inputEdad].forEach(input => {
        input.classList.remove("is-valid", "is-invalid");
    });
    
    //Resetear resultado
    resultado.className = "alert alert-info";
    resultado.innerHTML = "Complete el formulario y presione \"Validar formulario\"";
    
    inputCarnet.focus();
}

//Event listeners
btnValidar.addEventListener("click", validarFormulario);
btnLimpiar.addEventListener("click", limpiarFormulario);

//Auto-formateo para ciertos campos
inputCarnet.addEventListener("input", function() {
    this.value = this.value.toUpperCase();
});

inputDUI.addEventListener("input", function() {
    let valor = this.value.replace(/\D/g, "");
    if (valor.length > 8) {
        this.value = valor.substring(0, 8) + "-" + valor.substring(8, 9);
    } else {
        this.value = valor;
    }
});

inputNIT.addEventListener("input", function() {
    let valor = this.value.replace(/\D/g, "");
    let formatted = "";
    if (valor.length > 0) formatted = valor.substring(0, 4);
    if (valor.length > 4) formatted += "-" + valor.substring(4, 10);
    if (valor.length > 10) formatted += "-" + valor.substring(10, 13);
    if (valor.length > 13) formatted += "-" + valor.substring(13, 14);
    this.value = formatted;
});

inputFechaNacimiento.addEventListener("input", function() {
    let valor = this.value.replace(/\D/g, "");
    let formatted = "";
    if (valor.length > 0) formatted = valor.substring(0, 2);
    if (valor.length > 2) formatted += "/" + valor.substring(2, 4);
    if (valor.length > 4) formatted += "/" + valor.substring(4, 8);
    this.value = formatted;
});

//Focus al cargar la página
inputCarnet.focus();

// OBTENIENDO LA REFERENCIA DE LOS BOTONES
// POR MEDIO DEL .getElementById

const buttonSpan = document.getElementById("idBtnSpan");
const buttonP = document.getElementById("idBtnP");
const buttonDiv = document.getElementById("idBtnDiv");
const buttonButton = document.getElementById("idBtnButton");
const imprimirResultado = document.getElementById("idImprimirResultado");

// Defina la siguiente función para contar los elementos dentro de nuestro documento HTML
function contarElementos (elemento) {
    // OBTENIENDO EL NUMERO DE ETIQUETAS HTML QUE SE HAN CREADO
    // EN EL DOCUMENTO HTML
    let arrayElement = document.getElementsByTagName(elemento);
    
    console.log(
        `Etiquetas buscadas <${elemento}></> Total encontradas = ${arrayElement.length}`
    );
    for (const i of arrayElement) {
        console.log(i);
    }
    
    alert(`Revise la consola del navegador`);
}

// DEFINICIÓN DE EVENTO CLIC PARA LOS BOTONES

buttonSpan.onclick = () => {
    contarElementos("span");
};

buttonP.onclick = () => {
    contarElementos("p");
};

buttonDiv.onclick = () => {
    contarElementos("div");
};

buttonButton.onclick = () => {
    contarElementos("button");
};
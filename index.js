let SHEET_ID = '1eau-LyHWiP5wdWYRtFMMVovjNBMuynstatQxGQ4VCz0';
let SHEET_TITLE = 'destinos';
let SHEET_RANGE = 'A1:Z1000';  // Ajusta esto según el tamaño de tus datos

let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}&tqx=responseHandler:handleResponse`;

// Agregar una función de manejo de respuesta para JSONP
window.handleResponse = function( response) {
    if (!response.table || !response.table.cols || !response.table.rows) {
        console.error('La respuesta de la API no tiene el formato esperado.');
        return;
    }

    const columnTitles = response.table.cols.map(col => col.label); // Obtener los títulos de las columnas

    const data = response.table.rows.map(row => {
        const rowData =  {};
        if (row.c) {
            row.c.forEach((cell, index) => {
                const colTitle = columnTitles[index];
                rowData[colTitle] = cell && cell.v ? cell.v : null;
            });
        }
        return rowData;
    });

    // Mostrar el nombre en el elemento HTML
    const nombreElement = document.getElementById('nombrePlaceholder');
    nombreElement.textContent = data[0] && data[0]['Nombre'] ? data[0]['Nombre'] : 'juancho'; 

    // Cambiar la propiedad src de la imagen
    const imagenElement = document.getElementById('imagenPlaceholder');
    imagenElement.src = data[0] && data[0]['Imagen'] ? data[0]['Imagen'] : 'assets/img/service/services1.jpg';
};

// Crear un script dinámicamente para hacer la solicitud JSONP
const script = document.createElement('script');
script.src = FULL_URL;
document.body.appendChild(script);



const slider = document.querySelector(".slider");

function activate(e) {
  const items = document.querySelectorAll(".item");
  e.target.matches(".next") && slider.append(items[0]);
  e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
}

document.addEventListener("click", activate, false);

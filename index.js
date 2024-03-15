// Función para obtener la URL completa de la hoja de cálculo
function getSheetURL(sheetId, sheetTitle, sheetRange) {
    return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?sheet=${sheetTitle}&range=${sheetRange}&tqx=responseHandler:handleResponse`;
  }
  
  // Función para cargar los datos desde la hoja de cálculo
function loadSheetData(sheetId, sheetTitle, sheetRange, containerId) {
    const fullURL = getSheetURL(sheetId, sheetTitle, sheetRange);
  
    const script = document.createElement("script");
    script.src = fullURL;
    document.body.appendChild(script);
  
    // Guardar el ID del contenedor para usarlo en handleResponse
    script.dataset.containerId = containerId;
  }
  
  // Función para manejar la respuesta de la API
function handleResponse(response) {
    if (!response.table || !response.table.cols || !response.table.rows) {
      console.error("La respuesta de la API no tiene el formato esperado.");
      return;
    }
  
    const columnTitles = response.table.cols.map((col) => col.label);
    const data = response.table.rows.map((row) => parseRowData(row, columnTitles));
  
    const containerId = document.currentScript.dataset.containerId;
    renderData(data, containerId);
  }
  
  // Función para crear objetos de datos a partir de las filas de la hoja de cálculo
function parseRowData(row, columnTitles) {
    const rowData = {};
    if (row.c) {
      row.c.forEach((cell, index) => {
        const colTitle = columnTitles[index];
        rowData[colTitle] = cell && cell.v ? cell.v : null;
      });
    }
    return rowData;
  }
  
  // Función para renderizar los datos obtenidos
function renderData(data, containerId) {
    const container = document.getElementById(containerId);
    data.forEach((item) => {
      const div = createDiv(item);
      container.appendChild(div);
    });
  }
  
  // Función para crear un div a partir de los datos
function createDiv(item) {
    const html = `
      <div class="col-xl-4 col-lg-4 col-md-6">
          <div class="single-place mb-30">
              <div class="place-img">
                  <img id="imagenPlaceholder" src="${item.Imagen}" alt="">
              </div>
              <div class="place-cap">
                  <div class="place-cap-top">
                      <span><i class="fas fa-star"></i><span>10</span> </span>
                      <h3><a  href="./packages.html">${item.Nombre}</a></h3>
                  </div>
                  <div class="place-cap-bottom">
                      <ul>
                          <li><i class="far fa-clock"></i>${item.Dias}</li>
                          <li><i class="fas fa-map-marker-alt"></i>${item.Ubicacion}</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
      `;
  
    return convertHTMLToElement(html);
  }
  
  // Función para convertir HTML a un elemento DOM
function convertHTMLToElement(html) {
    return document.createRange().createContextualFragment(html).firstElementChild;
  }
  
  // Función para activar el slider al hacer clic en los botones next/prev
function activateSlider(e) {
    const items = document.querySelectorAll(".item");
    e.target.matches(".next") && slider.append(items[0]);
    e.target.matches(".prev") && slider.prepend(items[items.length - 1]);
  }
  
  // Agregar el evento de clic al documento para activar el slider
  const slider = document.querySelector(".slider");
  document.addEventListener("click", activateSlider, false);
  
  // Llamar a la función para cargar los datos de la hoja de cálculo
  loadSheetData("1eau-LyHWiP5wdWYRtFMMVovjNBMuynstatQxGQ4VCz0", "destinos", "A1:Z1000", "viajes");
  loadSheetData("1eau-LyHWiP5wdWYRtFMMVovjNBMuynstatQxGQ4VCz0", "pasadias", "A1:Z1000", "viajesid");
  
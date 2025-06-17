const productos = [
  // Fármacos con imágenes asignadas
  { 
    nombre: "Oxitetraciclina", 
    precio: "$12.00", 
    laboratorio: "Vetpharma", 
    descripcion: "Antibiótico de amplio espectro.", 
    imagenes: ["antibio21.jpg"],
    distribuidor: "Distribuidora Nica Farma"
  },
  { 
    nombre: "Enrofloxacina", 
    precio: "$15.50", 
    laboratorio: "Bayer", 
    descripcion: "Antibiótico para infecciones respiratorias.",
    imagenes: ["antibio22.jpg"],
    distribuidor: "Distribuidora Salud Total"
  },
  { 
    nombre: "Ivermectina", 
    precio: "$8.00", 
    laboratorio: "Merck", 
    descripcion: "Antiparasitario de amplio uso.",
    imagenes: ["para11.jpg"],
    distribuidor: "Distribuidora FarmaNica"
  },
  { 
    nombre: "Albendazol", 
    precio: "$9.50", 
    laboratorio: "LabNica", 
    descripcion: "Desparasitante efectivo oral.",
    imagenes: ["para21.png"],
    distribuidor: "Distribuidora Nica Farma"
  },
  { 
    nombre: "Clostridiales", 
    precio: "$14.00", 
    laboratorio: "Zoetis", 
    descripcion: "Vacuna contra enfermedades clostridiales.",
    imagenes: ["vac11.jpg"],
    distribuidor: "Distribuidora Nica Farma"
  },
  { 
    nombre: "Aftosa", 
    precio: "$18.00", 
    laboratorio: "Biogenesis", 
    descripcion: "Vacuna contra fiebre aftosa.",
    imagenes: ["vac21.jpg"],
    distribuidor: "Distribuidora FarmaNica"
  },
  { 
    nombre: "Flunixin meglumine", 
    precio: "$10.75", 
    laboratorio: "Pfizer", 
    descripcion: "Analgésico y antiinflamatorio potente.",
    imagenes: ["anal11.jpg"],
    distribuidor: "Distribuidora Nica Farma"
  },
  { 
    nombre: "Meloxicam", 
    precio: "$11.00", 
    laboratorio: "Boehringer", 
    descripcion: "Antiinflamatorio no esteroideo (AINE).",
    imagenes: ["anal21.png"],
    distribuidor: "Distribuidora Salud Total"
  },
  { 
    nombre: "PGF₂α (cloprostenol)", 
    precio: "$19.00", 
    laboratorio: "ReproVet", 
    descripcion: "Hormona para sincronización de celos.",
    imagenes: ["hor11.jpg"],
    distribuidor: "Distribuidora FarmaNica"
  },
  { 
    nombre: "GnRH (buserelina)", 
    precio: "$21.50", 
    laboratorio: "ReproVet", 
    descripcion: "Hormona para inducción ovulatoria.",
    imagenes: ["hor21.jpg"],
    distribuidor: "Distribuidora Salud Total"
  },





  // Accesorios
  { 
    nombre: "Agujas", 
    precio: "$2.00", 
    laboratorio: "AgriTools", 
    descripcion: "Agujas veterinarias esterilizadas.",
    imagenes: ["aguja1.jpg"],
    distribuidor: "Distribuidora Nica Farma"
  },
  { 
    nombre: "Guias", 
    precio: "$3.00", 
    laboratorio: "VetSupply", 
    descripcion: "Guías plásticas para inseminación.",
    imagenes: ["guia1.png"],
    distribuidor: "Distribuidora Salud Total"
  },
  { 
    nombre: "Pipetas", 
    precio: "$1.50", 
    laboratorio: "AgroLab", 
    descripcion: "Pipetas dosificadoras de precisión.",
    imagenes: ["pipetas1.png"],
    distribuidor: "Distribuidora FarmaNica"
  },
  { 
    nombre: "Aretes", 
    precio: "$0.90", 
    laboratorio: "IdentiVet", 
    descripcion: "Aretes identificadores para ganado.",
    imagenes: ["aretes1.jpg"],
    distribuidor: "Distribuidora Nica Farma"
  },
  { 
    nombre: "Comederos o tolvas", 
    precio: "$25.00", 
    laboratorio: "RuralTech", 
    descripcion: "Tolvas metálicas resistentes para alimentación.",
    imagenes: ["comederos1.jpg"],
    distribuidor: "Distribuidora Salud Total"
  },
  { 
    nombre: "cubetas de suplemento", 
    precio: "$7.00", 
    laboratorio: "NutriCampo", 
    descripcion: "Cubetas minerales para suplementación.",
    imagenes: ["cubeta1.jpg"],
    distribuidor: "Distribuidora FarmaNica"
  },
  // Ganado
  { 
    nombre: "Holstein", 
    precio: "$950.00", 
    laboratorio: "GenGanado", 
    descripcion: "Vaca lechera de alta producción.",
    imagenes: ["holstein1.jpg"],
    distribuidor: "Distribuidora Nica Ganadera"
  },
  { 
    nombre: "Jersey", 
    precio: "$850.00", 
    laboratorio: "AgroGen", 
    descripcion: "Raza productora de leche rica en grasa.",
    imagenes: ["jersey1.jpg"],
    distribuidor: "Distribuidora AgroNica"
  }
];






function mostrarModalDetalles(producto) {
  // Cerrar cualquier otro modal abierto
  document.querySelectorAll('.modal_detalles_farmacos').forEach(modal => modal.remove());

  const modal = document.createElement("div");
  modal.className = "modal_detalles_farmacos";
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center;
    z-index: 9999;
  `;

  const contenido = document.createElement("div");
  contenido.style.cssText = `
    background: white; padding: 20px; border-radius: 10px; max-width: 600px; width: 90%;
    position: relative; text-align: center;
  `;

  const cerrar = document.createElement("span");
  cerrar.textContent = "✖";
  cerrar.style.cssText = "position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 20px;";
  cerrar.onclick = () => modal.remove();

  const img = document.createElement("img");
  img.src = `img/${producto.imagenes[0]}`;
  img.style = "width: 100%; max-width: 300px; margin-bottom: 10px;";

  const desc = document.createElement("p");
  desc.innerHTML = `<strong>Descripción:</strong> ${producto.descripcion}`;

  const lab = document.createElement("p");
  lab.innerHTML = `<strong>Laboratorio:</strong> ${producto.laboratorio}`;

  const dist = document.createElement("p");
  dist.innerHTML = `<strong>Distribuidor:</strong> ${producto.distribuidor}`;

  const tel = document.createElement("p");
  tel.innerHTML = `<strong>Teléfono:</strong> +505 8888-8888`;

  const btnAñadir = document.createElement("button");
  btnAñadir.textContent = "Añadir al carrito";
  btnAñadir.style = "margin-top: 15px; padding: 10px 20px; background-color: #5cb85c; color: white; border: none; border-radius: 5px; cursor: pointer;";
  btnAñadir.onclick = () => {
    modal.remove();
    mostrarModalCantidad(producto);
  };

  contenido.append(cerrar, img, desc, lab, dist, tel, btnAñadir);
  modal.appendChild(contenido);
  document.body.appendChild(modal);
}

function mostrarModalCantidad(producto) {
  const modal = document.createElement("div");
  modal.className = "modal_busqueda_farmacos";
  modal.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background-color: rgba(0,0,0,0.7); display: flex; justify-content: center; align-items: center;
    z-index: 10000;
  `;

  const contenido = document.createElement("div");
  contenido.style.cssText = `
    background: white; padding: 20px; border-radius: 10px; max-width: 400px; width: 90%;
    text-align: center; position: relative;
  `;

  const cerrar = document.createElement("span");
  cerrar.textContent = "✖";
  cerrar.style.cssText = "position: absolute; top: 10px; right: 15px; cursor: pointer; font-size: 20px;";
  cerrar.onclick = () => modal.remove();

  const label = document.createElement("label");
  label.textContent = "¿Cuántas unidades desea añadir?";
  label.style = "display:block; margin-bottom:10px;";

  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.value = 1;
  input.style = "width: 100px; padding: 5px; margin-bottom: 15px;";

  const btnConfirmar = document.createElement("button");
  btnConfirmar.textContent = "Confirmar";
  btnConfirmar.style = "padding: 10px 20px; background-color: #0275d8; color: white; border: none; border-radius: 5px; cursor: pointer;";
  btnConfirmar.onclick = () => {
    const cantidad = parseInt(input.value);
    if (cantidad > 0) {
      agregarAlCarrito(producto, cantidad);
      modal.remove();
    }
  };

  contenido.append(cerrar, label, input, btnConfirmar);
  modal.appendChild(contenido);
  document.body.appendChild(modal);
}

function agregarAlCarrito(producto, cantidad) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const item = {
    nombre: producto.nombre,
    imagen: producto.imagenes[0],
    precio: producto.precio,
    cantidad: cantidad,
    laboratorio: producto.laboratorio,
    distribuidor: producto.distribuidor
  };

  carrito.push(item);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert(`Se añadieron ${cantidad} unidades de "${producto.nombre}" al carrito.`);
}











function mostrarModalDetallesAccesorios(producto) {
  // Cierra cualquier modal anterior
  const existente = document.getElementById("modal_detalles_accesorios");
  if (existente) existente.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "modal_detalles_accesorios";
  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal-contenido">
      <span class="cerrar" onclick="document.getElementById('modal_detalles_accesorios').remove()">&times;</span>
      <h2>${producto.nombre}</h2>
      <img src="img/${producto.imagenes[0]}" alt="${producto.nombre}" style="width: 300px;">
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p><strong>Laboratorio:</strong> ${producto.laboratorio}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Distribuidor:</strong> ${producto.distribuidor}</p>
      <p><strong>Contacto:</strong> 8888-8888</p>
      <button onclick='mostrarModalCantidadAccesorios(${JSON.stringify(JSON.stringify(producto))})'>Añadir al carrito</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function mostrarModalCantidadAccesorios(productoJSON) {
  const producto = JSON.parse(productoJSON);

  // Cierra el modal anterior si existe
  const anterior = document.getElementById("modal_detalles_accesorios");
  if (anterior) anterior.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "modal_busqueda_accesorios";
  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal-contenido">
      <span class="cerrar" onclick="document.getElementById('modal_busqueda_accesorios').remove()">&times;</span>
      <h3>¿Cuántas unidades desea añadir?</h3>
      <input type="number" id="cantidadInputAccesorios" min="1" value="1" style="width: 60px;">
      <button onclick='agregarAlCarritoAccesorios(${JSON.stringify(JSON.stringify(producto))})'>Confirmar</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function agregarAlCarritoAccesorios(productoJSON) {
  const producto = JSON.parse(productoJSON);
  const cantidad = parseInt(document.getElementById("cantidadInputAccesorios").value);

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingrese una cantidad válida.");
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push({
    nombre: producto.nombre,
    imagen: producto.imagenes[0],
    precio: producto.precio,
    cantidad: cantidad,
    distribuidor: producto.distribuidor
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto añadido al carrito.");
  document.getElementById("modal_busqueda_accesorios").remove();
}






function mostrarModalDetallesGanado(producto) {
  const existente = document.getElementById("modal_detalles_ganado");
  if (existente) existente.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "modal_detalles_ganado";
  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal-contenido">
      <span class="cerrar" onclick="document.getElementById('modal_detalles_ganado').remove()">&times;</span>
      <h2>${producto.nombre}</h2>
      <img src="img/${producto.imagenes[0]}" alt="${producto.nombre}" style="width: 300px;">
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p><strong>Laboratorio:</strong> ${producto.laboratorio}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Distribuidor:</strong> ${producto.distribuidor}</p>
      <p><strong>Contacto:</strong> 8888-8888</p>
      <button onclick='mostrarModalCantidadGanado(${JSON.stringify(JSON.stringify(producto))})'>Añadir al carrito</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function mostrarModalCantidadGanado(productoJSON) {
  const producto = JSON.parse(productoJSON);
  const anterior = document.getElementById("modal_detalles_ganado");
  if (anterior) anterior.remove();

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.id = "modal_busqueda_ganado";
  modal.style.display = "flex";

  modal.innerHTML = `
    <div class="modal-contenido">
      <span class="cerrar" onclick="document.getElementById('modal_busqueda_ganado').remove()">&times;</span>
      <h3>¿Cuántos desea añadir?</h3>
      <input type="number" id="cantidadInputGanado" min="1" value="1" style="width: 60px;">
      <button onclick='agregarAlCarritoGanado(${JSON.stringify(JSON.stringify(producto))})'>Confirmar</button>
    </div>
  `;

  document.body.appendChild(modal);
}

function agregarAlCarritoGanado(productoJSON) {
  const producto = JSON.parse(productoJSON);
  const cantidad = parseInt(document.getElementById("cantidadInputGanado").value);

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Ingrese una cantidad válida.");
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  carrito.push({
    nombre: producto.nombre,
    imagen: producto.imagenes[0],
    precio: producto.precio,
    cantidad: cantidad,
    distribuidor: producto.distribuidor
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));

  alert("Producto añadido al carrito.");
  document.getElementById("modal_busqueda_ganado").remove();
}








// Función auxiliar para crear elementos con clases y atributos opcionales
function crearElemento(tipo, opciones = {}) {
  const elem = document.createElement(tipo);
  if (opciones.clase) elem.className = opciones.clase;
  if (opciones.texto) elem.textContent = opciones.texto;
  if (opciones.html) elem.innerHTML = opciones.html;
  if (opciones.attrs) {
    for (const attr in opciones.attrs) {
      elem.setAttribute(attr, opciones.attrs[attr]);
    }
  }
  if (opciones.src) elem.src = opciones.src;
  if (opciones.alt) elem.alt = opciones.alt;
  if (opciones.style) {
    for (const prop in opciones.style) {
      elem.style[prop] = opciones.style[prop];
    }
  }
  return elem;
}

function buscarProductos(termino) {
  const resultados = document.getElementById("resultados-busqueda");
  resultados.innerHTML = "";

  if (termino === "") {
    // No mostrar productos si no hay término
    return;
  }

  const filtrados = productos.filter(prod => 
    prod.nombre.toLowerCase().includes(termino.toLowerCase()) ||
    prod.descripcion.toLowerCase().includes(termino.toLowerCase()) ||
    prod.laboratorio.toLowerCase().includes(termino.toLowerCase()) ||
    prod.distribuidor.toLowerCase().includes(termino.toLowerCase())
  );

  if (filtrados.length === 0) {
    resultados.innerHTML = "<p>No se encontraron productos.</p>";
    return;
  }

  filtrados.forEach(prod => {
    const contenedor = crearElemento("div", { clase: "producto-item animado" });

    const imagen = crearElemento("img", {
      src: `img/${prod.imagenes[0]}`,
      alt: prod.nombre,
      style: { width: "200px", height: "auto" }
    });

    const nombre = crearElemento("h3", { texto: prod.nombre });
    const descripcion = crearElemento("p", { texto: prod.descripcion });
    const precio = crearElemento("p", { texto: `Precio: ${prod.precio}` });

    const boton = crearElemento("button", { texto: "Ver detalles", clase: "btn-ver-detalles" });
    boton.addEventListener("click", () => mostrarModalDetalles(prod));

    contenedor.append(imagen, nombre, descripcion, precio, boton);
    resultados.appendChild(contenedor);
  });
}


// Cierre de modales al hacer clic fuera
window.addEventListener("click", (event) => {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) {
      modal.remove();
    }
  });
});

// Escuchar input para búsqueda en tiempo real
document.addEventListener("DOMContentLoaded", () => {
  const barraBusqueda = document.getElementById("barra-busqueda");

  barraBusqueda.addEventListener("input", (e) => {
    const termino = e.target.value.trim();
    buscarProductos(termino);
  });

  // No mostrar nada inicialmente (productos ocultos)
});

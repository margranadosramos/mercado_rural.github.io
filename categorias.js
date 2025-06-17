function mostrarCategoria(categoria) {
  const categorias = {
    farmacos: [
      "Oxitetraciclina", "Enrofloxacina", "Ivermectina", "Albendazol",
      "Clostridiales", "Aftosa", "Flunixin meglumine", "Meloxicam",
      "PGF₂α (cloprostenol)", "GnRH (buserelina)"
    ],
    accesorios: [
      "Agujas", "Guias", "Pipetas", "Aretes", "Comederos o tolvas", "cubetas de suplemento"
    ],
    ganado: ["Holstein", "Jersey"]
  };

  const productosFiltrados = productos.filter(prod =>
    categorias[categoria]?.includes(prod.nombre)
  );

  const resultados = document.getElementById("resultados-busqueda");
  resultados.innerHTML = "";

  productosFiltrados.forEach(prod => {
    const contenedor = document.createElement("div");
    contenedor.className = "producto-item animado";

    const imagen = document.createElement("img");
    imagen.src = `img/${prod.imagenes[0]}`;
    imagen.alt = prod.nombre;
    imagen.style.width = "200px";

    const nombre = document.createElement("h3");
    nombre.textContent = prod.nombre;

    const descripcion = document.createElement("p");
    descripcion.textContent = prod.descripcion;

    const precio = document.createElement("p");
    precio.textContent = `Precio: ${prod.precio}`;

    const laboratorio = document.createElement("p");
    laboratorio.textContent = `Laboratorio: ${prod.laboratorio}`;

    const distribuidor = document.createElement("p");
    distribuidor.textContent = `Distribuidor: ${prod.distribuidor}`;

    const boton = document.createElement("button");
    boton.textContent = "Ver detalles";
    boton.className = "btn-ver-detalles";
    boton.addEventListener("click", () => mostrarModalDetallesFarmacos(prod));

    contenedor.appendChild(imagen);
    contenedor.appendChild(nombre);
    contenedor.appendChild(descripcion);
    contenedor.appendChild(precio);
    contenedor.appendChild(laboratorio);
    contenedor.appendChild(distribuidor);
    contenedor.appendChild(boton);

    resultados.appendChild(contenedor);
  });
}

// Modal detalle producto con botón añadir carrito
function mostrarModalDetallesFarmacos(producto) {
  // Eliminar modal si existe
  const modalExistente = document.getElementById("modal_detalles_farmacos");
  if (modalExistente) modalExistente.remove();

  // Crear modal
  const modal = document.createElement("div");
  modal.id = "modal_detalles_farmacos";
  modal.className = "modal";
  modal.style.display = "flex";
  modal.innerHTML = `
    <div class="modal-contenido">
      <span class="cerrar" onclick="cerrarModal('modal_detalles_farmacos')">&times;</span>
      <h2>${producto.nombre}</h2>
      <img src="img/${producto.imagenes[0]}" alt="${producto.nombre}" style="width: 300px; margin-bottom: 15px;">
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p><strong>Laboratorio:</strong> ${producto.laboratorio}</p>
      <p><strong>Dueño:</strong> ${producto.dueño}</p>
      <p><strong>Finca:</strong> ${producto.finca}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Distribuidor:</strong> ${producto.distribuidor}</p>
      <p><strong>Contacto:</strong> 8888-8888</p>
      <button onclick='mostrarModalCantidadFarmacos(${JSON.stringify(JSON.stringify(producto))})'>Añadir al carrito</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Modal para seleccionar cantidad antes de añadir al carrito
function mostrarModalCantidadFarmacos(productoJSON) {
  const producto = JSON.parse(productoJSON);

  // Cerrar modal detalles si está abierto
  const modalDetalles = document.getElementById("modal_detalles_farmacos");
  if (modalDetalles) modalDetalles.remove();

  // Eliminar modal cantidad si existe
  const modalExistente = document.getElementById("modal_busqueda_farmacos");
  if (modalExistente) modalExistente.remove();

  // Crear modal cantidad
  const modal = document.createElement("div");
  modal.id = "modal_busqueda_farmacos";
  modal.className = "modal";
  modal.style.display = "flex";
  modal.innerHTML = `
    <div class="modal-contenido">
      <span class="cerrar" onclick="cerrarModal('modal_busqueda_farmacos')">&times;</span>
      <h3>¿Cuántos desea añadir?</h3>
      <input type="number" id="cantidadInput" min="1" value="1" style="width: 60px; margin-right: 10px;">
      <button onclick='agregarAlCarritoFarmacos(${JSON.stringify(JSON.stringify(producto))})'>Confirmar</button>
    </div>
  `;
  document.body.appendChild(modal);
}

// Función para agregar producto con cantidad al localStorage
function agregarAlCarritoFarmacos(productoJSON) {
  const producto = JSON.parse(productoJSON);
  const cantidad = parseInt(document.getElementById("cantidadInput").value);

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
    distribuidor: producto.distribuidor,
    dueño: producto.dueño,
    finca:producto.finca
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto añadido al carrito.");
  cerrarModal("modal_busqueda_farmacos");
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

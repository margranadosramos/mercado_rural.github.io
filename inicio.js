document.addEventListener("DOMContentLoaded", () => {
  const promociones = [
    {
      id: "promo1",
      img: "img/prom1.jpg",
      nombre: "Vitaminas",
      producto: "Fortalecimiento general",
      descripcionLarga: "Vitaminas esenciales para el fortalecimiento general de la salud, con componentes naturales que ayudan a mejorar el sistema inmunológico.",
      laboratorio: "LabVida",
      precio1: 180.00,
       precio: "C$ 80.00",
      proveedor: {
        foto: "img/proveedor_labvida.jpg",
        nombre: "LabVida Distribuciones",
        whatsapp: "+505 1234 5678"
      }
    },
    {
      id: "promo2",
      img: "img/Agujas.jpg",
      nombre: "Agujas",
      producto: "Uso veterinario",
      descripcionLarga: "Agujas estériles de alta calidad para uso veterinario, ideales para aplicaciones seguras y efectivas.",
      laboratorio: "VetSafe",
      precio1: 60.00,
      precio: "C$ 60.00",
      proveedor: {
        foto: "img/proveedor_vetsafe.jpg",
        nombre: "VetSafe S.A.",
        whatsapp: "+505 8765 4321"
      }
    },
    {
      id: "promo3",
      img: "img/Dezametazona.jpg",
      nombre: "Dezametazona",
      producto: "Antiinflamatorio",
      descripcionLarga: "Medicamento antiinflamatorio con rápida acción, recomendado para tratamientos veterinarios específicos.",
      laboratorio: "PharmaVet",
      precio1: 120.00,
      precio: "C$ 600.00",
      proveedor: {
        foto: "img/proveedor_pharmavet.jpg",
        nombre: "PharmaVet",
        whatsapp: "+505 1122 3344"
      }
    }
  ];

  const contenedor = document.querySelector(".carrusel-contenedor");
  let indiceActual = 0;
  let intervalo;

  // Crear items del carrusel
  contenedor.innerHTML = "";
  promociones.forEach((promo) => {
    const item = document.createElement("div");
    item.classList.add("carrusel-item");
    item.innerHTML = `
      <img src="${promo.img}" alt="${promo.nombre}">
      <div class="descripcion">
        <h2>${promo.nombre}</h2>
        <p><strong>Producto:</strong> ${promo.producto}</p>
        <p><strong>Laboratorio:</strong> ${promo.laboratorio}</p>
        <p><strong>Precio:</strong> ${promo.precioTexto}</p>
        <button class="btn-detalles" data-id="${promo.id}">Ver detalles</button>
      </div>
    `;
    contenedor.appendChild(item);
  });

  // Estilo carrusel por JS (ideal en CSS)
  contenedor.style.display = "flex";
  contenedor.style.transition = "transform 0.5s ease-in-out";
  contenedor.style.width = `${promociones.length * 100}%`;
  document.querySelectorAll(".carrusel-item").forEach(item => {
    item.style.minWidth = `${100 / promociones.length}%`;
  });

  function moverCarrusel() {
    contenedor.style.transform = `translateX(-${indiceActual * (100 / promociones.length)}%)`;
  }
  function siguiente() {
    indiceActual = (indiceActual + 1) % promociones.length;
    moverCarrusel();
  }
  function anterior() {
    indiceActual = (indiceActual - 1 + promociones.length) % promociones.length;
    moverCarrusel();
  }

  const btnSiguiente = document.querySelector(".btn-siguiente");
  const btnAnterior = document.querySelector(".btn-anterior");
  if (btnSiguiente) {
    btnSiguiente.addEventListener("click", () => {
      siguiente();
      reiniciarIntervalo();
    });
  }
  if (btnAnterior) {
    btnAnterior.addEventListener("click", () => {
      anterior();
      reiniciarIntervalo();
    });
  }
  function iniciarIntervalo() {
    intervalo = setInterval(() => {
      siguiente();
    }, 5000);
  }
  function reiniciarIntervalo() {
    clearInterval(intervalo);
    iniciarIntervalo();
  }

  moverCarrusel();
  iniciarIntervalo();

  // Modal detalles
  if (!document.getElementById("detalles_promocion")) {
    const modalHTML = `
      <div id="detalles_promocion" class="modal" style="display:none; position:fixed; z-index:1000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.6); align-items:center; justify-content:center;">
        <div class="modal-contenido" style="background:#fff; padding:20px; border-radius:10px; max-width:800px; width:90%; max-height:90vh; overflow-y:auto; display:flex; gap:20px; flex-wrap:wrap; position:relative;">
          <span class="cerrar" id="cerrarModalDetalles" style="cursor:pointer; font-size:28px; font-weight:bold; position:absolute; top:15px; right:20px;">&times;</span>
          <div class="modal-imagen" style="flex:1 1 300px;">
            <img id="modalImg" src="" alt="" style="width:100%; border-radius:8px;">
          </div>
          <div class="modal-info" style="flex:1 1 300px; display:flex; flex-direction: column; justify-content: space-between;">
            <div>
              <h2 id="modalNombre"></h2>
              <p id="modalProducto"></p>
              <p id="modalDescripcion"></p>
              <p><strong>Laboratorio:</strong> <span id="modalLaboratorio"></span></p>
              <p><strong>Precio:</strong> <span id="modalPrecio"></span></p>
            </div>
            <div class="proveedor-carrito" style="display:flex; align-items:center; justify-content: space-between; margin-top: 20px; flex-wrap:wrap;">
              <div class="perfil-proveedor" style="display:flex; align-items:center; gap: 12px;">
                <img id="modalProveedorFoto" src="" alt="Foto proveedor" style="width:60px; height:60px; border-radius: 50%; object-fit: cover;">
                <div>
                  <p id="modalProveedorNombre" style="font-weight:bold; margin:0;"></p>
                  <a href="#" id="modalProveedorWhatsapp" target="_blank" style="color:#25D366; text-decoration:none;"></a>
                </div>
              </div>
              <button id="btnAñadirCarrito" style="padding: 10px 20px; background-color: #28a745; color:white; border:none; border-radius:6px; cursor:pointer; margin-top:10px;">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  }
  const modalDetalles = document.getElementById("detalles_promocion");
  const cerrarModalDetalles = document.getElementById("cerrarModalDetalles");

  function abrirModalDetalles(id) {
    const promo = promociones.find(p => p.id === id);
    if (!promo) return;

    document.getElementById("modalImg").src = promo.img;
    document.getElementById("modalImg").alt = promo.nombre;
    document.getElementById("modalNombre").textContent = promo.nombre;
    document.getElementById("modalProducto").innerHTML = `<strong>Producto:</strong> ${promo.producto}`;
    document.getElementById("modalDescripcion").textContent = promo.descripcionLarga;
    document.getElementById("modalLaboratorio").textContent = promo.laboratorio;
    document.getElementById("modalPrecio").textContent = promo.precioTexto;

    const proveedorFoto = document.getElementById("modalProveedorFoto");
    const proveedorNombre = document.getElementById("modalProveedorNombre");
    const proveedorWhatsapp = document.getElementById("modalProveedorWhatsapp");

    proveedorFoto.src = promo.proveedor.foto;
    proveedorFoto.alt = promo.proveedor.nombre;
    proveedorNombre.textContent = promo.proveedor.nombre;
    proveedorWhatsapp.href = `https://wa.me/${promo.proveedor.whatsapp.replace(/\D/g, '')}`;
    proveedorWhatsapp.textContent = `WhatsApp: ${promo.proveedor.whatsapp}`;

    // Guardar id en botón añadir
    const btnAñadir = document.getElementById("btnAñadirCarrito");
    btnAñadir.dataset.productoId = promo.id;

    modalDetalles.style.display = "flex";
  }
  cerrarModalDetalles.addEventListener("click", () => {
    modalDetalles.style.display = "none";
  });
  window.addEventListener("click", (e) => {
    if (e.target === modalDetalles) {
      modalDetalles.style.display = "none";
    }
  });
  contenedor.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-detalles")) {
      const id = e.target.dataset.id;
      abrirModalDetalles(id);
    }
  });

  // Modal cantidad
  if (!document.getElementById("modalCantidad")) {
    const modalCantidadHTML = `
      <div id="modalCantidad" style="display:none; position:fixed; z-index:1100; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.75); align-items:center; justify-content:center;">
        <div style="background:#fff; padding:25px 30px; border-radius:12px; width:90%; max-width:400px; text-align:center; box-shadow:0 0 15px rgba(0,0,0,0.3);">
          <h3>¿Cuántas unidades deseas añadir?</h3>
          <input type="number" id="cantidadInput" min="1" value="1" style="width:60px; font-size:16px; padding:5px; margin: 15px 0;">
          <div style="display:flex; justify-content:center; gap:15px; margin-top:20px;">
            <button id="confirmarCantidad" style="padding:8px 20px; background:#28a745; color:#fff; border:none; border-radius:6px; cursor:pointer;">Añadir</button>
            <button id="cancelarCantidad" style="padding:8px 20px; background:#dc3545; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cancelar</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalCantidadHTML);
  }
  const modalCantidad = document.getElementById("modalCantidad");
  const cantidadInput = document.getElementById("cantidadInput");
  const btnConfirmarCantidad = document.getElementById("confirmarCantidad");
  const btnCancelarCantidad = document.getElementById("cancelarCantidad");

  let productoSeleccionado = null;

  // Abrir modal cantidad al hacer click en añadir carrito
  document.getElementById("btnAñadirCarrito").addEventListener("click", (e) => {
    const idProducto = e.target.dataset.productoId;
    productoSeleccionado = promociones.find(p => p.id === idProducto);
    if (!productoSeleccionado) return;

    cantidadInput.value = 1;
    modalCantidad.style.display = "flex";
  });

  // Función para añadir al carrito en localStorage
  function añadiralcarritopromociones(producto, cantidad) {
    if (!producto || typeof cantidad !== 'number' || cantidad <= 0) {
      console.warn('Producto inválido o cantidad incorrecta');
      return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const index = carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      // Si ya existe el producto, aumentar la cantidad
      carrito[index].cantidad += cantidad;
    } else {
      // Agregar producto nuevo
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        producto: producto.producto,
        img: producto.img,
        precio: producto.precio,
        proveedor: producto.proveedor.nombre,
        cantidad: cantidad
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Confirmar cantidad
  btnConfirmarCantidad.addEventListener("click", () => {
    const cantidad = parseInt(cantidadInput.value, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor, ingresa una cantidad válida.");
      return;
    }

    añadiralcarritopromociones(productoSeleccionado, cantidad);

    alert(`Se añadieron ${cantidad} unidad(es) de "${productoSeleccionado.nombre}" al carrito.`);

    modalCantidad.style.display = "none";
    modalDetalles.style.display = "none";
    productoSeleccionado = null;
  });

  // Cancelar cantidad
  btnCancelarCantidad.addEventListener("click", () => {
    modalCantidad.style.display = "none";
    productoSeleccionado = null;
  });

  // Cerrar modal cantidad si clic afuera
  window.addEventListener("click", (e) => {
    if (e.target === modalCantidad) {
      modalCantidad.style.display = "none";
      productoSeleccionado = null;
    }
  });
});

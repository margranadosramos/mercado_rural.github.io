const descuentos = [
  {
    id: "desc1",
    img: "img/remolques.jpg",
    titulo:"20% de Descuento",
    nombre: "Remolques",
    descripcionCorta: "En todos los remolques seleccionados. ¡Aprovecha esta oferta por tiempo limitado!",
    descripcionLarga: "Disfruta un 20% de descuento en una selección exclusiva de remolques, ideales para transportar carga pesada con seguridad y eficiencia. Oferta válida hasta agotar existencias.",
    proveedor: {
      foto: "img/proveedor_remolques.jpg",
      nombre: "Remolques Rápidos S.A.",
      whatsapp: "+505 2222 3333"
    },
    precioOriginal: "C$ 15,000.00",
    precio: "C$ 12,000.00",
    stock: 100
  },






  {
    id: "desc2",
    img: "img/pala.jpg",
    titulo:"25% de Descuento",
    nombre: "Palas",
    descripcionCorta: "Palas reforzadas con descuento exclusivo este mes.",
    descripcionLarga: "Palas reforzadas fabricadas con materiales de alta calidad, diseñadas para durar y facilitar cualquier trabajo agrícola o de construcción. Aprovecha el 25% de descuento durante todo el mes.",
    proveedor: {
      foto: "img/proveedor_pala.jpg",
      nombre: "Herramientas Agro S.A.",
      whatsapp: "+505 4444 5555"
    },
    precioOriginal: "C$ 1,200.00",
    precio: "C$ 900.00",
    stock: 10
  },
  {
    id: "desc3",
    img: "img/mamadera.jpg",
    titulo:"30% de Descuento",
    nombre: "Mamaderas",
    descripcionCorta: "Mamaderas para ganado a un precio increíble. ¡Solo este mes!",
    descripcionLarga: "Mamaderas de alta durabilidad diseñadas especialmente para el cuidado del ganado, con un diseño ergonómico y materiales resistentes. Oferta del 30% válida solo este mes.",
    proveedor: {
      foto: "img/proveedor_mamadera.jpg",
      nombre: "Ganadería Plus",
      whatsapp: "+505 6666 7777"
    },
    precioOriginal: "C$ 500.00",
    precio: "C$ 350.00",
    stock: 30
  }
];

document.addEventListener("DOMContentLoaded", () => {

  const modalHTML = `
    <div id="detalles_descuento" class="modal" style="display:none; position:fixed; z-index:1000; left:0; top:0; width:100%; height:100%; overflow:auto; background-color: rgba(0,0,0,0.6);">
      <div class="modal-contenido" style="max-width:800px; background:#fff; margin:5% auto; padding:20px; border-radius:10px; position:relative; box-shadow:0 5px 15px rgba(0,0,0,0.3); animation: modalFadeIn 0.3s ease;">
        <span id="cerrar_detalles_descuento" style="position:absolute; top:10px; right:15px; font-size:28px; font-weight:bold; cursor:pointer;">&times;</span>
        <div style="display:flex; gap:20px; flex-wrap: wrap;">
          <div style="flex:1 1 300px;">
            <img id="desc_img" src="" alt="" style="width:100%; border-radius:8px;">
          </div>
          <div style="flex:1 1 300px; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <h2 id="desc_titulo"></h2>
              <p id="desc_descripcion"></p>
              <p><strong>Precio original:</strong> <span id="desc_precio_original" style="text-decoration:line-through; color:#888;"></span></p>
              <p><strong>Precio con descuento:</strong> <span id="desc_precio_descuento" style="color:#E53935; font-weight:bold;"></span></p>
            </div>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:20px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <img id="desc_proveedor_foto" src="" alt="Foto proveedor" style="width:60px; height:60px; border-radius:50%; object-fit:cover;">
                <div>
                  <p id="desc_proveedor_nombre" style="margin:0; font-weight:bold;"></p>
                  <a id="desc_proveedor_whatsapp" href="#" target="_blank" style="color:#25D366; text-decoration:none;"></a>
                </div>
              </div>
              <button id="btn_añadir_carrito_descuento" style="padding:10px 20px; background-color:#28a745; color:white; border:none; border-radius:6px; cursor:pointer;">Añadir al carrito</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="modal_cantidad_descuento" class="modal" style="display:none; position:fixed; z-index:1100; left:0; top:0; width:100%; height:100%; overflow:auto; background-color: rgba(0,0,0,0.75);">
      <div style="background:#fff; max-width:400px; margin:15% auto; padding:20px; border-radius:10px; box-shadow:0 5px 15px rgba(0,0,0,0.3); text-align:center; animation: modalFadeIn 0.3s ease;">
        <h3>¿Cuántas unidades deseas añadir?</h3>
        <input id="input_cantidad_descuento" type="number" min="1" max="100" value="1" style="width:80px; font-size:18px; padding:5px; margin:15px 0;">
        <div style="display:flex; justify-content:center; gap:15px;">
          <button id="confirmar_cantidad_descuento" style="padding:10px 20px; background-color:#28a745; color:#fff; border:none; border-radius:6px; cursor:pointer;">Confirmar</button>
          <button id="cancelar_cantidad_descuento" style="padding:10px 20px; background-color:#dc3545; color:#fff; border:none; border-radius:6px; cursor:pointer;">Cancelar</button>
        </div>
      </div>
    </div>

    <style>
      @keyframes modalFadeIn {
        from {opacity: 0; transform: translateY(-20px);}
        to {opacity: 1; transform: translateY(0);}
      }
    </style>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("detalles_descuento");
  const cerrarModal = document.getElementById("cerrar_detalles_descuento");

  const modalCantidad = document.getElementById("modal_cantidad_descuento");
  const inputCantidad = document.getElementById("input_cantidad_descuento");
  const btnConfirmarCantidad = document.getElementById("confirmar_cantidad_descuento");
  const btnCancelarCantidad = document.getElementById("cancelar_cantidad_descuento");

  let productoSeleccionado = null;

  function abrirModal(id) {
    const producto = descuentos.find(p => p.id === id);
    if (!producto) return;

    productoSeleccionado = producto;

    document.getElementById("desc_img").src = producto.img;
    document.getElementById("desc_img").alt = producto.titulo;
    document.getElementById("desc_titulo").textContent = producto.titulo;
    document.getElementById("desc_descripcion").textContent = producto.descripcionLarga;
    document.getElementById("desc_precio_original").textContent = producto.precioOriginal;
    document.getElementById("desc_precio_descuento").textContent = producto.precioDescuento;

    const fotoProv = document.getElementById("desc_proveedor_foto");
    const nombreProv = document.getElementById("desc_proveedor_nombre");
    const whatsappProv = document.getElementById("desc_proveedor_whatsapp");

    fotoProv.src = producto.proveedor.foto;
    fotoProv.alt = producto.proveedor.nombre;
    nombreProv.textContent = producto.proveedor.nombre;
    whatsappProv.href = `https://wa.me/${producto.proveedor.whatsapp.replace(/\D/g, '')}`;
    whatsappProv.textContent = `WhatsApp: ${producto.proveedor.whatsapp}`;

    inputCantidad.value = 1;
    inputCantidad.max = producto.stock;

    modal.style.display = "block";
  }

  cerrarModal.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
    if (e.target === modalCantidad) {
      modalCantidad.style.display = "none";
    }
  };

  // Función para añadir al carrito con lógica de existencia y acumulado
  function añadirAlCarritoDescuentos(producto, cantidad) {
    if (!producto || typeof cantidad !== "number" || cantidad <= 0) {
      console.warn("Producto inválido o cantidad incorrecta");
      return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const index = carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
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

    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  document.getElementById("btn_añadir_carrito_descuento").addEventListener("click", () => {
    if (!productoSeleccionado) return;
    modalCantidad.style.display = "block";
  });

  btnConfirmarCantidad.addEventListener("click", () => {
    let cantidad = parseInt(inputCantidad.value);
    if (isNaN(cantidad) || cantidad < 1) {
      alert("Por favor ingresa una cantidad válida.");
      return;
    }
    if (cantidad > productoSeleccionado.stock) {
      alert(`Solo hay ${productoSeleccionado.stock} unidades en stock.`);
      return;
    }

    añadirAlCarritoDescuentos(productoSeleccionado, cantidad);

    alert(`Se añadieron ${cantidad} unidad(es) de "${productoSeleccionado.titulo}" al carrito.`);

    modalCantidad.style.display = "none";
    modal.style.display = "none";
  });

  btnCancelarCantidad.addEventListener("click", () => {
    modalCantidad.style.display = "none";
  });

  // Delegación de eventos para abrir modal detalles con botón en las cards
  document.querySelector(".contenedor-descuentos").addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-detalle")) {
      const card = e.target.closest(".card-descuento");
      if (!card) return;
      const id = card.dataset.id;
      abrirModal(id);
    }
  });
});

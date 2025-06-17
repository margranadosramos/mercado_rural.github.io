document.addEventListener('DOMContentLoaded', () => {
  const productos = [
    {
      id: 'producto1',
      nombre: 'Básculas Digitales',
      descripcionCorta: 'Precisión y calidad para tu ganado.',
      descripcionLarga: 'Básculas digitales con tecnología avanzada para pesaje de ganado, resistentes al agua y de fácil calibración.',
      img: 'img/básculas.jpg',
      precio: "620.00",
      proveedor: {
        nombre: 'AgroPro S.A.',
        foto: 'img/proveedor1.jpg',
        whatsapp: '+50588887777'
      }
    },


    {
      id: 'producto2',
      nombre: 'Lazo de Alta Resistencia',
      descripcionCorta: 'Material reforzado para uso intensivo.',
      descripcionLarga: 'Lazo fabricado con materiales de alta resistencia, ideal para el manejo seguro y efectivo del ganado.',
      img: 'img/lazo.jpg',
      precio: "400.00",
      proveedor: {
        nombre: 'Ganaderos Unidos',
        foto: 'img/proveedor2.jpg',
        whatsapp: '+50577776666'
      }
    },
    {
      id: 'producto3',
      nombre: 'Ivermectina Premium',
      descripcionCorta: 'Protección total y prolongada.',
      descripcionLarga: 'Ivermectina de alta eficacia contra parásitos internos y externos, con efecto prolongado y segura para el ganado.',
      img: 'img/ivermectina.jpg',
      precio: "600.00",
      proveedor: {
        nombre: 'VetMedic Nicaragua',
        foto: 'img/proveedor3.jpg',
        whatsapp: '+50566665555'
      }
    }
  ];

  const contenedor = document.querySelector('.contenedor-nuevos');
  const body = document.body;

  // Modal de cantidad general
  const modalCantidadHTML = `
    <div id="modal-cantidad" class="modal-cantidad" style="display: none;">
      <div class="modal-cantidad-contenido">
        <span class="cerrar-cantidad">&times;</span>
        <h3>¿Cuántas unidades desea añadir?</h3>
        <input type="number" id="cantidad-input" min="1" value="1">
        <div class="botones-cantidad">
          <button id="confirmar-cantidad" class="btn-confirmar">Confirmar</button>
          <button id="cancelar-cantidad" class="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  `;
  body.insertAdjacentHTML('beforeend', modalCantidadHTML);

  let productoSeleccionado = null;

  // Función renombrada para añadir al carrito nuevos productos
  function añadirAlCarritoNuevos(producto, cantidad) {
    if (!producto || typeof cantidad !== 'number' || cantidad <= 0) {
      console.warn('Producto inválido o cantidad incorrecta');
      return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const index = carrito.findIndex(item => item.id === producto.id);
    if (index !== -1) {
      // Producto ya existe: aumentar cantidad
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

  productos.forEach((producto, index) => {
    const card = contenedor.children[index];
    const btn = card.querySelector('button');

    const modalId = `modal-detalles-${producto.id}`;
    const modalHTML = `
      <div id="${modalId}" class="modal-detalles" style="display:none;">
        <div class="modal-contenido">
          <span class="cerrar-modal" data-id="${modalId}">&times;</span>
<img src="${producto.img}" alt="${producto.nombre}" class="modal-imagen">

          <h3>${producto.nombre}</h3>
          <p>${producto.descripcionLarga}</p>
          <div class="proveedor-info">
            <img src="${producto.proveedor.foto}" class="foto-proveedor" alt="${producto.proveedor.nombre}">
            <div>
              <strong>${producto.proveedor.nombre}</strong><br>
              <a href="https://wa.me/${producto.proveedor.whatsapp.replace(/\D/g, '')}" target="_blank">
                <img src="img/whatsapp-icon.png" class="whatsapp-icon"> ${producto.proveedor.whatsapp}
              </a>
            </div>
          </div>
          <button class="btn-carrito" data-producto-id="${producto.id}">Añadir al carrito</button>
        </div>
      </div>
    `;
    body.insertAdjacentHTML('beforeend', modalHTML);

    btn.addEventListener('click', () => {
      document.getElementById(modalId).style.display = 'block';
    });
  });

  document.addEventListener('click', (e) => {
    if (e.target.matches('.cerrar-modal')) {
      const id = e.target.getAttribute('data-id');
      document.getElementById(id).style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-carrito')) {
      const idProducto = e.target.getAttribute('data-producto-id');
      const encontrado = productos.find(p => p.id === idProducto);
      if (!encontrado) return;

      productoSeleccionado = encontrado;
      document.getElementById('modal-cantidad').style.display = 'flex';
    }
  });

  // Confirmar cantidad
  document.getElementById('confirmar-cantidad').addEventListener('click', () => {
    const input = document.getElementById('cantidad-input');
    const cantidad = parseInt(input.value);

    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Ingrese una cantidad válida');
      return;
    }

    añadirAlCarritoNuevos(productoSeleccionado, cantidad);
    alert(`${cantidad} unidades de "${productoSeleccionado.nombre}" fueron añadidas al carrito.`);

    document.getElementById('modal-cantidad').style.display = 'none';
    document.getElementById(`modal-detalles-${productoSeleccionado.id}`).style.display = 'none';
    productoSeleccionado = null;
    input.value = 1;
  });

  // Cancelar o cerrar cantidad
  document.getElementById('cancelar-cantidad').addEventListener('click', cerrarModalCantidad);
  document.querySelector('.cerrar-cantidad').addEventListener('click', cerrarModalCantidad);

  function cerrarModalCantidad() {
    document.getElementById('modal-cantidad').style.display = 'none';
    productoSeleccionado = null;
    document.getElementById('cantidad-input').value = 1;
  }

  // Cerrar al hacer clic fuera del contenido
  document.getElementById('modal-cantidad').addEventListener('click', (e) => {
    if (e.target.id === 'modal-cantidad') cerrarModalCantidad();
  });

  // Exponer la función para posibles llamadas externas si quieres
  window.añadirAlCarritoNuevos = añadirAlCarritoNuevos;
});

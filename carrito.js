document.addEventListener('DOMContentLoaded', () => {
  const carritoProductos = document.getElementById('carrito-productos');
  const resumenCompra = document.getElementById('resumen-compra');
  const formularioPago = document.getElementById('formulario-pago');
  const facturaSection = document.getElementById('factura');

  const subtotalEl = document.getElementById('subtotal');
  const costoEnvioEl = document.getElementById('costo-envio');
  const totalPagarEl = document.getElementById('total-pagar');
  const departamentoSelect = document.getElementById('departamento');

  const btnPagar = document.getElementById('btn-pagar');
  const btnCancelar = document.getElementById('btn-cancelar');
  const btnVolver = document.getElementById('btn-volver');
  const btnDescargarFactura = document.getElementById('btn-descargar-factura');
  const btnNuevaCompra = document.getElementById('btn-nueva-compra');
  const formPago = document.getElementById('form-pago');
  const facturaCanvas = document.getElementById('factura-canvas');
  const ctx = facturaCanvas.getContext('2d');

  let productos = JSON.parse(localStorage.getItem('carrito')) || [];
  let productosMarcados = new Set();

  function renderizarProductos() {
    carritoProductos.innerHTML = '';
    if (productos.length === 0) {
      carritoProductos.innerHTML = '<p>No tienes productos en el carrito.</p>';
      resumenCompra.style.display = 'none';
      return;
    }
    resumenCompra.style.display = 'block';

    productos.forEach((producto, index) => {
      const div = document.createElement('div');
      div.className = 'producto-carrito';
      div.style.display = 'flex';
      div.style.alignItems = 'center';
      div.style.marginBottom = '15px';
      div.style.gap = '15px';

      const precioUnitarioNum = parsearPrecio(producto.precio);
      const cantidad = producto.cantidad || 1;
      const precioTotalProducto = (precioUnitarioNum * cantidad).toFixed(2);

      div.innerHTML = `
        <input type="checkbox" id="marcar-${index}" ${productosMarcados.has(index) ? 'checked' : ''} />
        <label for="marcar-${index}" style="flex: 1; display:flex; align-items:center; gap: 15px; cursor:pointer;">
          <img src="${producto.img}" alt="${producto.nombre}" style="width:60px; height:60px; object-fit:cover; border-radius:8px; box-shadow: 0 2px 6px rgba(0,0,0,0.15);" />
          <div>
            <div style="font-weight:600; font-size:16px; color:#222;">${producto.nombre}</div>
            <div style="color:#555;">
              Precio unidad: $${precioUnitarioNum.toFixed(2)} <br/>
            </div>
          </div>
        </label>
        <input type="number" min="1" value="${cantidad}" data-index="${index}" class="input-cantidad" style="width:60px; padding:5px; border-radius:6px; border:1px solid #ccc;" />
        <button data-index="${index}" class="btn-eliminar" style="background:#ff4d4f; color:#fff; border:none; border-radius:6px; padding:6px 12px; cursor:pointer;">Eliminar</button>
      `;

      carritoProductos.appendChild(div);
    });
  }

  function parsearPrecio(precioStr) {
    const num = precioStr.replace(/[^0-9.,]/g, '').replace(',', '.');
    return parseFloat(num) || 0;
  }

  function actualizarTotal() {
    let subtotal = 0;
    productosMarcados.forEach(i => {
      const precioStr = productos[i].precio;
      const cantidad = productos[i].cantidad || 1;
      subtotal += parsearPrecio(precioStr) * cantidad;
    });
    subtotalEl.textContent = subtotal.toFixed(2);
    actualizarCostoEnvio();
  }

  function actualizarCostoEnvio() {
    const depto = departamentoSelect.value;
    let costo = 0;
    if (!depto) {
      costoEnvioEl.textContent = '0.00';
      totalPagarEl.textContent = subtotalEl.textContent;
      return;
    }
    switch(depto) {
      case 'managua': costo = 5.00; break;
      case 'jinotega': costo = 8.00; break;
      case 'esteli': costo = 7.00; break;
      default: costo = 10.00;
    }
    costoEnvioEl.textContent = costo.toFixed(2);
    const total = parseFloat(subtotalEl.textContent) + costo;
    totalPagarEl.textContent = total.toFixed(2);
  }

  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(productos));
  }

  carritoProductos.addEventListener('click', e => {
    if (e.target.classList.contains('btn-eliminar')) {
      const index = parseInt(e.target.dataset.index);
      productos.splice(index, 1);
      productosMarcados.delete(index);
      const nuevoSet = new Set();
      productosMarcados.forEach(i => {
        if (i < index) nuevoSet.add(i);
        else if (i > index) nuevoSet.add(i-1);
      });
      productosMarcados = nuevoSet;
      guardarCarrito();
      renderizarProductos();
      actualizarTotal();
    }
  });

  carritoProductos.addEventListener('change', e => {
    if (e.target.type === 'checkbox') {
      const index = parseInt(e.target.id.split('-')[1]);
      if (e.target.checked) productosMarcados.add(index);
      else productosMarcados.delete(index);
      actualizarTotal();
    }
  });

  carritoProductos.addEventListener('input', e => {
    if (e.target.classList.contains('input-cantidad')) {
      const index = parseInt(e.target.dataset.index);
      let valor = parseInt(e.target.value);
      if (isNaN(valor) || valor < 1) {
        valor = 1;
        e.target.value = 1;
      }
      productos[index].cantidad = valor;
      guardarCarrito();
      actualizarTotal();
    }
  });

  departamentoSelect.addEventListener('change', actualizarCostoEnvio);

  btnPagar.addEventListener('click', () => {
    if (productosMarcados.size === 0) {
      alert('Debe marcar al menos un producto para comprar.');
      return;
    }
    if (!departamentoSelect.value) {
      alert('Seleccione un departamento para calcular envío.');
      return;
    }
    resumenCompra.style.display = 'none';
    formularioPago.style.display = 'block';
  });

  btnCancelar.addEventListener('click', () => {
    resumenCompra.style.display = 'none';
    formularioPago.style.display = 'none';
  });

  btnVolver.addEventListener('click', () => {
    formularioPago.style.display = 'none';
    resumenCompra.style.display = 'block';
  });

  formPago.addEventListener('submit', e => {
    e.preventDefault();
    const correo = document.getElementById('correo').value.trim();
    const confirmarCorreo = document.getElementById('confirmar-correo').value.trim();
    const telefono = document.getElementById('telefono-contacto').value.trim();
    const aceptaTerminos = document.getElementById('acepto-terminos').checked;

    if (correo !== confirmarCorreo) {
      alert('Los correos electrónicos no coinciden.');
      return;
    }

    if (!/^[0-9]{8}$/.test(telefono)) {
      alert('Ingrese un número de teléfono válido de 8 dígitos.');
      return;
    }

    if (!aceptaTerminos) {
      alert('Debe aceptar los términos y condiciones para continuar.');
      return;
    }

    formularioPago.style.display = 'none';
    facturaSection.style.display = 'block';
    generarFactura();
  });


  function generarFactura() {
    facturaCanvas.width = 600;
    facturaCanvas.height = 600;
    ctx.clearRect(0, 0, facturaCanvas.width, facturaCanvas.height);

    // Fondo blanco para toda la factura
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, facturaCanvas.width, facturaCanvas.height);

    // Variables para posición logo
    const logoX = 20, logoY = 20, logoSize = 80;

    // Cargar logo con ruta corregida
    const logo = new Image();
    logo.src = 'img/logp1.png';

    // Función para dibujar texto y factura (separada para poder llamarla con o sin logo)
    function dibujarTextoFactura() {
      // Si logo no cargó, dejamos espacio vacío
      // Línea separadora
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 1;

      ctx.fillStyle = '#000';
      ctx.font = 'bold 26px Arial';
      ctx.fillText('Factura de Compra', logoX + logoSize + 30, 60);

      ctx.beginPath();
      ctx.moveTo(20, 110);
      ctx.lineTo(facturaCanvas.width - 20, 110);
      ctx.stroke();

      // Productos listados
      ctx.font = '16px Arial';
      ctx.fillStyle = '#000';
      let y = 140;
      productosMarcados.forEach(i => {
        const prod = productos[i];
        const precioNum = parsearPrecio(prod.precio);
        const cantidad = prod.cantidad || 1;

        const textoProd = `${prod.nombre} x${cantidad}`;
        const textoPrecioUnidad = `($${precioNum.toFixed(2)} c/u)`;
        const textoPrecioTotal = `$${(precioNum * cantidad).toFixed(2)}`;

        ctx.fillText(textoProd, 40, y);
        ctx.fillText(textoPrecioUnidad, facturaCanvas.width - 220, y);
        ctx.fillText(textoPrecioTotal, facturaCanvas.width - 120, y);
        y += 30;
      });

      // Otra línea separadora
      ctx.beginPath();
      ctx.moveTo(20, y + 10);
      ctx.lineTo(facturaCanvas.width - 20, y + 10);
      ctx.stroke();

      // Subtotal, envío y total
      y += 40;
      ctx.font = 'bold 18px Arial';
      ctx.fillText('Subtotal:', 40, y);
      ctx.fillText(`$${subtotalEl.textContent}`, facturaCanvas.width - 120, y);

      y += 30;
      ctx.fillText('Costo envío:', 40, y);
      ctx.fillText(`$${costoEnvioEl.textContent}`, facturaCanvas.width - 120, y);

      y += 30;
      ctx.font = 'bold 22px Arial';
      ctx.fillText('Total a pagar:', 40, y);
      ctx.fillText(`$${totalPagarEl.textContent}`, facturaCanvas.width - 120, y);

      // Tipo de pago
      const tipoTarjeta = document.getElementById('tipo-tarjeta')?.value;
      if (tipoTarjeta) {
        y += 50;
        ctx.font = 'italic 16px Arial';
        ctx.fillText(`Pago con: ${tipoTarjeta}`, 40, y);
      }
    }

    // Intentar dibujar logo y luego texto
    logo.onload = () => {
      // Fondo blanco para logo (recuadro)
      ctx.fillStyle = '#fff';
      ctx.fillRect(logoX - 10, logoY - 10, logoSize + 20, logoSize + 20);
      // Dibujar logo con sombra ligera para destacar
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 8;
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
      ctx.shadowBlur = 0; // reset shadow

      dibujarTextoFactura();
    };

    // En caso de que la imagen no cargue en 1 segundo, dibuja texto sin logo
    setTimeout(() => {
      if (!logo.complete || logo.naturalWidth === 0) {
        dibujarTextoFactura();
      }
    }, 1000);
  }

  btnDescargarFactura.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'factura.png';
    link.href = facturaCanvas.toDataURL('image/png');
    link.click();
  });

  btnNuevaCompra.addEventListener('click', () => {
    facturaSection.style.display = 'none';
    productos = productos.filter((_,i) => !productosMarcados.has(i));
    productosMarcados.clear();
    guardarCarrito();
    renderizarProductos();
    resumenCompra.style.display = 'block';
  });

  function verificarCarritoVacio() {
    if (productos.length === 0) {
      resumenCompra.style.display = 'none';
    } else {
      resumenCompra.style.display = 'block';
    }
  }

  const originalRenderizarProductos = renderizarProductos;
  renderizarProductos = () => {
    originalRenderizarProductos();
    verificarCarritoVacio();
  };

  if (productos.length > 0 && productosMarcados.size === 0) {
    productos.forEach((_, i) => productosMarcados.add(i));
    renderizarProductos();
    actualizarTotal();
  }

  window.addEventListener('storage', (e) => {
    if (e.key === 'carrito') {
      productos = JSON.parse(e.newValue) || [];
      productosMarcados.clear();
      productos.forEach((_, i) => productosMarcados.add(i));
      renderizarProductos();
      actualizarTotal();
    }
  });

  renderizarProductos();
  actualizarTotal();
});

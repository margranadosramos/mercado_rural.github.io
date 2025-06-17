const notificaciones = [
  {
    id: 1,
    titulo: "Tu pedido ha sido finalizado",
    descripcion: "Tu compra fue procesada correctamente. Gracias por preferirnos.",
    distribuidor: "Distribuidora Salud Total",
    imagen: "antibio21.jpg",
    pedido: "A00123",
    fecha: "2025-06-10 14:32",
    contacto: "tel:+50512345678",
    tipo: "finalizado",
    leida: false
  },
  {
    id: 2,
    titulo: "Tu pedido está en camino",
    descripcion: "Producto: Oxitetraciclina - 12 unidades",
    distribuidor: "Distribuidora Nica Farma",
    imagen: "antibio22.jpg",
    pedido: "B00567",
    fecha: "2025-06-15 09:10",
    contacto: "tel:+50587654321",
    tipo: "en_camino",
    leida: false
  },
  {
    id: 3,
    titulo: "Tu pedido está en la puerta",
    descripcion: "Faltan 30 minutos para que llegue el repartidor.",
    distribuidor: "Distribuidora Nica Farma",
    imagen: "antibio21.jpg",
    pedido: "B00567",
    fecha: "2025-06-17 12:00",
    contacto: "tel:+50587654321",
    tipo: "en_puerta",
    leida: false
  }
];

const lista = document.getElementById('lista-notificaciones');
const modal = document.getElementById('detalle-notificacion');
const cerrarModal = document.getElementById('cerrar-modal');
const tituloEl = document.getElementById('detalle-titulo');
const descripcionEl = document.getElementById('detalle-descripcion');
const distribuidorEl = document.getElementById('detalle-distribuidor');
const imgProducto = document.getElementById('img-producto');
const pedidoEl = document.getElementById('detalle-pedido');
const fechaEl = document.getElementById('detalle-fecha');
const contactoEl = document.getElementById('detalle-contacto');

function iconoPorTipo(tipo) {
  switch (tipo) {
    case "finalizado":
      return '<i class="fa-solid fa-check-circle" style="color:green"></i>';
    case "en_camino":
      return '<i class="fa-solid fa-truck" style="color:orange"></i>';
    case "en_puerta":
      return '<i class="fa-solid fa-door-open" style="color:blue"></i>';
    default:
      return '<i class="fa-solid fa-bell"></i>';
  }
}

function crearNotificacionElement(noti) {
  const div = document.createElement('div');
  div.classList.add('notificacion');
  if (noti.leida) div.classList.add('leida');

  div.innerHTML = `${iconoPorTipo(noti.tipo)} <span>${noti.titulo}</span>`;
  div.addEventListener('click', () => mostrarDetalle(noti, div));
  return div;
}

function mostrarDetalle(noti, elemento) {
  tituloEl.textContent = noti.titulo;
  descripcionEl.textContent = noti.descripcion;
  distribuidorEl.textContent = noti.distribuidor;
  imgProducto.src = `img/${noti.imagen}`;
  pedidoEl.textContent = noti.pedido;
  fechaEl.textContent = new Date(noti.fecha).toLocaleString();
  contactoEl.textContent = noti.contacto.replace('tel:', '');
  contactoEl.href = noti.contacto;

  modal.style.display = 'flex';

  // Marcar como leída
  noti.leida = true;
  elemento.classList.add('leida');
}

// Renderizar lista
notificaciones.forEach(noti => {
  const notiEl = crearNotificacionElement(noti);
  lista.appendChild(notiEl);
});

// Cerrar modal con click en X o fuera
cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target === modal) modal.style.display = 'none';
});

// Cerrar modal con tecla ESC
window.addEventListener('keydown', e => {
  if(e.key === "Escape" && modal.style.display === 'flex') {
    modal.style.display = 'none';
  }
});

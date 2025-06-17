// perfil.js
document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    window.location.href = "inicio_secion.html"; // Redirigir si no está logueado
    return;
  }
  document.getElementById('nombreUsuario').textContent = usuario.displayName || usuario.email || "Usuario";
  if (usuario.photoURL) {
    document.getElementById('fotoUsuario').src = usuario.photoURL;
  } else {
    document.getElementById('fotoUsuario').src = 'img/default-profile.png'; // Pon aquí tu imagen por defecto
  }

  // Aquí puedes añadir lógica para publicar productos y listarlos,
  // usando localStorage o una base de datos si integras después
});



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAGph3HZBmLZwtly_dE6HFG-09YGPf0zqw",
  authDomain: "ruralmarket-d4c79.firebaseapp.com",
  projectId: "ruralmarket-d4c79",
  storageBucket: "ruralmarket-d4c79.firebasestorage.app",
  messagingSenderId: "734594037694",
  appId: "1:734594037694:web:349796894fc63090e1ebef",
  measurementId: "G-2PFVNQD72H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

const nombreUsuario = document.getElementById('nombreUsuario');
const fotoPerfil = document.getElementById('fotoPerfil');
const inputFotoPerfil = document.getElementById('inputFotoPerfil');
const formEditarPerfil = document.getElementById('formEditarPerfil');
const inputNombre = document.getElementById('nombre');
const inputCorreo = document.getElementById('correo');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');

// Autenticación y carga de datos al iniciar la página
onAuthStateChanged(auth, user => {
  if (user) {
    nombreUsuario.textContent = user.displayName || 'Usuario';
    inputNombre.value = user.displayName || '';
    inputCorreo.value = user.email || '';
    fotoPerfil.src = user.photoURL || 'img/default-profile.png';
  } else {
    // Si no hay usuario logueado, redirigir a inicio de sesión
    window.location.href = 'inicio_secion.html';
  }
});

// Subir y actualizar foto de perfil
inputFotoPerfil.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const user = auth.currentUser;
  if (!user) return;

  try {
    const fotoRef = storageRef(storage, `perfil/${user.uid}/${file.name}`);
    await uploadBytes(fotoRef, file);
    const urlFoto = await getDownloadURL(fotoRef);

    await updateProfile(user, { photoURL: urlFoto });
    fotoPerfil.src = urlFoto;
    alert('Foto de perfil actualizada exitosamente.');
  } catch (error) {
    alert('Error al subir foto: ' + error.message);
  }
});

// Actualizar nombre del perfil
formEditarPerfil.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nuevoNombre = inputNombre.value.trim();
  if (!nuevoNombre) {
    alert('El nombre no puede estar vacío.');
    return;
  }

  const user = auth.currentUser;
  if (!user) return;

  try {
    await updateProfile(user, { displayName: nuevoNombre });
    nombreUsuario.textContent = nuevoNombre;
    alert('Nombre actualizado correctamente.');
  } catch (error) {
    alert('Error al actualizar nombre: ' + error.message);
  }
});

// Cerrar sesión
btnCerrarSesion.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = 'inicio_secion.html';
  } catch (error) {
    alert('Error al cerrar sesión: ' + error.message);
  }
});

// *** Manejo básico de productos (en memoria) ***

const formProducto = document.getElementById('formProducto');
const productosContainer = document.getElementById('productosContainer');

// Lista de productos en memoria (se puede cambiar por base de datos real)
let productos = JSON.parse(localStorage.getItem('productos')) || [];

// Función para renderizar productos en la lista
function renderProductos() {
  productosContainer.innerHTML = '';
  if (productos.length === 0) {
    productosContainer.innerHTML = '<p>No tienes productos publicados aún.</p>';
    return;
  }
  productos.forEach((producto, index) => {
    const div = document.createElement('div');
    div.className = 'producto-item';

    div.innerHTML = `
      <img src="${producto.imagen || 'img/default-product.png'}" alt="${producto.titulo}" />
      <div class="producto-info">
        <h3>${producto.titulo}</h3>
        <p>${producto.descripcion}</p>
        <span>USD $${producto.precio.toFixed(2)}</span>
      </div>
      <div class="producto-acciones">
        <button data-index="${index}" class="btnEliminar">Eliminar</button>
      </div>
    `;

    productosContainer.appendChild(div);
  });

  // Agregar evento para eliminar productos
  document.querySelectorAll('.btnEliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      productos.splice(idx, 1);
      localStorage.setItem('productos', JSON.stringify(productos));
      renderProductos();
    });
  });
}

renderProductos();

// Agregar producto nuevo
formProducto.addEventListener('submit', (e) => {
  e.preventDefault();

  const titulo = document.getElementById('tituloProducto').value.trim();
  const descripcion = document.getElementById('descripcionProducto').value.trim();
  const precio = parseFloat(document.getElementById('precioProducto').value);
  const inputImagen = document.getElementById('imagenProducto');

  if (!titulo || !descripcion || isNaN(precio)) {
    alert('Por favor completa todos los campos correctamente.');
    return;
  }

  // Para simplificar, la imagen se manejará como URL local temporal o se ignorará (se puede mejorar con Firebase Storage)
  let imagenURL = '';

  if (inputImagen.files.length > 0) {
    const file = inputImagen.files[0];
    imagenURL = URL.createObjectURL(file); // Solo para demo local
  }

  productos.push({ titulo, descripcion, precio, imagen: imagenURL });
  localStorage.setItem('productos', JSON.stringify(productos));
  renderProductos();

  // Limpiar formulario
  formProducto.reset();
});


// Mostrar u ocultar la sección "Publicar Producto"
const btnMostrarFormulario = document.getElementById('btnMostrarFormulario');
const seccionPublicar = document.getElementById('publicarProducto');

btnMostrarFormulario.addEventListener('click', () => {
  const visible = seccionPublicar.style.display === 'block';
  seccionPublicar.style.display = visible ? 'none' : 'block';
  btnMostrarFormulario.textContent = visible ? 'Publicar nuevo producto' : 'Ocultar formulario';
});

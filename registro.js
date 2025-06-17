import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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

// Modal elementos
const modal = document.getElementById('modalError');
const mensajeError = document.getElementById('mensajeError');
const cerrarModal = document.getElementById('cerrarModal');

cerrarModal.onclick = () => {
  modal.style.display = 'none';
};
window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

// Función para mostrar modal con mensaje
function mostrarModal(mensaje) {
  mensajeError.textContent = mensaje;
  modal.style.display = 'block';
}

// Control de pasos del formulario
const pasos = document.querySelectorAll('.form-step');
const btnSiguiente = document.querySelectorAll('.next-btn');
const btnAnterior = document.querySelectorAll('.prev-btn');
const form = document.getElementById('registroForm');

let pasoActual = 0;

btnSiguiente.forEach(btn => {
  btn.addEventListener('click', () => {
    if (validarPaso(pasoActual)) {
      cambiarPaso(1);
    }
  });
});

btnAnterior.forEach(btn => {
  btn.addEventListener('click', () => {
    cambiarPaso(-1);
  });
});

// Submit del formulario
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validar último paso antes de registrar
  if (!validarPaso(pasoActual)) return;

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, correo, contrasena);
    await updateProfile(userCredential.user, { displayName: nombre });
    localStorage.setItem('usuario', JSON.stringify(userCredential.user));
    window.location.href = "inicio.html";
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      mostrarModal('Este correo ya está registrado. Intenta iniciar sesión o recupera tu contraseña.');
    } else {
      mostrarModal('Error al registrar: ' + error.message);
    }
  }
});

// Cambiar paso del formulario
function cambiarPaso(direccion) {
  pasos[pasoActual].classList.remove('form-step-active');
  pasoActual += direccion;
  pasos[pasoActual].classList.add('form-step-active');
}

// Validación simple de campos en paso actual
function validarPaso(paso) {
  const inputs = pasos[paso].querySelectorAll('input, select');
  for (let input of inputs) {
    if (input.hasAttribute('required') && !input.value.trim()) {
      mostrarModal(`Por favor completa el campo: "${input.placeholder || input.id}"`);
      input.focus();
      return false;
    }
  }

  // Validar contraseñas solo si el paso actual contiene estos campos
  const passInput = pasos[paso].querySelector('#contrasena');
  const confPassInput = pasos[paso].querySelector('#confirmarContrasena');
  if (passInput && confPassInput) {
    if (passInput.value !== confPassInput.value) {
      mostrarModal('Las contraseñas no coinciden. Por favor, verifica.');
      confPassInput.focus();
      return false;
    }
  }

  return true;
}

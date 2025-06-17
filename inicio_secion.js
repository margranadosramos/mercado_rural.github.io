// inicio_secion.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAGph3HZBmLZwtly_dE6HFG-09YGPf0zqw",
  authDomain: "ruralmarket-d4c79.firebaseapp.com",
  projectId: "ruralmarket-d4c79",
  storageBucket: "ruralmarket-d4c79.firebasestorage.app",
  messagingSenderId: "734594037694",
  appId: "1:734594037694:web:349796894fc63090e1ebef",
  measurementId: "G-2PFVNQD72H"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inicio con correo y contraseña
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('usuario', JSON.stringify(userCredential.user));
    window.location.href = "inicio.html";
  } catch (error) {
    alert("Error: " + error.message);
  }
});

// Inicio con Google
const googleLogin = document.getElementById('googleLogin');
googleLogin.addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    localStorage.setItem('usuario', JSON.stringify(result.user));
    window.location.href = "inicio.html";
  } catch (error) {
    alert("Error con Google: " + error.message);
  }
});

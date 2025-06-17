window.addEventListener("load", () => {
  const logo1 = document.getElementById("logo1");
  const logo2 = document.getElementById("logo2");

  // Mostrar logo1 con animación
  logo1.classList.add("mostrar-logo1");

  // Mostrar logo2 después de logo1 (3s después)
  setTimeout(() => {
    logo2.classList.add("mostrar-logo2");
  }, 3000);

  // Redirigir a inicio.html después de ambas animaciones (6s)
  setTimeout(() => {
    window.location.href = "inicio_secion.html";
  }, 6000);
});





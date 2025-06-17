// Datos productos con imagen (agrega imagenes en carpeta img con estos nombres)
const productos = [
  {
    nombre: "Oxitetraciclina",
    descripcion: "Antibiótico bacteriostático de amplio espectro para infecciones respiratorias, conjuntivitis, foot-rot, diarreas, metritis.",
    sintomas: ["infección", "herida", "fiebre", "bacteria", "respiratoria", "conjuntivitis", "foot-rot", "diarrea", "metritis"],
    dosis: "10 mL/100 kg (≈20 mg/kg) IM cada 24 h por 3‑5 días; máximo 20 mL por sitio de inyección.",
    efectos: "Reacciones locales, toxicidad renal/hepática, posibles residuos en leche/carne.",
    retiro: "Carne 21‑31 días, leche 3‑11 días.",
    via: "IM profunda (no IV directo).",
    img: "Oxitetraciclina.jpg"
  },
  {
    nombre: "Enrofloxacina",
    descripcion: "Antibiótico fluoroquinolona para infecciones respiratorias, digestivas y urinarias por bacterias Gram+ y Gram–.",
    sintomas: ["tos", "resfriado", "pulmones", "respiración", "infección", "urinaria", "digestiva"],
    dosis: "2.5‑5 mg/kg IM/SC una vez al día por 3‑5 días; opción LA: 5 mL/100 kg.",
    efectos: "Riesgo de resistencia, problemas articulares en jóvenes, efectos gastrointestinales, alergias, convulsiones.",
    retiro: "Varía según presentación.",
    via: "IM, SC, ocasionalmente IV.",
    img: "antibio22.jpg"
  },
  {
    nombre: "Ivermectina",
    descripcion: "Antiparasitario de amplio espectro para control de nematodos gastrointestinales y ectoparásitos.",
    sintomas: ["parásito", "gusano", "lombriz", "sarna", "ecto", "nematodos"],
    dosis: "200 µg/kg, varía según presentación.",
    efectos: "Vómitos, diarrea, reacciones neurológicas en sobredosis; cuidado en razas con alteraciones neurológicas.",
    retiro: "No aplica.",
    via: "SC, IM.",
   img: "para11.jpg"
  },
  {
    nombre: "Albendazol",
    descripcion: "Antiparasitario oral para nematodos gastrointestinales, cestodos y fasciola hepática.",
    sintomas: ["parasitos", "lombrices", "digestión", "diarrea", "fasciola"],
    dosis: "5 mg/kg para nematodos; 10 mg/kg para fasciola.",
    efectos: "Letargo, anorexia, diarrea; en sobredosis, efectos neurológicos.",
    retiro: "No aplica.",
    via: "Oral.",
   img: "para21.png"
  },
  {
    nombre: "Vacuna Clostridiales",
    descripcion: "Vacuna inactivada contra toxoides de Clostridium para prevención de blackleg, enterotoxemia, tétanos, edema maligno.",
    sintomas: ["vacuna", "clostridiales", "prevención", "blackleg", "tétanos", "edema"],
    dosis: "5 mL SC a los 3 meses; refuerzo 4-6 semanas; revacunación semestral.",
    efectos: "Reacciones locales leves; evitar aplicación simultánea con otras vacunas sin consultar.",
    retiro: "No aplica.",
    via: "SC.",
   img: "vac11.jpg"
  },
  {
    nombre: "Vacuna Aftosa",
    descripcion: "Vacuna inactivada para prevención de fiebre aftosa en bovinos.",
    sintomas: ["aftosa", "boca", "saliva", "ampolla", "vacuna"],
    dosis: "Dos ciclos anuales según normativa local; terneros dos dosis; adultos mínimo una por ciclo.",
    efectos: "Reacciones locales leves.",
    retiro: "No aplica.",
    via: "SC.",
   img: "vac21.jpg"
  },
  {
    nombre: "Flunixin Meglumine",
    descripcion: "Analgésico y antiinflamatorio potente para dolor, fiebre, inflamación, mastitis, cólicos.",
    sintomas: ["dolor", "inflamación", "fiebre", "mastitis", "cólicos"],
    dosis: "2.2 mg/kg IV o IM, una vez diaria hasta 5 días.",
    efectos: "Ulceración gastrointestinal, gastritis, necrosis renal, reacciones anafilácticas IV rápido.",
    retiro: "No aplica.",
    via: "IV, IM.",
   img: "anal11.jpg"
  },
  {
    nombre: "Meloxicam",
    descripcion: "Antiinflamatorio no esteroideo para dolor musculoesquelético, inflamación, postprocedimientos, cólicos.",
    sintomas: ["cojera", "dolor", "hinchazón", "inflamación", "cólicos"],
    dosis: "0.5 mg/kg SC o IV, dosis única; segunda dosis opcional tras 24 h.",
    efectos: "Úlceras gastrointestinales, sangrado, distensión, diarrea, letargo.",
    retiro: "Carne 15 días, leche 5 días.",
    via: "SC, IV.",
   img: "anal21.png"
  },
  {
    nombre: "PGF₂α (cloprostenol)",
    descripcion: "Hormona para sincronización de celo y control reproductivo.",
    sintomas: ["celo", "reproducción", "sincronización", "abortos", "luteólisis"],
    dosis: "Variable según protocolo; consultar guía específica.",
    efectos: "Contracciones uterinas, diarrea, inquietud.",
    retiro: "No aplica.",
    via: "IM, SC.",
    img: "hor11.jpg"
  },
  {
    nombre: "GnRH (buserelina)",
    descripcion: "Hormona para inducción ovulatoria y manejo reproductivo.",
    sintomas: ["ovulación", "reproducción", "fertilidad", "sincronización"],
    dosis: "100-250 µg IM según protocolo Ovsynch.",
    efectos: "Reacciones locales leves.",
    retiro: "No aplica.",
    via: "IM.",
    img: "hor21.jpg"
  }
];

// Sinónimos y correcciones simples (ampliable)
const sinonimos = {
  "parásito": ["parasito", "parasitos", "paracito"],
  "infección": ["infeccion", "infecciones", "infeccioso"],
  "dolor": ["dolar", "dolores", "molestia"],
  "inflamación": ["inflamacion", "hinchazon", "hinchazón", "inflamado"],
  "vacuna": ["vacunas", "vacunar", "vacunacion"],
  "celo": ["celos", "cela", "selos"],
  "ovulación": ["ovulacion", "ovulaciones"],
  "fiebre": ["febre", "febril"],
  "diarrea": ["diare", "diareaa"],
  "gusano": ["gusanos", "lombriz", "lombrices"],
  "recomendacion": ["recomendar", "recomiendame", "recomendame"],
  "para que sirve": ["para que es", "que es", "que sirve", "para que se usa", "para que me sirve"],
  "que es": ["que es esto", "que significa", "significado"],
  "necesito": ["ayuda", "quiero", "me hace falta"],
  "sintomas": ["síntomas", "signos", "manifestaciones"]
};

// Normaliza texto y reemplaza sinónimos para mejorar búsqueda
function normalizarTexto(texto) {
  texto = texto.toLowerCase();
  for (const [clave, lista] of Object.entries(sinonimos)) {
    lista.forEach(sinonimo => {
      texto = texto.replaceAll(sinonimo, clave);
    });
  }
  return texto;
}

// Similaridad simple por inclusión o palabras comunes
function similitudSimple(str1, str2) {
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  if (str1 === str2) return 1;
  if (str1.includes(str2) || str2.includes(str1)) return 0.8;

  const arr1 = str1.split(" ");
  const arr2 = str2.split(" ");
  const coincidencias = arr1.filter(w => arr2.includes(w));
  return coincidencias.length / Math.max(arr1.length, arr2.length);
}

// Busca producto relacionado con la pregunta
function buscarProducto(pregunta) {
  let mejorProducto = null;
  let mejorSimilitud = 0;

  for (const prod of productos) {
    for (const sintoma of prod.sintomas) {
      const sim = similitudSimple(pregunta, sintoma);
      if (sim > mejorSimilitud) {
        mejorSimilitud = sim;
        mejorProducto = prod;
      }
      if (pregunta.includes(sintoma)) {
        // Prioriza si contiene la palabra directamente
        mejorSimilitud = 1;
        mejorProducto = prod;
        break;
      }
    }
  }
  if (mejorSimilitud >= 0.6) return mejorProducto;
  return null;
}

// Detecta intención de la pregunta
function detectarIntencion(pregunta) {
  if (/para que sirve|que es|para que es|para que se usa|para que me sirve/.test(pregunta)) return "uso";
  if (/dosis|como se usa|cómo se usa|cuánto debo aplicar|cantidad/.test(pregunta)) return "dosis";
  if (/efectos|reacciones|contraindicaciones/.test(pregunta)) return "efectos";
  if (/retiro|tiempo de retiro|tiempo para consumir/.test(pregunta)) return "retiro";
  if (/via|cómo se aplica|administración/.test(pregunta)) return "via";
  if (/sintomas|síntomas|signos/.test(pregunta)) return "sintomas";
  if (/recomiendas|necesito|ayuda|quiero|recomendacion/.test(pregunta)) return "recomendacion";
  return "general";
}

// Función principal que genera respuesta
function responderPregunta(preguntaRaw) {
  const pregunta = normalizarTexto(preguntaRaw.trim());
  let producto = buscarProducto(pregunta);
  let respuesta = "Lo siento, no tengo un producto recomendado para ese síntoma o pregunta. ¿Podrías describirlo de otra forma?";

  if (producto) {
    const intencion = detectarIntencion(pregunta);
    switch(intencion) {
      case "uso":
        respuesta = `El producto ${producto.nombre} sirve para: ${producto.descripcion}`;
        break;
      case "dosis":
        respuesta = `La dosis recomendada para ${producto.nombre} es: ${producto.dosis}`;
        break;
      case "efectos":
        respuesta = `Efectos adversos y precauciones de ${producto.nombre}: ${producto.efectos}`;
        break;
      case "retiro":
        respuesta = `El tiempo de retiro para ${producto.nombre} es: ${producto.retiro}`;
        break;
      case "via":
        respuesta = `La vía de administración para ${producto.nombre} es: ${producto.via}`;
        break;
      case "sintomas":
        respuesta = `Los síntomas que puede tratar ${producto.nombre} incluyen: ${producto.sintomas.join(", ")}.`;
        break;
      case "recomendacion":
        respuesta = `Recomiendo ${producto.nombre} para tratar síntomas como: ${producto.sintomas.join(", ")}.`;
        break;
      default:
        respuesta = `Producto: ${producto.nombre}\nUso: ${producto.descripcion}\nDosis: ${producto.dosis}\nEfectos adversos: ${producto.efectos}\nTiempo de retiro: ${producto.retiro}\nVía: ${producto.via}`;
        break;
    }
  }
  return { texto: respuesta, producto };
}

// Función para mostrar mensaje en chat
function mostrarMensaje(emisor, texto, isHtml = false) {
  const chatBox = document.getElementById('chat-box');
  const msg = document.createElement('div');
  msg.classList.add('mensaje');
  if (emisor === "👨‍🌾 Tú") msg.classList.add('mensaje-usuario');
  else msg.classList.add('mensaje-ia');
  msg.innerHTML = `<strong>${emisor}:</strong> ${isHtml ? texto : `<pre style="white-space: pre-wrap;">${texto}</pre>`}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function mostrarProducto(producto) {
  if (!producto) return;
  const chatBox = document.getElementById('chat-box');
  const card = document.createElement('div');
  card.classList.add('producto');
  card.style.border = "2px solid #4CAF50";
  card.style.borderRadius = "8px";
  card.style.padding = "12px";
  card.style.marginTop = "8px";
  card.style.backgroundColor = "#e8f5e9";
  card.innerHTML = `
    <img src="img/${producto.img}" alt="${producto.nombre}" style="width:120px; float:left; margin-right: 12px; border-radius: 6px; object-fit: cover; height: 120px;">
    <div>
      <h3 style="margin:0 0 8px 0;">${producto.nombre}</h3>
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <p><strong>Dosis:</strong> ${producto.dosis}</p>
      <p><strong>Efectos adversos:</strong> ${producto.efectos}</p>
      <p><strong>Tiempo de retiro:</strong> ${producto.retiro}</p>
      <p><strong>Vía:</strong> ${producto.via}</p>
    </div>
    <div style="clear:both;"></div>
  `;
  chatBox.appendChild(card);
  chatBox.scrollTop = chatBox.scrollHeight;
}


// Envía la pregunta del usuario y muestra respuesta
function enviarPregunta() {
  const input = document.getElementById('user-input');
  const preguntaRaw = input.value.trim();
  if (!preguntaRaw) return;

  mostrarMensaje("👨‍🌾 Tú", preguntaRaw);
  input.value = "";

  const { texto, producto } = responderPregunta(preguntaRaw);

  mostrarMensaje("Doctor muu", texto);

  if (producto) mostrarProducto(producto);
}

// Limpia el chat
function limpiarChat() {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML = "";
}

// Exporta chat a texto plano descargable
function exportarChat() {
  const chatBox = document.getElementById('chat-box');
  const mensajes = chatBox.querySelectorAll('.mensaje');
  let texto = "";
  mensajes.forEach(m => {
    texto += m.innerText + "\n\n";
  });
  const blob = new Blob([texto], {type: "text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = "chat_veterinaria.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Evento para enviar con tecla Enter
document.getElementById('user-input').addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarPregunta();
  }
});

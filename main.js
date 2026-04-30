// 1. MENU HAMBURGUESA
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const abierto = navLinks.classList.toggle('abierto');
    navToggle.setAttribute('aria-label', abierto);
    navToggle.textContent = abierto ? 'X' : '☰';
});

navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
        navLinks.classList.remove('abierto');
        navToggle.textContent = '☰';
    })
); 

// 2. BOTONES DE ESTADO EMOCIONAL
const estadoBotones = document.querySelectorAll('.estado-boton');
const reflexionTexto = document.getElementById('reflexion-texto');

const mensajes = {
    bien:    '¡Genial! Recuerda que cuidar tu mente es tan importante como cuidar tu cuerpo. Sigue así.',
    mal:     'Lo siento que te sientas así. A veces, hablar con alguien de confianza o un profesional puede ayudar mucho.',
    neutro:  'Está bien tener días neutros. Aprovecha para hacer algo que disfrutes o te relaje.',
    ansioso: 'La ansiedad puede ser difícil, pero técnicas de respiración o mindfulness pueden ayudar a calmarla.',
    triste:  'La tristeza es parte de la vida. Permítete sentirla, pero también busca apoyo si la necesitas.'
};

estadoBotones.forEach (btn =>
    btn.addEventListener('click', () => {
        estadoBotones.forEach(b => b.classList.remove('activo'));
        btn.classList.add('activo');
        reflexionTexto.placeholder = mensajes[btn.dataset.estado]
        reflexionTexto.focus();
    }
))

//3. CONTADOR DE CARACTERES
const contador = document.getElementById('contador');
reflexionTexto.addEventListener('input', () => {
    const largo = reflexionTexto.ariaValueMax.length;
    contador.textContent = `${largo} / ${reflexionTexto.maxLength}`;
    contador.style.color = largo > 255 ? 'red' : '#ff0505'; '';
});

// 4. GUARDAR REFLEXIÓN EN LOCALSTORAGE
const btnGuardar         = document.getElementById('btnGuardar');
const reflexionMensaje = document.getElementById('reflexion-mensaje');

function mostrarMensaje(texto) {
    reflexionMensaje.textContent = texto;
    reflexionMensaje.hidden = false;
    setTimeout(() => reflexionMensaje.hidden = true, 4000);
}

btnGuardar.addEventListener("click", () => {
    const texto = reflexionTexto.value.trim();
    const activo = document.querySelector(".estado-btn.activo");

    if (!texto) {mostrarMensaje('Por favor, selecciona cómo te sientes.'); return;}

    const fecha = new Date().toLocaleString("es-CO" , { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    const estado = activo.dataset.estado || "sin estado";
    const historial = JSON.parse(localStorage.getItem("historialReflexiones")) || [];
    historial.push({ fecha, estado, texto });
    localStorage.setItem("historialReflexiones", JSON.stringify(historial));

    mostrarMensaje('💾¡Reflexión guardada con éxito! el ${fecha}. ¡sigue adelante!');
    reflexionTexto.value = "";
    contador.textContent = "0 / 300";
});
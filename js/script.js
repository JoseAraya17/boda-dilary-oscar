
/* ==========================================================
   DILARY & OSCAR
   INVITACIÓN DIGITAL DE BODA

   Fecha: 20 de diciembre de 2026
   Hora: 3:00 p. m.
   Zona horaria: Costa Rica (UTC-6)

   JAVASCRIPT COMPLETO
   ========================================================== */

"use strict";


/* ==========================================================
   1. CONFIGURACIÓN GENERAL
   ========================================================== */

const CONFIG = {
    fechaBoda: "2026-12-20T15:00:00-06:00",

    fechaLimiteConfirmacion: "2026-11-25",

    urlMapa:
        "https://maps.app.goo.gl/SVUCgr75beKC84bd7",

    urlConfirmacion:
        "https://docs.google.com/forms/d/e/1FAIpQLSdUgfq4JATa0wRPRPJadDxbQmKfGdnDg2V_ocZ9LSWfss8zvQ/viewform",

    volumenMusica: 0.45
};


/* ==========================================================
   2. ELEMENTOS DEL DOCUMENTO
   ========================================================== */

const elementos = {
    dias: document.getElementById("dias"),

    horas: document.getElementById("horas"),

    minutos: document.getElementById("minutos"),

    segundos: document.getElementById("segundos"),

    mensajeCuenta:
        document.getElementById("mensajeCuenta"),

    musica:
        document.getElementById("musicaBoda"),

    botonMusica:
        document.getElementById("botonMusica"),

    botonAbrir:
        document.getElementById("abrirInvitacion"),

    botonMapa:
        document.getElementById("btnMapa"),

    botonConfirmacion:
        document.getElementById("btnConfirmacion")
};


/* ==========================================================
   3. CUENTA REGRESIVA
   ========================================================== */

const fechaBoda = new Date(CONFIG.fechaBoda);

let intervaloCuenta = null;


/* Agregar cero a números menores de 10 */

function agregarCero(numero) {
    return String(numero).padStart(2, "0");
}


/* Mostrar valores en el contador */

function mostrarCuenta(dias, horas, minutos, segundos) {

    if (elementos.dias) {
        elementos.dias.textContent = agregarCero(dias);
    }

    if (elementos.horas) {
        elementos.horas.textContent = agregarCero(horas);
    }

    if (elementos.minutos) {
        elementos.minutos.textContent = agregarCero(minutos);
    }

    if (elementos.segundos) {
        elementos.segundos.textContent = agregarCero(segundos);
    }

}


/* Actualizar cuenta regresiva */

function actualizarCuentaRegresiva() {

    const ahora = new Date();

    const diferencia = fechaBoda.getTime() - ahora.getTime();

    /* La boda ya comenzó */

    if (diferencia <= 0) {

        mostrarCuenta(0, 0, 0, 0);

        if (elementos.mensajeCuenta) {
            elementos.mensajeCuenta.textContent =
                "¡Llegó nuestro gran día! Gracias por acompañarnos. ❤️";
        }

        if (intervaloCuenta !== null) {
            clearInterval(intervaloCuenta);
            intervaloCuenta = null;
        }

        return;
    }

    /* Calcular tiempo restante */

    const segundosTotales = Math.floor(diferencia / 1000);

    const dias = Math.floor(
        segundosTotales / (60 * 60 * 24)
    );

    const horas = Math.floor(
        (segundosTotales % (60 * 60 * 24)) / (60 * 60)
    );

    const minutos = Math.floor(
        (segundosTotales % (60 * 60)) / 60
    );

    const segundos = segundosTotales % 60;

    mostrarCuenta(dias, horas, minutos, segundos);

}


/* Iniciar contador */

function iniciarCuentaRegresiva() {

    actualizarCuentaRegresiva();

    if (intervaloCuenta === null &&
        Date.now() < fechaBoda.getTime()) {

        intervaloCuenta = setInterval(
            actualizarCuentaRegresiva,
            1000
        );

    }

}


/* ==========================================================
   4. CONFIGURACIÓN DE LA MÚSICA
   ========================================================== */

let musicaReproduciendose = false;


/* Actualizar apariencia del botón */

function actualizarBotonMusica() {

    if (!elementos.botonMusica) {
        return;
    }

    elementos.botonMusica.classList.toggle(
        "reproduciendo",
        musicaReproduciendose
    );

    elementos.botonMusica.setAttribute(
        "aria-pressed",
        String(musicaReproduciendose)
    );

    elementos.botonMusica.setAttribute(
        "aria-label",
        musicaReproduciendose
            ? "Pausar música"
            : "Reproducir música"
    );

    elementos.botonMusica.title =
        musicaReproduciendose
            ? "Pausar música"
            : "Reproducir música";

    elementos.botonMusica.textContent =
        musicaReproduciendose ? "♫" : "♪";

}


/* Reproducir música */

async function reproducirMusica() {

    if (!elementos.musica) {
        return;
    }

    try {

        await elementos.musica.play();

    } catch (error) {

        /* Algunos navegadores bloquean la reproducción
           hasta que el usuario interactúa con la página. */

        console.info(
            "La música requiere interacción del usuario.",
            error
        );

    }

}


/* Pausar música */

function pausarMusica() {

    if (!elementos.musica) {
        return;
    }

    elementos.musica.pause();

}


/* Alternar reproducción */

function alternarMusica() {

    if (!elementos.musica) {
        return;
    }

    if (elementos.musica.paused) {

        reproducirMusica();

    } else {

        pausarMusica();

    }

}


/* Inicializar controles */

function iniciarMusica() {

    if (!elementos.musica) {
        return;
    }

    elementos.musica.volume =
        CONFIG.volumenMusica;

    elementos.musica.loop = true;

    /* Mantener el botón sincronizado
       con el estado real del audio. */

    elementos.musica.addEventListener(
        "play",
        function () {

            musicaReproduciendose = true;
            actualizarBotonMusica();

        }
    );

    elementos.musica.addEventListener(
        "pause",
        function () {

            musicaReproduciendose = false;
            actualizarBotonMusica();

        }
    );

    elementos.musica.addEventListener(
        "ended",
        function () {

            musicaReproduciendose = false;
            actualizarBotonMusica();

        }
    );

    /* Botón flotante */

    if (elementos.botonMusica) {

        elementos.botonMusica.addEventListener(
            "click",
            alternarMusica
        );

    }

    actualizarBotonMusica();

}


/* ==========================================================
   5. ABRIR LA INVITACIÓN
   ========================================================== */

function iniciarBotonAbrir() {

    if (!elementos.botonAbrir) {
        return;
    }

    elementos.botonAbrir.addEventListener(
        "click",
        function (evento) {

            const destino =
                document.getElementById("bienvenida");

            if (destino) {

                evento.preventDefault();

                destino.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",

                    block: "start"
                });

            }

            /* Intentar iniciar la música
               cuando el invitado abre la invitación. */

            if (
                elementos.musica &&
                elementos.musica.paused
            ) {

                reproducirMusica();

            }

        }
    );

}


/* ==========================================================
   6. BOTÓN DE UBICACIÓN
   ========================================================== */

function configurarUbicacion() {

    if (!elementos.botonMapa) {
        return;
    }

    elementos.botonMapa.href = CONFIG.urlMapa;

    elementos.botonMapa.target = "_blank";

    elementos.botonMapa.rel =
        "noopener noreferrer";

}


/* ==========================================================
   7. CONFIRMACIÓN DE ASISTENCIA
   ========================================================== */

function configurarConfirmacion() {

    if (!elementos.botonConfirmacion) {
        return;
    }

    elementos.botonConfirmacion.href =
        CONFIG.urlConfirmacion;

    elementos.botonConfirmacion.target =
        "_blank";

    elementos.botonConfirmacion.rel =
        "noopener noreferrer";

    /* La fecha límite se informa en el HTML.
       El enlace permanece disponible para que
       los novios puedan gestionar respuestas
       según la configuración de Google Forms. */

}


/* ==========================================================
   8. SEGURIDAD DE ENLACES EXTERNOS
   ========================================================== */

function configurarEnlacesExternos() {

    const enlaces = document.querySelectorAll(
        'a[target="_blank"]'
    );

    enlaces.forEach(function (enlace) {

        enlace.rel = "noopener noreferrer";

    });

}


/* ==========================================================
   9. INICIALIZAR LA INVITACIÓN
   ========================================================== */

function iniciarInvitacion() {

    iniciarCuentaRegresiva();

    iniciarMusica();

    iniciarBotonAbrir();

    configurarUbicacion();

    configurarConfirmacion();

    configurarEnlacesExternos();

}


/* Ejecutar cuando el HTML esté cargado */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        iniciarInvitacion
    );

} else {

    iniciarInvitacion();

}


/* ==========================================================
   FIN DEL JAVASCRIPT
   DILARY & OSCAR
   ========================================================== */

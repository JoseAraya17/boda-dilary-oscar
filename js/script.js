
/* ==========================================================
   DILARY & OSCAR
   INVITACIÓN DIGITAL DE BODA
   20 DE DICIEMBRE DE 2026 | 3:00 P. M.
   COSTA RICA

   JAVASCRIPT COMPLETO Y CORREGIDO
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       1. CUENTA REGRESIVA
       ====================================================== */

    // Fecha y hora de la boda en Costa Rica (UTC-6).

    const fechaBoda = new Date(
        "2026-12-20T15:00:00-06:00"
    ).getTime();

    const dias = document.getElementById("dias");
    const horas = document.getElementById("horas");
    const minutos = document.getElementById("minutos");
    const segundos = document.getElementById("segundos");
    const mensajeCuenta = document.getElementById("mensajeCuenta");

    const formatoNumero = (numero) => {
        return String(numero).padStart(2, "0");
    };

    function actualizarContador() {

        const diferencia = fechaBoda - Date.now();

        // Cuando llega el día y la hora de la boda.

        if (diferencia <= 0) {

            if (dias) dias.textContent = "00";
            if (horas) horas.textContent = "00";
            if (minutos) minutos.textContent = "00";
            if (segundos) segundos.textContent = "00";

            if (mensajeCuenta) {
                mensajeCuenta.textContent =
                    "¡Llegó nuestro gran día! ❤️";
            }

            return false;
        }

        // Cálculo de días, horas, minutos y segundos.

        const diasRestantes = Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

        const horasRestantes = Math.floor(
            (diferencia / (1000 * 60 * 60)) % 24
        );

        const minutosRestantes = Math.floor(
            (diferencia / (1000 * 60)) % 60
        );

        const segundosRestantes = Math.floor(
            (diferencia / 1000) % 60
        );

        // Actualizar los números de la página.

        if (dias) {
            dias.textContent = formatoNumero(diasRestantes);
        }

        if (horas) {
            horas.textContent = formatoNumero(horasRestantes);
        }

        if (minutos) {
            minutos.textContent = formatoNumero(minutosRestantes);
        }

        if (segundos) {
            segundos.textContent = formatoNumero(segundosRestantes);
        }

        return true;
    }

    // Mostrar el contador inmediatamente.

    const contadorActivo = actualizarContador();

    // Actualizar cada segundo mientras la fecha sea futura.

    if (contadorActivo) {

        const intervaloContador = setInterval(() => {

            const sigueContando = actualizarContador();

            if (!sigueContando) {
                clearInterval(intervaloContador);
            }

        }, 1000);

    }


    /* ======================================================
       2. MÚSICA DE FONDO
       ====================================================== */

    const musica = document.getElementById("musicaBoda");
    const botonMusica = document.getElementById("botonMusica");
    const abrirInvitacion = document.getElementById("abrirInvitacion");

    /*
       Actualiza el botón flotante según
       el estado real de reproducción.
    */

    function actualizarBotonMusica() {

        if (!botonMusica) return;

        const reproduciendo =
            musica !== null &&
            !musica.paused &&
            !musica.ended;

        // Símbolo visual.

        botonMusica.textContent = reproduciendo ? "Ⅱ" : "♫";

        // Texto accesible.

        const descripcion = reproduciendo
            ? "Pausar música"
            : "Reproducir música";

        botonMusica.setAttribute(
            "aria-label",
            descripcion
        );

        botonMusica.setAttribute(
            "aria-pressed",
            String(reproduciendo)
        );

        botonMusica.title = descripcion;

        // Cambiar apariencia del botón.

        botonMusica.classList.toggle(
            "reproduciendo",
            reproduciendo
        );

        botonMusica.classList.toggle(
            "activa",
            reproduciendo
        );

    }


    /* ======================================================
       3. REPRODUCIR MÚSICA
       ====================================================== */

    async function reproducirMusica() {

        if (!musica) return;

        // Evitar solicitudes duplicadas.

        if (!musica.paused) {
            actualizarBotonMusica();
            return;
        }

        try {

            await musica.play();

        } catch (error) {

            console.warn(
                "No se pudo iniciar la música:",
                error
            );

        }

        actualizarBotonMusica();

    }


    /* ======================================================
       4. CONFIGURACIÓN DEL AUDIO
       ====================================================== */

    if (musica) {

        // Volumen inicial del 45 %.

        musica.volume = 0.45;

        // Repetir la canción automáticamente.

        musica.loop = true;

        // No reproducir antes de la interacción.

        musica.autoplay = false;

        // Sincronizar botón y reproducción.

        musica.addEventListener(
            "play",
            actualizarBotonMusica
        );

        musica.addEventListener(
            "playing",
            actualizarBotonMusica
        );

        musica.addEventListener(
            "pause",
            actualizarBotonMusica
        );

        musica.addEventListener(
            "ended",
            actualizarBotonMusica
        );

        // Si el audio no puede cargarse.

        musica.addEventListener("error", () => {

            console.error(
                "No se pudo cargar la canción. " +
                "Revisá la ruta y el nombre del MP3."
            );

            actualizarBotonMusica();

        });

    }


    /* ======================================================
       5. BOTÓN FLOTANTE DE MÚSICA
       ====================================================== */

    if (musica && botonMusica) {

        botonMusica.addEventListener("click", () => {

            if (musica.paused) {

                reproducirMusica();

            } else {

                musica.pause();
                actualizarBotonMusica();

            }

        });

    }


    /* ======================================================
       6. INICIAR MÚSICA AL ABRIR LA INVITACIÓN
       ====================================================== */

    /*
       Los navegadores generalmente requieren
       una interacción para permitir el audio.

       Al presionar "Descubre nuestra historia",
       intentamos iniciar la canción.
    */

    if (abrirInvitacion && musica) {

        abrirInvitacion.addEventListener("click", () => {

            if (musica.paused) {
                reproducirMusica();
            }

        });

    }


    /* ======================================================
       7. CONFIRMACIÓN DE ASISTENCIA
       ====================================================== */

    const botonConfirmacion =
        document.getElementById("btnConfirmacion");

    const enlaceFormulario =
        "https://docs.google.com/forms/d/e/1FAIpQLSdUgfq4JATa0wRPRPJadDxbQmKfGdnDg2V_ocZ9LSWfss8zvQ/viewform";

    if (botonConfirmacion) {

        // Enlace oficial de confirmación.

        botonConfirmacion.setAttribute(
            "href",
            enlaceFormulario
        );

        // Abrir en una pestaña nueva.

        botonConfirmacion.setAttribute(
            "target",
            "_blank"
        );

        // Protección para enlaces externos.

        botonConfirmacion.setAttribute(
            "rel",
            "noopener noreferrer"
        );

        // Habilitar el enlace.

        botonConfirmacion.removeAttribute(
            "aria-disabled"
        );

        botonConfirmacion.removeAttribute(
            "disabled"
        );

    }


    /* ======================================================
       8. DESPLAZAMIENTO SUAVE
       ====================================================== */

    const enlacesInternos = document.querySelectorAll(
        'a[href^="#"]'
    );

    enlacesInternos.forEach((enlace) => {

        enlace.addEventListener("click", (evento) => {

            // No activar enlaces deshabilitados.

            if (
                enlace.getAttribute("aria-disabled") === "true"
            ) {
                evento.preventDefault();
                return;
            }

            const destinoId = enlace.getAttribute("href");

            if (!destinoId || destinoId === "#") {
                return;
            }

            const destino = document.getElementById(
                destinoId.substring(1)
            );

            if (!destino) {
                return;
            }

            evento.preventDefault();

            // Respetar preferencias de accesibilidad.

            const reducirMovimiento = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            destino.scrollIntoView({
                behavior: reducirMovimiento ? "auto" : "smooth",
                block: "start"
            });

            // Actualizar la dirección sin recargar.

            if (window.history.replaceState) {

                window.history.replaceState(
                    null,
                    "",
                    destinoId
                );

            }

        });

    });


    /* ======================================================
       9. ESTADO INICIAL
       ====================================================== */

    // Configurar la apariencia inicial del botón.

    actualizarBotonMusica();

    // Mensaje para comprobar que el script cargó.

    console.info(
        "Invitación de Dilary & Oscar cargada correctamente."
    );

});


/* ==========================================================
   FIN DEL ARCHIVO JAVASCRIPT
   DILARY & OSCAR
   ========================================================== */

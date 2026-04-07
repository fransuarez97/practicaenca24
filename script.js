
    let pantalla = document.getElementById("pantalla");
    let historialDiv = document.getElementById("historial");
    let operacion = "";
    let esNuevoNumero = false; // Variable de control para resetear tras resultado

    function agregar(valor) {
        // Si acabamos de dar un resultado y presionamos un número, limpiamos la pantalla
        if (esNuevoNumero && !isNaN(valor)) {
            operacion = valor;
            esNuevoNumero = false;
        } else {
            operacion += valor;
            esNuevoNumero = false;
        }
        actualizarPantalla();
    }

    function actualizarPantalla() {
        pantalla.innerText = operacion || "0";
    }

    function calcular() {
        try {
            if (operacion === "") return;
            let resultado = eval(operacion);
            
            // Añadir al historial
            historialDiv.innerHTML = `<div style="border-bottom:1px solid #222; padding:5px;">${operacion} = <strong>${resultado}</strong></div>` + historialDiv.innerHTML;
            
            pantalla.innerText = resultado;
            operacion = resultado.toString();
            esNuevoNumero = true; // El próximo número que se pulse reseteará la pantalla
        } catch {
            pantalla.innerText = "Error";
            operacion = "";
        }
    }

    function limpiar() {
        operacion = "";
        pantalla.innerText = "0";
        esNuevoNumero = false;
    }

    function borrarUno() {
        operacion = operacion.slice(0, -1);
        actualizarPantalla();
    }

    /* ===== SOPORTE DE TECLADO ===== */
    document.addEventListener('keydown', (event) => {
        const tecla = event.key;
        
        if (!isNaN(tecla) || tecla === '.' || tecla === '+' || tecla === '-' || tecla === '*' || tecla === '/') {
            agregar(tecla);
        } else if (tecla === 'Enter') {
            event.preventDefault();
            calcular();
        } else if (tecla === 'Escape') {
            limpiar();
        } else if (tecla === 'Backspace') {
            borrarUno();
        }
    });
//Guardados
const area = document.getElementById("areaJuego");
const btn = document.getElementById("iniciar");
const tiempoTexto = document.getElementById("tiempo");
const puntosTexto = document.getElementById("puntos");
//
//variabls
let tiempo = 10;
let puntos = 0;
let juegoActivo = false;
let intervalo;//tiempos debalones ---detener
let intervaloBalones;

// Funciones: 
//F1.- Crear Balón
function crearBalon(){
    if(!juegoActivo) return;

    const balon = document.createElement("img");//crear balones no ponchados
    balon.src = "img/Balon.png";
    balon.classList.add("balon");//estilo

    // posicionar aleatoriamente los balonees
    const x = Math.random() * (area.clientWidth - 60);
    const y = Math.random() * (area.clientHeight - 60);

    balon.style.left = x + "px";//ubicar el area donde se genero-balon
    balon.style.top = y + "px";

    area.appendChild(balon);

    // Detección del clic -evento
    balon.addEventListener("click", function(){
        balon.src = "img/Balon_ponchado.png";//cambiar a balon ponchado
        puntos++;
        puntosTexto.textContent = puntos;

        setTimeout(() => {
            balon.remove();
        }, 600);
    });

    // eliminar si no lo tocan
    setTimeout(() => {
        if(area.contains(balon)){
            balon.remove();
        }
    }, 2500);
}

// iniciar juego-boton
btn.addEventListener("click", function(){
    //reinicio
    tiempo = 10;
    puntos = 0;
    juegoActivo = true;

    tiempoTexto.textContent = tiempo;
    puntosTexto.textContent = puntos;

    //Limpiar-balonesanteriores
    area.innerHTML = "";

    // crear balones
    intervaloBalones = setInterval(crearBalon, 800);

    // contador de tiempo
    intervalo = setInterval(function(){
        tiempo--;
        tiempoTexto.textContent = tiempo;

        if(tiempo <= 0){
            clearInterval(intervalo);
            clearInterval(intervaloBalones);
            juegoActivo = false;
            alert("Fin del juego mi estimado informatico. Puntos: " + puntos);
        }
    }, 1000);

});
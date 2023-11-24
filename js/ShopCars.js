

// Función para esconder la barra de navegación al hacer scroll hacia abajo
let prevScrollPos = window.pageYOffset;
window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        document.querySelector("header").style.transform = "translateY(0)";
    } else {
        document.querySelector("header").style.transform = "translateY(-100%)";
    }
    prevScrollPos = currentScrollPos;
}















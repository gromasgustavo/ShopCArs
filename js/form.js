document.addEventListener("DOMContentLoaded", function () {
    const formu = document.querySelector("#formularioRegistrate");
    formu.addEventListener("submit", procesarFormulario);

    function procesarFormulario(event) {
        event.preventDefault();
        const adminData = new FormData(formu);

        const nombre = adminData.get("nombre");
        console.log(adminData.get("nombre")); // aquí veo por consola el nombre
        const apellido = adminData.get("apellido");
        console.log(adminData.get("apellido")); // aquí veo por consola el apellido
        const fechaNacimiento = adminData.get("fechaNacimiento");
        const email = adminData.get("email");
        const password = adminData.get("password");
        const tel = adminData.get("tel");

        let validation = true;

        // Valida los campos
        if (nombre === '') {
            document.querySelector('#nombre').classList.add('error');
            validation = false;
        } else {
            document.querySelector('#nombre').classList.remove('error');
            document.querySelector('#nombre').classList.add('ok');
        }

        if (apellido === '') {
            document.querySelector('#apellido').classList.add('error');
            validation = false;
        } else {
            document.querySelector('#apellido').classList.remove('error');
            document.querySelector('#apellido').classList.add('ok');
        }

        if (fechaNacimiento === '' || !validarEdad(fechaNacimiento, 18, 80)) {
            document.querySelector('#fechaNacimiento').classList.add('error');
            validation = false;
        } else {
            document.querySelector('#fechaNacimiento').classList.remove('error');
            document.querySelector('#fechaNacimiento').classList.add('ok');
        }

        if (email === '') {
            document.querySelector('#email').classList.add('error');
            validation = false;
        } else {
            document.querySelector('#email').classList.remove('error');
            document.querySelector('#email').classList.add('ok');
        }

        if (password === '') {
            document.querySelector('#password').classList.add('error');
            validation = false;
        } else {
            document.querySelector('#password').classList.remove('error');
            document.querySelector('#password').classList.add('ok');
        }

        // Valida el campo de teléfono
        if (tel === '') {
            document.querySelector('#tel').classList.add('error');
            validation = false;
        } else if (!/^\d+$/.test(tel)) {
            // Si no son números, muestra el capo en rojo
            document.querySelector('#tel').classList.add('error');
            validation = false;
        } else {
            document.querySelector('#tel').classList.remove('error');
            document.querySelector('#tel').classList.add('ok');
        }

        // Si está completo se envía.
        if (validation) {
            formu.submit();
        }
    }
    function validarCampoTexto(valor) {
        // Expresión regular para permitir solo letras y espacios
        const regex = /^[a-zA-Z\s]+$/;
        return regex.test(valor);
    }

    function validarEdad(fechaNacimiento, minEdad, maxEdad) {
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }

        return edad >= minEdad && edad <= maxEdad;
    }

});


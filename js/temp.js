document.addEventListener('DOMContentLoaded', () => {
    const ubicacionYaSolicitada = sessionStorage.getItem('ubicacionSolicitada');

    if (!ubicacionYaSolicitada && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posicion => {
            const lon = posicion.coords.longitude;
            const lat = posicion.coords.latitude;

            // Acá se lmacena un indicador en sessionStorage para saber que ya se solicitó la ubicación
            sessionStorage.setItem('ubicacionSolicitada', 'true');

            obtenerDatosClima(lat, lon);
        });
    } else {
        // Si se solicitó la ubicación, obtiene los datos de sessionStorage
        const savedData = sessionStorage.getItem('climaData');
        if (savedData) {
            // Si hay datos guardados, se muestran en todas las páginas
            mostrarDatos(JSON.parse(savedData));
        }
    }
});

function obtenerDatosClima(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=db27f789ed5757ecf685ff720e407b6e`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // los datos en sessionStorage estarán disponibles en todas las páginas
            sessionStorage.setItem('climaData', JSON.stringify(data));

            mostrarDatos(data);
        })

        .catch(error => {
            console.error('Error al obtener datos del clima:', error);
            // si no conecta a la api :
            let iconoAnimado = document.querySelector("#icono-animado");
            iconoAnimado.src = "../animated/auto.svg";
            iconoAnimado.style.width = "50%";
        });
}

function mostrarDatos(data) {

    let temperaturaValor = document.querySelector("#temperatura-valor");
    let temperaturaDescripcion = document.querySelector("#temperatura-descripcion");
    let ubicacion = document.querySelector("#ubicacion");
    let iconoAnimado = document.querySelector("#icono-animado");
    let maxMin = document.querySelector("#tmax-tmin");

    let temp = Math.round(data.main.temp);
    temperaturaValor.textContent = `${temp}°C`;

    let descripcion = data.weather[0].description;
    temperaturaDescripcion.textContent = descripcion;

    let localidad = data.name;
    ubicacion.textContent = localidad;

    let tmax = data.main.temp_max;
    let tmin = data.main.temp_min;
    maxMin.textContent = `Max: ${tmax}  Min:${tmin} `;

    let horario = data.dt;

    if (horario > data.sys.sunrise && horario < data.sys.sunset) {
        horario = "dia";
    } else {
        horario = "noche";
    }

    switch (data.weather[0].main) {
        case "Thunderstorm":
            iconoAnimado.src = "../animated/thunder.svg";
            break;
        case "Drizzle":
            iconoAnimado.src = "../animated/rainy-4.svg";
            break;
        case "Rain":
            iconoAnimado.src = "../animated/rainy-6.svg";
            break;
        case "Snow":
            if (horario === "dia") {
                iconoAnimado.src = "../animated/snowy-3.svg";
            } else {
                iconoAnimado.src = "../animated//snowy-4.svg";
            }
            break;
        case "Clear":
            if (horario === "dia") {
                iconoAnimado.src = "../animated/day.svg";
            } else {
                iconoAnimado.src = "../animated/night.svg";
            }
            break;
        case "Clouds":
            if (horario === "dia") {
                iconoAnimado.src = "../animated/cloudy-day-3.svg";
            } else {
                iconoAnimado.src = "../animated/cloudy-night-3.svg";
            }
            break;
        default:
            // va a buscar los iconos al sitio web de la API
            iconoAnimado.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            break;
    }
}









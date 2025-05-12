let chart = null;

async function consultarClima() {
  const ciudad = document.getElementById('ciudad').value.trim();
  if (!ciudad) return alert("Por favor escribe una ciudad.");

  // Clima actual (desde tu backend → se guarda en MongoDB)
  try {
    const resActual = await fetch(`http://localhost:5000/api/clima-actual/${ciudad}`);
    const dataActual = await resActual.json();

    document.getElementById('nombreCiudad').textContent = `🌤️ ${dataActual.name}`;
    document.getElementById('temperaturaActual').textContent = `Temperatura actual: ${dataActual.main.temp} °C`;

    const icono = dataActual.weather[0].icon;
    document.getElementById('iconoClima').src = `https://openweathermap.org/img/wn/${icono}@2x.png`;
    document.getElementById('iconoClima').alt = dataActual.weather[0].description;

    document.getElementById('widgetClima').style.display = 'inline-block';

  } catch (err) {
    document.getElementById('temperaturaActual').textContent = "No se pudo obtener la temperatura actual";
    document.getElementById('iconoClima').src = "";
    document.getElementById('widgetClima').style.display = 'none';
    return;
  }

  // Pronóstico
  const res = await fetch(`http://localhost:5000/api/pronostico/${ciudad}`);
  if (!res.ok) return alert("Ciudad no encontrada o error en la API.");
  const datos = await res.json();

  const temperaturas = datos.list.map(item => item.main.temp);
  const horas = datos.list.map(item => {
    const fecha = new Date(item.dt_txt);
    return fecha.toLocaleString('es-CL', { weekday: 'short', hour: '2-digit', minute: '2-digit' });
  });

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById('graficoTemperatura'), {
    type: 'line',
    data: {
      labels: horas,
      datasets: [{
        label: `Pronóstico en ${ciudad}`,
        data: temperaturas,
        borderColor: '#3769c1',
        backgroundColor: 'rgba(55, 105, 193, 0.2)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7
          }
        },
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

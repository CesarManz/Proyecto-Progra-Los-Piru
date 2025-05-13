let chart;

async function consultarClima() {
  const ciudad = document.getElementById('ciudad').value;
  const res = await fetch(`/api/pronostico/${ciudad}`);
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
        label: `Pronóstico de Temperatura en ${ciudad}`,
        data: temperaturas,
        borderColor: '#3769c1',
        backgroundColor: 'rgba(55, 105, 193, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

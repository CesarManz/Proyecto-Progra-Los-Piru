function toggleNotificaciones() {
  const box = document.getElementById("notificaciones-box");
  const punto = document.getElementById("alerta-punto");
  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    cargarNotificaciones();
    box.style.display = "block";
    punto.style.display = "none";
  }
}

async function cargarNotificaciones() {
  try {
    const res = await fetch("http://localhost:5001/api/activadas");
    const alertas = await res.json();
    const contenedor = document.getElementById("notificaciones-box");
    contenedor.innerHTML = "";

    alertas.reverse().forEach(a => {
      const div = document.createElement("div");
      div.className = "notificacion";

     div.innerHTML = `
  <div class="texto">
    <strong>${a.parcela?.nombre || "Parcela desconocida"}</strong><br>
    ${a.mensaje}
    <div class="tiempo">${timeAgo(new Date(a.fecha))}</div>
  </div>
  <span class="cerrar" onclick="eliminarNotificacion('${a._id}')">×</span>
`;


      contenedor.appendChild(div);
    });
  } catch (e) {
    console.error("❌ Error al cargar notificaciones:", e);
  }
}

function eliminarNotificacion(id) {
  fetch(`http://localhost:5001/api/activadas/eliminar/${id}`, { method: "DELETE" })
    .then(() => cargarNotificaciones())
    .then(() => verificarAlertasActivas());
}

function verificarAlertasActivas() {
  fetch("http://localhost:5001/api/activadas")
    .then(res => res.json())
    .then(alertas => {
      const punto = document.getElementById("alerta-punto");
      punto.style.display = alertas.length > 0 ? "inline-block" : "none";
    });
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);
  if (diff < 60) return "hace unos segundos";
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} horas`;
  return `hace ${Math.floor(diff / 86400)} días`;
}

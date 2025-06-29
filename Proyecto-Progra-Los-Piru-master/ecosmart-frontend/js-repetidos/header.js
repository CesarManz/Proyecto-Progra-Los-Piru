// === FUNCIONES DE MENÚ Y LOGOUT ===
function toggleMenu(event) {
  event.stopPropagation();
  const menu = document.getElementById('menuPerfil');
  if (menu) {
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }
}

//hace que al cerrar sesion se borre el localstorage y envie al usuario al login.
function logout() {
  localStorage.clear();
  window.location.href = '../Registro-Login/Login.html';
}

document.addEventListener('click', function () {
  const menu = document.getElementById('menuPerfil');
  if (menu) menu.style.display = 'none';
});

// === PERSONALIZAR LINKS SEGÚN ROL ===
const trabajoUsuario = localStorage.getItem('trabajo');
const correoUsuario = localStorage.getItem('correo');
const menu = document.getElementById('menu');

if (!trabajoUsuario || !correoUsuario) {
  window.location.href = '../Registro-Login/Login.html';
}

const linksPorRol = {
  tecnico: [
    { texto: "Página principal", href: "../Principales/Pagina-Principal.html" },
    { texto: "Parcelas", href: "../Parcelas/listar-parcelas.html" },
    { texto: "Administrar usuarios", href: "../Administrar-Usuarios/Administrar-usuarios.html" },
    { texto: "Deepseek", href: "../Deepseek/chatbot.html" },
  ],
  agronomo: [
    { texto: "Página principal", href: "../Principales/Pagina-Principal.html" },
    { texto: "Parcelas", href: "../Parcelas/listar-parcelas.html" },
    { texto: "Deepseek", href: "../Deepseek/chatbot.html" },
    { texto: "Inventario", href: "../Inventario/Inventario.html" },
    { texto: "Asignar tareas", href: "../Tareas/Asignar-tareas.html" }
  ],
  agricultor: [
    { texto: "Página principal", href: "../Principales/Pagina-Principal.html" },
    { texto: "Parcelas", href: "../Parcelas/listar-parcelas.html" },
    { texto: "Deepseek", href: "../Deepseek/chatbot.html" }
  ]
};

if (menu && linksPorRol[trabajoUsuario]) {
  linksPorRol[trabajoUsuario].forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.texto;
    menu.insertBefore(a, menu.querySelector('.busqueda'));
  });
} else if (menu) {
  alert('Rol desconocido');
}

// === CARGAR IMAGEN DE PERFIL EN HEADER ===
if (correoUsuario) {
  fetch(`http://localhost:5001/api/usuarios/${correoUsuario}`)
    .then(res => {
      if (!res.ok) throw new Error("Usuario no encontrado");
      return res.json();
    })
    .then(data => {
      if (data.fotoPerfil && document.getElementById("fotoPerfilHeader")) {
        document.getElementById("fotoPerfilHeader").src = data.fotoPerfil;
      }
    })
    .catch(err => {
      console.error("Error al cargar foto de perfil:", err);
    });
}

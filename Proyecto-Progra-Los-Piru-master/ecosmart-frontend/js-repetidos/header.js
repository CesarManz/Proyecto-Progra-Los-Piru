
function toggleMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('menuPerfil');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function () {
    const menu = document.getElementById('menuPerfil');
    if (menu) menu.style.display = 'none';
});

function logout() {
    localStorage.clear();
    window.location.href = '../Registro-Login/Login.html';
}

// Lógica para personalizar según el trabajo
const trabajo = localStorage.getItem('trabajo');
const correo = localStorage.getItem('correo');
const menu = document.getElementById('menu');

if (!trabajo || !correo) {
    window.location.href = '../Registro-Login/Login.html';
}

const linksPorRol = {
    tecnico: [
        { texto: "Página principal", href: "../Principales/Pagina-Principal.html" },
        { texto: "Parcelas", href: "../parcelas/listar-parcelas.html" },
        { texto: "Administrar usuarios", href: "../Administrar-Usuarios/Administrar-usuarios.html" },
        { texto: "Preguntas", href: "../Deepseek/consultas.html" },
    ],
    agronomo: [
        { texto: "Página principal", href: "../Principales/Pagina-Principal.html" },
        { texto: "Parcelas", href: "../parcelas/listar-parcelas.html" },
        { texto: "Preguntas", href: "../Deepseek/consultas.html" },
        { texto: "Inventario", href: "../Inventario/Inventario.html"},
        { texto: "Asignar tareas", href: "../Tareas/Asignar-tareas.html"}
    ],
    agricultor: [
        { texto: "Página principal", href: "../Principales/Pagina-Principal.html" },
        { texto: "Parcelas", href: "../parcelas/listar-parcelas.html" },
        { texto: "Preguntas", href: "../Deepseek/consultas.html" },
    ]
};

if (menu && linksPorRol[trabajo]) {
    linksPorRol[trabajo].forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.texto;
        menu.insertBefore(a, menu.querySelector('.busqueda'));
    });
} else if (menu) {
    alert('Rol desconocido');
}

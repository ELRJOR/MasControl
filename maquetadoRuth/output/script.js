document.addEventListener('DOMContentLoaded', function() {
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const toggleButton = document.getElementById('toggleButton');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const footerContent = document.getElementById('footerContent');

if (navToggle) {
    navToggle.addEventListener('click', function() {
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
    }
    });
}

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('nav-collapsed');
    mainContent.classList.toggle('expanded');
    footerContent.classList.toggle('expanded');
    });
}
});



document.getElementById('logoutButton').addEventListener('click', function() {
if (confirm('¿Estás seguro de que quieres cerrar la sesión?')) {
    // Aquí puedes redirigir al usuario a la página de inicio de sesión o hacer otras acciones de cierre de sesión
    // Por ejemplo, redirigir a la página de inicio
    window.location.href = 'index.html'; // Cambia 'logout.php' por tu ruta de cierre de sesión real
}
});

document.getElementById('messagesLink').addEventListener('click', function (event) {
// Prompt user with a confirmation message
var confirmationMessage = 'Estás a punto de dirigirte a mensajeria, los cambios no guardados se perderán, ¿Deseas continuar?';
if (!confirm(confirmationMessage)) {
    event.preventDefault(); // Cancel the navigation if the user cancels
}
});

document.addEventListener('DOMContentLoaded', function() {
    const fechaPublicacionInput = document.getElementById('fecha_publicacion');
    const fechaCierreInput = document.getElementById('fecha_cierre');

    // Obtenemos la fecha actual en formato ISO (yyyy-mm-dd)
    const fechaActual = new Date().toISOString().split('T')[0];

    // Establecemos el atributo min de fecha de publicación como la fecha actual
    fechaPublicacionInput.setAttribute('min', fechaActual);

    // Agregamos un event listener para verificar la fecha de cierre al cambiar la fecha de publicación
    fechaPublicacionInput.addEventListener('change', function() {
        const fechaPublicacion = new Date(fechaPublicacionInput.value);
        const fechaCierreMin = fechaPublicacionInput.value; // Obtener el valor de fecha de publicación como mínimo para fecha de cierre
        const fechaCierreSeleccionada = fechaCierreInput.value; // Obtener el valor de fecha de cierre seleccionada

        // Establecer el atributo min de fecha de cierre como mínimo para fecha de publicación
        fechaCierreInput.setAttribute('min', fechaCierreMin);

        // Verificar si la fecha de cierre seleccionada es inválida
        if (fechaCierreSeleccionada < fechaCierreMin) {
            fechaCierreInput.value = fechaCierreMin; // Restaurar la fecha mínima si la fecha seleccionada es inválida
        }
    });

    // Agregamos un event listener para verificar la fecha de cierre al cambiar directamente la fecha de cierre
    fechaCierreInput.addEventListener('change', function() {
        const fechaCierre = new Date(fechaCierreInput.value);
        const fechaPublicacion = new Date(fechaPublicacionInput.value);

        // Verificar que la fecha de cierre no sea anterior a la fecha de publicación
        if (fechaCierre < fechaPublicacion) {
            fechaCierreInput.setCustomValidity('La fecha de cierre debe ser igual o posterior a la fecha de publicación');
        } else {
            fechaCierreInput.setCustomValidity('');
        }
    });
});




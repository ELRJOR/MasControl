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


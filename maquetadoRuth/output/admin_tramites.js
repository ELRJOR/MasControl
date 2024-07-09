// Obtener los trámites al cargar el documento
document.addEventListener('DOMContentLoaded', fetchTramites);

// Función para obtener y mostrar los trámites desde el servidor
async function fetchTramites() {
    try {
        const response = await fetch('http://localhost:3000/tramites');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tramites = await response.json();
        console.log('Trámites fetched:', tramites);

        const tramitesTableBody = document.getElementById('tramitesTableBody');
        if (!tramitesTableBody) {
            throw new Error('tramitesTableBody element not found');
        }

        // Limpiar tabla antes de agregar nuevos registros
        tramitesTableBody.innerHTML = '';

        // Si tramites está vacío, mostrar un mensaje en la consola
        if (tramites.length === 0) {
            console.log('No hay trámites disponibles.');
        }

        tramites.forEach(tramite => {
            console.log('Procesando tramite:', tramite);

            const row = document.createElement('tr');
            row.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');

            row.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${tramite.titulo_Tramite}</td>
                <td class="py-3 px-6 text-left">${tramite.descripcion_Tramite}</td>
                <td class="py-3 px-6 text-center">${formatDate(tramite.fecha_Cierre)}</td>
                <td class="py-3 px-6 text-center">${tramite.nombre_Creador}</td>
                <td class="py-3 px-6 text-center">${tramite.ficha_Pago}</td>
                <td class="py-3 px-6 text-center">
                    <a href="edit_tramite.html?id_Tramite=${tramite.id_Tramite}" class="text-indigo-600 hover:text-indigo-900 mx-2">Editar</a>
                    <a href="#" data-id="${tramite.id_Tramite}" class="text-red-600 hover:text-red-900 mx-2 delete-confirm">Eliminar</a>
                </td>
            `;

            tramitesTableBody.appendChild(row);
        });

        // Agregar event listener para los botones de eliminar
        const deleteLinks = document.querySelectorAll('.delete-confirm');
        deleteLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const tramiteId = this.dataset.id; // Obtener el ID del trámite desde data-id
                if (confirm('Estás a punto de borrar el trámite. ¿Deseas continuar?')) {
                    deleteTramite(tramiteId);
                }
            });
        });

    } catch (error) {
        console.error('Error al obtener los trámites:', error);
    }
}

// Función para eliminar un trámite por su ID
async function deleteTramite(id_Tramite) {
    try {
        const response = await fetch(`http://localhost:3000/tramite/${id_Tramite}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Trámite eliminado correctamente');
            fetchTramites(); // Llama a la función para volver a cargar la lista de trámites
        } else {
            alert('Error al eliminar el trámite');
        }
    } catch (error) {
        console.error('Error al eliminar el trámite:', error);
    }
}

// Función para formatear la fecha en formato legible
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

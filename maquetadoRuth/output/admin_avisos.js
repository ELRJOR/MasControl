// Obtener los avisos al cargar el documento
document.addEventListener('DOMContentLoaded', fetchAvisos);

// Función para obtener y mostrar los avisos desde el servidor
async function fetchAvisos() {
    try {
        const response = await fetch('http://localhost:3000/avisos');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const avisos = await response.json();
        console.log('Avisos fetched:', avisos);

        const avisosTableBody = document.getElementById('avisosTableBody');
        if (!avisosTableBody) {
            throw new Error('avisosTableBody element not found');
        }

        // Limpiar tabla antes de agregar nuevos registros
        avisosTableBody.innerHTML = '';

        // Si avisos está vacío, mostrar un mensaje en la consola
        if (avisos.length === 0) {
            console.log('No hay avisos disponibles.');
        }

        avisos.forEach(aviso => {
            console.log('Procesando aviso:', aviso);

            const row = document.createElement('tr');
            row.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');

            row.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${aviso.titulo_Aviso}</td>
                <td class="py-3 px-6 text-left">${aviso.contenido_Aviso}</td>
                <td class="py-3 px-6 text-left">${formatDate(aviso.fecha_Publicacion)}</td>
                <td class="py-3 px-6 text-left">${aviso.nombre_Creador}</td>
                <td class="py-3 px-6 text-center">
                    <a href="edit_anuncio.html?id_Aviso=${aviso.id_Aviso}" class="text-indigo-600 hover:text-indigo-900 mx-2">Editar</a>
                    <a href="#" data-id="${aviso.id_Aviso}" class="text-red-600 hover:text-red-900 mx-2 delete-confirm">Eliminar</a>
                </td>
            `;

            avisosTableBody.appendChild(row);
        });

        // Agregar event listener para los botones de eliminar
        const deleteLinks = document.querySelectorAll('.delete-confirm');
        deleteLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const avisoId = this.dataset.id; // Obtener el ID del aviso desde data-id
                if (confirm('Estás a punto de borrar el aviso. ¿Deseas continuar?')) {
                    deleteAviso(avisoId);
                }
            });
        });

    } catch (error) {
        console.error('Error al obtener los avisos:', error);
    }
}

// Función para eliminar un aviso por su ID
async function deleteAviso(id_Aviso) {
    try {
        const response = await fetch(`http://localhost:3000/aviso/${id_Aviso}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Aviso eliminado correctamente');
            fetchAvisos(); // Llama a la función para volver a cargar la lista de avisos
        } else {
            alert('Error al eliminar el aviso');
        }
    } catch (error) {
        console.error('Error al eliminar el aviso:', error);
    }
}

// Función para formatear la fecha en formato legible
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

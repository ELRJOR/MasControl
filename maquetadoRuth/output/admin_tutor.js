// Obtener los tutores al cargar el documento
document.addEventListener('DOMContentLoaded', fetchTutores);

// Función para obtener y mostrar los tutores desde el servidor
async function fetchTutores() {
    try {
        const response = await fetch('http://localhost:3000/tutores');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tutores = await response.json();
        console.log('Tutores fetched:', tutores);

        const tutorTableBody = document.getElementById('tutorTableBody');
        if (!tutorTableBody) {
            throw new Error('tutorTableBody element not found');
        }

        // Limpiar tabla antes de agregar nuevos registros
        tutorTableBody.innerHTML = '';

        // Si tutores está vacío, mostrar un mensaje en la consola
        if (tutores.length === 0) {
            console.log('No hay tutores disponibles.');
        }

        tutores.forEach(tutor => {
            console.log('Procesando tutor:', tutor);

            const row = document.createElement('tr');
            row.classList.add('border-b', 'border-gray-200', 'hover:bg-gray-100');

            row.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${tutor.nombre_Tutor}</td>
                <td class="py-3 px-6 text-left">${tutor.apellido_Tutor}</td>
                <td class="py-3 px-6 text-left">${tutor.direccion_Tutor}</td>
                <td class="py-3 px-6 text-left">${tutor.telefono_Tutor}</td>
                <td class="py-3 px-6 text-left">${tutor.email}</td>
                <td class="py-3 px-6 text-center">
                    <a href="edit_tutor.html?id_Tutor=${tutor.id_Tutor}" class="text-indigo-600 hover:text-indigo-900 mx-2">Editar</a>
                    <a href="admin_tutor.html?id_Tutor="${tutor.id_Tutor}" class="text-red-600 hover:text-red-900 mx-2 delete-confirm" ">Eliminar</a>
                </td>
            `;
            console.log(tutor.id_Tutor);

            tutorTableBody.appendChild(row);
        });

        // Agregar event listener para los botones de eliminar
        const deleteLinks = document.querySelectorAll('.delete-confirm');
        deleteLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const tutorId = this.dataset.id; // Obtener el ID del tutor desde data-id
                if (confirm('Estás a punto de borrar el tutor. ¿Deseas continuar?')) {
                    deleteTutor(tutorId);
                }
            });
        });

    } catch (error) {
        console.error('Error al obtener los tutores:', error);
    }
}

// Función para eliminar un tutor por su ID
async function deleteTutor(id_Tutor) {
    document.addEventListener('DOMContentLoaded', async function() {
        const urlParams = new URLSearchParams(window.location.search);
        const id_Tutor = urlParams.get('id_Tutor');
    });
    try {
        const response = await fetch(`http://localhost:3000/tutor/${id_Tutor}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Tutor eliminado correctamente');
            // Opcional: Actualizar la lista de tutores después de eliminar uno
            fetchTutores(); // Llama a la función para volver a cargar la lista de tutores
        } else {
            alert('Error al eliminar el tutor');
        }
    } catch (error) {
        console.error('Error al eliminar el tutor:', error);
    }
    
}

// Llamar a fetchTutores al cargar el documento para mostrar la lista inicial de tutores
document.addEventListener('DOMContentLoaded', fetchTutores);

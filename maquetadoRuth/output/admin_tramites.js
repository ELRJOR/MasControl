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
                <td class="py-3 px-6 text-center">
                    <a href="#" data-id="${tramite.id_Tramite}" class="text-blue-600 hover:text-blue-900 mx-2 download-link">Ver/Descargar</a>
                </td>
                <td class="py-3 px-6 text-center">
                    <a href="edit_trámite.html?id_Tramite=${tramite.id_Tramite}" class="text-indigo-600 hover:text-indigo-900 mx-2">Editar</a>
                    <a href="#" data-id="${tramite.id_Tramite}" class="text-red-600 hover:text-red-900 mx-2 delete-confirm">Eliminar</a>
                </td>
            `;
        
            tramitesTableBody.appendChild(row);
        });

        // Agregar event listener para los enlaces de descarga
        const downloadLinks = document.querySelectorAll('.download-link');
        downloadLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                const tramiteId = this.dataset.id; // Obtener el ID del trámite desde data-id
                downloadTramite(tramiteId);
            });
        });

    } catch (error) {
        console.error('Error al obtener los trámites:', error);
    }
}

// Función para descargar una ficha de pago por su ID
async function downloadTramite(id_Tramite) {
    try {
        const response = await fetch(`http://localhost:3000/download/payment/${id_Tramite}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Extraer el nombre del archivo del encabezado Content-Disposition
        const contentDisposition = response.headers.get('content-disposition');
        let fileName = 'ficha_pago.pdf'; // Nombre predeterminado en caso de no poder extraerlo
        if (contentDisposition) {
            const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = fileNameRegex.exec(contentDisposition);
            if (matches && matches[1]) {
                fileName = matches[1].replace(/['"]/g, '');
            }
        }

        // Convertir la respuesta a un blob y crear un enlace de descarga
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

    } catch (error) {
        console.error('Error al descargar la ficha de pago:', error);
    }
}

// Función para formatear la fecha en formato legible
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

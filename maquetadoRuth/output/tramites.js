document.addEventListener('DOMContentLoaded', function() {
    const tramitesContainer = document.getElementById('tramitesContainer');

    async function fetchTramites() {
        try {
            const response = await fetch('/tramites');
            const tramites = await response.json();

            tramites.forEach(tramite => {
                const tramiteElement = document.createElement('div');
                tramiteElement.classList.add('block', 'p-6', 'bg-gray-800', 'rounded-lg', 'shadow-lg', 'text-center', 'transition-transform', 'transform', 'hover:scale-105', 'border-solid', 'border', 'border-gray-200');
                tramiteElement.innerHTML = `
                    <h3 class="text-xl font-semibold mb-4 text-white">${tramite.titulo_Tramite}</h3>
                    <p class="text-white mb-4">${tramite.descripcion_Tramite}</p>
                    <p class="text-white mb-4"><strong>Fecha de Publicación:</strong> ${tramite.fecha_Publicacion}</p>
                    <p class="text-white mb-4"><strong>Fecha de Cierre:</strong> ${tramite.fecha_Cierre}</p>
                    <p class="text-white mb-4"><strong>Nombre del Creador:</strong> ${tramite.nombre_Creador}</p>
                    <a href="/download/payment/${tramite.id_Tramite}" class="text-blue-500 hover:underline">Descargar Ficha de Pago</a>
                `;
                tramitesContainer.appendChild(tramiteElement);
            });
        } catch (error) {
            console.error('Error al obtener los trámites:', error);
        }
    }

    fetchTramites();
});

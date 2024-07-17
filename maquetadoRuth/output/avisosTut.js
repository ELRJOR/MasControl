// avisosTut.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('/avisos')
        .then(response => response.json())
        .then(data => {
            const avisosContainer = document.querySelector('.grid');
            avisosContainer.innerHTML = ''; // Limpiar el contenido inicial

            data.forEach(aviso => {
                const avisoCard = document.createElement('div');
                avisoCard.classList.add('block', 'p-6', 'bg-white', 'rounded-lg', 'shadow-lg', 'text-center', 'transition-transform', 'transform', 'hover:scale-105', 'border-solid', 'border', 'border-gray-200');
                avisoCard.innerHTML = `
                    <h2 class="text-xl font-semibold mb-4">${aviso.titulo_Aviso}</h2>
                    <p class="text-gray-800 mb-4">${aviso.contenido_Aviso}</p>
                    <p class="text-gray-800 mb-4">Publicado el: ${new Date(aviso.fecha_Publicacion).toLocaleDateString()}</p>
                    <p class="text-gray-800 mb-4">Creador: ${aviso.nombre_Creador}</p>
                `;
                avisosContainer.appendChild(avisoCard);
            });
        })
        .catch(error => {
            console.error('Error al obtener los avisos:', error);
        });
});

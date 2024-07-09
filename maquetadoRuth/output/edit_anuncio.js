document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const anuncioId = urlParams.get('id_Aviso');

    if (anuncioId) {
        await fetchAnuncioData(anuncioId);
    }

    const form = document.getElementById('editAnuncioForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Submitting form');
        await updateAnuncioData(anuncioId);
    });
});

async function fetchAnuncioData(id_Aviso) {
    try {
        const response = await fetch(`http://localhost:3000/aviso/${id_Aviso}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const anuncio = await response.json();
        document.getElementById('titulo').value = anuncio.titulo_Aviso;
        document.getElementById('fechaPublicacion').value = anuncio.fecha_Publicacion.substring(0, 10); // Formato YYYY-MM-DD
        document.getElementById('contenido').value = anuncio.contenido_Aviso;
        document.getElementById('nombreCreador').value = anuncio.nombre_Creador;
    } catch (error) {
        console.error('Error fetching anuncio data:', error);
    }
}

async function updateAnuncioData(id_Aviso) {
    const titulo = document.getElementById('titulo').value;
    const fechaPublicacion = document.getElementById('fechaPublicacion').value;
    const contenido = document.getElementById('contenido').value;
    const nombreCreador = document.getElementById('nombreCreador').value;

    const anuncioData = {
        titulo_Aviso: titulo,
        fecha_Publicacion: fechaPublicacion,
        contenido_Aviso: contenido,
        nombre_Creador: nombreCreador
    };

    try {
        const response = await fetch(`http://localhost:3000/aviso/${id_Aviso}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(anuncioData)
        });

        if (response.ok) {
            console.log('Anuncio actualizado correctamente');
            alert('Anuncio actualizado correctamente');
            window.location.href = 'admin_avisos.html';
        } else {
            alert('Error al actualizar el anuncio');
        }
    } catch (error) {
        console.error('Error updating anuncio data:', error);
    }
}

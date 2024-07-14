document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tramiteId = urlParams.get('id_Tramite');

    if (tramiteId) {
        await fetchTramiteData(tramiteId);
    }

    const form = document.getElementById('editTramiteForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        await updateTramiteData(tramiteId);
    });    
});

async function fetchTramiteData(id_Tramite) {
    try {
        const response = await fetch(`http://localhost:3000/tramites/${id_Tramite}`);
        if (!response.ok) {
            throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        const tramite = await response.json();

        // Llenar los campos del formulario con los datos del trámite
        document.getElementById('titulo').value = tramite.titulo_Tramite;
        document.getElementById('fechaPublicacion').value = tramite.fecha_Publicacion.substring(0, 10);
        document.getElementById('contenido').value = tramite.descripcion_Tramite;
        document.getElementById('fechaCierre').value = tramite.fecha_Cierre.substring(0, 10);
        document.getElementById('nombreCreador').value = tramite.nombre_Creador;

        // Mostrar el nombre del archivo de la ficha de pago si existe
        if (tramite.ficha_Pago) {
            const fileName = tramite.ficha_Pago.filename;
            const fileLink = document.createElement('a');
            fileLink.href = `http://localhost:3000/tramites/${id_Tramite}/fichaPago`;
            fileLink.textContent = fileName;
            document.getElementById('ficha_Pago').appendChild(fileLink);
        }
    } catch (error) {
        console.error('Error al obtener los datos del trámite:', error);
    }
}

async function updateTramiteData(id_Tramite) {
    const formData = new FormData();
    formData.append('titulo', document.getElementById('titulo').value);
    formData.append('fechaPublicacion', new Date(document.getElementById('fechaPublicacion').value).toISOString());
    formData.append('contenido', document.getElementById('contenido').value);
    formData.append('fecha_Cierre', new Date(document.getElementById('fechaCierre').value).toISOString());
    formData.append('nombreCreador', document.getElementById('nombreCreador').value);
    if (document.getElementById('ficha_Pago').files.length > 0) {
        formData.append('ficha_Pago', document.getElementById('ficha_Pago').files[0]);
    }

    try {
        const response = await fetch(`http://localhost:3000/tramites/${id_Tramite}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            alert('Trámite actualizado correctamente.');
            window.location.href = 'admin_trámites.html';
        } else {
            alert('Error al tratar de actualizar el trámite.');
        }
    } catch (error) {
        console.error('Error al actualizar los datos del trámite:', error);
    }
}

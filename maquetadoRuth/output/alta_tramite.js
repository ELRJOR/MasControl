document.getElementById("tramiteForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titulo', document.getElementById("titulo").value);
    formData.append('fechaPublicacion', document.getElementById("fechaPublicacion").value);
    formData.append('contenido', document.getElementById("contenido").value);
    formData.append('fecha_Cierre', document.getElementById("fecha_Cierre").value);
    formData.append('nombreCreador', document.getElementById("nombreCreador").value);
    formData.append('ficha_Pago', document.getElementById("ficha_Pago").files[0]);

    try {
        console.log('Enviando los siguientes datos:', formData);
        const response = await fetch('http://localhost:3000/tramites', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Trámite creado correctamente.');
            window.location.href = 'admin_trámites.html';  // Redirigir a la página de administración de trámites
        } else {
            alert('Error al tratar de crear el trámite.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
});

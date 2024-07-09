document.getElementById("anuncioForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = {
        titulo_Aviso: document.getElementById("title").value,
        contenido_Aviso: document.getElementById("content").value,
        fecha_Publicacion: new Date().toISOString(),  // Fecha actual en formato ISO
        nombre_Creador: document.getElementById("creatorName").value  // Aquí debes proporcionar el nombre del creador del aviso
    };

    try {
        const response = await fetch('http://localhost:3000/alta-aviso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert('Aviso creado correctamente.');
            window.location.href = 'admin_avisos.html';  // Redirigir a la página de administración de avisos
        } else {
            alert('Error al tratar de crear el aviso.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
});

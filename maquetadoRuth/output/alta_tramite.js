document.getElementById("tramiteForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('titulo', document.getElementById("titulo").value);
    formData.append('fechaPublicacion', new Date(document.getElementById("fechaPublicacion").value).toISOString());
    formData.append('contenido', document.getElementById("contenido").value);
    formData.append('fecha_Cierre', new Date(document.getElementById("fecha_Cierre").value).toISOString());
    formData.append('nombreCreador', document.getElementById("nombreCreador").value);
    formData.append('ficha_Pago', document.getElementById("ficha_Pago").files[0]);

    console.log('Valor de fecha_Cierre:', document.getElementById("fecha_Cierre").value);
    console.log('Valor de fecha_Cierre:', document.getElementById("fecha_Cierre").value);

    try {
        console.log('Enviando los siguientes datos:', formData);
        const response = await fetch('http://localhost:3000/tramites', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Trámite creado correctamente.');
            window.location.href = 'admin_trámites.html';
        } else {
            alert('Error al tratar de crear el trámite.');
        }

    } catch (error) {
        console.error('Error:', error);
    }
});

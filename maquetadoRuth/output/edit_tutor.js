document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const tutorId = urlParams.get('id_Tutor');

    if (tutorId) {
        await fetchTutorData(tutorId);
    }
    console.log(tutorId); 
    const form = document.getElementById('editTutorForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        console.log('Submitting form'); // Log para verificar que el submit se está llamando
        await updateTutorData(tutorId);
    });
});

async function fetchTutorData(id_Tutor) {
    try {
        const response = await fetch(`http://localhost:3000/tutor/${id_Tutor}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const tutor = await response.json();
        document.getElementById('nombre_Tutor').value = tutor.nombre_Tutor;
        document.getElementById('apellido_Tutor').value = tutor.apellido_Tutor;
        document.getElementById('direccion_Tutor').value = tutor.direccion_Tutor;
        document.getElementById('telefono_Tutor').value = tutor.telefono_Tutor;
        document.getElementById('email').value = tutor.email;
    } catch (error) {
        console.error('Error fetching tutor data:', error);
    }
}

async function updateTutorData(id_Tutor) {
    const nombre_Tutor = document.getElementById('nombre_Tutor').value;
    const apellido_Tutor = document.getElementById('apellido_Tutor').value;
    const direccion_Tutor = document.getElementById('direccion_Tutor').value;
    const telefono_Tutor = document.getElementById('telefono_Tutor').value;
    const email = document.getElementById('email').value;

    const tutorData = {
        nombre_Tutor,
        apellido_Tutor,
        direccion_Tutor,
        telefono_Tutor,
        email
    };

    try {
        const response = await fetch(`http://localhost:3000/tutor/${id_Tutor}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tutorData)
        });

        if (response.ok) {
            console.log('Tutor actualizado correctamente');
            alert('Tutor actualizado correctamente');
            window.location.href = 'admin_tutor.html';
        } else {
            alert('Error al actualizar el tutor');
        }
    } catch (error) {
        console.error('Error updating tutor data:', error);
    }
}

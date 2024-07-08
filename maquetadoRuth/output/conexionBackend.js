    //parte del formulario de tutores
        //conexion CREATE
        document.getElementById("tutorForm").addEventListener("submit", async function(event) {
            event.preventDefault();
        
            const formData = {
                nombre_Tutor: document.getElementById("name").value,
                apellido_Tutor: document.getElementById("lastname").value,
                direccion_Tutor: document.getElementById("address").value,
                telefono_Tutor: document.getElementById("phone").value,
                email: document.getElementById("email").value
            };
        
            try {
                const response = await fetch('http://localhost:3000/alta-tutor', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                const data = await response.json();
                console.log(data); // Puedes manejar la respuesta del servidor aquí
        
            } catch (error) {
                console.error('Error:', error);
            }
        });
        //conexion READ
        console.log('Script loaded');

        document.addEventListener('DOMContentLoaded', async function() {
            console.log('Document loaded in admin_tutor.html');
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
                            <a href="edit_tutor.html?id=${tutor.id}" class="text-indigo-600 hover:text-indigo-900 mx-2">Editar</a>
                            <a href="#" class="text-red-600 hover:text-red-900 mx-2 delete-confirm" data-id="${tutor.id}">Eliminar</a>
                        </td>
                    `;

                    tutorTableBody.appendChild(row);
                });

                // Agregar event listener para los botones de eliminar
                const deleteLinks = document.querySelectorAll('.delete-confirm');
                deleteLinks.forEach(link => {
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                        const tutorId = this.dataset.id;
                        if (confirm('Estás a punto de borrar el tutor. ¿Deseas continuar?')) {
                            deleteTutor(tutorId);
                        }
                    });
                });

            } catch (error) {
                console.error('Error al obtener los tutores:', error);
            }
        });

        async function deleteTutor(id) {
            try {
                const response = await fetch(`http://localhost:3000/tutor/${id}`, {
                    method: 'DELETE'
                });

                if (response.ok) {
                    alert('Tutor eliminado correctamente');
                    window.location.reload();
                } else {
                    alert('Error al eliminar el tutor');
                }
            } catch (error) {
                console.error('Error al eliminar el tutor:', error);
            }
        }
        
        

    //parte del formulario de usuario
        //conexion de ingreso
        document.getElementById("loginForm").addEventListener("submit", async function(event) {
            event.preventDefault();
        
            const formData = {
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
            };
        
            try {
                const response = await fetch('http://localhost:3000/login-global', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                
                const data = await response.json();
                console.log(data); // Puedes manejar la respuesta del servidor aquí
        
            } catch (error) {
                console.error('Error:', error);
            }
        });

    // Seccion de registro de usuario
        // Registrar nuevo usuario
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById("registerForm").addEventListener("submit", async function(event) {
                event.preventDefault();
        
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;
                const confirmPassword = document.getElementById("confirmPassword").value;
                
                // Verificar que todos los datos se están obteniendo correctamente
                console.log("Email:", email);
                console.log("Password:", password);
                console.log("Confirm Password:", confirmPassword);

                // Enviar datos al servidor para validar las contraseñas
                try {
                    const response = await fetch('http://localhost:3000/register-global', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password, confirmPassword })  // Enviar confirm-password al servidor
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        alert(data.message);
                        window.location.href = '/login.html'; // Redirigir al login después de registrar
                    } else {
                        const data = await response.json();
                        alert(`Error en el registro: ${data.message}`);
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Hubo un problema al registrar el usuario.');
                }
            });
        });
        

        



    // //Funciones de ANUNCIOS
    // document.getEelementById("anuncioForm").addEventListener("submit", async function(event){
    //     event.preventDefault();

    //     const formData = {
    //         titulo: document.getElementById("titulo").value,
    //         fechaPublicacion: document.getElementById("fecha_publicacion").value,
    //         contenido: document.getElementById("contenido").value,
    //         nombreAdministrador: document.getElementById("nombre_administrador").value
    //     };

    //     try {
    //         const response = await fetch('http://localhost:3000/alta-anuncio', {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(formData)
    //         });

    //         if (!response.ok) {
    //             throw new Error('Network response was not ok')
    //         }

    //         const data = await response.json();
    //         console.log(data);

    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    // });

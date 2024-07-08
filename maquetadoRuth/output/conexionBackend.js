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
        
                if (response.ok) {
                    alert('Tutor dado de alta correctamente.');
                    window.location.href = 'admin_tutor.html';
                } else {
                    alert('Error al tratar de dar de alta al tutor en la base de datos.');
                }
        
            } catch (error) {
                console.error('Error:', error);
            }
        });


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
        

        


    //parte del formulario de tutores
        //conexion CREATE
        document.getElementById("tutorForm").addEventListener("submit", async function(event) {
            event.preventDefault();
        
            const formData = {
                name: document.getElementById("name").value,
                lastname: document.getElementById("lastname").value,
                address: document.getElementById("address").value,
                phone: document.getElementById("phone").value,
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

    // Registro de usuario
    document.getElementById("registerForm").addEventListener("submit", async function(event) {
        event.preventDefault();

        const formData = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            confirmPassword: document.getElementById("confirm-password").value
        };

        try {
            // Verificar si el usuario ya existe como Tutor
            const responseTutor = await fetch('http://localhost:3000/verificar-tutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formData.email })
            });

            if (responseTutor.ok) {
                // Si existe como Tutor, registrar como Usuario
                const response = await fetch('http://localhost:3000/registrar-usuario', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('Usuario registrado correctamente');
                    window.location.href = '/login.html'; // Redirigir al login después de registrar
                } else {
                    throw new Error('Registro fallido');
                }
            } else {
                // Verificar si el usuario existe como Administrador
                const responseAdmin = await fetch('http://localhost:3000/verificar-administrador', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: formData.email })
                });

                if (responseAdmin.ok) {
                    // Si existe como Administrador, registrar como Usuario
                    const response = await fetch('http://localhost:3000/registrar-usuario', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    if (response.ok) {
                        alert('Usuario registrado correctamente');
                        window.location.href = '/login.html'; // Redirigir al login después de registrar
                    } else {
                        throw new Error('Registro fallido');
                    }
                } else {
                    alert('Usuario no encontrado como Tutor ni Administrador');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    //Funciones de ANUNCIOS
    document.getEelementById("anuncioForm").addEventListener("submit", async function(event){
        event.preventDefault();

        const formData = {
            titulo: document.getElementById("titulo").value,
            fechaPublicacion: document.getElementById("fecha_publicacion").value,
            contenido: document.getElementById("contenido").value,
            nombreAdministrador: document.getElementById("nombre_administrador").value
        };

        try {
            const response = await fetch('http://localhost:3000/alta-anuncio', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const data = await response.json();
            console.log(data);
        }
    });

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

    //parte del formulario de login
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
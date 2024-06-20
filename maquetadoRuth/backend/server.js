import express from 'express';
import bodyParser from 'body-parser';
import sql from 'mssql';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

const app = express();
const port = 3000;

// Configuración de middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Añadido para parsear datos de formulario

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
    user: 'nodeuser',
    password: 'nodepassword',  // Asegúrate de poner la contraseña correcta aquí
    server: 'localhost',
    database: 'ResidenciaVillaazul',
    options: {
        trustServerCertificate: true, // Esto es importante para conexiones locales
        encrypt: false // No usar certificados SSL/TLS
    }
};

// Ruta para manejar el registro de usuarios
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('nombre', sql.NVarChar, req.body.nombre)
            .input('email', sql.NVarChar, req.body.email)
            .input('password', sql.NVarChar, hashedPassword)
            .query('INSERT INTO Usuarios (nombre, email, password) VALUES (@nombre, @email, @password)');
        res.status(200).send('Usuario registrado correctamente');
    } catch (err) {
        console.error('Error al registrar usuario: ', err);
        res.status(500).send('Error al registrar usuario');
    }
});

// Ruta para manejar el inicio de sesión de usuarios
app.post('/login', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('email', sql.NVarChar, req.body.email)
            .query('SELECT * FROM Usuarios WHERE email = @email');

        if (result.recordset.length > 0) {
            const user = result.recordset[0];
            const passwordMatch = await bcrypt.compare(req.body.password, user.password);

            if (passwordMatch) {
                res.status(200).json({ success: true, message: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(404).json({ success: false, message: 'Correo electrónico no encontrado' });
        }
    } catch (err) {
        console.error('Error al iniciar sesión: ', err);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Residencia Villaazul');
});

app.listen(port, () => {
    console.log(Servidor escuchando en http://localhost:${port});
});


recuerden usar node y activarlo con
node --trace-warnings server.js
o
node server.js
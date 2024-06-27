import express from 'express';
import path from 'path';
import { conectarBD } from './db';
import { agregarTutorController } from './controllers/tutorController';
import { registrarUsuario } from './controllers/registerController';
import { login } from './controllers/loginController';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio "output"
app.use(express.static(path.join(__dirname, '../output')));

// Ruta para agregar un tutor
app.post('/alta-tutor', agregarTutorController);
// Ruta para hacer login
app.post('/login-global', login);
// Ruta para registrar un nuevo usuario
app.post('/register-global', registrarUsuario);
// // ruta para registrar un nuevo aviso
// app.post('/alta-anuncio', agregarAviso);

// Middleware para manejar errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Iniciar el servidor
conectarBD().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Error al conectar a la base de datos:', (error as Error).message);
});

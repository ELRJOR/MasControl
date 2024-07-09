import express from 'express';
import path from 'path';
import { conectarBD } from './db';
import { agregarTutorController, obtenerTutoresController, buscarTutorController, actualizarTutorController, eliminarTutorController } from './controllers/tutorController';
import { registrarUsuario } from './controllers/registerController';
import { login } from './controllers/loginController';
import { agregarAvisoController, obtenerAvisosController, buscarAvisoController, actualizarAvisoController, eliminarAvisoController } from './controllers/anuncioController';
import { agregarTramiteController, obtenerTramitesController, buscarTramiteController, actualizarTramiteController, eliminarTramiteController } from './controllers/tramiteController';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio "output"
app.use(express.static(path.join(__dirname, '../output')));

// Rutas para tutores
app.post('/tutors', agregarTutorController);
app.get('/tutors', obtenerTutoresController);
app.get('/tutors/:id', buscarTutorController);
app.put('/tutors/:id', actualizarTutorController);
app.delete('/tutors/:id', eliminarTutorController);

// Rutas para anuncios
app.post('/avisos', agregarAvisoController);
app.get('/avisos', obtenerAvisosController);
app.get('/avisos/:id', buscarAvisoController);
app.put('/avisos/:id', actualizarAvisoController);
app.delete('/avisos/:id', eliminarAvisoController);

// Rutas para trámites
app.post('/tramites', agregarTramiteController);
app.get('/tramites', obtenerTramitesController);
app.get('/tramites/:id', buscarTramiteController);
app.put('/tramites/:id', actualizarTramiteController);
app.delete('/tramites/:id', eliminarTramiteController);

// Ruta para hacer login
app.post('/login-global', login);
// Ruta para registrar un nuevo usuario
app.post('/register-global', registrarUsuario);

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

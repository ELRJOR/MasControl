import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import { conectarBD } from './db';
import { agregarTutorController, obtenerTutoresController, buscarTutorController, actualizarTutorController, eliminarTutorController } from './controllers/tutorController';
import { registrarUsuario } from './controllers/registerController';
import { login } from './controllers/loginController';
import { agregarAvisoController, obtenerAvisosController, buscarAvisoController, actualizarAvisoController, eliminarAvisoController } from './controllers/anuncioController';
import { agregarTramiteController, obtenerTramitesController, buscarTramiteController, actualizarTramiteController, eliminarTramiteController, downloadPaymentReceipt } from "./controllers/tramiteController";

const app = express();
const upload = multer();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde el directorio "output"
app.use(express.static(path.join(__dirname, '../output')));

//Middlend para la seccion de tutores
    // Ruta para agregar un tutor
    app.post('/alta-tutor', agregarTutorController);
    // Ruta para obtener todos los tutores
    app.get('/tutores', obtenerTutoresController);
    // Ruta para buscar un tutor por su ID o nombre
    app.get('/tutor/:idOrNombre', buscarTutorController);
    // Ruta para actualizar la información de un tutor por su ID
    app.put('/tutor/:id_Tutor', actualizarTutorController);
    // Ruta para eliminar un tutor por su ID
    app.delete('/tutor/:id_Tutor', eliminarTutorController);

// Rutas para anuncios
app.post('/alta-aviso', agregarAvisoController);
app.get('/avisos', obtenerAvisosController);
app.get('/aviso/:id', buscarAvisoController);
app.put('/aviso/:id', actualizarAvisoController);
app.delete('/aviso/:id', eliminarAvisoController);

// Rutas para trámites
app.post('/tramites', upload.single('ficha_Pago'), agregarTramiteController);
app.get('/tramites', obtenerTramitesController);
app.get('/tramites/:id', buscarTramiteController);
app.put('/tramites/:id', upload.single('ficha_Pago'), actualizarTramiteController);
app.delete('/tramites/:id', eliminarTramiteController);
// Ruta para descargar ficha de pago
app.get('/download/payment/:id', downloadPaymentReceipt);   

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

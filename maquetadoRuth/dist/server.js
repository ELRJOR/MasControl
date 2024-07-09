"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const db_1 = require("./db");
const tutorController_1 = require("./controllers/tutorController");
const registerController_1 = require("./controllers/registerController");
const loginController_1 = require("./controllers/loginController");
const anuncioController_1 = require("./controllers/anuncioController");
const tramiteController_1 = require("./controllers/tramiteController");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware para parsear el body de las solicitudes JSON
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Servir archivos estáticos desde el directorio "output"
app.use(express_1.default.static(path_1.default.join(__dirname, '../output')));
//Middlend para la seccion de tutores
// Ruta para agregar un tutor
app.post('/alta-tutor', tutorController_1.agregarTutorController);
// Ruta para obtener todos los tutores
app.get('/tutores', tutorController_1.obtenerTutoresController);
// Ruta para buscar un tutor por su ID o nombre
app.get('/tutor/:idOrNombre', tutorController_1.buscarTutorController);
// Ruta para actualizar la información de un tutor por su ID
app.put('/tutor/:id_Tutor', tutorController_1.actualizarTutorController);
// Ruta para eliminar un tutor por su ID
app.delete('/tutor/:id_Tutor', tutorController_1.eliminarTutorController);
// Rutas para anuncios
app.post('/alta-aviso', anuncioController_1.agregarAvisoController);
app.get('/avisos', anuncioController_1.obtenerAvisosController);
app.get('/aviso/:id', anuncioController_1.buscarAvisoController);
app.put('/aviso/:id', anuncioController_1.actualizarAvisoController);
app.delete('/aviso/:id', anuncioController_1.eliminarAvisoController);
// Rutas para trámites
app.post('/tramites', tramiteController_1.agregarTramiteController);
app.get('/tramites', tramiteController_1.obtenerTramitesController);
app.get('/tramites/:id', tramiteController_1.buscarTramiteController);
app.put('/tramites/:id', tramiteController_1.actualizarTramiteController);
app.delete('/tramites/:id', tramiteController_1.eliminarTramiteController);
// Ruta para hacer login
app.post('/login-global', loginController_1.login);
// Ruta para registrar un nuevo usuario
app.post('/register-global', registerController_1.registrarUsuario);
// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Iniciar el servidor
(0, db_1.conectarBD)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Error al conectar a la base de datos:', error.message);
});

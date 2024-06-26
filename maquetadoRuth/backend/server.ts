import express from 'express';
import cors from 'cors';
import { conectarBD } from './db';
import { agregarTutorController } from './controllers/tutorController'; // Asegúrate de que la ruta sea correcta

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las solicitudes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de CORS
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Aquí defines el origen permitido
    methods: ['GET', 'POST'], // Aquí defines los métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'] // Aquí defines los encabezados permitidos
}));

// Ruta para agregar un tutor
app.post('/alta-tutor', agregarTutorController);

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

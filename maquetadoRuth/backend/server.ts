import express from 'express';
import { conectarBD, obtenerEscuelas } from './db'; // Ajusta la ruta según tu estructura
import { Escuela } from './models/Escuela'; // Ajusta la ruta según tu estructura

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las solicitudes JSON
app.use(express.json());

// Endpoint para obtener todas las escuelas
app.get('/api/escuelas', async (req, res) => {
    try {
        conectarBD();
        let escuelas = await obtenerEscuelas();
        res.json(escuelas);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

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

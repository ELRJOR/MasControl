import express from 'express';
import { conectarBD, obtenerEscuelas, obtenerAlumnos, obtenerTutores, obtenerAdministradores, obtenerAvisos, obtenerTramites } from './db';
import { Escuela } from './models/Escuela';
import { Alumno } from './models/Alumno';
import { Tutor } from './models/Tutor';
import { Administrador } from './models/Administrador';
import { Aviso } from './models/Aviso';
import { Tramite } from './models/Tramite';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear el body de las solicitudes JSON
app.use(express.json());

// Endpoint para obtener todas las escuelas
app.get('/escuelas', async (req: express.Request, res: express.Response) => {
    try {
        const escuelas: Escuela[] = await obtenerEscuelas();
        res.json(escuelas);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// Endpoint para obtener todos los alumnos
app.get('/alumnos', async (req: express.Request, res: express.Response) => {
    try {
        const alumnos: Alumno[] = await obtenerAlumnos();
        res.json(alumnos);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// Endpoint para obtener todos los tutores
app.get('/tutores', async (req: express.Request, res: express.Response) => {
    try {
        const tutores: Tutor[] = await obtenerTutores();
        res.json(tutores);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// Endpoint para obtener todos los administradores
app.get('/administradores', async (req: express.Request, res: express.Response) => {
    try {
        const administradores: Administrador[] = await obtenerAdministradores();
        res.json(administradores);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// Endpoint para obtener todos los avisos
app.get('/avisos', async (req: express.Request, res: express.Response) => {
    try {
        const avisos: Aviso[] = await obtenerAvisos();
        res.json(avisos);
    } catch (error) {
        res.status(500).send((error as Error).message);
    }
});

// Endpoint para obtener todos los trámites
app.get('/tramites', async (req: express.Request, res: express.Response) => {
    try {
        const tramites: Tramite[] = await obtenerTramites();
        res.json(tramites);
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

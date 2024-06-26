import * as mssql from 'mssql';
import { Escuela } from './models/Escuela';
import { Alumno } from './models/Alumno';
import { Tutor } from './models/Tutor';
import { Administrador } from './models/Administrador';
import { Aviso } from './models/Aviso';
import { Tramite } from './models/Tramite';

// Configuración para la conexión a la base de datos
const dbConfig: mssql.config = {
    user: 'Jessie',
    password: '1234',
    server: 'FAVORITECHILD',
    database: 'MasControlDB',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

// Función para conectar a la base de datos
export async function conectarBD(): Promise<mssql.ConnectionPool> {
    try {
        const pool = new mssql.ConnectionPool(dbConfig);
        await pool.connect();
        console.log('Conexión establecida correctamente');
        return pool;
    } catch (error) {
        console.error('Error al intentar conectar:', (error as Error).message);
        throw error;
    }
}

// Función para agregar un tutor utilizando la interfaz Tutor
export async function agregarTutor(tutor: Tutor): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email_Tutor } = tutor;

    try {
        // Conectar a la base de datos
        pool = await conectarBD();
        // Iniciar una nueva transacción
        transaction = new mssql.Transaction(pool);
        // Iniciar la transacción
        await transaction.begin();
        // Query para insertar el tutor
        const query = `
            INSERT INTO Tutores (nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email_Tutor)
            VALUES (@nombre_Tutor, @apellido_Tutor, @direccion_Tutor, @telefono_Tutor, @email_Tutor)
        `;
        // Ejecutar la consulta con parámetros
        await transaction.request()
            .input('nombre_Tutor', mssql.NVarChar, nombre_Tutor)
            .input('apellido_Tutor', mssql.NVarChar, apellido_Tutor)
            .input('direccion_Tutor', mssql.NVarChar, direccion_Tutor)
            .input('telefono_Tutor', mssql.NVarChar, telefono_Tutor)
            .input('email_Tutor', mssql.NVarChar, email_Tutor)
            .query(query);
        // Commit de la transacción
        await transaction.commit();
        console.log('Tutor agregado correctamente');
    } catch (error) {
        // Si hay algún error, hacer rollback de la transacción
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al agregar el tutor:', (error as Error).message);
        throw error;
    } finally {
        // Cerrar la conexión
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

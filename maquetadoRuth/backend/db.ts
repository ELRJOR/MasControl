import * as mssql from 'mssql';
import { Escuela } from './models/Escuela';

// Configuración para la conexión a la base de datos
const dbConfig: mssql.config = {
    user: 'Jessie',
    password: '1234',
    server: 'FAVORITECHILD',
    database: 'MasControlDB',
    options: {
        encrypt: true, // Si estás utilizando Azure SQL Database, debes configurar esto en 'true'
        trustServerCertificate: true, // Cambia esto solo si estás utilizando un certificado de servidor autofirmado
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

// Función para cerrar la conexión a la base de datos
export async function cerrarConexionBD(pool: mssql.ConnectionPool): Promise<void> {
    try {
        await pool.close();
        console.log('Conexión cerrada correctamente');
    } catch (error) {
        console.error('Error al intentar cerrar la conexión:', (error as Error).message);
        throw error;
    }
}

// Ejemplo de consulta para obtener todas las escuelas
export async function obtenerEscuelas(): Promise<any[]> {
    let pool: mssql.ConnectionPool | null = null;
    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Escuelas');
        return result.recordset;
    } catch (error) {
        console.error('Error al obtener las escuelas:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await cerrarConexionBD(pool);
        }
    }
}

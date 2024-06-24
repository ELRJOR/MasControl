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

// Función para obtener todas las escuelas
export async function obtenerEscuelas(): Promise<Escuela[]> {
    let pool: mssql.ConnectionPool | null = null;
    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Escuelas');
        return result.recordset as Escuela[];
    } catch (error) {
        console.error('Error al obtener las escuelas:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

// Funciones adicionales para obtener los demás modelos

export async function obtenerAlumnos(): Promise<Alumno[]> {
    let pool: mssql.ConnectionPool | null = null;
    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Alumnos');
        return result.recordset as Alumno[];
    } catch (error) {
        console.error('Error al obtener los alumnos:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function obtenerTutores(): Promise<Tutor[]> {
    let pool: mssql.ConnectionPool | null = null;
    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Tutores');
        return result.recordset as Tutor[];
    } catch (error) {
        console.error('Error al obtener los tutores:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function obtenerAdministradores(): Promise<Administrador[]> {
    let pool: mssql.ConnectionPool | null = null;
    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Administradores');
        return result.recordset as Administrador[];
    } catch (error) {
        console.error('Error al obtener los administradores:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function obtenerAvisos(): Promise<Aviso[]> {
    let pool: mssql.ConnectionPool | null = null;
    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Avisos');
        return result.recordset as Aviso[];
    } catch (error) {
        console.error('Error al obtener los avisos:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

export async function obtenerTramites(): Promise<Tramite[]> {
    let pool: mssql.ConnectionPool | null = null;
    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Tramites');
        return result.recordset as Tramite[];
    } catch (error) {
        console.error('Error al obtener los trámites:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

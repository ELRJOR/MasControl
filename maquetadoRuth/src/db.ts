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

//Verificacion de usuario para LOGIN
    // Función para verificar si el usuario es un Tutor
    export async function verificarTutor(email: string, password: string): Promise<Tutor | null> {
        let pool: mssql.ConnectionPool | null = null;

        try {
            pool = await conectarBD();
            const result = await pool.request()
                .input('email', mssql.NVarChar, email)
                .input('password', mssql.NVarChar, password)
                .query('SELECT id_Tutor, nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email_Tutor FROM Tutores WHERE email_Tutor = @email AND password = @password');

            if (result.recordset.length > 0) {
                return result.recordset[0] as Tutor;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al verificar el tutor:', (error as Error).message);
            throw error;
        } finally {
            if (pool) {
                await pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    }

    // Función para verificar si el usuario es un Administrador
    export async function verificarAdministrador(email: string, password: string): Promise<Administrador | null> {
        let pool: mssql.ConnectionPool | null = null;

        try {
            pool = await conectarBD();
            const result = await pool.request()
                .input('email', mssql.NVarChar, email)
                .input('password', mssql.NVarChar, password)
                .query('SELECT id_Admin, matricula_Admin, nombre_Admin, apellido_Admin, telefono_Admin, email_Admin, id_Escuela FROM Administradores WHERE email_Admin = @email AND password = @password');

            if (result.recordset.length > 0) {
                return result.recordset[0] as Administrador;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error al verificar el administrador:', (error as Error).message);
            throw error;
        } finally {
            if (pool) {
                await pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    }
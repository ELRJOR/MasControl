import * as mssql from 'mssql';
import { Usuario } from './models/Usuario';

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
export async function verificarUsuario(email: string, password: string): Promise<Usuario | null> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('email', mssql.NVarChar, email)
            .input('password', mssql.NVarChar, password)
            .query('SELECT id_Usuario, email, role FROM Usuarios WHERE email = @email AND password = @password');

        if (result.recordset.length > 0) {
            return result.recordset[0] as Usuario;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al verificar el usuario:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}
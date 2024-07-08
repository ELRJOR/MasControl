import * as mssql from 'mssql';
import { Tutor } from './models/Tutor';
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

// Función para agregar un tutor
export async function agregarTutor(tutor: Tutor): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = tutor;

    try {
        // Conectar a la base de datos
        pool = await conectarBD();
        // Iniciar una nueva transacción
        transaction = new mssql.Transaction(pool);
        // Iniciar la transacción
        await transaction.begin();
        // Query para insertar el tutor
        const query = `
            INSERT INTO Tutores (nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email)
            VALUES (@nombre_Tutor, @apellido_Tutor, @direccion_Tutor, @telefono_Tutor, @email)
        `;
        // Ejecutar la consulta con parámetros
        await transaction.request()
            .input('nombre_Tutor', mssql.NVarChar, nombre_Tutor)
            .input('apellido_Tutor', mssql.NVarChar, apellido_Tutor)
            .input('direccion_Tutor', mssql.NVarChar, direccion_Tutor)
            .input('telefono_Tutor', mssql.NVarChar, telefono_Tutor)
            .input('email', mssql.NVarChar, email)
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
// Función para obtener todos los tutores
export async function obtenerTodosLosTutores(): Promise<Tutor[]> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Tutores');

        return result.recordset as Tutor[];
    } catch (error) {
        console.error('Error al obtener todos los tutores:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para buscar un tutor por su ID o nombre
export async function buscarTutorPorIdONombre(idOrNombre: string): Promise<Tutor | null> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('idOrNombre', mssql.NVarChar, idOrNombre)
            .query(`
                SELECT * FROM Tutores
                WHERE id_Tutor = @idOrNombre OR nombre_Tutor LIKE @idOrNombre
            `);

        if (result.recordset.length > 0) {
            return result.recordset[0] as Tutor;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el tutor por ID o nombre:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para actualizar un tutor por su ID
export async function actualizarTutor(id: number, tutor: Tutor): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = tutor;

    try {
        // Conectar a la base de datos
        pool = await conectarBD();
        // Iniciar una nueva transacción
        transaction = new mssql.Transaction(pool);
        // Iniciar la transacción
        await transaction.begin();
        // Query para actualizar el tutor
        const query = `
            UPDATE Tutores
            SET nombre_Tutor = @nombre_Tutor,
                apellido_Tutor = @apellido_Tutor,
                direccion_Tutor = @direccion_Tutor,
                telefono_Tutor = @telefono_Tutor,
                email = @email
            WHERE id_Tutor = @id
        `;
        // Ejecutar la consulta con parámetros
        await transaction.request()
            .input('nombre_Tutor', mssql.NVarChar, nombre_Tutor)
            .input('apellido_Tutor', mssql.NVarChar, apellido_Tutor)
            .input('direccion_Tutor', mssql.NVarChar, direccion_Tutor)
            .input('telefono_Tutor', mssql.NVarChar, telefono_Tutor)
            .input('email', mssql.NVarChar, email)
            .input('id', mssql.Int, id)
            .query(query);
        // Commit de la transacción
        await transaction.commit();
        console.log(`Tutor con ID ${id} actualizado correctamente`);
    } catch (error) {
        // Si hay algún error, hacer rollback de la transacción
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al actualizar el tutor con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        // Cerrar la conexión
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

// Función para eliminar un tutor por su ID
export async function eliminarTutor(id: number): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    try {
        // Conectar a la base de datos
        pool = await conectarBD();
        // Iniciar una nueva transacción
        transaction = new mssql.Transaction(pool);
        // Iniciar la transacción
        await transaction.begin();
        // Query para eliminar el tutor
        const query = `
            DELETE FROM Tutores
            WHERE id_Tutor = @id
        `;
        // Ejecutar la consulta con parámetros
        await transaction.request()
            .input('id', mssql.Int, id)
            .query(query);
        // Commit de la transacción
        await transaction.commit();
        console.log(`Tutor con ID ${id} eliminado correctamente`);
    } catch (error) {
        // Si hay algún error, hacer rollback de la transacción
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al eliminar el tutor con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        // Cerrar la conexión
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
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

// Funciones para registrar un nuevo usuario
export async function verificarExistencia(table: string, email: string): Promise<boolean> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('email', mssql.NVarChar, email)
            .query(`SELECT COUNT(*) AS count FROM ${table} WHERE email = @email`);

        return result.recordset[0].count > 0;
    } catch (error) {
        console.error(`Error al verificar existencia en ${table}:`, error);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

export async function registrarUsuarioEnTablaUsuarios(email: string, password: string, role: string): Promise<boolean> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('email', mssql.NVarChar, email)
            .input('password', mssql.NVarChar, password)
            .input('role', mssql.NVarChar, role)
            .query('INSERT INTO Usuarios (email, password, role) VALUES (@email, @password, @role)');
        
        return result.rowsAffected.length > 0;
    } catch (error) {
        console.error('Error al registrar usuario en tabla Usuarios:', error);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}



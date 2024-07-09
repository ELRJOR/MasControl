import * as mssql from 'mssql';
import { Tutor } from './models/Tutor';
import { Usuario } from './models/Usuario';
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

// Función para agregar un aviso
export async function agregarAviso(aviso: Aviso): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { titulo_Aviso, contenido_Aviso, fecha_Publicacion, nombre_Creador } = aviso; // Se ajusta para incluir nombre_Creador

    try {
        pool = await conectarBD();
        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            INSERT INTO Avisos (titulo_Aviso, contenido_Aviso, fecha_Publicacion, nombre_Creador)
            VALUES (@titulo_Aviso, @contenido_Aviso, @fecha_Publicacion, @nombre_Creador)
        `;
        await transaction.request()
            .input('titulo_Aviso', mssql.NVarChar, titulo_Aviso)
            .input('contenido_Aviso', mssql.NVarChar, contenido_Aviso)
            .input('fecha_Publicacion', mssql.DateTime, fecha_Publicacion)
            .input('nombre_Creador', mssql.NVarChar, nombre_Creador)
            .query(query);
        await transaction.commit();
        console.log('Aviso agregado correctamente');
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al agregar el aviso:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

// Función para obtener todos los avisos
export async function obtenerTodosLosAvisos(): Promise<Aviso[]> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Avisos');

        return result.recordset as Aviso[];
    } catch (error) {
        console.error('Error al obtener todos los avisos:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para buscar un aviso por su ID
export async function buscarAvisoPorId(id_Aviso: number): Promise<Aviso | null> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('id_Aviso', mssql.Int, id_Aviso)
            .query('SELECT * FROM Avisos WHERE id_Aviso = @id_Aviso');

        if (result.recordset.length > 0) {
            return result.recordset[0] as Aviso;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el aviso por ID:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para actualizar un aviso por su ID
export async function actualizarAviso(id: number, aviso: Aviso): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { titulo_Aviso, contenido_Aviso, fecha_Publicacion, nombre_Creador } = aviso; // Se ajusta para incluir nombre_Creador

    try {
        pool = await conectarBD();
        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            UPDATE Avisos
            SET titulo_Aviso = @titulo_Aviso,
                contenido_Aviso = @contenido_Aviso,
                fecha_Publicacion = @fecha_Publicacion,
                nombre_Creador = @nombre_Creador  -- Se agrega nombre_Creador
            WHERE id_Aviso = @id
        `;
        await transaction.request()
            .input('titulo_Aviso', mssql.NVarChar, titulo_Aviso)
            .input('contenido_Aviso', mssql.NVarChar, contenido_Aviso)
            .input('fecha_Publicacion', mssql.DateTime, fecha_Publicacion)
            .input('nombre_Creador', mssql.NVarChar, nombre_Creador) // Se añade nombre_Creador como input
            .input('id', mssql.Int, id)
            .query(query);
        await transaction.commit();
        console.log(`Aviso con ID ${id} actualizado correctamente`);
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al actualizar el aviso:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para eliminar un aviso por su ID
export async function eliminarAviso(id: number): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    try {
        pool = await conectarBD();
        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = 'DELETE FROM Avisos WHERE id_Aviso = @id';
        await transaction.request()
            .input('id', mssql.Int, id)
            .query(query);
        await transaction.commit();
        console.log(`Aviso con ID ${id} eliminado correctamente`);
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al eliminar el aviso:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para agregar un trámite en la base de datos
export async function agregarTramite(tramite: Tramite): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { titulo_Tramite, descripcion_Tramite, fecha_Cierre, nombre_Creador, ficha_Pago, fecha_Publicacion } = tramite;

    try {
        pool = await conectarBD();
        transaction = new mssql.Transaction(pool);
        await transaction.begin();

        const query = `
            INSERT INTO Tramites (titulo_Tramite, descripcion_Tramite, fecha_Cierre, nombre_Creador, ficha_Pago, fecha_Publicacion)
            VALUES (@titulo_Tramite, @descripcion_Tramite, @fecha_Cierre, @nombre_Creador, @ficha_Pago, @fecha_Publicacion)
        `;

        await transaction.request()
            .input('titulo_Tramite', mssql.NVarChar, titulo_Tramite)
            .input('descripcion_Tramite', mssql.NVarChar, descripcion_Tramite)
            .input('fecha_Cierre', mssql.Date, fecha_Cierre) // Usar mssql.Date para fechas
            .input('nombre_Creador', mssql.NVarChar, nombre_Creador)
            .input('ficha_Pago', mssql.VarBinary, ficha_Pago)
            .input('fecha_Publicacion', mssql.Date, fecha_Publicacion) // Usar mssql.Date para fechas
            .query(query);

        await transaction.commit();
        console.log('Trámite agregado correctamente');
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error('Error al agregar el trámite:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

// Función para obtener todos los trámites
export async function obtenerTodosLosTramites(): Promise<Tramite[]> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request().query('SELECT * FROM Tramites');

        return result.recordset as Tramite[];
    } catch (error) {
        console.error('Error al obtener todos los trámites:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para buscar un trámite por su ID
export async function buscarTramitePorId(id_Tramite: number): Promise<Tramite | null> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('id_Tramite', mssql.Int, id_Tramite)
            .query('SELECT * FROM Tramites WHERE id_Tramite = @id_Tramite');

        if (result.recordset.length > 0) {
            return result.recordset[0] as Tramite;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error al buscar el trámite por ID:', (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// Función para actualizar un trámite por su ID
export async function actualizarTramite(id: number, tramite: Tramite): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    const { titulo_Tramite, descripcion_Tramite, fecha_Cierre, nombre_Creador, ficha_Pago } = tramite;

    try {
        pool = await conectarBD();
        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            UPDATE Tramites
            SET titulo_Tramite = @titulo_Tramite,
                descripcion_Tramite = @descripcion_Tramite,
                fecha_Cierre = @fecha_Cierre,
                nombre_Creador = @nombre_Creador,
                ficha_Pago = @ficha_Pago
            WHERE id_Tramite = @id
        `;
        await transaction.request()
            .input('titulo_Tramite', mssql.NVarChar, titulo_Tramite)
            .input('descripcion_Tramite', mssql.NVarChar, descripcion_Tramite)
            .input('fecha_Cierre', mssql.Date, fecha_Cierre)
            .input('nombre_Creador', mssql.NVarChar, nombre_Creador)
            .input('ficha_Pago', mssql.NVarChar, ficha_Pago)
            .input('id', mssql.Int, id)
            .query(query);
        await transaction.commit();
        console.log(`Trámite con ID ${id} actualizado correctamente`);
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al actualizar el trámite con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

// Función para eliminar un trámite por su ID
export async function eliminarTramite(id: number): Promise<void> {
    let pool: mssql.ConnectionPool | null = null;
    let transaction: mssql.Transaction | null = null;

    try {
        pool = await conectarBD();
        transaction = new mssql.Transaction(pool);
        await transaction.begin();
        const query = `
            DELETE FROM Tramites
            WHERE id_Tramite = @id
        `;
        await transaction.request()
            .input('id', mssql.Int, id)
            .query(query);
        await transaction.commit();
        console.log(`Trámite con ID ${id} eliminado correctamente`);
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        console.error(`Error al eliminar el trámite con ID ${id}:`, (error as Error).message);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
            console.log('Conexión cerrada correctamente');
        }
    }
}

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectarBD = conectarBD;
exports.agregarTutor = agregarTutor;
exports.obtenerTodosLosTutores = obtenerTodosLosTutores;
exports.buscarTutorPorIdONombre = buscarTutorPorIdONombre;
exports.actualizarTutor = actualizarTutor;
exports.eliminarTutor = eliminarTutor;
exports.verificarUsuario = verificarUsuario;
exports.verificarExistencia = verificarExistencia;
exports.registrarUsuarioEnTablaUsuarios = registrarUsuarioEnTablaUsuarios;
exports.agregarAviso = agregarAviso;
exports.obtenerTodosLosAvisos = obtenerTodosLosAvisos;
exports.buscarAvisoPorId = buscarAvisoPorId;
exports.actualizarAviso = actualizarAviso;
exports.eliminarAviso = eliminarAviso;
exports.agregarTramite = agregarTramite;
exports.obtenerTodosLosTramites = obtenerTodosLosTramites;
exports.buscarTramitePorId = buscarTramitePorId;
exports.actualizarTramite = actualizarTramite;
exports.eliminarTramite = eliminarTramite;
const mssql = __importStar(require("mssql"));
// Configuración para la conexión a la base de datos
const dbConfig = {
    user: 'Jessie',
    password: '1234',
    server: 'FAVORITECHILD',
    database: 'MasControlDB',
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};
// // Configuración para la conexión a la base de datos
// const dbConfig: mssql.config = {
//     user: 'Jorge1',
//     password: '1234',
//     server: 'JORGEA',
//     database: 'MasControlDB',
//     options: {
//         encrypt: true,
//         trustServerCertificate: true,
//     },
// };
// Función para conectar a la base de datos
function conectarBD() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = new mssql.ConnectionPool(dbConfig);
            yield pool.connect();
            console.log('Conexión establecida correctamente');
            return pool;
        }
        catch (error) {
            console.error('Error al intentar conectar:', error.message);
            throw error;
        }
    });
}
// Función para agregar un tutor
function agregarTutor(tutor) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = tutor;
        try {
            // Conectar a la base de datos
            pool = yield conectarBD();
            // Iniciar una nueva transacción
            transaction = new mssql.Transaction(pool);
            // Iniciar la transacción
            yield transaction.begin();
            // Query para insertar el tutor
            const query = `
            INSERT INTO Tutores (nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email)
            VALUES (@nombre_Tutor, @apellido_Tutor, @direccion_Tutor, @telefono_Tutor, @email)
        `;
            // Ejecutar la consulta con parámetros
            yield transaction.request()
                .input('nombre_Tutor', mssql.NVarChar, nombre_Tutor)
                .input('apellido_Tutor', mssql.NVarChar, apellido_Tutor)
                .input('direccion_Tutor', mssql.NVarChar, direccion_Tutor)
                .input('telefono_Tutor', mssql.NVarChar, telefono_Tutor)
                .input('email', mssql.NVarChar, email)
                .query(query);
            // Commit de la transacción
            yield transaction.commit();
            console.log('Tutor agregado correctamente');
        }
        catch (error) {
            // Si hay algún error, hacer rollback de la transacción
            if (transaction) {
                yield transaction.rollback();
            }
            console.error('Error al agregar el tutor:', error.message);
            throw error;
        }
        finally {
            // Cerrar la conexión
            if (pool) {
                yield pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    });
}
// Función para obtener todos los tutores
function obtenerTodosLosTutores() {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request().query('SELECT * FROM Tutores');
            return result.recordset;
        }
        catch (error) {
            console.error('Error al obtener todos los tutores:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para buscar un tutor por su ID o nombre
function buscarTutorPorIdONombre(idOrNombre) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request()
                .input('idOrNombre', mssql.NVarChar, idOrNombre)
                .query(`
                SELECT * FROM Tutores
                WHERE id_Tutor = @idOrNombre OR nombre_Tutor LIKE @idOrNombre
            `);
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error al buscar el tutor por ID o nombre:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para actualizar un tutor por su ID
function actualizarTutor(id, tutor) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = tutor;
        try {
            // Conectar a la base de datos
            pool = yield conectarBD();
            // Iniciar una nueva transacción
            transaction = new mssql.Transaction(pool);
            // Iniciar la transacción
            yield transaction.begin();
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
            yield transaction.request()
                .input('nombre_Tutor', mssql.NVarChar, nombre_Tutor)
                .input('apellido_Tutor', mssql.NVarChar, apellido_Tutor)
                .input('direccion_Tutor', mssql.NVarChar, direccion_Tutor)
                .input('telefono_Tutor', mssql.NVarChar, telefono_Tutor)
                .input('email', mssql.NVarChar, email)
                .input('id', mssql.Int, id)
                .query(query);
            // Commit de la transacción
            yield transaction.commit();
            console.log(`Tutor con ID ${id} actualizado correctamente`);
        }
        catch (error) {
            // Si hay algún error, hacer rollback de la transacción
            if (transaction) {
                yield transaction.rollback();
            }
            console.error(`Error al actualizar el tutor con ID ${id}:`, error.message);
            throw error;
        }
        finally {
            // Cerrar la conexión
            if (pool) {
                yield pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    });
}
// Función para eliminar un tutor por su ID
function eliminarTutor(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        try {
            // Conectar a la base de datos
            pool = yield conectarBD();
            // Iniciar una nueva transacción
            transaction = new mssql.Transaction(pool);
            // Iniciar la transacción
            yield transaction.begin();
            // Query para eliminar el tutor
            const query = `
            DELETE FROM Tutores
            WHERE id_Tutor = @id
        `;
            // Ejecutar la consulta con parámetros
            yield transaction.request()
                .input('id', mssql.Int, id)
                .query(query);
            // Commit de la transacción
            yield transaction.commit();
            console.log(`Tutor con ID ${id} eliminado correctamente`);
        }
        catch (error) {
            // Si hay algún error, hacer rollback de la transacción
            if (transaction) {
                yield transaction.rollback();
            }
            console.error(`Error al eliminar el tutor con ID ${id}:`, error.message);
            throw error;
        }
        finally {
            // Cerrar la conexión
            if (pool) {
                yield pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    });
}
//Verificacion de usuario para LOGIN
function verificarUsuario(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request()
                .input('email', mssql.NVarChar, email)
                .input('password', mssql.NVarChar, password)
                .query('SELECT id_Usuario, email, role FROM Usuarios WHERE email = @email AND password = @password');
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error al verificar el usuario:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Funciones para registrar un nuevo usuario
function verificarExistencia(table, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request()
                .input('email', mssql.NVarChar, email)
                .query(`SELECT COUNT(*) AS count FROM ${table} WHERE email = @email`);
            return result.recordset[0].count > 0;
        }
        catch (error) {
            console.error(`Error al verificar existencia en ${table}:`, error);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
function registrarUsuarioEnTablaUsuarios(email, password, role) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request()
                .input('email', mssql.NVarChar, email)
                .input('password', mssql.NVarChar, password)
                .input('role', mssql.NVarChar, role)
                .query('INSERT INTO Usuarios (email, password, role) VALUES (@email, @password, @role)');
            return result.rowsAffected.length > 0;
        }
        catch (error) {
            console.error('Error al registrar usuario en tabla Usuarios:', error);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para agregar un aviso
function agregarAviso(aviso) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        const { titulo_Aviso, contenido_Aviso, fecha_Publicacion, nombre_Creador } = aviso; // Se ajusta para incluir nombre_Creador
        try {
            pool = yield conectarBD();
            transaction = new mssql.Transaction(pool);
            yield transaction.begin();
            const query = `
            INSERT INTO Avisos (titulo_Aviso, contenido_Aviso, fecha_Publicacion, nombre_Creador)
            VALUES (@titulo_Aviso, @contenido_Aviso, @fecha_Publicacion, @nombre_Creador)
        `;
            yield transaction.request()
                .input('titulo_Aviso', mssql.NVarChar, titulo_Aviso)
                .input('contenido_Aviso', mssql.NVarChar, contenido_Aviso)
                .input('fecha_Publicacion', mssql.DateTime, fecha_Publicacion)
                .input('nombre_Creador', mssql.NVarChar, nombre_Creador)
                .query(query);
            yield transaction.commit();
            console.log('Aviso agregado correctamente');
        }
        catch (error) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.error('Error al agregar el aviso:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    });
}
// Función para obtener todos los avisos
function obtenerTodosLosAvisos() {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request().query('SELECT * FROM Avisos');
            return result.recordset;
        }
        catch (error) {
            console.error('Error al obtener todos los avisos:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para buscar un aviso por su ID
function buscarAvisoPorId(id_Aviso) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request()
                .input('id_Aviso', mssql.Int, id_Aviso)
                .query('SELECT * FROM Avisos WHERE id_Aviso = @id_Aviso');
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error al buscar el aviso por ID:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para actualizar un aviso por su ID
function actualizarAviso(id, aviso) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        const { titulo_Aviso, contenido_Aviso, fecha_Publicacion, nombre_Creador } = aviso; // Se ajusta para incluir nombre_Creador
        try {
            pool = yield conectarBD();
            transaction = new mssql.Transaction(pool);
            yield transaction.begin();
            const query = `
            UPDATE Avisos
            SET titulo_Aviso = @titulo_Aviso,
                contenido_Aviso = @contenido_Aviso,
                fecha_Publicacion = @fecha_Publicacion,
                nombre_Creador = @nombre_Creador  -- Se agrega nombre_Creador
            WHERE id_Aviso = @id
        `;
            yield transaction.request()
                .input('titulo_Aviso', mssql.NVarChar, titulo_Aviso)
                .input('contenido_Aviso', mssql.NVarChar, contenido_Aviso)
                .input('fecha_Publicacion', mssql.DateTime, fecha_Publicacion)
                .input('nombre_Creador', mssql.NVarChar, nombre_Creador) // Se añade nombre_Creador como input
                .input('id', mssql.Int, id)
                .query(query);
            yield transaction.commit();
            console.log(`Aviso con ID ${id} actualizado correctamente`);
        }
        catch (error) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.error('Error al actualizar el aviso:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para eliminar un aviso por su ID
function eliminarAviso(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        try {
            pool = yield conectarBD();
            transaction = new mssql.Transaction(pool);
            yield transaction.begin();
            const query = 'DELETE FROM Avisos WHERE id_Aviso = @id';
            yield transaction.request()
                .input('id', mssql.Int, id)
                .query(query);
            yield transaction.commit();
            console.log(`Aviso con ID ${id} eliminado correctamente`);
        }
        catch (error) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.error('Error al eliminar el aviso:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para agregar un trámite en la base de datos
function agregarTramite(tramite) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        const { titulo_Tramite, descripcion_Tramite, fecha_Cierre, nombre_Creador, ficha_Pago, fecha_Publicacion } = tramite;
        try {
            pool = yield conectarBD();
            transaction = new mssql.Transaction(pool);
            yield transaction.begin();
            const query = `
            INSERT INTO Tramites (titulo_Tramite, descripcion_Tramite, fecha_Cierre, nombre_Creador, ficha_Pago, fecha_Publicacion)
            VALUES (@titulo_Tramite, @descripcion_Tramite, @fecha_Cierre, @nombre_Creador, @ficha_Pago, @fecha_Publicacion)
        `;
            yield transaction.request()
                .input('titulo_Tramite', mssql.NVarChar, titulo_Tramite)
                .input('descripcion_Tramite', mssql.NVarChar, descripcion_Tramite)
                .input('fecha_Cierre', mssql.Date, fecha_Cierre) // Usar mssql.Date para fechas
                .input('nombre_Creador', mssql.NVarChar, nombre_Creador)
                .input('ficha_Pago', mssql.VarBinary, ficha_Pago) // Usar mssql.VarBinary para el archivo
                .input('fecha_Publicacion', mssql.Date, fecha_Publicacion) // Usar mssql.Date para fechas
                .query(query);
            yield transaction.commit();
            console.log('Trámite agregado correctamente');
        }
        catch (error) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.error('Error al agregar el trámite:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    });
}
// Función para obtener todos los trámites
function obtenerTodosLosTramites() {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request().query('SELECT * FROM Tramites');
            return result.recordset;
        }
        catch (error) {
            console.error('Error al obtener todos los trámites:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para buscar un trámite por su ID
function buscarTramitePorId(id_Tramite) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield conectarBD();
            const result = yield pool.request()
                .input('id_Tramite', mssql.Int, id_Tramite)
                .query('SELECT * FROM Tramites WHERE id_Tramite = @id_Tramite');
            if (result.recordset.length > 0) {
                return result.recordset[0];
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.error('Error al buscar el trámite por ID:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}
// Función para actualizar un trámite en la base de datos
function actualizarTramite(tramite, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        const { titulo_Tramite, descripcion_Tramite, fecha_Cierre, nombre_Creador, ficha_Pago, fecha_Publicacion } = tramite;
        try {
            pool = yield conectarBD();
            transaction = new mssql.Transaction(pool);
            yield transaction.begin();
            const query = `
            UPDATE Tramites
            SET titulo_Tramite = @titulo_Tramite,
                descripcion_Tramite = @descripcion_Tramite,
                fecha_Cierre = @fecha_Cierre,
                nombre_Creador = @nombre_Creador,
                ${ficha_Pago ? 'ficha_Pago = @ficha_Pago,' : ''}
                fecha_Publicacion = @fecha_Publicacion
            WHERE id_Tramite = @id
        `;
            const request = transaction.request()
                .input('titulo_Tramite', mssql.NVarChar, titulo_Tramite)
                .input('descripcion_Tramite', mssql.NVarChar, descripcion_Tramite)
                .input('fecha_Cierre', mssql.Date, fecha_Cierre)
                .input('nombre_Creador', mssql.NVarChar, nombre_Creador)
                .input('fecha_Publicacion', mssql.Date, fecha_Publicacion)
                .input('id', mssql.Int, id);
            if (ficha_Pago) {
                request.input('ficha_Pago', mssql.VarBinary, ficha_Pago);
            }
            yield request.query(query);
            yield transaction.commit();
            console.log('Trámite actualizado correctamente');
        }
        catch (error) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.error('Error al actualizar el trámite:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
                console.log('Conexión cerrada correctamente');
            }
        }
    });
}
// Función para eliminar un trámite por su ID
function eliminarTramite(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        try {
            pool = yield conectarBD();
            transaction = new mssql.Transaction(pool);
            yield transaction.begin();
            const query = 'DELETE FROM Tramites WHERE id_Tramite = @id';
            yield transaction.request()
                .input('id', mssql.Int, id)
                .query(query);
            yield transaction.commit();
            console.log(`Trámite con ID ${id} eliminado correctamente`);
        }
        catch (error) {
            if (transaction) {
                yield transaction.rollback();
            }
            console.error('Error al eliminar el trámite:', error.message);
            throw error;
        }
        finally {
            if (pool) {
                yield pool.close();
            }
        }
    });
}

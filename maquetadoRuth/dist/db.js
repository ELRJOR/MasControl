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

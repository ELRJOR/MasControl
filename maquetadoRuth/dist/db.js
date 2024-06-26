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
// Función para agregar un tutor utilizando la interfaz Tutor
function agregarTutor(tutor) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        let transaction = null;
        const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email_Tutor } = tutor;
        try {
            // Conectar a la base de datos
            pool = yield conectarBD();
            // Iniciar una nueva transacción
            transaction = new mssql.Transaction(pool);
            // Iniciar la transacción
            yield transaction.begin();
            // Query para insertar el tutor
            const query = `
            INSERT INTO Tutores (nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email_Tutor)
            VALUES (@nombre_Tutor, @apellido_Tutor, @direccion_Tutor, @telefono_Tutor, @email_Tutor)
        `;
            // Ejecutar la consulta con parámetros
            yield transaction.request()
                .input('nombre_Tutor', mssql.NVarChar, nombre_Tutor)
                .input('apellido_Tutor', mssql.NVarChar, apellido_Tutor)
                .input('direccion_Tutor', mssql.NVarChar, direccion_Tutor)
                .input('telefono_Tutor', mssql.NVarChar, telefono_Tutor)
                .input('email_Tutor', mssql.NVarChar, email_Tutor)
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

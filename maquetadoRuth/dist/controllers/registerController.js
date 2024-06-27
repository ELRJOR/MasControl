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
exports.registrarUsuario = registrarUsuario;
const mssql = __importStar(require("mssql"));
const db_1 = require("../db");
function registrarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, confirmPassword } = req.body;
        // Verificar que las contraseñas coincidan
        if (password !== confirmPassword) {
            res.status(400).json({ message: 'Las contraseñas no coinciden' });
            return;
        }
        try {
            let role = '';
            // Verificar si el usuario existe como Tutor
            const tutorExists = yield verificarExistencia('Tutores', email);
            if (tutorExists) {
                role = 'Tutor';
            }
            else {
                // Verificar si el usuario existe como Administrador si no es Tutor
                const adminExists = yield verificarExistencia('Administradores', email);
                if (adminExists) {
                    role = 'Administrador';
                }
                else {
                    // Si no existe ni como Tutor ni como Administrador, lanzar un error
                    throw new Error('El usuario no está registrado como Tutor ni Administrador');
                }
            }
            // Insertar el usuario en la tabla Usuarios con el rol determinado
            const usuarioRegistrado = yield registrarUsuarioEnTablaUsuarios(email, password, role);
            if (usuarioRegistrado) {
                res.status(201).json({ message: 'Usuario registrado correctamente' });
            }
            else {
                res.status(500).json({ message: 'Error al registrar usuario' });
            }
        }
        catch (error) {
            console.error('Error en registrarUsuario:', error);
            res.status(500).json({ message: error.message });
        }
    });
}
function verificarExistencia(table, email) {
    return __awaiter(this, void 0, void 0, function* () {
        let pool = null;
        try {
            pool = yield (0, db_1.conectarBD)();
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
            pool = yield (0, db_1.conectarBD)();
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

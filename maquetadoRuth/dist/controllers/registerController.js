"use strict";
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
const db_1 = require("../db");
function registrarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password, 'confirm-password': confirmPassword } = req.body;
        // Validar que las contraseñas coincidan
        if (password !== confirmPassword) {
            res.status(400).json({ message: 'Las contraseñas no coinciden' });
            return;
        }
        try {
            let role = '';
            // Verificar si el usuario existe como Tutor
            const tutorExists = yield (0, db_1.verificarExistencia)('Tutores', email);
            if (tutorExists) {
                role = 'Tutor';
            }
            else {
                // Verificar si el usuario existe como Administrador si no es Tutor
                const adminExists = yield (0, db_1.verificarExistencia)('Administradores', email);
                if (adminExists) {
                    role = 'Administrador';
                }
                else {
                    // Si no existe ni como Tutor ni como Administrador, lanzar un error
                    throw new Error('El usuario no está registrado como Tutor ni Administrador');
                }
            }
            // Insertar el usuario en la tabla Usuarios con el rol determinado
            const usuarioRegistrado = yield (0, db_1.registrarUsuarioEnTablaUsuarios)(email, password, role);
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

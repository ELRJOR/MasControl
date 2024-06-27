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
exports.login = login;
const db_1 = require("../db");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const usuario = yield (0, db_1.verificarUsuario)(email, password);
            if (usuario) {
                // Determinar la URL a la que se debe redirigir según el rol del usuario
                let redirectUrl;
                if (usuario.role === 'Administrador') {
                    redirectUrl = '/administrador.html';
                }
                else if (usuario.role === 'Tutor') {
                    redirectUrl = '/tutor.html';
                }
                else {
                    redirectUrl = '/'; // Manejar caso por defecto o error
                }
                // Redirigir al cliente al URL correspondiente
                res.redirect(redirectUrl);
            }
            else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        }
        catch (error) {
            console.error('Error en loginGlobal:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    });
}

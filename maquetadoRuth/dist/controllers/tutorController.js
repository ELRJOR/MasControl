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
exports.agregarTutorController = agregarTutorController;
const db_1 = require("../db"); // Importa la función agregarTutor desde tu archivo db.ts
// Controlador para manejar la solicitud de agregar un tutor
function agregarTutorController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, lastname, address, phone, email } = req.body;
        // Crea un objeto tutor usando la interfaz Tutor
        const tutor = {
            nombre_Tutor: name,
            apellido_Tutor: lastname,
            direccion_Tutor: address,
            telefono_Tutor: phone,
            email_Tutor: email,
        };
        try {
            // Llama a la función agregarTutor con el objeto tutor
            yield (0, db_1.agregarTutor)(tutor);
            // Si la inserción fue exitosa, devuelve una respuesta exitosa
            res.status(201).json({ message: 'Tutor agregado correctamente' });
        }
        catch (error) {
            // Si hubo un error, devuelve un error 500 junto con el mensaje de error
            console.error('Error al dar de alta el tutor:', error.message);
            res.status(500).json({ error: 'Error al dar de alta el tutor' });
        }
    });
}

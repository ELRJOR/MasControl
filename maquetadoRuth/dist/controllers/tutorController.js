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
exports.obtenerTutoresController = obtenerTutoresController;
exports.buscarTutorController = buscarTutorController;
exports.actualizarTutorController = actualizarTutorController;
exports.eliminarTutorController = eliminarTutorController;
const db_1 = require("../db"); // Importa las funciones del archivo db.ts
// Controlador para agregar un tutor
function agregarTutorController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = req.body;
        // Crea un objeto tutor usando la interfaz Tutor
        const tutor = {
            nombre_Tutor,
            apellido_Tutor,
            direccion_Tutor,
            telefono_Tutor,
            email,
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
// Controlador para obtener todos los tutores
function obtenerTutoresController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tutores = yield (0, db_1.obtenerTodosLosTutores)();
            res.status(200).json(tutores);
        }
        catch (error) {
            console.error('Error al obtener todos los tutores:', error.message);
            res.status(500).json({ error: 'Error al obtener todos los tutores' });
        }
    });
}
// Controlador para buscar un tutor por su ID o nombre
function buscarTutorController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const idOrNombre = req.params.idOrNombre;
        try {
            const tutor = yield (0, db_1.buscarTutorPorIdONombre)(idOrNombre);
            if (tutor) {
                res.status(200).json(tutor);
            }
            else {
                res.status(404).json({ message: `Tutor con ID o nombre '${idOrNombre}' no encontrado` });
            }
        }
        catch (error) {
            console.error('Error al buscar el tutor por ID o nombre:', error.message);
            res.status(500).json({ error: 'Error al buscar el tutor por ID o nombre' });
        }
    });
}
// Controlador para actualizar un tutor por su ID
function actualizarTutorController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = req.body;
        // Crea un objeto tutor usando la interfaz Tutor
        const tutor = {
            nombre_Tutor,
            apellido_Tutor,
            direccion_Tutor,
            telefono_Tutor,
            email,
        };
        try {
            // Llama a la función actualizarTutor con el ID y el objeto tutor
            yield (0, db_1.actualizarTutor)(id, tutor);
            // Si la actualización fue exitosa, devuelve una respuesta exitosa
            res.status(200).json({ message: `Tutor con ID ${id} actualizado correctamente` });
        }
        catch (error) {
            // Si hubo un error, devuelve un error 500 junto con el mensaje de error
            console.error(`Error al actualizar el tutor con ID ${id}:`, error.message);
            res.status(500).json({ error: `Error al actualizar el tutor con ID ${id}` });
        }
    });
}
// Controlador para eliminar un tutor por su ID
function eliminarTutorController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = parseInt(req.params.id);
        try {
            // Llama a la función eliminarTutor con el ID del tutor
            yield (0, db_1.eliminarTutor)(id);
            // Si la eliminación fue exitosa, devuelve una respuesta exitosa
            res.status(200).json({ message: `Tutor con ID ${id} eliminado correctamente` });
        }
        catch (error) {
            // Si hubo un error, devuelve un error 500 junto con el mensaje de error
            console.error(`Error al eliminar el tutor con ID ${id}:`, error.message);
            res.status(500).json({ error: `Error al eliminar el tutor con ID ${id}` });
        }
    });
}

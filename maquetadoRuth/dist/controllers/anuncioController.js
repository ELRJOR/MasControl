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
exports.agregarAvisoController = agregarAvisoController;
exports.obtenerAvisosController = obtenerAvisosController;
exports.buscarAvisoController = buscarAvisoController;
exports.actualizarAvisoController = actualizarAvisoController;
exports.eliminarAvisoController = eliminarAvisoController;
const db_1 = require("../db");
function agregarAvisoController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const aviso = req.body;
            yield (0, db_1.agregarAviso)(aviso);
            res.status(201).send('Aviso agregado correctamente');
        }
        catch (error) {
            res.status(500).send('Error al agregar el aviso');
        }
    });
}
function obtenerAvisosController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const avisos = yield (0, db_1.obtenerTodosLosAvisos)();
            res.status(200).json(avisos);
        }
        catch (error) {
            res.status(500).send('Error al obtener los avisos');
        }
    });
}
function buscarAvisoController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const aviso = yield (0, db_1.buscarAvisoPorId)(id);
            if (aviso) {
                res.status(200).json(aviso);
            }
            else {
                res.status(404).send('Aviso no encontrado');
            }
        }
        catch (error) {
            res.status(500).send('Error al buscar el aviso');
        }
    });
}
function actualizarAvisoController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const aviso = req.body;
            yield (0, db_1.actualizarAviso)(id, aviso);
            res.status(200).send('Aviso actualizado correctamente');
        }
        catch (error) {
            res.status(500).send('Error al actualizar el aviso');
        }
    });
}
function eliminarAvisoController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, db_1.eliminarAviso)(id);
            res.status(200).send('Aviso eliminado correctamente');
        }
        catch (error) {
            res.status(500).send('Error al eliminar el aviso');
        }
    });
}

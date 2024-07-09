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
exports.agregarTramiteController = agregarTramiteController;
exports.obtenerTramitesController = obtenerTramitesController;
exports.buscarTramiteController = buscarTramiteController;
exports.actualizarTramiteController = actualizarTramiteController;
exports.eliminarTramiteController = eliminarTramiteController;
const db_1 = require("../db");
// Controlador para agregar un trámite
function agregarTramiteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { titulo, fechaPublicacion, contenido, fecha_Cierre, nombreCreador, ficha_Pago } = req.body;
            console.log('Valor de fecha_Cierre recibido:', req.body.fecha_Cierre);
            // Convertir fechas a objetos Date
            const tramite = {
                titulo_Tramite: titulo,
                descripcion_Tramite: contenido,
                fecha_Cierre: fecha_Cierre, // Mantener como string
                nombre_Creador: nombreCreador,
                ficha_Pago: ficha_Pago,
                fecha_Publicacion: fechaPublicacion // Mantener como string
            };
            yield (0, db_1.agregarTramite)(tramite);
            res.status(201).send('Trámite agregado correctamente');
        }
        catch (error) {
            console.error('Error al agregar el trámite:', error);
            res.status(500).send('Error al agregar el trámite');
        }
    });
}
function obtenerTramitesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tramites = yield (0, db_1.obtenerTodosLosTramites)();
            res.status(200).json(tramites);
        }
        catch (error) {
            res.status(500).send('Error al obtener los trámites');
        }
    });
}
function buscarTramiteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const tramite = yield (0, db_1.buscarTramitePorId)(id);
            if (tramite) {
                res.status(200).json(tramite);
            }
            else {
                res.status(404).send('Trámite no encontrado');
            }
        }
        catch (error) {
            res.status(500).send('Error al buscar el trámite');
        }
    });
}
function actualizarTramiteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const tramite = req.body;
            yield (0, db_1.actualizarTramite)(id, tramite);
            res.status(200).send('Trámite actualizado correctamente');
        }
        catch (error) {
            res.status(500).send('Error al actualizar el trámite');
        }
    });
}
function eliminarTramiteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, db_1.eliminarTramite)(id);
            res.status(200).send('Trámite eliminado correctamente');
        }
        catch (error) {
            res.status(500).send('Error al eliminar el trámite');
        }
    });
}

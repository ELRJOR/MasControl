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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadPaymentReceipt = void 0;
exports.agregarTramiteController = agregarTramiteController;
exports.obtenerTramitesController = obtenerTramitesController;
exports.buscarTramiteController = buscarTramiteController;
exports.actualizarTramiteController = actualizarTramiteController;
exports.eliminarTramiteController = eliminarTramiteController;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const db_1 = require("../db");
// Controlador para agregar un trámite
function agregarTramiteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { titulo, fechaPublicacion, contenido, fecha_Cierre, nombreCreador } = req.body;
            const ficha_Pago = req.file; // Para manejar el archivo
            console.log('Datos recibidos:', {
                titulo,
                fechaPublicacion,
                contenido,
                fecha_Cierre,
                nombreCreador,
                ficha_Pago
            });
            // Convertir fechas a objetos Date
            const tramite = {
                titulo_Tramite: titulo,
                fecha_Publicacion: fechaPublicacion, // Mantener como string
                descripcion_Tramite: contenido,
                fecha_Cierre: fecha_Cierre, // Mantener como string
                nombre_Creador: nombreCreador,
                ficha_Pago: ficha_Pago ? ficha_Pago.buffer : Buffer.alloc(0) // Usar el buffer del archivo o un buffer vacío
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
// Controlador para actualizar un trámite
function actualizarTramiteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const { titulo, fechaPublicacion, contenido, fecha_Cierre, nombreCreador } = req.body;
            const ficha_Pago = req.file; // Multer guardará el archivo aquí si existe
            // Convertir fechas a objetos Date si es necesario
            const tramite = {
                titulo_Tramite: titulo,
                fecha_Publicacion: fechaPublicacion, // Mantener como string si lo prefieres
                descripcion_Tramite: contenido,
                fecha_Cierre: fecha_Cierre, // Mantener como string si lo prefieres
                nombre_Creador: nombreCreador,
                ficha_Pago: ficha_Pago ? ficha_Pago.buffer : undefined // Usar el buffer del archivo si existe
            };
            yield (0, db_1.actualizarTramite)(tramite, id);
            res.status(200).send('Trámite actualizado correctamente');
        }
        catch (error) {
            console.error('Error al actualizar el trámite:', error);
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
const downloadPaymentReceipt = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const tramite = yield (0, db_1.buscarTramitePorId)(id);
        if (!tramite || !tramite.ficha_Pago || tramite.ficha_Pago.length === 0) {
            return res.status(404).json({ message: 'Ficha de pago no encontrada' });
        }
        const fileName = `ficha_pago_${id}.pdf`; // Nombre del archivo para descargar
        const uploadDir = path_1.default.join(__dirname, '../../output/uploads'); // Directorio de uploads
        const filePath = path_1.default.join(uploadDir, fileName); // Ruta completa del archivo
        // Verificar si el directorio de uploads existe, si no, crearlo
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        // Escribir el archivo en el sistema de archivos de manera asincrónica
        fs_1.default.writeFile(filePath, tramite.ficha_Pago, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error('Error al escribir el archivo:', err);
                return res.status(500).json({ message: 'Error al descargar la ficha de pago' });
            }
            // Configurar headers para la respuesta
            res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-type', 'application/pdf'); // Tipo de archivo: PDF en este ejemplo
            // Leer el archivo y enviarlo como respuesta
            const fileStream = fs_1.default.createReadStream(filePath);
            fileStream.pipe(res);
            // Eliminar el archivo después de enviarlo al cliente (opcional)
            fs_1.default.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                }
            });
        }));
    }
    catch (error) {
        console.error('Error al descargar la ficha de pago:', error);
        res.status(500).json({ message: 'Error al descargar la ficha de pago' });
    }
});
exports.downloadPaymentReceipt = downloadPaymentReceipt;

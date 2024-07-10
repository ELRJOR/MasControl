import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { agregarTramite, obtenerTodosLosTramites, buscarTramitePorId, actualizarTramite, eliminarTramite } from '../db';
import { Tramite } from '../models/Tramite';

// Controlador para agregar un trámite
export async function agregarTramiteController(req: Request, res: Response) {
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
        const tramite: Tramite = {
            titulo_Tramite: titulo,
            fecha_Publicacion: fechaPublicacion, // Mantener como string
            descripcion_Tramite: contenido,
            fecha_Cierre: fecha_Cierre, // Mantener como string
            nombre_Creador: nombreCreador,
            ficha_Pago: ficha_Pago ? ficha_Pago.buffer : Buffer.alloc(0) // Usar el buffer del archivo o un buffer vacío
        };

        await agregarTramite(tramite);

        res.status(201).send('Trámite agregado correctamente');
    } catch (error) {
        console.error('Error al agregar el trámite:', error);
        res.status(500).send('Error al agregar el trámite');
    }
}


export async function obtenerTramitesController(req: Request, res: Response) {
    try {
        const tramites = await obtenerTodosLosTramites();
        res.status(200).json(tramites);
    } catch (error) {
        res.status(500).send('Error al obtener los trámites');
    }
}

export async function buscarTramiteController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const tramite = await buscarTramitePorId(id);
        if (tramite) {
            res.status(200).json(tramite);
        } else {
            res.status(404).send('Trámite no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al buscar el trámite');
    }
}

export async function actualizarTramiteController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const tramite: Tramite = req.body;
        await actualizarTramite(id, tramite);
        res.status(200).send('Trámite actualizado correctamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el trámite');
    }
}

export async function eliminarTramiteController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await eliminarTramite(id);
        res.status(200).send('Trámite eliminado correctamente');
    } catch (error) {
        res.status(500).send('Error al eliminar el trámite');
    }
}


export const downloadPaymentReceipt = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const tramite = await buscarTramitePorId(id);

        if (!tramite || !tramite.ficha_Pago || tramite.ficha_Pago.length === 0) {
            return res.status(404).json({ message: 'Ficha de pago no encontrada' });
        }

        const fileName = `ficha_pago_${id}.pdf`; // Nombre del archivo para descargar
        const uploadDir = path.join(__dirname, '../../output/uploads'); // Directorio de uploads
        const filePath = path.join(uploadDir, fileName); // Ruta completa del archivo

        // Verificar si el directorio de uploads existe, si no, crearlo
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Escribir el archivo en el sistema de archivos de manera asincrónica
        fs.writeFile(filePath, tramite.ficha_Pago, async (err) => {
            if (err) {
                console.error('Error al escribir el archivo:', err);
                return res.status(500).json({ message: 'Error al descargar la ficha de pago' });
            }

            // Configurar headers para la respuesta
            res.setHeader('Content-disposition', `attachment; filename=${fileName}`);
            res.setHeader('Content-type', 'application/pdf'); // Tipo de archivo: PDF en este ejemplo

            // Leer el archivo y enviarlo como respuesta
            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);

            // Eliminar el archivo después de enviarlo al cliente (opcional)
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                }
            });
        });
    } catch (error) {
        console.error('Error al descargar la ficha de pago:', error);
        res.status(500).json({ message: 'Error al descargar la ficha de pago' });
    }
};
// controllers/tramiteController.ts
import { Request, Response } from 'express';
import { agregarTramite, obtenerTodosLosTramites, buscarTramitePorId, actualizarTramite, eliminarTramite } from '../db';
import { Tramite } from '../models/Tramite';

// Controlador para agregar un trámite
export async function agregarTramiteController(req: Request, res: Response) {
    try {
        const { titulo, fechaPublicacion, contenido, fecha_Cierre, nombreCreador, ficha_Pago } = req.body;
        console.log('Valor de fecha_Cierre recibido:', req.body.fecha_Cierre);

        // Convertir fechas a objetos Date
        const tramite: Tramite = {
            titulo_Tramite: titulo,
            fecha_Publicacion: fechaPublicacion, // Mantener como string
            descripcion_Tramite: contenido,
            fecha_Cierre: fecha_Cierre, // Mantener como string
            nombre_Creador: nombreCreador,
            ficha_Pago: ficha_Pago,
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

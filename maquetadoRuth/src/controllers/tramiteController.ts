// controllers/tramiteController.ts
import { Request, Response } from 'express';
import { agregarTramite, obtenerTodosLosTramites, buscarTramitePorId, actualizarTramite, eliminarTramite } from '../db';
import { Tramite } from '../models/Tramite';

// Controlador para agregar un trámite
export async function agregarTramiteController(req: Request, res: Response) {
    try {
        // Obtener datos del formulario
        const { titulo, fechaPublicacion, contenido, fecha_Cierre, nombreCreador, ficha_Pago } = req.body;

        // Crear objeto Tramite con los datos recibidos
        const tramite: Tramite = {
            titulo_Tramite: titulo,
            fecha_Publicacion: new Date(fechaPublicacion), // Convertir la fecha de publicación a tipo Date si es necesario
            descripcion_Tramite: contenido,
            fecha_Cierre: new Date(fecha_Cierre),
            nombre_Creador: nombreCreador,
            ficha_Pago: ficha_Pago, // Este campo puede ser un Buffer o similar dependiendo del tipo de archivo
            
        };

        // Llamar función para agregar trámite en la base de datos
        await agregarTramite(tramite);

        // Enviar respuesta de éxito al cliente
        res.status(201).send('Trámite agregado correctamente');
    } catch (error) {
        // Enviar respuesta de error al cliente en caso de fallo
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

import { Request, Response } from 'express';
import { agregarAviso, obtenerTodosLosAvisos, buscarAvisoPorId, actualizarAviso, eliminarAviso } from '../db';
import { Aviso } from '../models/Aviso';

export async function agregarAvisoController(req: Request, res: Response) {
    try {
        const aviso: Aviso = req.body;
        await agregarAviso(aviso);
        res.status(201).send('Aviso agregado correctamente');
    } catch (error) {
        res.status(500).send('Error al agregar el aviso');
    }
}

export async function obtenerAvisosController(req: Request, res: Response) {
    try {
        const avisos = await obtenerTodosLosAvisos();
        res.status(200).json(avisos);
    } catch (error) {
        res.status(500).send('Error al obtener los avisos');
    }
}

export async function buscarAvisoController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const aviso = await buscarAvisoPorId(id);
        if (aviso) {
            res.status(200).json(aviso);
        } else {
            res.status(404).send('Aviso no encontrado');
        }
    } catch (error) {
        res.status(500).send('Error al buscar el aviso');
    }
}

export async function actualizarAvisoController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        const aviso: Aviso = req.body;
        await actualizarAviso(id, aviso);
        res.status(200).send('Aviso actualizado correctamente');
    } catch (error) {
        res.status(500).send('Error al actualizar el aviso');
    }
}

export async function eliminarAvisoController(req: Request, res: Response) {
    try {
        const id = parseInt(req.params.id);
        await eliminarAviso(id);
        res.status(200).send('Aviso eliminado correctamente');
    } catch (error) {
        res.status(500).send('Error al eliminar el aviso');
    }
}

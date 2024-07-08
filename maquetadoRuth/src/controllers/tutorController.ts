import { Request, Response } from 'express';
import { agregarTutor, obtenerTodosLosTutores, buscarTutorPorIdONombre, actualizarTutor, eliminarTutor } from '../db'; // Importa las funciones del archivo db.ts
import { Tutor } from '../models/Tutor'; // Importa la interfaz Tutor

// Controlador para agregar un tutor
export async function agregarTutorController(req: Request, res: Response): Promise<void> {
    const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = req.body;

    // Crea un objeto tutor usando la interfaz Tutor
    const tutor: Tutor = {
        nombre_Tutor,
        apellido_Tutor,
        direccion_Tutor,
        telefono_Tutor,
        email,
    };

    try {
        // Llama a la función agregarTutor con el objeto tutor
        await agregarTutor(tutor);

        // Si la inserción fue exitosa, devuelve una respuesta exitosa
        res.status(201).json({ message: 'Tutor agregado correctamente' });
    } catch (error) {
        // Si hubo un error, devuelve un error 500 junto con el mensaje de error
        console.error('Error al dar de alta el tutor:', (error as Error).message);
        res.status(500).json({ error: 'Error al dar de alta el tutor' });
    }
}

// Controlador para obtener todos los tutores
export async function obtenerTutoresController(req: Request, res: Response): Promise<void> {
    try {
        const tutores: Tutor[] = await obtenerTodosLosTutores();
        res.status(200).json(tutores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los tutores' });
    }
}

// Controlador para buscar un tutor por su ID o nombre
export async function buscarTutorController(req: Request, res: Response): Promise<void> {
    const idOrNombre: string = req.params.idOrNombre;

    try {
        const tutor: Tutor | null = await buscarTutorPorIdONombre(idOrNombre);

        if (tutor) {
            res.status(200).json(tutor);
        } else {
            res.status(404).json({ message: `Tutor con ID o nombre '${idOrNombre}' no encontrado` });
        }
    } catch (error) {
        console.error('Error al buscar el tutor por ID o nombre:', (error as Error).message);
        res.status(500).json({ error: 'Error al buscar el tutor por ID o nombre' });
    }
}

// Controlador para actualizar un tutor por su ID
export async function actualizarTutorController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id_Tutor);
    const { nombre_Tutor, apellido_Tutor, direccion_Tutor, telefono_Tutor, email } = req.body;

    const tutor: Tutor = {
        nombre_Tutor,
        apellido_Tutor,
        direccion_Tutor,
        telefono_Tutor,
        email,
    };

    console.log('Datos recibidos para actualización:', tutor); // Log para verificar los datos recibidos

    try {
        await actualizarTutor(id, tutor);
        console.log(`Tutor con ID ${id} actualizado correctamente`); // Log para verificar la actualización
        res.status(200).json({ message: `Tutor con ID ${id} actualizado correctamente` });
    } catch (error) {
        console.error(`Error al actualizar el tutor con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al actualizar el tutor con ID ${id}` });
    }
}

// Controlador para eliminar un tutor por su ID
export async function eliminarTutorController(req: Request, res: Response): Promise<void> {
    const id: number = parseInt(req.params.id_Tutor); // Asegúrate de usar req.params.id_Tutor

    try {
        // Llama a la función eliminarTutor con el ID del tutor
        await eliminarTutor(id);

        // Si la eliminación fue exitosa, devuelve una respuesta exitosa
        res.status(200).json({ message: `Tutor con ID ${id} eliminado correctamente` });
    } catch (error) {
        // Si hubo un error, devuelve un error 500 junto con el mensaje de error
        console.error(`Error al eliminar el tutor con ID ${id}:`, (error as Error).message);
        res.status(500).json({ error: `Error al eliminar el tutor con ID ${id}` });
    }
}


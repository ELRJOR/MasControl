import { Request, Response } from 'express';
import { agregarTutor } from '../db'; // Importa la función agregarTutor desde tu archivo db.ts
import { Tutor } from '../models/Tutor'; // Importa la interfaz Tutor

// Controlador para manejar la solicitud de agregar un tutor
export async function agregarTutorController(req: Request, res: Response): Promise<void> {
    const { name, lastname, address, phone, email } = req.body;

    // Crea un objeto tutor usando la interfaz Tutor
    const tutor: Tutor = {
        nombre_Tutor: name,
        apellido_Tutor: lastname,
        direccion_Tutor: address,
        telefono_Tutor: phone,
        email_Tutor: email,
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

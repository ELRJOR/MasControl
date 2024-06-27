import { Request, Response } from 'express';
import { verificarTutor, verificarAdministrador } from '../db';
import { Tutor } from '../models/Tutor';
import { Administrador } from '../models/Administrador';

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
        let user: Tutor | Administrador | null = null;

        // Intentar verificar como Tutor primero
        user = await verificarTutor(email, password);

        // Si no se encuentra como Tutor, verificar como Administrador
        if (!user) {
            user = await verificarAdministrador(email, password);
        }

        if (user) {
            res.status(200).json({ message: 'Usuario autenticado', user });
        } else {
            res.status(404).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error en la autenticación:', (error as Error).message);
        res.status(500).json({ message: 'Error en la autenticación' });
    }
}

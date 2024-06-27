import { Request, Response } from 'express';
import { verificarUsuario } from '../db';
import { Usuario } from '../models/Usuario';

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
        const usuario: Usuario | null = await verificarUsuario(email, password);

        if (usuario) {
            res.status(200).json({ message: 'Login exitoso', usuario });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error en loginGlobal:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

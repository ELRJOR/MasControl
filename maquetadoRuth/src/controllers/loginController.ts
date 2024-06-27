import { Request, Response } from 'express';
import { verificarUsuario } from '../db';
import { Usuario } from '../models/Usuario';

export async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    try {
        const usuario: Usuario | null = await verificarUsuario(email, password);

        if (usuario) {
            // Determinar la URL a la que se debe redirigir según el rol del usuario
            let redirectUrl: string;
            if (usuario.role === 'Administrador') {
                redirectUrl = '/administrador.html';
            } else if (usuario.role === 'Tutor') {
                redirectUrl = '/tutor.html';
            } else {
                redirectUrl = '/'; // Manejar caso por defecto o error
            }

            // Redirigir al cliente al URL correspondiente
            res.redirect(redirectUrl);
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        console.error('Error en loginGlobal:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

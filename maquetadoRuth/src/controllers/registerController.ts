import { Request, Response } from 'express';
import { verificarExistencia, registrarUsuarioEnTablaUsuarios } from '../db';

export async function registrarUsuario(req: Request, res: Response): Promise<void> {
    const { email, password, 'confirm-password': confirmPassword } = req.body;

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        res.status(400).json({ message: 'Las contraseñas no coinciden' });
        return;
    }

    try {
        let role = '';

        // Verificar si el usuario existe como Tutor
        const tutorExists = await verificarExistencia('Tutores', email);
        if (tutorExists) {
            role = 'Tutor';
        } else {
            // Verificar si el usuario existe como Administrador si no es Tutor
            const adminExists = await verificarExistencia('Administradores', email);
            if (adminExists) {
                role = 'Administrador';
            } else {
                // Si no existe ni como Tutor ni como Administrador, lanzar un error
                throw new Error('El usuario no está registrado como Tutor ni Administrador');
            }
        }

        // Insertar el usuario en la tabla Usuarios con el rol determinado
        const usuarioRegistrado = await registrarUsuarioEnTablaUsuarios(email, password, role);

        if (usuarioRegistrado) {
            res.status(201).json({ message: 'Usuario registrado correctamente' });
        } else {
            res.status(500).json({ message: 'Error al registrar usuario' });
        }
    } catch (error) {
        console.error('Error en registrarUsuario:', error);
        res.status(500).json({ message: (error as Error).message });
    }
}



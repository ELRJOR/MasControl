import { Request, Response } from 'express';
import * as mssql from 'mssql';
import { conectarBD } from '../db';

export async function registrarUsuario(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
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

async function verificarExistencia(table: string, email: string): Promise<boolean> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('email', mssql.NVarChar, email)
            .query(`SELECT COUNT(*) AS count FROM ${table} WHERE email = @email`);

        return result.recordset[0].count > 0;
    } catch (error) {
        console.error(`Error al verificar existencia en ${table}:`, error);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

async function registrarUsuarioEnTablaUsuarios(email: string, password: string, role: string): Promise<boolean> {
    let pool: mssql.ConnectionPool | null = null;

    try {
        pool = await conectarBD();
        const result = await pool.request()
            .input('email', mssql.NVarChar, email)
            .input('password', mssql.NVarChar, password)
            .input('role', mssql.NVarChar, role)
            .query('INSERT INTO Usuarios (email, password, role) VALUES (@email, @password, @role)');
        
        return result.rowsAffected.length > 0;
    } catch (error) {
        console.error('Error al registrar usuario en tabla Usuarios:', error);
        throw error;
    } finally {
        if (pool) {
            await pool.close();
        }
    }
}

// import { Request, Response } from 'express';
// import { agregarAviso } from '../db';
// import { Aviso } from '../models/Aviso';

// export async function getAviso(req: Request, res: Response): Promise<void> {
//     try {
//         const { titulo, fechaPublicacion, contenido, nombreAdministrador } = req.body;

//         // Crear objeto aviso
//         const aviso: Aviso = {
//             titulo_Aviso: titulo,
//             contenido_Aviso: contenido,
//             fecha_Publicacion: fechaPublicacion,
//         };

//         // Llamar a la función para agregar el aviso a la base de datos
//         const resultado = await agregarAviso(aviso);

//         // Enviar respuesta exitosa
//         res.status(201).json({ message: 'Aviso creado exitosamente', aviso: resultado });
//     } catch (error) {
//         // Manejo de errores
//         console.error('Error al crear el aviso:', error);
//         res.status(500).json({ message: 'Error al crear el aviso', error: error.message });
//     }
// }

export interface Usuario {
    id_Usuario: number;
    email: string;
    password: string;
    role: 'Tutor' | 'Administrador';
}

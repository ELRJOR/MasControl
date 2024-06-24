export interface Aviso {
    id_Aviso?: number;
    titulo_Aviso: string;
    contenido_Aviso?: string;
    fecha_Publicacion: Date; // Cambiado a tipo Date para mejor representación
    id_Escuela: number;
    id_Admin: number;
}

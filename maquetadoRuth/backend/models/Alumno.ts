export interface Alumno {
    id_Alumno?: number;
    matricula_Alumno: string;
    curp_Alumno: string;
    nombre_Alumno: string;
    apellido_Alumno: string;
    direccion_Alumno: string;
    FecNac_Alumno: string; // Puedes considerar usar tipo Date si es una fecha
    id_Escuela: number;
    grado_Alumno: number;
    grupo_Alumno: string;
}

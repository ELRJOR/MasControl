CREATE TABLE Escuelas (
    id_Escuela INT PRIMARY KEY,
    cct_Escuela VARCHAR(10),
    nombre_Escuela VARCHAR(100),
    ubicacion_Escuela VARCHAR(100),
    director_Escuela VARCHAR(100), -- Nombre del director de la escuela
    telefono_Escuela VARCHAR(20), -- Número de teléfono de la escuela
    email_Escuela VARCHAR(100) -- Correo electrónico de contacto de la escuela
);


CREATE TABLE Alumnos (
    id_Alumno INT PRIMARY KEY,
    id_Escuela INT, -- Escuela a la cual pertenece el alumno.
    curp_Alumno VARCHAR(100),
    nombre_Alumno VARCHAR(100),
    apellido_Alumno VARCHAR(100),
    direccion_Alumno VARCHAR(100), -- Refiriéndose a la direccion de su hogar legal
    FecNac_Alumno VARCHAR(100), -- Fecha de nacimiento del alumno
    grado_Alumno INT,
    grupo_Alumno VARCHAR(20)
    FOREIGN KEY (id_Escuela) REFERENCES Escuelas(id_Escuela)
);


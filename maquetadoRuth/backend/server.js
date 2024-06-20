const sql = require('mssql');

// Configuración para la conexión
const config = {
    user: 'Jessie',
    password: '1234',
    server: 'FAVORITECHILD', // Puede ser 'localhost\\nombre_instancia' para una instancia local
    database: 'MasControl',
    options: {
        encrypt: true, // Si estás utilizando Azure SQL Database, debes configurar esto en 'true'
        trustServerCertificate: true // Cambia esto solo si estás utilizando un certificado de servidor autofirmado
    }
};

// Conectar a la base de datos
async function conectarBD() {
    try {
    await sql.connect(config);
    console.log('Conexión establecida correctamente');
    } catch (error) {
        console.error('Error al intentar conectar:', error.message);
    }
}

// Llamar a la función para conectar
conectarBD();

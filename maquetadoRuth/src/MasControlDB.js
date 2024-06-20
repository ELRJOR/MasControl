const sql = require('mssql');

const config = {
    user: 'Jessie',
    password: '1234',
    server: 'FAVORITECHILD',
    database: 'MasControl',
    options: {
        encrypt: true, // Para Azure
        trustServerCertificate: true // Para conexiones locales
    }
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Conectado a la base de datos SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Error de conexión a la base de datos SQL Server:', err);
        throw err;
    });

module.exports = {
    sql, poolPromise
};

"use strict";

var sql = require('mssql'); // Configuración para la conexión


var config = {
  user: 'Jessie',
  password: '1234',
  server: 'FAVORITECHILD',
  // Puede ser 'localhost\\nombre_instancia' para una instancia local
  database: 'MasControl',
  options: {
    encrypt: true,
    // Si estás utilizando Azure SQL Database, debes configurar esto en 'true'
    trustServerCertificate: true // Cambia esto solo si estás utilizando un certificado de servidor autofirmado

  }
}; // Conectar a la base de datos

function conectarBD() {
  return regeneratorRuntime.async(function conectarBD$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sql.connect(config));

        case 3:
          console.log('Conexión establecida correctamente');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Error al intentar conectar:', _context.t0.message);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
} // Llamar a la función para conectar


conectarBD();
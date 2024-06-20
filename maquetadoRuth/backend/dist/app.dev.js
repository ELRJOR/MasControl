"use strict";

var express = require('express');

var _require = require('./server.js'),
    conectarBD = _require.conectarBD;

var app = express(); // Conectar a la base de datos al iniciar la aplicación

conectarBD().then(function () {
  // Lógica adicional de la aplicación Express aquí
  app.listen(3000, function () {
    console.log('Servidor iniciado en http://localhost:3000');
  });
})["catch"](function (err) {
  console.error('Error al conectar a la base de datos:', err.message);
});
"use strict";

var express = require('express');

var app = express();

var _require = require('./db'),
    sql = _require.sql,
    poolPromise = _require.poolPromise;

app.get('/datos', function _callee(req, res) {
  var pool, result;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(poolPromise);

        case 3:
          pool = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(pool.request().query('SELECT * FROM tu_tabla'));

        case 6:
          result = _context.sent;
          res.json(result.recordset);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).send('Error al realizar la consulta: ' + _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
});
var port = 3000;
app.listen(port, function () {
  console.log("Servidor escuchando en http://localhost:".concat(port));
});
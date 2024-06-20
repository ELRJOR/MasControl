const express = require('express');
const app = express();
const { sql, poolPromise } = require('./db');

app.get('/datos', async (req, res) => {
    try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM tu_tabla');
    res.json(result.recordset);
    } catch (err) {
    res.status(500).send('Error al realizar la consulta: ' + err);
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

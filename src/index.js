const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const port = 3000;

// OK
// Habilita o CORS
app.use(cors());
// Define as rotas
routes(app);

// Inicia o servidor
app.listen(port, () => console.log(`Servidor está rodando na porta ${port}`));

module.exports = app;

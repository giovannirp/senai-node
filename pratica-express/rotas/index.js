const express = require("express");
const router = express.Router();
const path = require("path");

// Definindo o caminho base para os templates
const basePath = path.join(__dirname, '../templates');

// Rota para servir nova.html quando a requisição for um GET
router.get('/nova', (req, res) => {
  res.sendFile(`${basePath}/nova.html`);
});


// Rota contato
router.get('/contato', (req, res) => {
  res.sendFile(`${basePath}/contato.html`);
});

// rota sobre
router.get('/sobre', (req, res) => {
  res.sendFile(`${basePath}/sobre.html`);
});

// pegando usuário por parametro
router.get('/sobre/:id', (req, res) => {
  const id = req.params.id;
  // leitura da tabela users, resgatar um usuário do banco
  console.log(`Estamos buscando pelo usuário: ${id}`);

  res.sendFile(`${basePath}/detalhes-sobre.html`);
});

module.exports = router;
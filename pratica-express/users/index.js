const express = require("express");
const router = express.Router();
const path = require("path");

// Definindo o caminho base para os templates
const basePath = path.join(__dirname, 'templates');

// Rota para servir nova.html quando a requisição for um GET
router.get('/nova', (req, res) => {
  console.log("aqui")
  res.sendFile(`${basePath}/nova.html`);
});

module.exports = router;
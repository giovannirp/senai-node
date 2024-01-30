const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
  console.log(__dirname);
  console.log("index");
});

router.get('/sobre', function(req, res) {
  // Raiz __dirname
  console.log("Aqui é o dirname", __dirname)
  res.sendFile(path.join(__dirname+'/sobre.html'));
  console.log("sobre");
});

router.get('/contato', function(req, res) {
  res.sendFile(path.join(__dirname+'/contato.html'));
  console.log("sobre");
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log("server rodando");
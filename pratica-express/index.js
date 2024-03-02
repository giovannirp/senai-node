// Importando o módulo express
const express = require("express");
const router = express.Router();

// Criando uma instância do aplicativo express
const app = express();
// Definindo a porta do servidor
const port = 3000;

// Importando o módulo path para lidar com caminhos de arquivos
const path = require("path");

const usersRouter = require('./users');

// Middleware para analisar dados de formulário
app.use(express.urlencoded({
  extended: true
  })
)

// Middleware para servir arquivos estáticos a partir do diretório 'public'
app.use(express.static('public'));

// Definindo o caminho base para os templates
const basePath = path.join(__dirname, 'templates');

app.use('/', usersRouter);

// Rota principal que envia o arquivo index.html ao cliente quando acessado
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`);
});

app.use(function(req, res, next) {
  res.status(404).sendFile(`${basePath}/404.html`);
});

// Iniciando o servidor na porta especificada
app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

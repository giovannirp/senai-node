const express = require('express');
const axios = require('axios');

// Criando uma instância do aplicativo Express
const app = express();

// Rota para obter todos os usuários
app.get('/users', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(apiResponse => {
      res.json(apiResponse.data);
    })
    .catch(error => {
      res.status(500).json({ error: 'Erro ao acessar a API' });
    });
});

// Rota para obter todos os álbuns
app.get('/teste', (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/albums')
      .then(apiResponse => {
        res.json(apiResponse.data);
      })
      .catch(error => {
        res.status(500).json({ error: 'Erro ao acessar a API' });
      });
  });

// Definindo a porta
const PORT = 3000;

// Iniciando o servidor e ouvindo a porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
// format json
const http = require('http');
const axios = require('axios');

// Função de callback para lidar com as requisições
const requestHandler = (request, response) => {
  // URL da API que queremos acessar
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

  // Fazendo uma requisição HTTP GET à API usando o axios
  axios.get(apiUrl)
    .then(apiResponse => {
      // Configurando o cabeçalho da resposta
      response.writeHead(200, {'Content-Type': 'text/plain'});

      // Exibindo os dados retornados na resposta
      response.end(`Dados da API: ${JSON.stringify(apiResponse.data)}`);
    })
    .catch(error => {
      // Em caso de erro, exibe o erro na resposta
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.end(`Erro ao acessar a API: ${error.message}`);
    });
}

// Criando o servidor
const server = http.createServer(requestHandler);

// Definindo a porta
const PORT = 3000;

// Iniciando o servidor e ouvindo a porta definida
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
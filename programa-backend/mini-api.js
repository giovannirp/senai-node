// Importe a biblioteca axios
const axios = require('axios');

// URL da API que queremos acessar
const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';

// Faça uma requisição HTTP GET à API usando o axios
axios.get(apiUrl)
    .then(response => {
        // Exiba os dados retornados no console
        console.log('Dados da API:', response.data);
    })
    .catch(error => {
        // Em caso de erro, exiba o erro no console
        console.error('Erro ao acessar a API:', error);
    });
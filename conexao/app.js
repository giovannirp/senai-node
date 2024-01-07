// Incluindo dependêcia MySql
const mysql = require('mysql2');

// Criando conxão com banco de dados MySql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'celke'
});

connection.connect(function(err) {
  console.log("Conexao com o banco de dados realizado com sucesso!");
})

connection.query("SELECT id, nome, email FROM usuarios", function(err, rows, fields) {
  if (!err) {
    console.log("Resultado:", rows)
  } else {
    console.log("Erro: Consulta não realizada com sucesso!")
  }
});
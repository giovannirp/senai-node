const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");

const app = express();

// Configura o middleware para analisar solicitações com o tipo de conteúdo body
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Configura o middleware para analisar solicitações com o tipo de conteúdo 'application/json'
app.use(express.json());

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/listas", (req, res) => {
  const sql = "SELECT * FROM times";

  conn.query(sql, function (err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const fut = data;
    console.log("dados do banco", fut);
    res.render("listas", { fut });
  });
});

//Listando e buscando por ID
app.get('/listas/:id', (req, res) => {

  const id = req.params.id;

    const sql = `SELECT * FROM times WHERE id = ${id}`;

    conn.query(sql, function(err, data) {
      if (err) {
        console.log(err)
        return;
      }
  
      const listas = data[0];
  
      res.render('listas', { listas })
  
    })
});

//removendo item
app.post('/post/remove/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM listas WHERE id = ${id}`;

  conn.query(sql, function(err) {
    if (err) {
      console.log(err);
    }
  })

  res.redirect('/listas');
});

// cadastrando
app.post("/listagem/insertbook", (req, res) => {
  const nome = req.body.nome;
  const titulo = req.body.titulo;

  const sql = `INSERT INTO times (nome, titulo) values ('${nome}', '${titulo}')`;

  conn.query(sql, function (err) {
    if (err) {
      console.log("novo err", err);
      return;
    }

    res.redirect("/");
  });
});

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "futebol",
});

conn.connect(function (err) {
  if (err) {
    console.log(err);
  }

  console.log("Conectou ao MSYQL");

  app.listen(3000);
});

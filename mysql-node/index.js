const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

// Configura o middleware para analisar solicitações com o tipo de conteúdo
app.use(
  express.urlencoded({
    extended: true
  })
)

// Configura o middleware para analisar solicitações com o tipo de conteúdo 'application/json'
app.use(express.json())

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('home');
});


app.get('/books', (req, res) => {
  const sql = "SELECT * FROM books";

  conn.query(sql, function(err, data) {
    if (err) {
      console.log(err);
      return
    }

    const books = data;

    console.log("dados do banco", books);

    res.render('books', { books })

  })
});


// vai para página de edição buscando por ID
app.get('/books/edit/:id', (req, res) => {

  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, function(err, data){
    if (err) {
      console.log(err)
      return;
    }

    const book = data[0];

    res.render('editbook', { book })

  })
})

// cadastrando
app.post('/books/insertbook', (req, res) => {
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `INSERT INTO books (title, pageqty) values ('${title}', '${pageqty}')`;

  conn.query(sql, function(err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/books');
  })
})

// buscando por Id
app.get('/books/:id', (req, res) => {

  const id = req.params.id;

  const sql = `SELECT * FROM books WHERE id = ${id}`;

  conn.query(sql, function(err, data) {
    if (err) {
      console.log(err)
      return;
    }

    const book = data[0];

    res.render('book', { book })

  })

})

// Atualizando
app.post('/books/updatedbook', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const pageqty = req.body.pageqty;

  const sql = `UPDATE books SET title = '${title}', pageqty = '${pageqty}' where id = '${id}'`;

  conn.query(sql, function(err) {
    if (err) {
      console.log("novo erro", err);
      return; 
    }

    res.redirect('/books');
  });

});


// removendo item
app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM books WHERE id = ${id}`;

  conn.query(sql, function(err) {
    if (err) {
      console.log(err)
    }
  })

  res.redirect('/books');
})

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
})

conn.connect(function(err) {
  if (err) {
    console.log(err)
  }

  console.log('Conectou ao mysql!');

  app.listen(3000);
})
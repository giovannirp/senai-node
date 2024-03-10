const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// configurando partials
const hbs = exphbs.create({
  partialsDir: ['views/partials']
});

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/dashboard', (req, res) => {

  const items = ["Item", "Item b", "Item C"];

  res.render('dashboard', {items});
});

app.get('/blog', (req, res) => {
  const posts = [
    {
      title: "Aprender Node.js",
      category: "JavaScript",
      body: "Teste",
      comments: 4
    },
    {
      title: "Aprender PHP",
      category: "PHP",
      body: "Teste",
      comments: 4
    },
    {
      title: "Aprender Pyton",
      category: "Python",
      body: "Teste",
      comments: 4
    }
  ];

  res.render('blog', { posts })
})

app.get('/post', (req, res) => {
  const post = {
    title: "Aprender Node.js",
    category: "JavaScript",
    body: "Este artigo vai te ajudar a aprender Node.js....",
    comments: 4
  }

  res.render('blogpost', { post })
});

app.get('/', (req, res) => {
  // res.render('home', { layout: true })
  const user = {
    name: "Giovanni",
    surname: 'Ribeiro',
    age: 36
  }

  const palavra = "testando";

  const auth = false;
  const approved = false;

  res.render('home', { user: user, auth, approved })
});

app.listen(3000, () => {
  console.log("App funcionando");
})
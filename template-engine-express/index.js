const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/dashboard', (req, res) => {
  res.render('dashboard');
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
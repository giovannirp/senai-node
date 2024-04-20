const express = require('express')
const exphbs = require('express-handlebars')

const User = require('./models/User');

const app = express()

const conn = require('./db/conn')

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'));

app.get('/users/create', (req, res) => {
  res.render('adduser');
});

app.post('/users/create', async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newslleter = req.body.newslleter;

  if (newslleter === 'on') {
    newslleter = true;
  } else {
    newslleter = false;
  }

  console.log(req.body)

  await User.create({ name, occupation, newslleter });

  res.redirect('/');
});

app.get('/', function (req, res) {
  res.render('home')
})

conn.sync().then(() => {
  app.listen(3000);
})
.catch((err) => console.log(err))
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();
const auth = require('./middlewares/auth');
const errorHandler = require('./errors/errorhandler');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  await app.listen(PORT, () => {
    console.log(`Сервер запущен на ${PORT} порту`);
  });
}

main();

app.use(cookieParser());

app.post('/signup', express.json(), createUser);
app.post('/signin', express.json(), login);

app.use(auth);

app.use((req, res, next) => {
  req.user = {
    _id: '63076542ba56d76bd78336e3',
  };

  next();
});

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));
app.use('*', require('./routes/notCorrectPath'));

app.use(errorHandler);

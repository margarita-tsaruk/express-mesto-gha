const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

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

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const allRoutes = require('./routes/notCorrectPath');
const auth = require('./middlewares/auth');

app.post('/signup', express.json(), createUser);
app.post('/signin', express.json(), login);

app.use(auth);

app.use((req, res, next) => {
  req.user = {
    _id: '63076542ba56d76bd78336e3',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', allRoutes);

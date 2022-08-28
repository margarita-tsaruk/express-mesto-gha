const express = require('express');
const mongoose = require('mongoose');

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

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const allRoutes = require('./routes/notCorrectPath');

app.use((req, res, next) => {
  req.user = {
    _id: '63076542ba56d76bd78336e3',
  };

  next();
});

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', allRoutes);

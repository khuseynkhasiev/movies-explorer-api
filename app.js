const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const NotFoundError = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.use(routes);
app.use('*', (req, res, next) => {
  const err = new NotFoundError('Not Found');
  next(err);
});

app.use(errorHandler); // централизованный обработчик ошибок
app.listen(PORT, () => {
  console.log(`Порт - ${PORT}, сервер запущен`);
});

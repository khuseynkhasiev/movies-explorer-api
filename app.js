const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/moviesdb', {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger); // подключаем логгер запросов
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок
app.listen(PORT, () => {
  console.log(`Порт - ${PORT}, сервер запущен`);
});

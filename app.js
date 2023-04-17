require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes/index');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const { options } = require('./middlewares/handleOptions');

const { PORT = 3001, mongoDb = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

const app = express();
app.use('*', cors(options));
app.use(limiter);
mongoose.connect(mongoDb, {
  useNewUrlParser: true,
});
app.use(helmet());
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

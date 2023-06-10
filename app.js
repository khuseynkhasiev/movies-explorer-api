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
const { MONGO_DB } = require('./constans');

const { PORT = 3000, MONGO_DB_PRODUCTION, NODE_ENV } = process.env;

const app = express();
app.use('*', cors(options));
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
mongoose.connect(NODE_ENV === 'production' ? MONGO_DB_PRODUCTION : MONGO_DB, {
  useNewUrlParser: true,
});
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(routes);
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок
app.listen(PORT, () => {
  console.log(`Порт - ${PORT}, сервер запущен`);
});

const SECRET_KEY_DEV = '50bbd96cc8b55e482de9f8a23b0b1d4270a88109ea64ec7c583560eb9843b955';
const MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const ConflictErrorCode = 409;
const ForbiddenErrorCode = 403;
const InternalServerErrorCode = 500;
const NotFoundErrorCode = 404;
const UnaccurateDateErrorCode = 400;
const UnauthorizedErrorCode = 401;
const NotFoundErrorMessage = 'Отсутствует информация по указанному _id';
const UnaccurateDateErrorMessage = 'Переданы некорректные данные';
const ConflictErrorMessage = 'Пользователь с такой почтой уже существует';
const ForbiddenErrorMessage = 'Вы не можете удалить карточку другого пользователя';
const UnauthorizedErrorMessage = 'Неправильная почта или пароль';
const UnauthorizedErrorInMessage = 'Необходима авторизация';
const InternalServerErrorMessage = 'На сервере произошла ошибка';

module.exports = {
  SECRET_KEY_DEV,
  MONGO_DB,
  ConflictErrorCode,
  ForbiddenErrorCode,
  InternalServerErrorCode,
  NotFoundErrorCode,
  UnaccurateDateErrorCode,
  UnauthorizedErrorCode,
  NotFoundErrorMessage,
  UnaccurateDateErrorMessage,
  ConflictErrorMessage,
  ForbiddenErrorMessage,
  UnauthorizedErrorMessage,
  UnauthorizedErrorInMessage,
  InternalServerErrorMessage,
};

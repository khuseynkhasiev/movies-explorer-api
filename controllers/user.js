const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const UnaccurateDateError = require('../errors/unaccurateDateError');
const ConflictError = require('../errors/conflictError');
const SECRET_KEY_DEV = require('../constans');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((data) => {
      const token = jsonWebToken.sign({ _id: data._id }, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV, {
        expiresIn: '7d',
      });
      const {
        name,
      } = data;
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: false,
        })
        .send({
          email,
          name,
        });
    })
    .catch((e) => {
      next(e);
    });
};
const getUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new NotFoundError('Пользователь по указанному _id не найден');
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные');
      next(err);
      return;
    }
    next(e);
  }
};

const patchUser = async (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { email, name },
      { new: true, runValidators: true },
    );
    if (!user) {
      const err = new NotFoundError('Пользователь по указанному _id не найден');
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.code === 11000) {
      const err = new ConflictError('Пользователь с такой почтой уже существует');
      next(err);
      return;
    }
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      const err = new UnaccurateDateError('Переданы некорректные данные при обновлении профиля');
      next(err);
      return;
    }
    next(e);
  }
};

const createUser = async (req, res, next) => {
  const { email, password, name } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      if (e.code === 11000) {
        const err = new ConflictError('Пользователь с такой почтой уже существует');
        next(err);
        return;
      }
      if (e.name === 'ValidationError') {
        const err = new UnaccurateDateError('Переданы некорректные данные при создании пользователя');
        next(err);
        return;
      }
      next(e);
    });
};

module.exports = {
  createUser,
  getUser,
  login,
  patchUser,
};

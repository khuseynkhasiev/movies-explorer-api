const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const UnaccurateDateError = require('../errors/unaccurateDateError');
const ConflictError = require('../errors/conflictError');
const { SECRET_KEY_DEV } = require('../constans');
const {
  NotFoundErrorMessage,
  UnaccurateDateErrorMessage,
  ConflictErrorMessage,
} = require('../constans');

const { NODE_ENV, JWT_SECRET } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jsonWebToken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY_DEV, {
        expiresIn: '7d',
      });
      const {
        _id,
        name,
      } = user;
      res
        .status(200)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: false,
        })
        .send({
          _id,
          name,
          email,
        });
    })
    .catch((e) => {
      next(e);
    });
};

// функция которая вызывается при запросе по роуту signout
const deleteCookie = (req, res, next) => {
  try {
    res
      .status(200)
      .cookie('jwt', '', {
        maxAge: 0,
      }).send({ message: 'токен удален' });
  } catch (e) {
    next(e);
  }
};
const getUser = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      const err = new NotFoundError(NotFoundErrorMessage);
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new UnaccurateDateError(UnaccurateDateErrorMessage);
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
      const err = new NotFoundError(NotFoundErrorMessage);
      next(err);
      return;
    }
    res.status(200).send(user);
  } catch (e) {
    if (e.code === 11000) {
      const err = new ConflictError(ConflictErrorMessage);
      next(err);
      return;
    }
    if (e.name === 'ValidationError' || e.name === 'CastError') {
      const err = new UnaccurateDateError(UnaccurateDateErrorMessage);
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
      const { _id } = data;
      res.status(201).send({ email, name, _id });
    })
    .catch((e) => {
      if (e.code === 11000) {
        const err = new ConflictError(ConflictErrorMessage);
        next(err);
        return;
      }
      if (e.name === 'ValidationError') {
        const err = new UnaccurateDateError(UnaccurateDateErrorMessage);
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
  deleteCookie,
};

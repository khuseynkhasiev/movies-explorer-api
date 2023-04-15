const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unathorizedError');

const user = new mongoose.Schema({
  email: {
    require: true,
    type: String,
    unique: true,
    validate: {
      validator(v) {
        return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/gi.test(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    require: true,
    type: String,
    select: false,
  },
  name: {
    require: true,
    type: String,
    minLength: 2,
    maxLength: 30,
  },
});

user.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((data) => {
      if (!data) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, data.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return data;
        });
    });
};

module.exports = mongoose.model('user', user);
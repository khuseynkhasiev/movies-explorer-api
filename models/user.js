const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unathorizedError');
const { UnauthorizedErrorMessage, IncorrectEmail } = require('../constans');

const userSchema = new mongoose.Schema({
  email: {
    require: true,
    type: String,
    unique: true,
    validate: {
      validator(v) {
        return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/gi.test(v);
      },
      message: IncorrectEmail,
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

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);

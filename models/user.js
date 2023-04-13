const mongoose = require('mongoose');

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
  }
})

module.exports = mongoose.model('user', user);

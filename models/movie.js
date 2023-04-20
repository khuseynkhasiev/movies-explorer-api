const mongoose = require('mongoose');
const { IncorrectUrl } = require('../constans');

const movie = new mongoose.Schema({
  country: {
    require: true,
    type: String,
  },
  director: {
    require: true,
    type: String,
  },
  duration: {
    require: true,
    type: Number,
  },
  year: {
    require: true,
    type: String,
  },
  description: {
    require: true,
    type: String,
  },
  image: {
    require: true,
    type: String,
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(v);
      },
      message: IncorrectUrl,
    },
  },
  trailerLink: {
    require: true,
    type: String,
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(v);
      },
      message: IncorrectUrl,
    },
  },
  thumbnail: {
    require: true,
    type: String,
    validate: {
      validator(v) {
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/g.test(v);
      },
      message: IncorrectUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    require: true,
    type: String,
  },
  nameEN: {
    require: true,
    type: String,
  },
});

module.exports = mongoose.model('movie', movie);

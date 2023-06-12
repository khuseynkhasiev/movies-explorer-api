const Movie = require('../models/movie');
const UnaccurateDateError = require('../errors/unaccurateDateError');
const {
  UnaccurateDateErrorMessage,
} = require('../constans');

const getMovies = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const movies = await Movie.find({ owner: userId });
    res.status(200).send(movies);
  } catch (e) {
    next(e);
  }
};
const postMovie = async (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    nameRU,
    nameEN,
    thumbnail,
    trailerLink,
    id,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      nameRU,
      nameEN,
      thumbnail,
      trailerLink,
      id,
      owner: userId,
    });
    res.status(201).send(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new UnaccurateDateError(UnaccurateDateErrorMessage);
      next(err);
      return;
    }
    next(e);
  }
};
const deleteMovie = async (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.body;
  try {
    const movies = await Movie.find({ owner: userId });
    const movie = movies.find((i) => i.id === movieId);
    if (movie.id === movieId) {
      await Movie.deleteOne({ _id: movie._id });
      res.status(200).send({ message: 'Фильм удален' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      const error = new UnaccurateDateError(UnaccurateDateErrorMessage);
      next(error);
      return;
    }
    next(e);
  }
};
module.exports = { postMovie, deleteMovie, getMovies };

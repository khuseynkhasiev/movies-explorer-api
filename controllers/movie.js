const Movie = require('../models/movie');
const UnaccurateDateError = require('../errors/unaccurateDateError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink: trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: userId,
    });
    res.status(201).send(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new UnaccurateDateError('Переданы некорректные данные при создании');
      next(err);
      return;
    }
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  const userId = req.user._id;
  const { _id } = req.params;
  try {
    const movie = await Movie.findById(_id);
    const owner = movie.owner.toString();
    if (!movie) {
      const err = new NotFoundError('Фильм с указанным _id не найден');
      next(err);
      return;
    } if (!(userId === owner)) {
      const err = new ForbiddenError('Вы не можете удалить карточку другого пользователя');
      next(err);
      return;
    }
    await Movie.deleteOne(movie);
    res.status(200).send({ message: 'Фильм удален' });
  } catch (e) {
    if (e.name === 'CastError') {
      const error = new UnaccurateDateError('Переданы некорректные данные');
      next(error);
      return;
    }
    next(e);
  }
};
module.exports = { postMovie, deleteMovie, getMovies };

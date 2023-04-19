const router = require('express').Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movie');
const { validatePostMovie, validateDeleteMovie } = require('../middlewares/validationCelebrate');

router.get('/', getMovies);
router.post('/', validatePostMovie(), postMovie);
router.delete('/:_id', validateDeleteMovie(), deleteMovie);
module.exports = router;

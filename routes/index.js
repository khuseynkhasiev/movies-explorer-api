const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movie');
const { createUser, login } = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.use('/user', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.post('/signup', createUser);
router.post('/signin', login);
router.use('*', (req, res, next) => {
  const err = new NotFoundError('Not Found');
  next(err);
});

module.exports = router;

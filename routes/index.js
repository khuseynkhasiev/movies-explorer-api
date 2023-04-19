const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movie');
const { createUser, login, deleteCookie } = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');
const { validateCreateUser, validateLogin } = require('../middlewares/validationCelebrate');

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.post('/signup', validateCreateUser(), createUser);
router.post('/signin', validateLogin(), login);
router.post('/signout', deleteCookie);
router.use('*', auth, (req, res, next) => {
  const err = new NotFoundError('Not Found');
  next(err);
});
module.exports = router;

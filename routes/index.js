const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const userRouter = require('./user');
const moviesRouter = require('./movie');
const { createUser, login } = require('../controllers/user');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/notFoundError');

router.use('/user', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
router.use('*', (req, res, next) => {
  const err = new NotFoundError('Not Found');
  next(err);
});

module.exports = router;

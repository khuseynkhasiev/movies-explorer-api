const router = require('express').Router();
const userRouter = require('./user');
const moviesRouter = require('./movie');
const { createUser } = require('../controllers/user');

router.use('/user', userRouter);
router.use('/movies', moviesRouter);
router.post('/signup', createUser);

module.exports = router;

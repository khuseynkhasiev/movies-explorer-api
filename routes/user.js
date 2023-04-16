const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const { getUser, patchUser } = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
}), patchUser);

module.exports = router;

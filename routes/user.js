const router = require('express').Router();
const { getUser, patchUser } = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', patchUser);

module.exports = router;

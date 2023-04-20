const router = require('express').Router();
const { validatePatchUser } = require('../middlewares/validationCelebrate');
const { getUser, patchUser } = require('../controllers/user');

router.get('/me', getUser);
router.patch('/me', validatePatchUser(), patchUser);
module.exports = router;

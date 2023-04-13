const router = require('express').Router();
const { getUser } = require('../controllers/user');

router.get('/', getUser);
router.patch('/', getUser);
router.delete('/:_id', getUser);

module.exports = router;

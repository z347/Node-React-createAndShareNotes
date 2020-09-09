const router = require('express').Router();
const { validateToken } = require('../utils/jwt');
const { getUsers, shareWithUser } = require('../controllers/share');

router.post('/users', validateToken, getUsers);
router.patch('/notes', validateToken, shareWithUser);

module.exports = router;

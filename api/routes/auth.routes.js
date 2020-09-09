const router = require('express').Router();
const { register, login } = require('../controllers/auth');
const { registerValidator, authValidator } = require('../middleware/authFormValidators');

router.post('/register', registerValidator, register);
router.post('/login', authValidator, login);

module.exports = router;

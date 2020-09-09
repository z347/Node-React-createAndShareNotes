const { check } = require('express-validator');
const User = require('../models/User');

module.exports.registerValidator = [
    check('email')
        .isEmail()
        .withMessage('Please enter the correct email.')
        .custom(async value => {
            try {
                const candidate = await User.findOne({ email: value });
                if (candidate) {
                    return Promise.reject('A user with this email is already registered.');
                }
            } catch (e) {
                console.error(e.message);
            }
        }),

    check('password', 'Password must be at least 6 characters long.').isLength({ min: 6 }).trim(),

    check('confirm').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match. Please try again.');
        }
        return true;
    }),
];

module.exports.authValidator = [
    check('email')
        .isEmail()
        .withMessage('Please enter the correct email.')
        .custom(async value => {
            try {
                const candidate = await User.findOne({ email: value });
                if (!candidate) {
                    return Promise.reject('A user with this email is not registered.');
                }
            } catch (e) {
                console.error(e.message);
            }
        }),

    check('password', 'Write the password.').exists(),
];

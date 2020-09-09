const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const key = require('../keys/index');

module.exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Incorrect data during registration.',
            });
        }

        const { email, password } = req.body;
        const encryptPassword = await bcrypt.hash(password, 12);
        const user = new User({
            email,
            password: encryptPassword,
        });
        await user.save();
        res.status(201).json({ message: 'Registration was successful.' });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

module.exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Incorrect email.',
            });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        const token = await generateToken(user.id);
        const expires = key.JWT.expiresIn;

        res.json({ token, expires, userId: user.id });
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
};

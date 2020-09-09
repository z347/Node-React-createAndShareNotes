const jwt = require('jsonwebtoken');
const key = require('../keys/index');

module.exports.generateToken = userId => {
    return jwt.sign({ userId }, key.JWT.secret, { expiresIn: key.JWT.expiresIn });
};

module.exports.decryptionToken = token => {
    return jwt.verify(token, key.JWT.secret);
};

module.exports.validateToken = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token not found.' });
        const decoded = await jwt.verify(token, key.JWT.secret);
        if (!decoded) return res.status(401).json({ message: 'Invalid token.' });
        console.log('JWT validateToken - success.');
        next();
    } catch (e) {
        res.status(500).json({ message: 'Something went wrong: validateToken.' });
    }
};

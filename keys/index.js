process.env.NODE_ENV === 'production'
    // ? (module.exports = require('./key.production'))
    ? (module.exports = require('./key.development'))
    : (module.exports = require('./key.development'));

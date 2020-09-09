module.exports = Object.freeze({
    SERVER: {
        port: process.env.PORT,
    },
    DATABASE: {
        url: process.env.URL,
    },
    JWT: {
        secret: process.env.SECRET,
        expiresIn: process.env.EXPIRESIN,
    },
});

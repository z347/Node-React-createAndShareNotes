// module.exports = Object.freeze({
//     SERVER: {
//         port: process.env.PORT,
//     },
//     DATABASE: {
//         url: process.env.URL,
//     },
//     JWT: {
//         secret: process.env.SECRET,
//         expiresIn: process.env.EXPIRESIN,
//     },
// });

module.exports = Object.freeze({
    SERVER: {
        port: 5000,
    },
    DATABASE: {
        url: 'mongodb+srv://pro100admin:abadababa123QWEQWE333@cluster-u11c4.mongodb.net/pet',
    },
    JWT: {
        secret: 'super secret word',
        expiresIn: 3600,
    },
});

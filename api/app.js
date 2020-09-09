const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json()) // It parses incoming requests with JSON payloads.
    .use(compression()) // Node.js compression middleware.
    .use(helmet()) // Helps you secure your Express apps by setting various HTTP headers.
    .use(cors()); // That can be used to enable CORS with various options.

app.use('/api/auth', require('./routes/auth.routes'))
    .use('/api/notes', require('./routes/notes.routes'))
    .use('/api/share', require('./routes/share.routes'));

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
} else {
    app.use(require('morgan')('dev'));
}

module.exports = app;

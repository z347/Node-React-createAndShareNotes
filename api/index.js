const mongoose = require('mongoose');
const colors = require('colors/safe'); // dev module
const app = require('./app');
const key = require('./keys/index');

const server = app.listen(key.SERVER.port, async () => {
    try {
        await mongoose
            .connect(key.DATABASE.url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false,
            })
            .then(() => console.info('MongoDB is connected ...'))
            .then(() => console.info(`Server use port: ${key.SERVER.port} ...`));
    } catch (e) {
        console.error(e.message);
        process.exit(1);
    }
});

const io = require('socket.io').listen(server); // this tells socket.io to use our express server

io.on('connection', socket => {
    console.info(colors.bgGreen.black(`user connected: ${socket.id}`));

    socket.on('share notes with user', async () => {
        // FIXME: треба відправляти повідомлення тільки конкретному користовачеві
        socket.broadcast.emit('share success');
    });

    socket.on('disconnect', () => console.info(colors.bgRed.black(`user disconnected: ${socket.id}`)));
});

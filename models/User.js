const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registered: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: 'user',
        required: true,
    },
});

module.exports = mongoose.model('User', userSchema);

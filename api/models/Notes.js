const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    owner: [
        {
            ref: 'users',
            type: mongoose.Schema.Types.ObjectId,
        },
    ],
    notes: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Notes', notesSchema);

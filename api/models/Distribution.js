const mongoose = require('mongoose');

const distributionSchema = new mongoose.Schema({
    notes: {
        ref: 'notes',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    generous: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    needy: {
        ref: 'users',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('Distribution', distributionSchema);

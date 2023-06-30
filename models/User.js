const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    exercise: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
        default: [],
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
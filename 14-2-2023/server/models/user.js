const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    unique_id: Number,
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    /* passwordConf: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }, */
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;
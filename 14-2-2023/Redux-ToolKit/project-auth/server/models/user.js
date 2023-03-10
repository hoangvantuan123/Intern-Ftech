const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        minLength: 3,
        maxLength: 30
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1024
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    /* passwordConf: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    }, */

});




const User = mongoose.model("User", UserSchema);
exports.User = User;

/* 
const userPost = new User({
    name: 'Hoang',
    email: 'tuantuanhoang@gmail.com',
    password: '1234566778',
});
userPost.save();
console.log(userPost); */



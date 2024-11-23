const { required } = require('joi')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    firstname: {
        type: String,
        required: true,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        reqiured: true,
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]

    // date: {
    //     type: Date,
    //     default: Date.now,
    // },
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
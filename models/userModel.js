const { required } = require('joi')
const mongoose = require('mongoose');
const Post = require('./postModel');

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
    // confirmPassword: {
    //     type: String,
    //     reqiured: true,
    // },
    posts: [
        Post.schema // Embedding a document (Denormalization) - FOR QUERY PERFORMANCE
    ]
    // posts: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId, //Refrencing a document (Normalization) - FOR CONSISTENCY
    //         ref: 'Post',
    //     }
    // ]

    // date: {
    //     type: Date,
    //     default: Date.now,
    // },
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;
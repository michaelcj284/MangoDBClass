const { required } = require('joi')
const mongoose = require('mongoose');
const Post = require('./postModel');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    ],
    isAdmin: Boolean
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

//To Generate a Tocken
userSchema.methods.generateToken = function () {
    const token = jwt.sign({id: this._id, admin: this.isAdmin}, process.env.JWT_SECRET);
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
// modeal is a blueprint of the database table structure of schema
// that defines the shape of the table and the type of data that can be stored in teh table.


const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        reuired: true,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    author: {
        type: String,
        reuired: true,
    },
    tags: [{
        type: String,
        validate: {
            validator: function (tags) {
                return tags && tags.length > 0;
            },
            message: "A post must have at least one tag"
        }
    }],
    comments: [{
        user: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }],
    images: [{
        type: Number,
        default: 0,
    }]
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
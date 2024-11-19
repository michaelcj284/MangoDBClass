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
    date: {
        type: Date,
        default: Date.now,
    },
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
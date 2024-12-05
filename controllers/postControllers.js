// Import the Post model
const Post = require("../models/postModel");

// Create a new post
const createPost = async(req, res) => {
    const {title, content, author, tags} = req.body;

    const newPost = new Post({
        title,
        content,
        author,
        tags
    });

    const result = await newPost.save();

    res.status(201).json({
        message: "Post create successfully",
        data: {
            post: result,
        },
    });
}
// Get all posts
// Get a single post
// Update a post
// Delete a post
const deletePost = async (req, res) => {
    const {id} = req.params;
    const result = await Post.findByIdAndDelete(id);
    res.status(200).json({
        message: "Post deleted successfully",
        data: {
            post: result,
        },
    });
}
// Get all posts by a specific user
// Get all posts by a specific tag
// Add a comment to a post
// Delete a comment from a post
// Add a tag to a post
// Delete a tag from a post
// Like a post (increament the likes count)


module.exports = {
    createPost,
    deletePost,
}
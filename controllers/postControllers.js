// Import the Post model
const Post = require("../models/postModel");
const cloudinary = require("../config/cloudinary");

// Create a new post
const createPost = async(req, res) => {
    try {
        const {title, content, author, tags} = req.body;
        const files = req.files;

        if (!files || files.length === 0) {
            res.status(400).json({
                message: "No file added",
            });
        }

        const uploadPromises = req.files.map((file) => 
            cloudinary.uploader.upload(file.path, {
                folder: "posts-folder",
            })
        );

        const uploadResponse = await Promise.all(uploadPromises);

        const images = uploadResponse.map((res) => res.secure_url);

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
    } catch (ex) {
        console.error(ex);
        res.status(400).json({
            message: ex.message,
        });
        
    }
};
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
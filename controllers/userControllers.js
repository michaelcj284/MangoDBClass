const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");

const test = (req, res) => {
    res.send('Hello World');
}

const createUser = async (req, res) => {
    const {username, firstname, lastname, email, password, confirmPassword} = req.body;

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
        username,
        firstname,
        lastname,
        email,
        password: hashPassword      
    })

    // const newPost = new Post({
    //     title: "First Post",
    //     content: "THis is the content for the first post",
    // });

    // newUser.posts.push(newPost)
    
    // await newPost.save();

    const result = await newUser.save()
    res.status(201).json({
        message: "User created successfully",
        data: {
            user: result
        }
    })
}

const getAllUsers = async (req, res) => {
    const result = await User.find()
    res.status(200).send({
        message: "All Users", 
        data: result,
    })
}


module.exports = {
    test,
    createUser,
    getAllUsers
}
const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

// Auth Flow --
// Register a new user
// Login a user
// Verify a user email
// Forget password
// Reset password



// User Flow ----
// Get all users
// Get a single user
// Update a user
// Delete a user
// Get all posts by a user



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

const loginUser = async (req, res) => {
    //get user email and password
    const {email, password} = req.body;
    //check if user exists in the database
    const user = await User.findOne({email});
    //if user does not exsit, sent error message
    if (!user) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }
    //compare password
    const validPassword = await bcrypt.compare(password, user.password);
    //if password is invalid, send error message
    if (!validPassword) {
        return res.status(400).json({
            message: "Invalid password"
        })
    }

    //generate token
    const token = user.generateToken();



    //send login message to user
    // res.status(200).send({
    //     message: "User logged in successfully",
    //     accessToken: token
    // })
    res.header("x-auth-token", token).send({
        message: "User logged in successfully",
        token,
    })

}

module.exports = {
    test,
    createUser,
    getAllUsers,
    loginUser
}
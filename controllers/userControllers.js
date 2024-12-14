const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer");

// Auth Flow --
// Register a new user
// Login a user

// Verify a user email
const verifyEmail = async (req, res) => {
    const { email } = req.body;

    //check if user exist in the database
    const user =  await User.findOne({ email });

    //if user does not exist, send error message
    if (!user) {
        return res.status(400).json({
            message: "User does not exist",
        });
    }

    //generate token
    //const token = user.generateToken();

    //send email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:
        {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD, 
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Email Verification",
        text: `Click on the link to verify your email: http://127.0.0.1:5500/frontend/verify.html`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({
                message: "Email send successfully",
                data: {
                    info,
                },
            });
        }
    })
}
// Forget password
const forgotPassword = async (req, res) => {
    const { email } = req.body;

    //check if user exist in the database
    const user =  await User.findOne({ email });

    //if user does not exist, send error message
    if (!user) {
        return res.status(400).json({
            message: "User does not exist",
        });
    }

    //generate token
    //const token = user.generateToken();

    //send email
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:
        {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD, 
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Reset Password",
        text: `Click on the link to Reset Password: http://127.0.0.1:5500/frontend/reset-password.html`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({
                message: "Reset Password Link sent successfully",
                data: {
                    info,
                },
            });
        }
    })
}
// Reset password
const resetPassword = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "User does not exsit",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //const result = await User.findOneAndUpdate({email}, {password: hashedPassword});

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({
        message: "Password reset successfully",
    });

}


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

const uploadImage = async (req, res) => {
    if (!req.file) {
        res.status(400).send("No file added")
    }

    const uploadRes = await cloudinary.uploader.upload(req.file.path)

    res.status(201).json({
        message: "Image uploaded successfully",
        imageUrl: uploadRes
    });
}

module.exports = {
    test,
    createUser,
    getAllUsers,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
    uploadImage
};
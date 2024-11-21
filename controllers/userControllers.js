const User = require("../models/userModel");

const test = (req, res) => {
    res.send('Hello World');
}

const createUser = async (req, res) => {
    const {username, firstname, lastname, email, password, confirmPassword} = req.body;
    const newUser = new User({
        username,
        firstname,
        lastname,
        email,
        password,
        confirmPassword
    })
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
const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/postModel");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();


// const { title } = require("process");

// bcrypt.genSalt(10).then((salt) => {
//     console.log("Salt" , salt);
//     bcrypt.hash("123456789", salt).then((hashed) => {
//         console.log("hashedPassword", hashed);
//     })
// })

bcrypt.genSalt(10).then((salt) =>{
    bcrypt.hash("123456789", salt).then((hashed) => {
        hashPassword = hashed
        console.log(hashPassword)
        bcrypt.compare("12werinsifni9", hashed).then((res) => {
            console.log(res)
        })
    })
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });

//This is how to create a new post
// const createPost = async () => {
//     const newPost = new Post({
//         title: "Second Post",
//         content: "This is the second post",
//     });
//     await newPost.save()

//     // To see this in your console
//     // const result = await newPost.save()

//     // console.log(result)
// }

// createPost()

// // This is how to get all post
// const getPosts = async () => {
//     const posts = await Post.find()
//     console.log(posts)
// }

// getPosts()


// //This is how to get a single post by ID
// const getPost = async (id) => {
//     const post = await Post.findById(id)
//     console.log(post)
// }

// getPost('6738752485c756aad2bef5d7');


//This is how to find a post by title
// const getPostByTitle = async (title) => {
//     const post = await Post.find({title: title})
//     console.log(post)
// }

// getPostByTitle("Second Post");

// This is how to find a post without case sensitivity
// const getPostByTitle = async (title) => {
//     const post = await Post.find(
//         {title: { $regex: title, $options: "i"}}
//     )
//     console.log(post)
// }

// getPostByTitle("se");


//This is how to find a post title and content [without case sensitive]
// const getPostByTitleAndContent = async (keyword) => {
//     const post = await Post.find({
//         $or: [
//             { title: { $regex: keyword, $options: "i" } },
//             { content: { $regex: keyword, $options: "i" } },
//         ],
//     });
//     console.log(post)
// }

// getPostByTitleAndContent("t");

//This is how to update a post by ID
// const updatePost = async (id) => {
//     const post = await Post.findByIdAndUpdate(id, {
//         title: "My First Post",
//         content: "This is my first post",
//     }, {new: true})
//     console.log(post)
// }

// updatePost('673875ce33b75f520ebf93c4')


// This is how to delete a post
// const deletePostById = async (id) => {
//     const deletedPost = await Post.findByIdAndDelete(id)
//     console.log(deletedPost)
// }

// deletePostById("673875ce33b75f520ebf93c4")


// This is how to delete all post
// const deleteAllPost = async () => {
//     const post = await Post.deleteMany({})
//     console.log(post);

// }

// deleteAllPost()



// Class Work

//This is a pure function
// const createPost = async (title, content) => {
//     const newPost = new Post({
//         title: title, 
//         content: content,
//     });
//     await newPost.save()

//     // To see this in your console
//     const result = await newPost.save()

//     console.log(result)
// }

// createPost("Fifth Post", "This is Content for Fifth Post")


// This is how to get limited posts
// const getLimitedPosts = async(limit) => {
//     const posts = await Post.find({}).limit(limit)
//     console.log(posts)
// }

// getLimitedPosts(3)


// User Model Starts Here

// const createUser = async (username, firstname, lastname, email, password, confirmPassword) => {
//     const newUser = new User({
//         username,
//         firstname,
//         lastname,
//         email,
//         password,
//         confirmPassword,
//     });
//     const result = await newUser.save()
//     console.log(result)
// }

// createUser("samuk","Samuel","Apkan","samuelapkan@gmail.com","qweasd","qweasd")


// This is how to update a user

// const updateUser = async (id, firstname, lastname) => {
//     const user = await User.findByIdAndUpdate(id, {
//         firstname,
//         lastname,
//     }, {new: true})
//     console.log(user)
// }

// updateUser('673c72a1307b13505a23dc50',"Uju","Makinde")


// This is how to delete a user

// const deleteUserById = async (id) => {
//     const deleteUser = await User.findByIdAndDelete(id)
//     console.log(deleteUser)
// }

// deleteUserById('673c72a1307b13505a23dc50')


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", postRoutes);
const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// Referncing a document (Normalization) - FOR CONSISTENCY
// const Posts = {
//     _id: "1",
//     title: "Post 1",
// }

// const User = {
//     _id: "1",
//     username: "user1",
//     posts: [Posts._id],
// }


//Embedding a document (Denormalization) - FOR QUERY PERFORMANCE
const User = {
    _id: "1",
    username: "user1",
    posts: [
        {
            _id: "1",
            title: "Post 1",
        },
        {
            _id: "2",
            title: "Post 2",
        },
    ],
};
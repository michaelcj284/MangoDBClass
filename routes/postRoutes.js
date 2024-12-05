const express = require('express');
const { createPost, deletePost } = require('../controllers/postControllers');
const auth = require("../middelwares/auth");
const admin = require("../middelwares/admin");

const router = express.Router();

router.post("/createPost", auth, createPost);
router.delete("/:id", [auth, admin], deletePost);


module.exports = router
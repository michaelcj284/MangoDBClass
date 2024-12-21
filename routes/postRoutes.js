const express = require('express');
const { createPost, deletePost } = require('../controllers/postControllers');
const auth = require("../middelwares/auth");
const admin = require("../middelwares/admin");
const upload = require('../middelwares/multer')
const {clearMultipleFiles} = require('../middelwares/clearUpload')

const router = express.Router();

router.post("/createPost", upload.array("images", 5), auth, clearMultipleFiles, createPost);
router.delete("/:id", [auth, admin], deletePost);


module.exports = router
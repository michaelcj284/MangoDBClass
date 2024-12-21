const express = require('express');
const { test, createUser, getAllUsers, loginUser, verifyEmail, uploadImage } = require('../controllers/userControllers');
const upload = require("../middelwares/multer");
const { clearSingleFiles } = require('../middelwares/clearUpload');



const router = express.Router();

router.get("/", test);
router.post("/register", createUser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.post("/verifyemail", verifyEmail);


router.post("/upload-image", upload.single("files"), clearSingleFiles, uploadImage); // to upload a single file or image

//router.post("/upload-image", upload.array("files"), uploadImage); //to upload multiple files or images

module.exports = router;
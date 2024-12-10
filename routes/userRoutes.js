const express = require('express');
const { test, createUser, getAllUsers, loginUser, verifyEmail } = require('../controllers/userControllers');

const router = express.Router();

router.get("/", test);
router.post("/register", createUser);
router.get("/users", getAllUsers);
router.post("/login", loginUser);
router.post("/verifyemail", verifyEmail);


module.exports = router;
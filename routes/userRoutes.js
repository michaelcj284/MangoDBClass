const express = require('express');
const { test, createUser, getAllUsers } = require('../controllers/userControllers');

const router = express.Router();

router.get("/", test);
router.post("/register", createUser);
router.get("/users", getAllUsers);


module.exports = router;
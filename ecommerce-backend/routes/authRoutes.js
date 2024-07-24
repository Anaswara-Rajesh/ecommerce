const express = require("express");
const { protect } = require ("../middlewares/authMiddleware");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

module.exports = router;

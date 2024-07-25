const express = require("express");
const { protect } = require ("../middlewares/authMiddleware");
const { registerUser, loginUser, getUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/user", protect, getUser);

module.exports = router;

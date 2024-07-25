const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      username,
      email,
      password,
    });

    const token = generateToken(user);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "mmmm");
  try {
    const user = await User.findOne({ email });
    console.log(user, "nnnnnnnnnnnnnnnnnnnnnn");
    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user);
      console.log(token, "token>>>>>>>>>>>.....");
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.email === "admin@gmail.com",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

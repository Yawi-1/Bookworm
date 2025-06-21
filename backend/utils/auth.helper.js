const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/auth.helper');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Sign Up
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }
  try {
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({ username, email, password: hashedPassword });
    const user = await newUser.save();
    
    // Remove password field from response
    user.password = undefined;

    const token = generateToken(user._id);
    res.status(201).json({ message: "Signup successful", token, user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error', error: error.message });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    user.password = undefined; // Do not expose hashed password
    const token = generateToken(user._id);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: 'Internal server Error', error: error.message });
  }
};

module.exports = { signup, login };
2 
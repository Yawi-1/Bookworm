const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../utils/auth.helper')

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })

const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please enter all fileds' })
    }
    try {
        const isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(400).json({ message: "Email already exists." })
        }
        const hashedPassword = await hashPassword(password);

        const newUser = new User({ username, email, password: hashedPassword });
        const user = await newUser.save().select('-password');
        const token = generateToken(user._id);
        res.status(201).json({ message: "Sign up sucessfully", token, user })
    } catch (error) {
        res.status(500).json({ message: 'Internal server Error', error: error.message })
    }
}

const login = async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message:'Please enter all fields'}); 
    }
    try {
    
    } catch (error) {

    }
}

module.exports = { signup, login }
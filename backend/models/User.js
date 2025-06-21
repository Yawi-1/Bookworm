const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },
    verifiedEmail: {
        type: Boolean,
        default: false
    },
    otp: Number,
    otpExpires: Date
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Enforce password length
    },
}, { timestamps: true });

module.exports = mongoose.model('UserModel', userSchema);

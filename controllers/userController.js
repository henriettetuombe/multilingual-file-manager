const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || "YOUR_JWT_SECRET"; // Use environment variables for secrets

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        // Validate request
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({fullName});
        if (existingUser) {
            return res.status(400).json({ message: `${duplicateField} already exists` });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({ fullName, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', user: user, status: true});
    } catch (error) {
        console.error(error);
        
        res.status(500).json({ message: 'Server error', error: error.message, status: false });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, );

        res.status(200).json({ message: 'Login successful', token, user:user, status:true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message, status:false });
    }
};

module.exports = { registerUser, loginUser };

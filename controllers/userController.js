const { User } = require('../models');
const jwt = require('jsonwebtoken');

module.exports = {
    // Register a new user
    register: async (req, res) => {
        console.log('Request Body:', req.body); // Debugging request body

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            const user = await User.create({ email, password });
            res.status(201).json({ message: 'User created successfully', user });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // Login a user
    login: async (req, res) => {
        console.log('Request Body:', req.body); // Debugging request body

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            const isMatch = await user.validPassword(password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid password.' });
            }

            const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
            res.json({ message: 'Login successful', token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};

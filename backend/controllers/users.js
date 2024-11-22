import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../database.js';

export const getUsers = async (req, res) => {
    try {
        const [users] = await db.query('SELECT id, username, email, created_at FROM users');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const [user] = await db.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.params.id]);
        if (user.length === 0) return res.status(404).json({ error: 'User not found' });
        res.json(user[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [
            username,
            email,
            hashedPassword,
        ]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register user' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) return res.status(404).json({ error: 'Invalid email or password' });

        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) return res.status(401).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Failed to log in' });
    }
};

export const updateUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?', [
            username,
            email,
            hashedPassword,
            req.params.id,
        ]);
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

import express from 'express';
import { body } from 'express-validator';
import {
    getUsers,
    getUserById,
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
} from '../controllers/users.js';

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post(
    '/register',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
        body('username').notEmpty().withMessage('Username is required'),
    ],
    registerUser
);
userRoutes.post(
    '/login',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    loginUser
);
userRoutes.put('/:id', updateUser);
userRoutes.delete('/:id', deleteUser);

export default userRoutes;

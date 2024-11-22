import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js';
import db from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Database Connection
db.getConnection()
    .then(() => {
        console.log('Connected to the MySQL database');
    })
    .catch((err) => {
        console.error('Database connection error:', err.message);
    });

// Routes
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

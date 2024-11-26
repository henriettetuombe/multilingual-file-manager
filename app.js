const express = require('express');
const routes = require('./routes/routes');
const { sequelize } = require('./models');

const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Debugging Middleware for Content-Type (optional)
app.use((req, res, next) => {
    console.log(`Received Content-Type: ${req.headers['content-type']}`);
    next();
});

// Routes
app.use('/', routes);

// Test database connection
sequelize
    .authenticate()
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.error('Unable to connect to the database:', err));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

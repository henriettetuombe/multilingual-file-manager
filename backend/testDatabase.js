import sequelize from './models/index.js'; // Adjust the path to your Sequelize setup

// Test the database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful!');
        process.exit(0); // Exit the process if the connection is successful
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        process.exit(1); // Exit the process with an error code if the connection fails
    });

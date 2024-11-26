const { Sequelize, DataTypes } = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('file_manager', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

const db = {};
db.sequelize = sequelize;
db.User = require('./user')(sequelize, DataTypes);

module.exports = db;

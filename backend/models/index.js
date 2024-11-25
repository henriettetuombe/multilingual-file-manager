import { Sequelize } from 'sequelize';
import config from '../config/database.js'; // Adjust the path if necessary

const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
});

export default sequelize;

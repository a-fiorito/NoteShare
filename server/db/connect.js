const Sequelize = require('sequelize');

const DB_NAME = process.env.DB_NAME || 'noteshare';
const DB_USER = process.env.DB_USER || 'noteshare';
const DB_PASSWORD = process.env.DB_PASSWORD || 'password';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '5432';

let sequelize;

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        logging: false,
        dialect: 'postgres',
        dialectOptions: {
            ssl: true /* for SSL config since Heroku gives you this out of the box */
        },
        define: {
            timestamps: false
        }
    });
} else {
    sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
        host: DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT || DB_PORT,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        define: {
            timestamps: false
        }
    });
}

module.exports = sequelize;
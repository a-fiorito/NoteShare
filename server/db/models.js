const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    const User = sequelize.define('user', {
        username: Sequelize.TEXT,
        name: Sequelize.TEXT,
        email: Sequelize.TEXT
    });

    return {
        User: User
    }
}
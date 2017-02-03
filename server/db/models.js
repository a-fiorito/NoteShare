const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    const User = sequelize.define('user', {
        username: {type: Sequelize.TEXT, unique: true},
        name: Sequelize.TEXT,
        email: Sequelize.TEXT,
        password: Sequelize.TEXT
    });

    return {
        User: User
    }
}
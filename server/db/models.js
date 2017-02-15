const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    const User = sequelize.define('user', {
        username: {type: Sequelize.TEXT, unique: true},
        name: Sequelize.TEXT,
        email: Sequelize.TEXT,
        password: Sequelize.TEXT
    });

    const Course = sequelize.define('course', {
        name: Sequelize.TEXT,
        number: Sequelize.TEXT,
        
    });

    const Class = User.belongsToMany(Course, {as: 'courses', through: 'class'});

    return {
        User: User,
        Course: Course
    }
}
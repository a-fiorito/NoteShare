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

    const Document = sequelize.define('document', {
        name: Sequelize.TEXT,
    });

    User.belongsToMany(Course, {as: 'courses', through: 'class'});
    User.hasMany(Document, {as: 'documents'});
    Document.belongsTo(User, {as: 'user'});
    Course.hasMany(Document, {as: 'documents'});
    

    return {
        User: User,
        Course: Course,
        Document: Document
    }
}
const Sequelize = require('sequelize');

module.exports = function (sequelize) {

    const User = sequelize.define('user', {
        username: {type: Sequelize.TEXT, unique: true},
        name: Sequelize.TEXT,
        type: Sequelize.TEXT,
        email: Sequelize.TEXT,
        password: Sequelize.TEXT
    });

    const Course = sequelize.define('course', {
        name: Sequelize.TEXT,
        number: Sequelize.TEXT,
        
    });

    const Document = sequelize.define('document', {
        name: Sequelize.TEXT,
    }, {
        timestamps: true
    });

    const Comment = sequelize.define('comment', {
        body: Sequelize.TEXT
    }, {
        timestamps: true
    });

    User.belongsToMany(Course, {as: 'courses', through: 'class'});
    User.hasMany(Document, {as: 'documents'});
    Document.belongsTo(User, {as: 'user'});
    Course.hasMany(Document, {as: 'documents'});
    User.hasMany(Comment, {as: 'comments'});
    Comment.belongsTo(User, {as: 'user'});
    Document.hasMany(Comment, {as: 'comments'});
    

    return {
        User: User,
        Course: Course,
        Document: Document,
        Comment: Comment
    }
}
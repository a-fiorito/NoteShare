const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    config = require('../config'),
    Promise = require('bluebird');


module.exports = (function () {
    'use strict';

    let stats = express.Router();

    stats.get('/:userId', (req, res) => {
        let {userId} = req.params;
        Promise.all([
            models.Comment.findAndCountAll({where: {userId: userId}}),

            models.User.findOne({where: {id: userId}})
            .then(user => {
               return user.getCourses();
            }),

            models.User.findOne({where: {id: userId}})
        ])
        .spread((numberOfComments, courses, user) => {
            
            res.json({
                statistics:{
                    numberOfComments: numberOfComments.count,
                    numberOfCourses: courses.length
                },
                courses: courses,
                bio: user.bio
            });
        });

    })
    return stats;
})();
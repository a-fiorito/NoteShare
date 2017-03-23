const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    config = require('../config'),
    Promise = require('bluebird');


module.exports = (function () {
    'use strict';

    let stats = express.Router();

    stats.get('/:username', (req, res) => {
        let {username} = req.params;
        models.User.findOne({
            where: {username: username}, 
            include: [
                {
                    model: models.Document, as: 'documents', 
                    attributes: [ 'id', 'name', 'createdAt',
                        [sequelize.literal(`(SELECT COUNT("documentId") from comments where "comments"."documentId" = documents.id)`), 'commentsCount']
                    ],
                    include: [{model: models.User, as: 'user', attributes: ['id', 'name', 'username', 'type']}, {model: models.Course, as: 'course'}]
                }, 
                {model: models.Course, as: 'courses'},
                {model: models.Comment, as: 'comments'}

            ]
        })
        .then((user) => {
            res.json({
                statistics:{
                    numberOfComments: user.comments.length,
                    numberOfDocuments: user.documents.length
                },
                documents: user.documents,
                courses: user.courses,
                bio: user.bio,
                user: {id: user.id, username: user.username, name: user.name, type: user.type}
            });
        });

    })
    return stats;
})();
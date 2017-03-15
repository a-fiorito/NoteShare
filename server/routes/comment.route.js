const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    config = require('../config')


module.exports = (function () {
    'use strict';

    let comment = express.Router();

    comment.post('/', (req, res) => {
        let {commentBody, userId, documentId} = req.body;

        models.Comment.create({
            body: commentBody,
            userId: userId,
            documentId: documentId
        })
        .then(comment => {
            res.json(comment);
        })
    })

    comment.get('/:documentId', (req, res) => {
        let {documentId} = req.params;
        models.Comment.findAll({where : {documentId: documentId}, attributes: ['body', 'createdAt']})
            .then(comments => {
                res.json(comments);
            })
    })

    return comment;

})();

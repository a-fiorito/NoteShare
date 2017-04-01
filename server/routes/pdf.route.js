const express = require('express'),
    path = require('path'),
    fs = require('fs-extra'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    config = require('../config'),
    multer = require('multer')
    upload = multer({dest: path.join(__dirname, '../documents/tmp')}),
    helpers = require('../helpers');


module.exports = (function () {
    'use strict';

    let pdfs = express.Router();

    // upload a pdf to the server
    pdfs.post('/upload', upload.single('document'), (req, res) => {
        let { courseName, fileName, userId, username, courseId } = req.body; 
        let oldPath = req.file.path;
        let newPath = path.join(__dirname, `../documents/${courseName}/`);

        models.Document.create({
            name: fileName,
            userId: userId,
            courseId: courseId
        })
        .then(doc => {
            // make sure necessary folders are created.
            fs.ensureDir(path.join(__dirname, '../documents'), function(err) {
                fs.ensureDir(path.join(__dirname, '../documents/tmp'), function(err) {
                    newPath += `${username}${doc.id}.pdf`
                    res.json(doc);
                    return helpers.moveFile(oldPath, newPath)   // save file on the server
                })
            });
        });
    });
    
    // get documents for a course
    pdfs.get('/:courseId', (req, res) => {
        let { courseId } = req.params;
        models.Document.findAll({
            where: {courseId: courseId}, 
            include: [
                { model: models.User, as: 'user', attributes: ['id', 'name', 'username']},
                { model: models.Course, as: 'course'}
            ],
            attributes: [ 'id', 'name', 'createdAt',
                [sequelize.literal(`(SELECT COUNT("documentId") from comments where "comments"."documentId" = Document.id)`), 'commentsCount']
            ]
        })
        .then(docs => {
            res.json(docs);
        });
    })

    // get documents for a user
    pdfs.get('/profile/:userId', (req, res) => {
        let userId = req.params.userId;

        models.Document.findAll({
            where: {userId: userId},
            order: '"updatedAt" DESC', 
            include: [{ 
                model: models.User, as: 'user', 
                attributes: [
                    'id', 
                    'name', 
                    'username'
                ]
            }],
            attributes: [ 'id', 'name', 'createdAt',
                [sequelize.literal(`(SELECT COUNT("documentId") from comments where "comments"."documentId" = Document.id)`), 'commentsCount']
            ]
        })
        .then(docs => {
            res.json(docs);
        });

    });

    // delete a document
    pdfs.post('/delete', (req, res) => {
        let {document, user} = req.body;
        // delete file
        fs.unlink(path.join(__dirname, `../documents/${document.course.name}${document.course.number}/${user.username}${document.id}.pdf`), err =>{
            console.log(err);
            models.Document.destroy({where: {id: document.id}})
            .then(() => {
                res.json({success: true});
            });
        })
        
    });

    // Rename a document
    pdfs.post('/rename', (req, res) => {
        let {id, name} = req.body;
        models.Document.findOne({where: {id: id}})
        .then(document => {
            document.name = name;
            
            return document.save();
        })
        .then(doc => {
            res.json(doc);
        })
    })

    pdfs.get('/download/:username/:courseName/:id', (req, res) => {
        let {username, courseName, id} = req.params;
        var doc = path.join(__dirname , `../documents/${courseName}/${username}${id}.pdf`);
        res.download(doc, `${courseName}-${username}.pdf`);
    });

    return pdfs;

})();
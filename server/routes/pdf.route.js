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

    let pdf = express.Router();

    pdf.post('/upload', upload.single('document'), (req, res) => {
        console.log(req.file);
        let { courseName, fileName, userId, username, courseId } = req.body; 
        console.log(req.body);
        let oldPath = req.file.path;
        let newPath = path.join(__dirname, `../documents/${courseName}/`);

        models.Document.create({
            name: fileName,
            userId: userId,
            courseId: courseId
        })
        .then(doc => {
            fs.ensureDir(path.join(__dirname, '../documents'), function(err) {
                fs.ensureDir(path.join(__dirname, '../documents/tmp'), function(err) {
                    newPath += `${username}${doc.id}.pdf`
                    res.json(doc);
                    return helpers.moveFile(oldPath, newPath)
                })
            });
        });
    });
    
    pdf.get('/documents', (req, res) => {
        var username = req.get('username');
        var courseId = req.get('courseId')
        models.User.findOne({ where: {username: username}})
            .then(user => {
                user.getDocuments({where: {courseId: courseId} })
                    .then(docs => {
                        res.json(docs);
                    })
            })
    })


    return pdf;

})();
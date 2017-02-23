const express = require('express'),
    path = require('path'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    config = require('../config'),
    multer = require('multer')
    upload = multer({dest: path.join(__dirname, '../documents/tmp')});


module.exports = (function () {
    'use strict';

    let pdf = express.Router();

    pdf.post('/upload', upload.single('document'), (req, res) => {
        console.log(req.file);
    });
    
    return pdf;

})();
const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    config = require('../config'),
    course_helpers = require('../courses-helpers');
    

module.exports = (function () {
    'use strict';

    let coursesroute = express.Router();

    // Adds course {name, number} to the database
    coursesroute.post('/courses', (req, res) => {
       
       // Validates input
       course_helpers.validateCourse(req.body.course)
       .then(({errors, isValid}) => {
           if(isValid) {
               const {name, number} = req.body.course;
               
               // Create course
               models.Course.create({
                   name: name,
                   number: number,
                   
               })
               .then(course => {
                   // Returns course object as json
                   res.json(course);
               })
               .catch(err => res.status(500).json({error: err}));


           } else{
               res.status(400).json(errors);
           }


       })
        
    })
    return coursesroute;

})();
    
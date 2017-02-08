const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken'),
    config = require('../config'),
    helpers = require('../courses-helpers');
    

module.exports = (function () {
    'use strict';

    let coursesroute = express.Router();

    // Adds course {name, number} to the database
    coursesroute.post('/courses', (req, res) => {
       
       // Validates input
       helpers.validateCourse(req.body.course)
       .then(({errors, isValid}) => {
           if(isValid) {
               const {name, number} = req.body.course;
               
               // Create course
               models.Course.create({
                   name: name,
                   number: number,
                   
               })
               .then(course => {
                   // Returns token
                   const token = jwt.sign({
                       id: course.id,
                       name: course.name,
                       number: course.number,
                   }, config.jwtSecret);
                   res.json({token})
               })
               .catch(err => res.status(500).json({error: err}));


           } else{
               res.status(400).json(errors);
           }


       })
        
    })
    return coursesroute;

})();
    
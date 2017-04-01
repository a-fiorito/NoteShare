const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize),
    helpers = require('../helpers');


module.exports = (function () {
    'use strict';

    let courses = express.Router();

    // Adds course to the database
    courses.post('/:create', (req, res) => {
        const {name, number} = req.body.course;
        const {create} = req.params;
        var username = req.body.user.username;
        Promise.all([
            models.User.findOne({ where: { username: username } }),
            models.Course.findOne({ where: {name: name, number: number}})
        ])
        .spread((user, course) => {
            if(course) {
                helpers.createCourse(name, number, user)
                .then(course => {
                    res.json(course);
                });
            } else {
                if(create === 'true') {
                    helpers.createCourse(name, number, user)
                        .then(course => {
                            res.json(course);
                        });
                } else {
                    res.json({error: 'Course does not exist. Do you want to create it anyway?'});
                }
            }
        });
    });

    // load a user's courses
    courses.get('/:username', (req, res) => {
        let username = req.params.username;
        models.User.findOne({ where: { username: username } })
            .then(user => {
                user.getCourses()
                .then(courses => {
                    res.json(courses);
                });
            });
    });

    // delete a course
    courses.delete('/:userId/:courseId', (req, res) => {
        let {courseId, userId} = req.params;
        Promise.all([
            models.User.findOne({where: {id: userId}}),
            models.Course.findOne({where: {id: courseId}})
        ])
        .spread((user, course) => {
            user.removeCourse(course)
            .then(() => {
                res.json({success: true});
            });
        });
    });

    return courses;

})();

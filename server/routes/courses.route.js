const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    config = require('../config'),
    helpers = require('../helpers');


module.exports = (function () {
    'use strict';

    let courses = express.Router();

    // Adds course to the database
    courses.post('/', (req, res) => {
        const {name, number} = req.body.course;
        var username = req.body.user.username;
        models.User.findOne({ where: { username: username } })
            .then(user => {
                // Create course
                models.Course.findOrCreate({ 
                    where: {
                        name: name,
                        number: number,
                    }
                })
                .spread(course => {
                    // Add the course to the class table
                    // wont add if its a duplicate
                    fs.ensureDir(path.join(__dirname, '../documents'), function(err) {
                        fs.ensureDir(path.join(__dirname, '../documents/tmp'), function(err) {
                            fs.ensureDir(path.join(__dirname, `../documents/${name}${number}`), function(err) {
                                user.addCourse(course);
                                // Returns course object as json
                                res.json(course);
                            });
                        });
                    });
                })
                .catch(err => res.status(500).json({ error: err }));
            })
        })

    // load a user's courses
    courses.get('/:username', (req, res) => {
        let username = req.params.username;
        models.User.findOne({ where: { username: username } })
            .then(user => {
                user.getCourses()
                .then(courses => {
                    res.json(courses);
                })
            })
    })

    return courses;

})();

const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    bcrypt = require('bcryptjs'),
    helpers = require('../helpers'),
    jwt = require('jsonwebtoken'),
    config = require('../config');

module.exports = (function() {
    'use strict';

    let authenticate = express.Router();

    // adds user to database on signup
    authenticate.post('/signup', function(req, res) {
        // validate input
        helpers.validateSignUp(req.body.user)
        .then(({errors, isValid}) => {
            if(isValid) {
                const { name, type, username, password, email } = req.body.user;
                const password_digest = bcrypt.hashSync(password, 10);
                // create user
                models.User.create({
                    name: name,
                    type: type,
                    username: username,
                    password: password_digest,
                    email: email
                })
                .then(user => {
                    // return token
                    const token = jwt.sign({
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        type: user.type
                    }, config.jwtSecret);
                    res.json({token})
                })
                .catch(err => res.status(500).json({error: err}));

            } else {
                res.status(400).json(errors);
            } 
        });
    });

    // authenticates user with the database
    authenticate.post('/login', (req, res) => {
        const { username, password } = req.body.user;
        // check if user exists
        models.User.findOne({where: {username: username}})
        .then(user => {
            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    // return auth token
                    const token = jwt.sign({
                        id: user.id,
                        username: user.username,
                        name: user.name,
                        type: user.type
                    }, config.jwtSecret);
                    res.json({token})
                } else {
                    res.status(401).json({form: 'Invalid Credentials'});
                }
            } else {
                res.status(401).json({form: 'Invalid Credentials'});
            }
        })
    })

    // update user credentials
    authenticate.post('/update', (req, res) => {
        const {username, name, bio, type} = req.body;

        models.User.findOne({where: {username: username}})
        .then(user => {
            user.name = name;
            user.bio = bio;
            user.type = type;

            return user.save();
        })
        .then(user => {
            // authentication
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                name: user.name,
                type: user.type
            }, config.jwtSecret);
            res.json({token});
        })
    })

    return authenticate;
})();
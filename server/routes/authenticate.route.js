const express = require('express'),
    sequelize = require('../db/connect'),
    models = require('../db/models')(sequelize)
    Validator = require('validator'),
    _ = require('lodash'),
    bcrypt = require('bcrypt');

function validate(input) {
    let errors = {};

    if(Validator.isEmpty(input.email)) {
        errors.email = "This field is required."
    } else {
        if(!Validator.isEmail(input.email)) {
            errors.email = "Email is invalid"
        }
    }
    if(Validator.isEmpty(input.username)) {
        errors.username = "This field is required."
    }
    if(Validator.isEmpty(input.password)) {
        errors.password = "This field is required."
    }
    // if(!Validator.equals(input.password, input.confirmedPassword)) {
    //     errors.confirmedPassword = "Passwords must match";
    // }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }

}

module.exports = (function() {
    'use strict';

    let authenticate = express.Router();

    authenticate.post('/user', (req, res) => {
        const { errors, isValid } = validate(req.body.user)
        if(isValid) {
            const { username, password, email } = req.body.user;
            const password_digest = bcrypt.hashSync(password, 10);

            models.User.create({
                username: username,
                password: password_digest,
                email: email
            })
            .then(user => res.json({success: true}))
            //.catch(err => res.status(500).json({error: err}));

        } else {
            res.status(400).send(errors);
        }
    });

    return authenticate;
})();
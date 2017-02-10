const sequelize = require('./db/connect'),
    models = require('./db/models')(sequelize)
    Validator = require('validator'),
    _ = require('lodash');

/*
    Validates empty and invalid input when signing up
*/
function formValidate(input) {
    let errors = {};

    if(Validator.isEmpty(input.email)) {
        errors.email = "This field is required.";
    } else {
        if(!Validator.isEmail(input.email)) {
            errors.email = "Email is invalid.";
        }
    }
    if(Validator.isEmpty(input.username)) {
        errors.username = "This field is required.";
    }
    if(Validator.isEmpty(input.password)) {
        errors.password = "This field is required.";
    }
    // if(!Validator.equals(input.password, input.confirmedPassword)) {
    //     errors.confirmedPassword = "Passwords must match";
    // }

    return errors
}

/*
    Checks if user already exists in the db
*/  
function validateSignUp(input) {
    let errors = formValidate(input);

    return models.User.findOne({where: {username: input.username}})
        .then(user => {
            if(user) {
                errors.username = "User already exists"
            }
        })
        .then(() => {
            return {
                errors,
                isValid: _.isEmpty(errors)
            }
        });
}

/*
    Validates empty and invalid input when logging in
*/
function validateLogin(input) {
    let errors = {};

    if(Validator.isEmpty(input.username)) {
        errors.username = 'This field is required.';
    }

    if(Validator.isEmpty(input.password)) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}

module.exports = {
    validateSignUp: validateSignUp,
    validateLogin: validateLogin
}
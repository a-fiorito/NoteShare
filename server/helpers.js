const sequelize = require('./db/connect'),
    models = require('./db/models')(sequelize)
Validator = require('validator'),
    fs = require('fs-extra'),
    path = require('path'),
    _ = require('lodash');

/*
    Validates empty and invalid input when signing up
*/
function formValidate(input) {
    let errors = {};

    if (Validator.isEmpty(input.name)) {
        errors.name = "This field is required.";
    }
    if (Validator.isEmpty(input.email)) {
        errors.email = "This field is required.";
    } else {
        if (!Validator.isEmail(input.email)) {
            errors.email = "Email is invalid.";
        }
    }
    if (Validator.isEmpty(input.username)) {
        errors.username = "This field is required.";
    }
    if (Validator.isEmpty(input.password)) {
        errors.password = "This field is required.";
    }

    return errors
}

/*
    Checks if user already exists in the db
*/
function validateSignUp(input) {
    let errors = formValidate(input);

    return models.User.findOne({ where: { username: input.username } })
        .then(user => {
            if (user) {
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

/**
 * Validates login data of a user
 * @param {Object} input - login data to be validated
 */
function validateLogin(input) {
    let errors = {};

    if (Validator.isEmpty(input.username)) {
        errors.username = 'This field is required.';
    }

    if (Validator.isEmpty(input.password)) {
        errors.password = 'This field is required';
    }

    return {
        errors,
        isValid: _.isEmpty(errors)
    }
}

/**
 * Validates course data
 * @param {Object} input - course data to be validated
 */
function validateCourse(input) {
    let errors = {};
    // Checks course name and number are not empty
    if (Validator.isEmpty(input.name)) {
        errors.name = 'This field is required.';
    }

    if (Validator.isEmpty(input.number)) {
        errors.number = 'This field is required.';
    }
    // Checks if course already exists
    return models.Course.findOne({ where: { name: input.name, number: input.number } })
        .then(course => {
            if (course) {
                errors.name = "Course already exists"
            }
        })
        .then(() => {
            return {
                errors,
                isValid: _.isEmpty(errors)
            }
        });
}

function moveFile(oldPath, newPath) {
    return new Promise((resolve, reject) => {
        // move the file to the proper course folder
        fs.rename(oldPath, newPath, err => {
            if (err) reject();
            // after file is move, empty tmp directory
            fs.emptyDir(path.join(__dirname, '/documents/tmp'), err => {
                err ? reject(err) : resolve();
            })
        });
    });
}

module.exports = {
    validateSignUp: validateSignUp,
    validateLogin: validateLogin,
    validateCourse: validateCourse,
    moveFile: moveFile
}
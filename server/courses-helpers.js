const sequelize = require('./db/connect'),
    models = require('./db/models')(sequelize)
    Validator = require('validator'),
    _ = require('lodash');

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
    return models.Course.findOne({where: {name: input.name, number: input.number}})
        .then(course => {
            if(course){
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

module.exports = {
    validateCourse: validateCourse
}

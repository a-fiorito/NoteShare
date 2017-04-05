const sequelize = require('./db/connect'),
    models = require('./db/models')(sequelize),
    fs = require('fs'),
    path = require('path');

function loadCoursesFromFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname + '/db/course-list.txt'), 'utf8', (err, data) => {
            if (err) reject(err);
            // seperate file by new lines
            let courses = data.split('\n');
            let courseList = [];

            // split course name and number
            courses.forEach(c => {
                let courseInfo = c.split(' ');
                courseList.push({
                    name: courseInfo[0],
                    number: courseInfo[1],
                    verified: true
                });
                resolve(courseList);
            });
        });
    });
}

module.exports = function () {
    return loadCoursesFromFile()
        .then(courses => {
            return models.Course.bulkCreate(courses);
        });
};

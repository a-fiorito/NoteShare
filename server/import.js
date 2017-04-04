const sequelize = require('./db/connect'),
    models = require('./db/models')(sequelize),
    fs = require('fs'),
    path = require('path');

fs.readFile(path.join(__dirname + '/db/course-list.txt'), 'utf8', (err, data) => {
    if (err) throw err;
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
    });

    // create courses in db
    models.Course.bulkCreate(courseList)
    .then(() => {
        console.log('Courses imported in database successfully');
    });
});

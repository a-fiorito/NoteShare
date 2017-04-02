const sequelize = require('./db/connect'),
    models = require('./db/models')(sequelize),
    fs = require('fs'),
    path = require('path');
    
fs.readFile(__dirname + '/db/course-list.txt', 'utf8', (err, data) => {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(i in array){
        array[i] = array[i].split(" ");
    }
    courseList = array.map((course, index) => {
      var objlist = {name: course[0], number: course[1], verified: true};
      return objlist
    });
    models.Course.bulkCreate(courseList)
    .then(() => {
        console.log('Courses imported in database successfully');
    });
});
    

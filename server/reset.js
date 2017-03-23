const fs = require('fs-extra'),
    path = require('path'),
    sequelize = require('./db/connect');
    models = require('./db/models')(sequelize);

const documentsDir = path.join(__dirname, './documents');
/**
 * Resets the database and deletes all the uploaded files for testing purposes
 */
new Promise((resolve, reject) => {
    fs.emptyDir(documentsDir, err => {
        if (err) reject();
        else resolve();
    });
})
.then(() => {
    return sequelize.sync({ force: true });
});
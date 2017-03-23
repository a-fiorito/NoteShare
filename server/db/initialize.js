const sequelize = require('./connect'),
    models = require('./models')(sequelize);

// initialize database tables
module.exports = function(force) {
    return sequelize.sync({force: force}).then(() => {
        // initialize default items here
    });
}
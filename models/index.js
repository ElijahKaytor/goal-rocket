var path = require('path');

var Sequelize = require('sequelize-postgres').sequelize;
var postgres  = require('sequelize-postgres').postgres;
var lodash    = require('lodash');

var conf = require('../config/settings.js');


// Database connection
var sequelize = new Sequelize(
        conf.dbConf.database,
        conf.dbConf.user,
        conf.dbConf.pass,
        conf.dbConf.options);

// Map of models loaded
var db = {};

// Import models and map it in `db`
conf.models.forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file + '.js'));
    db[model.name] = model;
});

// Associate `db` keys if necessary
Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db);
    }
});

// Export configured `db` with a couple extra keys
module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);

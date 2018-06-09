// Dependencies
// =============================================================

// This may be confusing but here Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// Dependancies
var sequelize = require("../config/connection.js");

// Article model
var Article = sequelize.define("article", {
    //Insert DB text here
});

// Sync
Article.sync();

// Export
module.exports = Article;

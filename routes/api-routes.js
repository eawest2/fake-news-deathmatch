// Dependencies
var Article = require("../models/article.js");


// Routes
module.exports = function(app) {

    // Get all articles for front page (modify with sequelize to use only articles less than 30 days old);
    app.get("/api/all", function(req, res) {

    Article.findAll({}).then(function(results) {
        res.json(results);
    });

    });

    // Autopull from api to DB
    app.post("/api/pull", function(req, res) {
        

    console.log("Article Data:");
    console.log(req.body);

    Article.create({
        //check model for information
    }).then(function(results) {
        res.end();
    });

    });

};
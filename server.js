// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Express Boilerplate
var app = express();
var PORT = process.env.PORT || 8080;

// Bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

//listener
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
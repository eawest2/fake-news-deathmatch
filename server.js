var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 8080;

var app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// parse application/json
app.use(bodyParser.json());

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

app.use(express.static(__dirname + '/public'));

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//    console.log("Server listening on: http://localhost:" + PORT);
// });

db.sequelize.sync({
        force: true
    })
    .then(function () {
        app.listen(PORT, function () {
            console.log("Server listening on: http://localhost:" + PORT);
        });
    });
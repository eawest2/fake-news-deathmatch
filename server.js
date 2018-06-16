var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");
var exphbs = require("express-handlebars");
var env = require("dotenv").load();
var passport   = require('passport');
var session    = require('express-session');

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

// For Passport 
app.use(session({ secret: 'thisis project2',resave: true, saveUninitialized:true})); // session secret 
app.use(passport.initialize()); 
app.use(passport.session()); // persistent login sessions
require('./config/passport/passport.js')(passport, db.Reviewer); //Passport strategy

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
var authRoute = require("./routes/auth.js")(app,passport);

app.use(express.static(__dirname + '/public'));


//Start our server so that it can begin listening to client requests.
// app.listen(PORT, function() {
//     console.log("Server listening on: http://localhost:" + PORT);
// });

db.sequelize.sync({
        force: true
    })
    .then(function () {
        app.listen(PORT, function () {
            console.log("Server listening on: http://localhost:" + PORT);
        });
    });
//Declare requirements
var express = require("express");
var bodyParser = require("body-parser");
var PORT = process.env.PORT || 8080;

//Initialize express
var app = express();

//Body parser boiler plate
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Handlebars boiler plate
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Initialize routing
var controller = require("./controllers/burgers_controller.js");
app.use(controller);

//Server listener
app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
});
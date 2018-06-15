
var UserModel = require('../models/index.js');
var path = require("path");
var express = require("express")
var router = express.Router();

module.exports = function(app){

	//GETs

	app.get("/", function(req, res) {
		res.render('news');
	});
};



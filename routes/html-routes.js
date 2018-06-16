
var UserModel = require('../models/index.js');
var path = require("path");
var express = require("express")
var router = express.Router();
require('es6-promise').polyfill();
require('isomorphic-fetch');

module.exports = function(app){

	//GETs

	app.get("/", function(req, res) {

		var jumbotronObj;
		var articlesObj;

		fetch("/api/article/review"). then(articles => {
			articlesObj = articles;
		});
		fetch("/api/jumbo"). then(jumbotron => {
			jumbotronObj = jumbotron;
		});
		res.render('news', articlesObj);
	});
};



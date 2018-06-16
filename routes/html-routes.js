
var UserModel = require('../models/index.js');
var path = require("path");
var express = require("express")
var router = express.Router();
require('es6-promise').polyfill();
require('isomorphic-fetch');
var ac = require('../controllers/articleController');
module.exports = function(app){

	//GETs

	app.get("/", function(req, res) {

		var jumbotronObj;
		var articlesObj;
		/*
		fetch("http://localhost:8080/api/article/review"). then(articles => {
			fetch("http://localhost:8080/api/jumbo"). then(jumbotron => {
				jumbotronObj = jumbotron;
				res.render('news', articlesObj);

			});
			articlesObj = articles;
		});
		*/
		ac.randomArticles().then(data=>{
			res.render('news',{'articlesObj':data});
		})
	});
};



// Dependencies
var db = require("../models");
var Article = require("../models/article.js");
var Review = require("../models/review.js");
var $ = require("jquery");
require('es6-promise').polyfill();
require('isomorphic-fetch');
var moment = require("moment")

// Routes
module.exports = function (app) {

    var timestamp = "start";
    // Autopull new data from API sources, format, and then write to database. 
    app.post("/api/pull", function () {
        var currentTime = new Date();
        if ((currentTime - timestamp) > 21600000 || timestamp === "start"){ 
            timestamp = new Date();
            var sources = [
                "https://newsapi.org/v2/everything?domains=cnn.com&language=en&pagesize=20&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1",
                "https://newsapi.org/v2/everything?domains=foxnews.com&language=en&pagesize=20&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1",
                'https://newsapi.org/v2/everything?domains=nytimes.com&language=en&pagesize=20&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1'
            ]
            Promise.all(sources.map(source => fetch(source).then(function (response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            ))
                .then(currentArticles => {
                    db.Article.findAll({ raw: true })
                        .then(articles => {
                            var finalCurrentArticles = [];
                            var oldArticles = articles;
                            currentArticles.forEach((currentArticle) => {
                                currentArticle.articles.forEach((currentActualArticle) => {
                                    // if new article desc not found in old article, return -1
                                    const indexOfNewArticle = oldArticles.findIndex((oldArticle) => {
                                        return currentActualArticle.description === oldArticle.description;
                                    });
                                    // if -1 found, this means we have a new article
                                    if(indexOfNewArticle === -1) {
                                        finalCurrentArticles.push(currentActualArticle);
                                    }
                                });
                            });
                            console.log(finalCurrentArticles);
                            return Promise.all(finalCurrentArticles.map(response => db.Article.create({
                                URL: response.url,
                                imageURL: response.urlToImage,
                                title: response.title,
                                description: response.description,
                                sourceId: response.source.id,
                                author: response.author
                            })
                            ))
                        })
                })
                .catch(err => console.log(err))
            }
            else{
                console.log(">>>>>New Articles Not Needed")
            }
    });

    // Add review to article
    app.put("/api/article/:id/", function (req, res) {
        db.Review.create({
            rating1: req.params.rating1,
            rating2: req.params.rating2,
            rating3: req.params.rating3,
            comment: req.params.comment
        }).then(review => {
            db.Article.findOne({
                where: {
                    'id': req.params.id
                }
            }).then(article => {
                article.setArticleReviews(review);
            })
        })
    });

    //find 3 random articles from DB
    app.get("/api/article/review", function (req, res) {
        //find last article ID in DB. lastArt
        var ranArt = [];
        db.Article.findAll({})
            .then(articles => {
                var len = articles.length;
                console.log(articles.length);
                for (let i = 0; i < 3; i++) {
                    var rando = Math.floor(Math.random() * len)
                    ranArt.push(articles[rando].dataValues);
                }
                console.log(ranArt);
                res.json(ranArt);
            });
    });

    //aggregate reviews of individual sources

    app.get("/api/jumbo", function (req, res) {
        var final = [];
        var sources = ["cnn", "fox-news", "the-new-york-times"];
        db.Article.findAll({
            order: [
                ['sourceId']
            ],
            attributes: [
                'id', 'sourceId', 'author', 'title', 'description', 'ArticleReviews.rating1', 'ArticleReviews.rating2', 'ArticleReviews.rating3'
            ],
            include: [{
                model: db.Review,
                as: 'ArticleReviews',
            }],
            where: {
                sourceId: sources
            }
        })
            .then(average => {
                var sourceArr = [];
                for (var i = 0; i < average.length; i++) {
                    if (isNaN(average[i].dataValues.ArticleReviews.length) === false){
                        var reviewValue = average[i].dataValues.ArticleReviews.length;
                        console.log(reviewValue);
                    }
                    else{
                        var reviewValue  = "nan"
                        console.log("Fail");
                    }
                    var reviewArr = [];
                    if (reviewValue !== "nan")
                        for (a = 0; a < reviewValue; a++) {
                            let rating = average[i].dataValues.ArticleReviews[a].dataValues
                            var value = (Math.floor(10 * (rating.rating1 + rating.rating2 + rating.rating3) / 3)) / 10
                            reviewArr.push(value);
                        }
                    var finalScore = (Math.floor(10 * ((reviewArr.reduce(function(acc, val) { return acc + val; }, 0)) / reviewArr.length)) / 10);
                    if (finalScore > 0){sourceArr.push(finalScore)};
                };
                final.push(sourceArr);
                final = [].concat.apply([], final)
                //console.log('>>>>> final: ', final);
                var cnnScore = "Error";
                var foxScore = "Error";
                var nytSCore = "Error";
                if (isNaN(final[0]) === false){cnnScore = final[0]}
                if (isNaN(final[1]) === false){foxScore = final[1]}
                if (isNaN(final[2]) === false){nytScore = final[2]}
                finalObj = {
                    CNN: cnnScore,
                    FOX: foxScore,
                    NYT: nytSCore
                }
                console.log(finalObj);
                res.json(finalObj);
            })
    });
};
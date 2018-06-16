// Dependencies
var db = require("../models");
var Article = require("../models/article.js");
var Review = require("../models/review.js");
var $ = require("jquery");
require('es6-promise').polyfill();
require('isomorphic-fetch');

// Routes
module.exports = function(app) {
    // Autopull new data from API sources, format, and then write to database. 
    app.post("/api/pull", function() {
            var sources = ["https://newsapi.org/v2/everything?domains=cnn.com&language=en&pagesize=100&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1", "https://newsapi.org/v2/everything?domains=foxnews.com&language=en&pagesize=100&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1", 'https://newsapi.org/v2/everything?domains=nytimes.com&language=en&pagesize=100&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1']
            Promise.all(sources.map(source=> fetch(source).then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            //     $.ajax({
            //     url: source,
            //     method: "GET"
            // })
        ))
            .then(responses=>{
                db.Article.findAll()
                .then(articles=>{
                    var articleMap = {};
                    var finalResponses = [];
                    articles.forEach(article=>articleMap[article.dataValues.description] = true);
                    console.log(articleMap);
                    responses = [].concat(...responses);
                    responses = responses.reduce((accumulator, response)=>{
                        if(articleMap[responses.description] !== true){
                            accumulator.push(response);
                            return accumulator;
                            console.log(accumulator)
                            console.log(responses);
                        }
                    },[]);
                    return Promise.all(responses.map(response=>db.Article.create({
                            URL:response.description,
                            imageURL:response.imageURL,
                            description:response.description,
                            sourceId:response.sourceId,
                            author:response.author
                        })
                    ))
                })
                .then(newArticles=>console.log(newArticles))
                .catch(err=>err)
            })
            .catch(err=>console.log(err))

    });

    // Add review to article
    app.put("/api/article/:id/", function(req, res) {
        db.Review.create({
            rating1:'',
            rating2:'',
            rating3:'',
            comment:''
        }).then(review=>{
            db.Article.findOne({
                where:{
                    'id':req.params.id
                }
            }).then(article=>{
                article.setArticleReviews(review);
            })
        })
    });

    //find 3 random articles from DB
    app.get("/api/article/review", function(req, res) {
        //find last article ID in DB. lastArt
        var ranArt=[];
        db.Article.findAll({})
        .then(articles=>{
            var len = articles.length;
            console.log(articles.length);
            for (let i = 0; i<3; i++){
                var rando = Math.floor(Math.random()*len)
                ranArt.push(articles[rando].dataValues);
            }
            console.log(ranArt);
            res.json(ranArt);
        });
    });

    //aggregate reviews of individual sources

    app.get("/api/jumbo", function (req, res){

        var promise1 = new Promise(function (req,res) {
            var aggregates = [];
            var sources = ["cnn", "fox-news", "the-new-york-times"]
            for (i = 0; i <3; i++){
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
                    sourceId: sources[i]
                }
            }).then(average=>{
                //console.log(average);
                var sourceArr= [];
                var promise2= new Promise(function (req,res) {
                    for (i = 0; i < average.length; i++){
                    //console.log(average[i].dataValues.ArticleReviews);
                    var reviewValue = average[i].dataValues.ArticleReviews.length;
                    var reviewArr = [];
                    for (a = 0; a< reviewValue; a++){
                        let rating = average[i].dataValues.ArticleReviews[a].dataValues
                        var value = (Math.floor(10*(rating.rating1 + rating.rating2 + rating.rating3)/3))/10
                        reviewArr.push(value);
                    };
                    //console.log(reviewArr);
                    var finalScore = (Math.floor(10*((reviewArr[0] + reviewArr[1] + reviewArr[2])/3))/10);
                    sourceArr.push(finalScore);
                };
                }).then(container=>{
                    console.log(sourceArr);
                });

            });
            };
        }).then(resultValue=>{
            console.log(resultValue);

        });
    });
};


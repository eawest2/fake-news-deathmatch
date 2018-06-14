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

    // Autopull new data from API sources, format, and then write to database. 
    app.post("/api/pull", function() {
            var sources = ["https://newsapi.org/v2/everything?domains=cnn.com&language=en&pagesize=100&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1", "https://newsapi.org/v2/everything?domains=foxnews.com&language=en&pagesize=100&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1", 'https://newsapi.org/v2/everything?domains=nytimes.com&language=en&pagesize=100&sortBy=popularity&apiKey=71df48734adf49a9a56c2e893c8408f1']
            Promise.all(sources.map(source=>$.ajax({
                url: source,
                method: "GET"
            })))
            .then(responses=>{
                db.Article.findAll()
                .then(articles=>{
                    var articleMap = {};
                    var finalResponses = [];
                    articles.forEach(article=>articleMap[article.dataValues.description] = true);
                    console.log(articleMap);
                    responses = [].concat(...responses);
                    responses = responses.reduce((accumulator, response)=>{
                        if(articleMap[response.description] !== true){
                            accumulator.push(response);
                            return accumulator;
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

    // Get specific article from database

    app.get("/api/article/:id", function(req, res) {

        db.Article.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(abArticle){
                res.json(dbAticle);
            });
    });


    // Update article

    app.put("/api/article/:id/", function(req, res) {
        db.Article.update(req.body,
            {
            where: {
                id: req.body.id
            }
            })
            .then(function(dbArticle) {
                res.json(dbArticle);
            });
    });

    // Find articles by user

    app.get("/api/user/:id", function(req, res) {
        db.Reviewer.findOne({
            where: {
                id: req.params.id
            }
        })
            .then(function(abArticle){
                res.json(dbAticle);
            });
    });

    //Find random 3 random articles per source

    // app.get("/api/article/review", function(req, res) {
    //     db.Article.findOne(req.body,
    //         {
    //         where: {
    //             id: 
    //         }
    //         })
    //         .then(function(dbArticle) {
    //             res.json(dbArticle);
    //         });
    // });

};
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
            var cnnArticles = [];
            var foxArticles = [];
            var nytArticles = [];
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
            
            // var completed = [];

            // function check() {
            //     if (completed[0] && completed [1] && completed[2]){
            //         writeApiToDB();
            //         completed = [];
            //     }
            // };

            // function writeApiToDB(){


            // };

            // //CNN News pull
            // $.ajax({
            //     url: sources[0],
            //     method: "GET"
            // })
            // // Stores all of the retrieved data inside of an object called "response"
            // .then(function(response) {
            //             cnnArticles = response.articles;
            //             completed.push(true);
            //             check();
            //     });

            // //Fox News pull
            // $.ajax({
            //     url: sources[1],
            //     method: "GET"
            // })
            // // Stores all of the retrieved data inside of an object called "response"
            // .then(function(response) {
            //             foxArticles = response.articles;
            //             completed.push(true);
            //             check();
            //     });

            // //NYT News pull
            // $.ajax({
            //     url: sources[2],
            //     method: "GET"
            // })
            // // Stores all of the retrieved data inside of an object called "response"
            // .then(function(response) {
            //             nytArticles = response.articles;
            //             completed.push(true);
            //             check();
            //     });

    });

    // Get specific article from database

    app.get("/api/article/:id", function(req, res) {


    });


    // Update article

    app.put("/api/article/:id/write", function(req, res) {

    });

    // Find articles by user

    pp.get("/api/user/:id", function(req, res) {


    });



};
var db = require('../models');

module.exports = {
    randomArticles: function(){
        return new Promise(function(resolve, reject){
            //find last article ID in DB. lastArt
            var ranArt = [];
            db.Article.findAll({})
            .then(articles => {
                var len = articles.length;
                for (let i = 0; i < 3; i++) {
                    var rando = Math.floor(Math.random() * len)
                    ranArt.push(articles[rando].dataValues);
                }
                resolve(ranArt);
            })
            .catch(err=>reject(err));
        });
    }

}
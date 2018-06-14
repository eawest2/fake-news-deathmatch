var db = require("./models");


let data = db.Article.findAll({
    // where: {
    //   id: 11
    // },
    include: [{
      model: db.Review,
      as: 'ArticleReviews',
    }],
  })

  .then(articles => {
    console.log(`ARTICLES ${articles}`)
    console.log(JSON.stringify(articles)),
      console.log(`START MAP`)
    articles.map(article => (
      console.log("-------------------------------------------------------"),
      console.log(`ID: ${article.dataValues.id}`),
      console.log(`Source: ${article.dataValues.sourceId}`),
      console.log(`Author: ${article.dataValues.author}`),
      console.log(`Title: ${article.dataValues.title}`),
      console.log(`Description: ${article.dataValues.description}`),
      console.log(`URL: ${article.dataValues.URL}`),
      console.log(`image URL: ${article.dataValues.imageURL}`),
      console.log("Reviews:"),
      article.ArticleReviews.map(review => (
        console.log(`Ratings: ${review.rating1} ${review.rating2} ${review.rating3}`),
        console.log(`Comment: ${review.comment}`)
      ))
    ));

  })
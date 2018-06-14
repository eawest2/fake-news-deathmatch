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
      console.log(article.dataValues.id),
      console.log(article.dataValues.URL),
      console.log(article.dataValues.title),
      console.log(article.dataValues.description),
      console.log("Reviews:"),
      article.ArticleReviews.map(review => (
        console.log(`Ratings: ${review.rating1} ${review.rating2} ${review.rating3}`),
        console.log(`Comment: ${review.comment}`)
      ))


    ));

  })
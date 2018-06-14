var db = require("./models");


let data = db.Reviewer.findAll({
    include: [{
      model: db.Article,
      through: {
        // attributes: ['createdAt', 'startedAt', 'finishedAt'],
        where: {reviewerId: 1}
      }
    }]
  })
  .then(reviews => {console.log(reviews)});

  
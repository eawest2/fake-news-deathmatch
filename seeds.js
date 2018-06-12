var db = require("./models");

let reviewers = [{
        email: "reviewer_1@gmail.com",
        gender: "F"
    },
    {
        email: "reviewer_2@gmail.com",
        gender: "F"
    },
    {
        email: "reviewer_3@gmail.com",
        gender: "M"
    },
    {
        email: "reviewer_4@gmail.com",
        gender: "M"
    }
];

let articles = [{
        URL: "http://aaaaa.aa",
        imageURL: "http://bbb.bbbb",
        description: "this is a test1",
        sourceId: "CNN",
        author: "Rob"
    },
    {
        URL: "http://cccc.dddd.eeee",
        imageURL: "http://fff.ggg.hhhh",
        description: "this is a test2",
        sourceId: "ABC",
        author: "Kevin"
    },
    {
        URL: "http://ii.jjj.kkkk",
        imageURL: "http://ll.mm.nnn",
        description: "this is a test3",
        sourceId: "FOX",
        author: "Eric"
    },
    {
        URL: "http://ooo.pppppp",
        imageURL: "http://qqqqqq.qqqq",
        description: "this is a test4",
        sourceId: "FOX",
        author: "Jyo"
    },

]
Promise.all(db.ArticleReviewer.destroy({
        where: {}
    }))
    .then(response => db.ArticleReviewer.destroy({
            where: {}
        })
        .then(response => db.Reviewer.destroy({
            where: {}
        })));
// db.ArticleReviewer.destroy({
//     where: {}
//     // force: true
// });

// db.Article.destroy({
//     where: {}
//     // force: true
// });

// db.Reviewer.destroy({
//     where: {}
//     // force: true
// });

Promise.all(articles.map(article => db.Article.create(article)))
    .then(articlesDB => Promise.all(reviewers.map(reviewer => db.Reviewer.create(reviewer)))
        .then(reviewersDB => {
            console.log(articlesDB[0].dataValues);
            console.log(reviewersDB[0].dataValues);
            return articlesDB[0].addReviewer(reviewersDB[0], {
                through: {
                    rating1: '2',
                    rating2: "3",
                    rating3: "4",
                    comment: "great article"
                }
            })

        }))
    .catch((err) => {
        console.log(err);
    });

/*
        articles.forEach(article => {

            db.Article.create(article)
                // .then(function (dbArticle) {
                //     console.log(dbArticle);
                // })
                .catch(err => {
                    console.log(`Check log for errors ${err}`)
                })
        });

        reviewers.forEach(reviewer => {
            db.Reviewer.create(reviewer)
                // .then(function (dbReviewer) {
                //     console.log(dbReviewer);
                // });
                .catch(err => {
                    console.log(`Check log for errors`)
                })
        })

        // reviewers.forEach(reviewer => {
        //     articles.forEach(article => {
        //         db.Reviewer.addArticle(article, {
        //             through: {
        //                 rating1: '2',
        //                 rating2: "3",
        //                 rating3: "4",
        //                 comment: "great article"
        //             }
        //         });
        //     });
        // });



        db.Reviewer.findAll()
        .then(reviewer => {
            db.Article.findAll()
                .then(article => {
                    console.log(article[0].dataValues);
                    console.log(reviewer[0].dataValues);
                    article[0].addReviewer(reviewer[0], {
                        through: {
                            rating1: '2',
                            rating2: "3",
                            rating3: "4",
                            comment: "great article"
                        }
                    })
                })
        })
*/
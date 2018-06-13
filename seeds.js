var db = require("./models");

let reviewers = [{
        email: "reviewer_1@gmail.com",
        firstname: "Reviewer",
        lastname: "One",
        gender: "F",
        password: "$2a$08$8Ytl.bdioWB.RzYbx9TbJuxBfHTRq6hFyqMtjTXC3gPNuDU4cpTH2",
        status: "active"
    },
    {
        email: "reviewer_2@gmail.com",
        firstname: "Reviewer",
        lastname: "Two",
        gender: "M",
        password: "$2a$08$g.nkogP8PlSWn.NhNJzFvu5W7Ik.uhAP/6QY2D6FNMmhB3T1EnKey",
        status: "active"
    },
];

let articles = [{
        URL: "https://www.nytimes.com/2018/06/12/business/dealbook/att-time-warner-trial-antitrust-ruling.html",
        imageURL: "https://static01.nyt.com/images/2018/06/13/business/13ATT-vid-still/13ATT-vid-still-facebookJumbo.jpg",
        title: "Why the AT&T-Time Warner Case Was So Closely Watched",
        description: "The win for AT&T could affect corporate America’s takeover ambitions and the Justice Department’s interpretation of antitrust rules.",
        sourceId: "the-new-york-times",
        author: "Cecilia Kang"
    },
    {
        URL: "http://video.foxnews.com/v/5796780306001/",
        imageURL: "http://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2018/06/12/640/360/694940094001_5796785400001_5796780306001-vs.jpg",
        title: "Federal judge allows AT&T-Time Warner deal",
        description: "this is a test3",
        sourceId: "FOX",
        author: "Fox News"
    },
    {
        URL: "http://us.cnn.com/videos/cnnmoney/2018/06/12/att-time-warner-merger-toobin-trump-suspicions-lead.cnn",
        imageURL: "https://cdn.cnn.com/cnnnext/dam/assets/180612171953-att-time-warner-merger-toobin-trump-suspicions-lead-00000000-super-tease.jpg",
        title: "Toobin: Suspicions about Trump DOJ's motives - CNN Video",
        description: "CNN's Jeffrey Toobin breaks down the AT&T and Time Warner merger and explains why there are suspicions about the Trump administration's motives.",
        sourceId: "cnn",
        author: null
    },
]

db.ArticleReviewer.destroy({
        where: {}
    })
    .then(() => db.Article.destroy({
            where: {}
        })
        .then(() => db.Reviewer.destroy({
                where: {}
            })
            .then(
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
            )))
    .catch((err) => {
        console.log(err);
    });
var db = require("./models");

// let reviewers = [{
//         email: "reviewer_1@gmail.com",
//         firstname: "Reviewer",
//         lastname: "One",
//         gender: "F",
//         password: "$2a$08$8Ytl.bdioWB.RzYbx9TbJuxBfHTRq6hFyqMtjTXC3gPNuDU4cpTH2",
//         status: "active"
//     },
//     {
//         email: "reviewer_2@gmail.com",
//         firstname: "Reviewer",
//         lastname: "Two",
//         gender: "M",
//         password: "$2a$08$g.nkogP8PlSWn.NhNJzFvu5W7Ik.uhAP/6QY2D6FNMmhB3T1EnKey",
//         status: "active"
//     },
// ];


let reviews = [{
        rating1: '5',
        rating2: "5",
        rating3: "5",
        comment: "great article"
    },
    {
        rating1: '2',
        rating2: "1",
        rating3: "1",
        comment: "I can't believe they actually paid someone to write this trash"
    },
    {
        rating1: '3',
        rating2: "3",
        rating3: "3",
        comment: "Ok article. Nothing great."
    },
    {
        rating1: "4",
        rating2: "3",
        rating3: "2",
        comment: "Odsljk lk lkjdsf lkjk."
    },
    {
        rating1: '5',
        rating2: "1",
        rating3: "2",
        comment: "lsdfjk ldskj. I sdlfkjlkj lkljkf ljkdslfkj. Kjhkhdsf lksdhflhjksdlkj."
    },
    {
        rating1: '4',
        rating2: "3",
        rating3: "1",
        comment: "lkjdsflkj/ lkjdsflkj kljkkj. alkjhsdlkfj sldkflkj fewlkhfweuo ewhh sdlkhflkhj"
    },
    {
        rating1: '4',
        rating2: "1",
        rating3: "5",
        comment: "dsflkjlkj sdlfj;ljk ljljk ljhkldsiooeiyhds"
    },
    {
        rating1: '2',
        rating2: "3",
        rating3: "2",
        comment: "vmcxbdsjhg ruyt fsd xcvbm rteyu vcmbn"
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

db.Article.destroy({
        where: {}
    })
    .then(() => db.Review.destroy({
            where: {}
        })
        .then(
            Promise.all(articles.map(article => db.Article.create(article)))
            .then(articlesDB => Promise.all(reviews.map(review => db.Review.create(review)))
                .then(reviewDB => {
                    // console.log(articlesDB[0].dataValues);
                    // console.log(reviewDB[0].dataValues);
                    return ( 
                        articlesDB[0].setArticleReviews(reviewDB[0], {}),
                        articlesDB[1].setArticleReviews(reviewDB[1], {}),
                        articlesDB[2].setArticleReviews(reviewDB[2], {}),
                        articlesDB[0].setArticleReviews(reviewDB[3], {}),
                        articlesDB[1].setArticleReviews(reviewDB[4], {}),
                        articlesDB[1].setArticleReviews(reviewDB[5], {}),
                        articlesDB[1].setArticleReviews(reviewDB[6], {}),
                        articlesDB[0].setArticleReviews(reviewDB[7], {})
                    );
                }))
        ))
.catch((err) => {
    console.log(err);
});
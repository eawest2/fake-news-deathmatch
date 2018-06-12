var express = require("express");
var router = express.Router();

// Import the model (burger.js) to use its database functions.
// var article = require("../models/article.js");
// var reviewer = require("../models/reviewer.js");
// var articleReviewer = require("../models/articleReviewer.js");

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function (req, res) {
//     burger.selectAll(function (data) {
//         var hbsObject = {
//             burgers: data
//         };
//         res.render("index", hbsObject);
//     });
// });

// router.post("/createBurger", function (req, res) {
//     console.log(`in router post req.body: ${req.body}`)
//     burger.createBurger(["burger_name", "devoured"], [req.body.newBurger, 0], function (result) {
//         res.redirect("/");
//     });
// });

// router.post("/devourBurger/:id", function (req, res) {
//     let condition = `id = ${req.params.id}`;
//     console.log(condition)
//     burger.devourBurger({
//         devoured: 1
//     }, condition, function (result) {
//         console.log(`result: ${result}`)
//         if (result.changedRows == 0) {
//             return res.status(404).end();
//         } else {
//             res.redirect("/");
//         }
//     });
// });


// Export routes for server.js to use.
module.exports = router;
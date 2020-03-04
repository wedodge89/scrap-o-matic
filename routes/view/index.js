const router = require("express").Router();
const db = require("../../models");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/all", function(req, res) {
    db.Article.find({})
        .then(function(dbArticles) {
            res.render("allArticles", { articles: dbArticles});
        });
});

router.get("/savedArticles", function(req, res) {
    db.Headline.find({ saved: true })
        .then(function(dbArticles) {
            res.render("savedArticles", { articles: dbArticles });
        });
});

module.exports = router;
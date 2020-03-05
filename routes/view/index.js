const router = require("express").Router();
const db = require("../../models");

router.get("/", function(req, res) {
    db.Article.find({})
        .then(function(dbArticles) {
            res.render("home", { articles: dbArticles});
        });
});

router.get("/saved", function(req, res) {
    db.Article.find({ saved: true })
        .then(function(dbArticles) {
            res.render("savedArticles", { articles: dbArticles });
        });
});

module.exports = router;
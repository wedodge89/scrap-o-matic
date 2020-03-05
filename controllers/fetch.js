const db = require("../models");
const scrape = require("../scripts/scrape");

module.exports = {
    scrapeArticles: function(req, res) {
        return scrape()
            .then(function(articles) {
                return db.Article.create(articles);
            })
            .then(function(articles) {
                if (articles.length === 0) {
                    res.json({
                        message: "There are no new articles."
                    });
                } else {
                    res.json({
                        message: "Added " + articles.length + " new articles!"
                    });
                }
            })
            .catch(function(err) {
                res.json({
                    message: "Scrape complete!"
                });
            });
    }
};
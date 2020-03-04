const db = require("../models");
const scrape = require("../scripts/scrape.js");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
    scrapeArticles: function(req, res) {
        return scrape()
            .then(function(articles) {
                return db.Article.create(articles);
            })
            .then(function(dbArticle) {
                if (dbArticle.length === 0) {
                    res.json({
                        message: "There are no new articles."
                    });
                } else {
                    res.json({
                        message: "Added " + dbArticle.length + " new articles!"
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
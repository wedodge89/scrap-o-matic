const db = require("../models");

module.exports = {
    findAll: function(req, res) {
        db.Article
            .find(req.query)
            .then(function(articles) {
                res.json(articles);
            });
    },

    delete: function(req, res) {
        db.Article.remove ({ _id: req.params.id }).then(function(articles) {
            res.json(articles);
        });
    },

    update: function(req, res) {
        db. Article.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then(function(articles) {
            res.json(articles);
        });
    }
};
// Require Packages
const axios = require("axios");
const cheerio = require("cheerio");
const app = require("express");

// Require Models
const db = require("./../models")
// const Article = require("./../models/Article.js")
// const Note = require("./../models/Note.js")

module.exports = function(app) {

// Scrape Route
app.get("/api/scrape", function(req, res) {
    axios.get("https://nintendoeverything.com/").then(function(res){
        const $ = cheerio.load(res.data);

        // Save desired info from scrape
        $(".row.text-left").each(function(index, value) {
            const title = $(this).find("h2").text().trim();
            const url = $(this).find("a").attr("href");
            const desc = $(this).find(".description").children("div.large-12").eq(1).children("p").eq(1).text();
            const image = $(this).find("img.attachment-large").attr("src");
            
            // Create object from variables
            let result = {
                "title": title,
                "url": url,
                "desc": desc,
                "image": image
            };

            // Create Article from schema
            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err.message)
                });
        });
    })
    .then(res.redirect("/all"));
});


app.get("/api/articles", function(req, res) {
    db.Article.find({})
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err)
        });
});

app.put("/api/articles/:id", function(req, res) {
    let saved;
    if (req.body.saved) {
        saved = false;
    } else {
        saved = true;
    }

    db.Article.update({ _id: req.params.id}, {$set: { saved: saved } })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/api/articles/:id", function(req, res) {
    db.Article.findOne({ _id: req.params.id })
        .populate("note")
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.post("/api/articles/:id", function(req, res) {
    db.Note.create(req.body)
        .then(function(dbNote) {
            return db.Article.findOneAndUpdate(
                { _id: req.params.id },
                { note: dbNote._id },
                { new: true }
            );
        })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

app.get("/api/saved", function(req, res) {
    db.Article.find({ saved: true })
        .then(function(dbArticle) {
            res.json(dbArticle);
        })
        .catch(function(err) {
            res.json(err);
        });
});

};
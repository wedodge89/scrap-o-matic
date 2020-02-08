const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const handlebars = require("express-handlebars")

const Article = require("./models/Article.js")
const Note = require("./models/Note.js")

const PORT = 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Setting up Handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(MONGODB_URI);

// Routes
app.get("/", function(req, res) {
    res.render("index");
    // if there's nothing in collection, scrape
    if (!MONGODB_URI.articles) {
        res.redirect("/scrape")
    } else {
        res.redirect("/all")
    }
    // else "show all"
});

app.get("/scrape", function(req, res) {
    axios.get("https://nintendoeverything.com/").then(function(res){
        const $ = cheerio.load(res.data);

        $(".row.text-left").each(function(index, value) {
            const title = $(this).find("h2").text().trim();
            const url = $(this).find("a").attr("href");
            const desc = $(this).find(".description").children("div.large-12").eq(1).children("p").eq(1).text();
            const image = $(this).find("img.attachment-large").attr("src");
            
            let result = {
                "title": title,
                "url": url,
                "desc": desc,
                "image": image
            };

            Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    console.log(err.message)
                });
        });

        res.send("Scrape Complete!")

        // res.redirect to "show all"

    });
});

// show all articles route (get)
    // find ({})
    // res.json
    // console.log
app.get("/all", function(req, res) {

})

    // res.render 
    // note button
        // include art id as attr

// save notes /:id (post)
    // link note and article id

// view notes route


app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})


const db = require("../models");
const scrap = require("../scripts/scrape.js");
const axios = require("axios");
const cheerio = require("cheerio");

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
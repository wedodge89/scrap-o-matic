const axios = require("axios");
const cheerio = require("cheerio");

let scrape = function() {
    return axios.get("https://nintendoeverything.com/").then(function(res){
        const $ = cheerio.load(res.data);
        console.log("Scraping now...");
        let articles = [];

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

            console.log(result);
            articles.push(result);
        });
        return articles;
    })
};

module.exports = scrape;
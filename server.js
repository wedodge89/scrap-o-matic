// Require NPM packages
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars")

// Require Models
const Article = require("./models/Article.js");
const Note = require("./models/Note.js");

const PORT = 3000;

// Set Up Express
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Setting up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Setting up connection to Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"
mongoose.connect(MONGODB_URI);

// Requiring Routes
require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

// Start server
app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
});

module.exports = app;




// app.get("/", function(req, res) {
//     // If there's nothing in collection, scrape
//     if (!MONGODB_URI.articles) {
//         res.redirect("/scrape")
//         return;
//     // Else, show all
//     } else {
//         res.redirect("/all")
//     }
// });

// // "Show All" route
// app.get("/all", function(req, res) {
//     Article.find({}).then(function(dbArticle) {
//     let articles = [];
//         for (const el of dbArticle) {
//             articles.push({ id: el._id, title: el.title, desc: el.desc, url: el.url, image: el.image });
//         };
//         res.render("index", { article: articles });
//     });
// });

// app.get("/notes", function(req, res) {
//     Note.find({})
//         .then(function(dbNote){
//             res.json(dbNote);
//         })
//         .catch(function(err) {
//             res.json(err);
//         });
// });

//     // res.render 
//     // note button
//         // include art id as attr

// // save notes /:id (post)
//     // link note and article id

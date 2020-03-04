const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: false
    },
    image: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        default: false
    }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;